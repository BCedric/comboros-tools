<?php

namespace App\Controller\api;

use App\Entity\Tech;
use App\Repository\TechRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/tech', 'tech_api_')]
class TechController extends AbstractAPIController
{

    #[Route('', name: 'get', methods: ['GET'])]
    public function get(TechRepository $techRepository)
    {
        return new JsonResponse($this->serializer->normalize($techRepository->findAll()));
    }

    #[Route('', name: 'post', methods: ['POST'])]
    public function post(
        Request $request,
        EntityManagerInterface $em,
        TechRepository $techRepository
    ) {
        $body = json_decode($request->getContent(), true);

        foreach ($body['tech'] as $techArray) {
            if (array_key_exists('id', $techArray)) {
                $tech = $techRepository->find($techArray['id']);
            } else {
                $tech = new Tech();
            }
            $tech->setMail($techArray['mail']);
            $tech->setRoom($techArray['room']);
            $tech->setName($techArray['name']);
            $tech->setTel($techArray['tel']);

            $em->persist($tech);
        }

        $em->flush();
        return $this->get($techRepository);
    }
}
