<?php

namespace App\Controller\api;

use App\Entity\ArtistLiaisonOfficer;
use App\Repository\ArtistLiaisonOfficerRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/artist-liaison-officer', 'artist_liaison_officer_api_')]
class ArtistLiaisonOfficerController extends AbstractAPIController
{
    #[Route('', name: 'get', methods: ['GET'])]
    public function get(ArtistLiaisonOfficerRepository $artistLiaisonOfficerRepository)
    {
        return new JsonResponse($this->serializer->normalize($artistLiaisonOfficerRepository->findAll('name')));
    }

    #[Route('', name: 'post', methods: ['POST'])]
    public function post(
        Request $request,
        EntityManagerInterface $em,
        ArtistLiaisonOfficerRepository $artistLiaisonOfficerRepository
    ) {
        $body = json_decode($request->getContent(), true);

        foreach ($body['officers'] as $officerArray) {
            if (array_key_exists('id', $officerArray)) {
                $officer = $artistLiaisonOfficerRepository->find($officerArray['id']);
            } else {
                $officer = new ArtistLiaisonOfficer();
            }


            $officer->setFirstname($officerArray['firstname']);
            $officer->setLastname($officerArray['lastname']);
            $officer->setPhone($officerArray['phone']);
            $officer->setMail($officerArray['mail']);

            $em->persist($officer);
        }


        $em->flush();

        return $this->get($artistLiaisonOfficerRepository);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(
        ArtistLiaisonOfficer $artistLiaisonOfficer,
        EntityManagerInterface $em,
        ArtistLiaisonOfficerRepository $artistLiaisonOfficerRepository
    ) {
        $em->remove($artistLiaisonOfficer);
        $em->flush();
        return $this->get($artistLiaisonOfficerRepository);
    }
}
