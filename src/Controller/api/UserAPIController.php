<?php


namespace App\Controller\api;

use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/user', name: 'user_api_')]
class UserAPIController extends AbstractAPIController
{

    #[Route('/auth', name: 'auth', methods: ['PUT'])]
    public function auth(
        Request $request,
        UserRepository $userRepository,
        EntityManagerInterface $em
    ) {
        $body = json_decode($request->getContent(), true);
        $user = $userRepository->findOneBy(['username' => $body['login']]);
        $em->flush();
        if ($user == null) {
            $res = false;
        } else {
            $res = password_verify($body['password'], $user->getEncryptedPassword()) ? $this->serializer->normalize($user) : false;
        }

        return new JsonResponse($res);
    }
}
