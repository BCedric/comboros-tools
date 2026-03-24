<?php

namespace App\Controller\api;

use App\Entity\Artist;
use App\Repository\ArtistRepository;
use App\Repository\BandRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Serializer\Encoder\CsvEncoder;
use Symfony\Component\Serializer\Serializer;

#[Route('/artist', 'artist_api_')]
class ArtistsApiController extends AbstractAPIController
{

    #[Route('/orphan', name: 'get_orphan', methods: ['GET'])]
    public function getOrphan(ArtistRepository $artistRepository)
    {
        $artists = $artistRepository->findAll();
        $orphans = array_filter($artists, fn($a) => $a->getBand() == null);
        return new JsonResponse(array_values($this->serializer->normalize($orphans)));
    }

    #[Route('/', name: 'get', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function get(ArtistRepository $artistRepository)
    {
        $artists = $artistRepository->findAll();
        return new JsonResponse(array_values($this->serializer->normalize($artists)));
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
        $body['band'] != null && $artist->setBand($bandRepository->find($body['band']));
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

    #[Route('/export')]
    public function export(ArtistRepository $artistRepository, Request $request)
    {
        $artists = $artistRepository->findAll();
        $data = [];

        function formatDate(?DateTime $date, $isTime = false)
        {
            return $date != null ? $date->format("d/m/Y" . ($isTime ? " H:i" : '')) : "";
        }

        foreach ($artists as $artist) {
            $band = $artist->getBand();
            $line = [
                "Nom" => $artist->getLastname(),
                "Prénom" => $artist->getFirstname(),
                "Groupe / conférence / spectacle" => $band != null ? $band->getName() : '',
                "Type de contrat" => $artist->isGUSO() ? "GUSO" : "Cession",
                "Adresse postale" => $artist->getAddress(),
                "Numéro de téléphone" => $artist->getPhoneNumber(),
                "Profession" => $artist->getJob(),
                "Date d'arrivée" => formatDate($artist->getDateArrival(), true),
                "Date de départ" => formatDate($artist->getDateDeparture(), true),
                "Vous venez à COMBOROS depuis ..." => $artist->getCityComing(),
                "Vous repartez de COMBOROS vers ..." => $artist->getCityReturn(),
                "Moyen de transport" => implode(', ', $artist->getTransport()),
                "Choix de l'hébergement" => $artist->getHostingType(),
                "Nuitées en hébergement semi-collectif" => implode(', ', $artist->getSchoolNights()),
                "Régime alimentaire" => implode(', ', $artist->getMealValues()),
                "Accompagnateur·rice" => $artist->getCompanionName(),
                "Enfants" => $artist->getChildrenCompanions(),
                "Commentaires" => $artist->getComment(),
                "Date de naissance" => formatDate($artist->getBirthDate()),
                "Ville de naissance" => $artist->getBirthCity(),
                "Code postal de la ville de naissance" => $artist->getBirthCityPostCode(),
                "Pays de naissance" => $artist->getBirthCountry(),
                "IBAN" => $artist->getIBAN(),
                "Numéro de GUSO" => $artist->getGUSONumber(),
                "Numéro de congés spectacles" => $artist->getPerformanceBreaksNumber(),

            ];
            $data[] = $line;
        }

        $csvEncoder = new CsvEncoder(["csv_delimiter" => ";"]);
        $serializer = new Serializer([], [$csvEncoder]);
        $data = mb_convert_encoding($serializer->encode($data, "csv"), 'UTF-16LE', 'UTF-8');

        $response = new Response($data);
        $response->headers->set('Content-Type', 'text/csv');
        $response->headers->set('Content-Disposition', 'attachment; filename="export.csv"');
        return $response;
    }
}
