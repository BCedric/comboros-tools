<?php

namespace App\Controller\api;

use App\Entity\Room;
use App\Repository\RoomRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/room', 'room_api_')]
class RoomController extends AbstractAPIController
{

    #[Route('', name: 'get', methods: ['GET'])]
    public function get(RoomRepository $roomRepository)
    {
        return new JsonResponse($this->serializer->normalize($roomRepository->findAll()));
    }

    #[Route('', name: 'post', methods: ['POST'])]
    public function post(
        Request $request,
        EntityManagerInterface $em,
        RoomRepository $roomRepository
    ) {
        $body = json_decode($request->getContent(), true);

        foreach ($body['room'] as $roomArray) {
            if (array_key_exists('id', $roomArray)) {
                $room = $roomRepository->find($roomArray['id']);
            } else {
                $room = new Room();
            }
            $room->setLabel($roomArray['label']);

            $em->persist($room);
        }

        $em->flush();
        return $this->get($roomRepository);
    }
}
