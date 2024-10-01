<?php

namespace App\Controller\api;

use App\Entity\Artist;
use App\Entity\Band;
use App\Entity\Config;
use App\Entity\Workshop;
use App\Repository\ArtistRepository;
use App\Repository\BandRepository;
use App\Repository\ConfigRepository;
use App\Repository\WorkshopRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/config', 'config_api_')]
class ConfigApiController extends AbstractAPIController
{
    #[Route('', name: 'get', methods: ['GET'])]
    public function get(ConfigRepository $configRepository)
    {
        $configArray = $this->serializer->normalize(
            $configRepository->findAll()
        );
        $configArray = array_reduce($configArray, function ($result, $item) {
            $result[$item['name']] = $item['value'];
            return $result;
        }, []);
        return new JsonResponse($configArray);
    }

    #[Route('', name: 'put', methods: ['PUT'])]
    public function put(
        Request $request,
        ConfigRepository $configRepository,
        EntityManagerInterface $em,
        ArtistRepository $artistRepository,
        BandRepository $bandRepository,
        WorkshopRepository $workshopRepository,
    ) {
        $body = json_decode($request->getContent(), true);
        foreach ($body as $name => $value) {
            $config = $configRepository->findOneByName($name);
            if ($config == null) {
                $config = new Config();
            }
            $config->setName($name);
            $config->setValue($value);
            $em->persist($config);
        }

        $em->flush();

        // Clear DB
        $artists = $artistRepository->findAll();
        foreach ($artists as $artist) {
            $em->remove($artist);
        }

        $bands = $bandRepository->findAll();
        foreach ($bands as $band) {
            $em->remove($band);
        }

        $workshops = $workshopRepository->findAll();
        foreach ($workshops as $workshop) {
            $em->remove($workshop);
        }


        // Remplissage table Band
        $progCSV = $configRepository->findConfigValue('progCSV');
        $progCSVbandName = $configRepository->findConfigValue('progCSVbandName');
        if (($handle = fopen($progCSV, 'r')) !== FALSE) {

            while (($row = fgetcsv($handle, 0, ',')) !== FALSE) {
                $band = new Band();
                $band->setName($row[$progCSVbandName]);
                $band->setDay($row[$configRepository->findConfigValue('progCSVday')]);
                $band->setTime($row[$configRepository->findConfigValue('progCSVtime')]);
                $band->setPlace($row[$configRepository->findConfigValue('progCSVplace')]);
                $em->persist($band);
            }
            fclose($handle);
        }

        $em->flush();

        // Remplissage table Workshop
        $workshopCSV = $configRepository->findConfigValue('workshopCSV');
        $workshopCSVName = $configRepository->findConfigValue('workshopCSVName');
        if (($handle = fopen($workshopCSV, 'r')) !== FALSE) {

            while (($row = fgetcsv($handle, 0, ',')) !== FALSE) {
                $workshop = new Workshop();
                $workshop->setName($row[$workshopCSVName]);
                $workshop->setDay($row[$configRepository->findConfigValue('workshopCSVday')]);
                $workshop->setPeriod($row[$configRepository->findConfigValue('workshopCSVperiod')]);
                $workshop->setPlace($row[$configRepository->findConfigValue('workshopCSVplace')]);
                $em->persist($workshop);
            }
            fclose($handle);
        }

        $em->flush();

        // Remplissage table Artists
        $cessionCSV = $configRepository->findConfigValue('cessionCSV');
        // $cessionCSVbandName = $configRepository->findConfigValue('cessionCSVbandName');
        if (($handle = fopen($cessionCSV, 'r')) !== FALSE) {
            while (($row = fgetcsv($handle, 0, ',')) !== FALSE) {
                $artist = new Artist();
                $artist->setFirstname($row[$configRepository->findConfigValue('cessionCSVFirstname')]);
                $artist->setLastname($row[$configRepository->findConfigValue('cessionCSVLastname')]);
                $arrival = DateTime::createFromFormat('d.m.Y H:i:s', $row[$configRepository->findConfigValue('cessionCSVDateArrival')] . ' ' . $row[$configRepository->findConfigValue('cessionCSVTimeArrival')]);
                $arrival != false && $artist->setDateArrival($arrival);
                $departure = DateTime::createFromFormat('d.m.Y H:i:s', $row[$configRepository->findConfigValue('cessionCSVDateDeparture')] . ' ' . $row[$configRepository->findConfigValue('cessionCSVTimeDeparture')]);
                $departure != false && $artist->setDateDeparture($departure);
                $artist->setCompanions([$row[$configRepository->findConfigValue('cessionCSVCompanion')], $row[$configRepository->findConfigValue('cessionCSVChildren')]]);
                $artistBand = $bandRepository->findOneBy(['name' => $row[$configRepository->findConfigValue('cessionCSVbandName')]]);
                if ($artistBand != null) {
                    $artist->setBand($artistBand);
                }
                $em->persist($artist);
            }
            fclose($handle);
        }

        $gusoCSV = $configRepository->findConfigValue('gusoCSV');
        if (($handle = fopen($gusoCSV, 'r')) !== FALSE) {
            while (($row = fgetcsv($handle, 0, ',')) !== FALSE) {
                $artist = new Artist();
                $artist->setFirstname($row[$configRepository->findConfigValue('gusoCSVFirstname')]);
                $artist->setLastname($row[$configRepository->findConfigValue('gusoCSVLastname')]);
                $arrival = DateTime::createFromFormat('d.m.Y H:i:s', $row[$configRepository->findConfigValue('gusoCSVDateArrival')] . ' ' . $row[$configRepository->findConfigValue('gusoCSVTimeArrival')]);
                $arrival != false && $artist->setDateArrival($arrival);
                $departure = DateTime::createFromFormat('d.m.Y H:i:s', $row[$configRepository->findConfigValue('gusoCSVDateDeparture')] . ' ' . $row[$configRepository->findConfigValue('gusoCSVTimeDeparture')]);
                $departure != false && $artist->setDateDeparture($departure);
                $artist->setCompanions([$row[$configRepository->findConfigValue('gusoCSVCompanion')]]);
                $artistBand = $bandRepository->findOneBy(['name' => $row[$configRepository->findConfigValue('gusoCSVbandName')]]);
                if ($artistBand != null) {
                    $artist->setBand($artistBand);
                }
                $em->persist($artist);
            }
            fclose($handle);
        }

        $em->flush();


        return $this->get($configRepository);
    }

    #[Route('/rooms', name: 'get_rooms', methods: ['GET'])]
    public function get_rooms(BandRepository $bandRepository)
    {
        $res = [];
        foreach ($bandRepository->findAll() as $band) {
            if (!in_array($band->getPlace(), $res)) {
                $res[] = $band->getPlace();
            }
        }

        return new JsonResponse($res);
    }
}
