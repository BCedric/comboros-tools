<?php

namespace App\Controller\api;

use App\Entity\Band;
use App\Repository\BandRepository;
use App\Repository\RoomRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/band', 'band_api_')]
class BandController extends AbstractAPIController
{

    #[Route('', name: 'get', methods: ['GET'])]
    public function get(BandRepository $bandRepository)
    {
        return new JsonResponse($this->serializer->normalize($bandRepository->findAll()));
    }

    #[Route('', name: 'post', methods: ['POST'])]
    public function post(
        Request $request,
        EntityManagerInterface $em,
        BandRepository $bandRepository,
        RoomRepository $roomRepository
    ) {
        $body = json_decode($request->getContent(), true);

        if (array_key_exists('id', $body)) {
            $band = $bandRepository->find($body['id']);
        } else {
            $band = new Band();
        }
        $band->setName($body['name']);
        $band->setStart(new DateTime($body['start']));
        $band->setEnd(new DateTime($body['end']));
        $band->setRoom($roomRepository->find($body['room']));

        $em->persist($band);


        $em->flush();
        return $this->get($bandRepository);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(
        Band $band,
        EntityManagerInterface $em,
        BandRepository $bandRepository
    ) {
        $em->remove($band);
        $em->flush();

        return $this->get($bandRepository);
    }
}
