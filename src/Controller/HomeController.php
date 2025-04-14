<?php

namespace App\Controller;

use App\Repository\WorkshopRepository;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\Encoder\CsvEncoder;
use Symfony\Component\Serializer\Serializer;

#[Route('/')]
class HomeController extends AbstractController
{
    #[Route('')]
    public function index()
    {
        return $this->render('default.html.twig');
    }

    #[Route('export/workshop')]
    public function export_workshop(WorkshopRepository $workshopRepository)
    {
        $workshops = $workshopRepository->findAll();
        $data = [];
        foreach ($workshops as $workshop) {
            $line = [
                "Intitulé" => $workshop->getName() == null ? '' : $workshop->getName(),
                "Description" => $workshop->getDescription(),
                "Intervenants" => $workshop->getSpeakers() == null ? '' : implode(', ', $workshop->getSpeakers()),
                "Début" => $workshop->getStart()->format('Y-m-d H:i:s'),
                "Fin" => $workshop->getEnd()->format('Y-m-d H:i:s'),
                'Lieu' => $workshop->getRoom() == null ? '' : $workshop->getRoom()->getLabel(),
                'Niveau attendu' => $workshop->getLevel(),
                'Jauge' => $workshop->getGauge()
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
