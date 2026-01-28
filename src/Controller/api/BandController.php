<?php

namespace App\Controller\api;

use App\Entity\Band;
use App\Repository\BandRepository;
use App\Repository\RoomRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Doctrine\Attribute\MapEntity;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/band', 'band_api_')]
class BandController extends AbstractAPIController
{

    #[Route('', name: 'get', methods: ['GET'])]
    public function get(BandRepository $bandRepository)
    {
        return new JsonResponse($this->serializer->normalize($bandRepository->findAll('name')));
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
        $band->setType($body['type']);
        if (array_key_exists('room', $body) && $body['room'] != null) {
            $band->setRoom($roomRepository->find($body['room']));
        }

        $em->persist($band);


        $em->flush();
        return $this->get($bandRepository);
    }

    #[Route('/{id}', name: 'postFormdata', methods: ['POST'])]
    public function postformdata(
        Band $band,
        Request $request,
        EntityManagerInterface $em,
        KernelInterface $appKernel
    ) {
        $imgsFolder = $appKernel->getProjectDir() . '/var/band-imgs';
        $body = json_decode($request->request->get('body'), true);
        $files = $request->files->all();
        if (!empty($files)) {
            foreach ($band->getImgs() as $value) {
                unlink($imgsFolder . '/' . $value);
            }
            $band->setImgs([]);
            foreach ($files as $file) {
                $band->addImg($file->getClientOriginalName());
                $file->move($imgsFolder, $file->getClientOriginalName());
            }
        }
        if (array_key_exists('presentation', $body)) {
            $band->setPresentation($body['presentation']);
        }
        if (array_key_exists('members', $body)) {
            $band->setMembers($body['members']);
        }
        if (array_key_exists('otherElements', $body)) {
            $band->setOtherElements($body['otherElements']);
        }
        if (array_key_exists('link', $body) && $body['link'] != null) {
            $band->setLink($body['link']);
        }
        $em->flush();
        return new JsonResponse('OK');
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
    #[Route('/access-code/{access_code}', name: 'getByAccessCode', methods: ['GET'])]
    public function initAccessCode(
        #[MapEntity(mapping: ['access_code' => 'formComAccessCode'])] Band $band,
    ) {
        return new JsonResponse($this->serializer->normalize($band));
    }

    #[Route('/img/{filename}', name: "get_img", methods: ["GET"])]
    public function getImg(
        string $filename,
        KernelInterface $appKernel
    ) {
        $filepath = $appKernel->getProjectDir() . '/var/band-imgs/' . $filename;
        return new BinaryFileResponse($filepath, 200, [
            'Content-Type' => mime_content_type($filepath)
        ]);
    }
}
