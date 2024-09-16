<?php

namespace App\Controller\api;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/fdr', 'fdr_api_')]
class FDRApiController extends AbstractAPIController
{

    #[Route('/artists', name: 'artists')]
    public function artists(Request $request)
    {
        dd($request->files);
        return new Response('OK');
    }
}
