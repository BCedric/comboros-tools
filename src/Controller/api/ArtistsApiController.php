<?php

namespace App\Controller\api;

use App\Entity\Artist;
use App\Repository\ArtistRepository;
use App\Repository\BandRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/artist', 'artist_api_')]
class ArtistsApiController extends AbstractAPIController
{

    #[Route('/orphan', name: 'get', methods: ['GET'])]
    public function get(ArtistRepository $artistRepository)
    {
        $artists = $artistRepository->findAll();
        $orphans = array_filter($artists, fn($a) => $a->getBand() == null);
        return new JsonResponse(array_values($this->serializer->normalize($orphans)));
    }

    #[Route('', name: 'post', methods: ['POST'])]
    public function post(EntityManagerInterface $em, Request $request, BandRepository $bandRepository)
    {
        $body = json_decode($request->getContent(), true);
        $artist = new Artist();

        $artist->setHostingType($body['hostingType']);
        $artist->setMealValues($body['mealValues']);
        $artist->setSchoolNights($body['schoolNights']);
        $artist->setDateArrival(new DateTime($body['dateArrival']));
        $artist->setDateDeparture(new DateTime($body['dateDeparture']));
        $artist->setCityComing($body['cityComing']);
        $artist->setCityReturn($body['cityReturn']);
        $artist->setTransport($body['transport']);
        $artist->setBand($bandRepository->find($body['band']));
        $artist->setFirstname($body['firstname']);
        $artist->setLastname($body['lastname']);
        $artist->setAddress($body['address']);
        $artist->setPhoneNumber($body['phoneNumber']);
        $artist->setJob($body['job']);
        $artist->setIsGUSO($body['isGUSO']);
        $artist->setCompanionName($body['companionName']);
        $artist->setChildrenCompanions($body['childrenCompanions']);
        $artist->setComment($body['comment']);
        if ($body['isGUSO']) {
            $artist->setBirthDate(new DateTime($body['birthDate']));
            $artist->setBirthCity($body['birthCity']);
            $artist->setBirthCityPostCode($body['birthCityPostCode']);
            $artist->setBirthCountry($body['birthCountry']);
            $artist->setIBAN($body['IBAN']);
            $artist->setGUSONumber($body['GUSONumber']);
            $artist->setPerformanceBreaksNumber($body['performanceBreaksNumber']);
        }

        $em->persist($artist);

        $em->flush();

        return new JsonResponse('OK');
    }
}
