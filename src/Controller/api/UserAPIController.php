<?php


namespace App\Controller\api;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Doctrine\Attribute\MapEntity;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

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

    #[IsGranted('ROLE_ADMIN')]
    #[Route('/{username}/password', name: 'change_password', methods: ['PUT'])]
    public function change_password(
        #[MapEntity(mapping: ['username' => 'username'])] User $user,
        Request $request,
        EntityManagerInterface $em
    ) {
        $body = json_decode($request->getContent(), true);
        $user->setPassword($body['password']);
        $em->flush();
        return new Response('OK');
    }
}
