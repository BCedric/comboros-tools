<?php

namespace App\Controller\api;

use App\Repository\BandRepository;
use App\Repository\ConfigRepository;
use App\Repository\TechRepository;
use App\Service\DocService;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\HeaderUtils;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

#[Route('/fdr', 'fdr_api_')]
class FDRApiController extends AbstractAPIController
{

    #[Route('/band', name: 'band', methods: ['GET'])]
    public function band(BandRepository $bandRepository)
    {
        $bands = $bandRepository->findAll();
        return new JsonResponse($this->serializer->normalize($bands));
    }

    #[Route('/get-fdr', name: 'get_fdr', methods: ['GET', 'POST'])]
    public function get_fdr(
        Request $request,
        DocService $docService,
        ConfigRepository $configRepository,
        HttpClientInterface $http,
        BandRepository $bandRepository,
        TechRepository $techRepository
    ) {
        $body = json_decode($request->getContent(), true);
        $urlFDR = $configRepository->findConfigValue('urlFDR');
        $band = $bandRepository->find($body['group']);

        $tech = $techRepository->findOneBy(['room' => $band->getPlace()]);

        $docFields = [
            ['tag' => 'groupe', 'type' => 'string', 'value' => $band->getName()],
            ['tag' => 'artistes', 'type' => 'string', 'value' => $band->artistsToString()],
            ['tag' => 'accompagnateurs', 'type' => 'string', 'value' => $band->getCompanions()],
            ['tag' => 'arrivees', 'type' => 'string', 'value' => $band->getArrivals()],
            ['tag' => 'depart', 'type' => 'string', 'value' => $band->getDepartures()],
            ['tag' => 'concert', 'type' => 'string', 'value' => $band->getConcert()],
            ['tag' => 'nom_accueil_ref', 'type' => 'string', 'value' => $body['referent']['name']],
            ['tag' => 'mail_accueil_ref', 'type' => 'string', 'value' => $body['referent']['mail']],
            ['tag' => 'tel_accueil_ref', 'type' => 'string', 'value' => $body['referent']['tel']],
        ];

        if ($tech != null) {
            $docFields = array_merge($docFields, [
                ['tag' => 'nom_accueil_tech', 'type' => 'string', 'value' => $tech->getName()],
                ['tag' => 'mail_accueil_tech', 'type' => 'string', 'value' => $tech->getMail()],
                ['tag' => 'tel_accueil_tech', 'type' => 'string', 'value' => $tech->getTel()],

            ]);
        }

        $response = $http->request('GET', $urlFDR);
        $tmpFDRType = '/tmp/tmpFDRType.docx';
        file_put_contents($tmpFDRType, $response->getContent());
        if ($body['format'] === 'docx') {
            $fileContent = $docService->replace($tmpFDRType, $docFields);
        } else {
            $fileContent = $docService->replacePDF($tmpFDRType, $docFields);
        }
        unlink($tmpFDRType);

        return new Response($fileContent, 200, [
            'Content-Disposition' => HeaderUtils::makeDisposition(
                HeaderUtils::DISPOSITION_ATTACHMENT,
                $docService->accent2ascii('Test.pdf')
            )
        ]);
    }
}
