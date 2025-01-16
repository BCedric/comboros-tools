<?php

namespace App\Controller\api;

use App\Repository\ArtistRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
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
}
