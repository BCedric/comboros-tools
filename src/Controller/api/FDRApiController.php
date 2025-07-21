<?php

namespace App\Controller\api;

use App\Repository\ArtistRepository;
use App\Repository\BandRepository;
use App\Repository\ConfigRepository;
use App\Repository\WorkshopRepository;
use App\Security\Voter\FDRVoter;
use App\Service\DocService;
use DateTime;
use Symfony\Component\HttpFoundation\HeaderUtils;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Contracts\HttpClient\HttpClientInterface;

#[Route('/fdr', 'fdr_api_')]
class FDRApiController extends AbstractAPIController
{

    #[IsGranted(FDRVoter::EDIT)]
    #[Route('/get-fdr', name: 'get_fdr', methods: ['GET', 'POST'])]
    public function get_fdr(
        Request $request,
        DocService $docService,
        ConfigRepository $configRepository,
        HttpClientInterface $http,
        BandRepository $bandRepository,
        WorkshopRepository $workshopRepository,
        ArtistRepository $artistRepository
    ) {
        $body = json_decode($request->getContent(), true);
        $urlFDR = $configRepository->findConfigValue('urlFDR');

        /** @var Band */
        $band = $bandRepository->find($body['group']);


        $docFields = [
            ['tag' => 'groupe', 'type' => 'string', 'value' => $band->getName()],
            ['tag' => 'artistes', 'type' => 'string', 'value' => $band->artistsToString()],
            ['tag' => 'accompagnateurs', 'type' => 'string', 'value' => $band->getCompanions()],
            ['tag' => 'arrivees', 'type' => 'string', 'value' => $band->getArrivals()],
            ['tag' => 'depart', 'type' => 'string', 'value' => $band->getDepartures()],
            ['tag' => 'concert', 'type' => 'string', 'value' => $band->getConcert()],
            ['tag' => 'balances', 'type' => 'string', 'value' => $body['balanceTime'] === '' ?  '' : $band->getBalances(new DateTime($body['balanceTime']))],
            ['tag' => 'nom_accueil_ref', 'type' => 'string', 'value' => $body['referent']['name']],
            ['tag' => 'mail_accueil_ref', 'type' => 'string', 'value' => $body['referent']['mail']],
            ['tag' => 'tel_accueil_ref', 'type' => 'string', 'value' => $body['referent']['tel']],
        ];

        $tech = $band->getRoom()->getTech();
        if ($tech != null) {
            $docFields = array_merge($docFields, [
                ['tag' => 'nom_accueil_tech', 'type' => 'string', 'value' => $tech->getName()],
                ['tag' => 'mail_accueil_tech', 'type' => 'string', 'value' => $tech->getMail()],
                ['tag' => 'tel_accueil_tech', 'type' => 'string', 'value' => $tech->getTel()],

            ]);
        }

        $workshopIds = $body['workshops'];
        $workshopsStr = join(", \n", array_map(
            fn($id) => $workshopRepository->find($id)->__toString(),
            $workshopIds
        ));
        $docFields = array_merge($docFields, [
            ['tag' => 'stage', 'type' => 'string', 'value' => $workshopsStr],
        ]);

        $hosting = array_reduce($body['hosting'], function ($acc, $item) use ($artistRepository) {
            if (!empty($item['value'])) {
                $artist = $artistRepository->find($item['id']);
                $acc[] = [
                    'artist' => ['value' => $artist->getFirstname() . ' ' . $artist->getLastname(), 'width' => 1],
                    'hosting' => ['value' => $item['value'], 'width' => 2],
                ];
            }
            return $acc;
        }, []);

        if (!empty($hosting)) {
            $docFields = array_merge($docFields, [
                ['tag' => 'hebergement', 'type' => 'array', 'value' => $hosting],
            ]);
        } else {
            $docFields = array_merge($docFields, [
                ['tag' => 'hebergement', 'type' => 'string', 'value' => ''],
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
