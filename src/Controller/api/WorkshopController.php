<?php

namespace App\Controller\api;

use App\Entity\Workshop;
use App\Repository\WorkshopRepository;
use App\Repository\RoomRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/workshop', 'workshop_api_')]
class WorkshopController extends AbstractAPIController
{

    #[Route('', name: 'get', methods: ['GET'])]
    public function get(WorkshopRepository $workshopRepository)
    {
        return new JsonResponse($this->serializer->normalize($workshopRepository->findAll()));
    }

    #[Route('', name: 'post', methods: ['POST'])]
    public function post(
        Request $request,
        EntityManagerInterface $em,
        WorkshopRepository $workshopRepository,
        RoomRepository $roomRepository
    ) {
        $body = json_decode($request->getContent(), true);

        if (array_key_exists('id', $body)) {
            $workshop = $workshopRepository->find($body['id']);
        } else {
            $workshop = new Workshop();
        }
        $workshop->setName($body['name']);
        $workshop->setStart(new DateTime($body['start']));
        $workshop->setEnd(new DateTime($body['end']));
        $workshop->setRoom($roomRepository->find($body['room']));

        $em->persist($workshop);


        $em->flush();
        return $this->get($workshopRepository);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(
        Workshop $workshop,
        EntityManagerInterface $em,
        WorkshopRepository $workshopRepository
    ) {
        $em->remove($workshop);
        $em->flush();

        return $this->get($workshopRepository);
    }
}