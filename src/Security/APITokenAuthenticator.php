<?php

namespace App\Security;

use App\Repository\UserRepository;
use Exception;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;

class APITokenAuthenticator extends AbstractAuthenticator
{

    public function __construct(private readonly UserRepository $userRepository) {}

    public function supports(Request $request): ?bool
    {
        return true;
    }

    public function authenticate(Request $request): Passport
    {
        $token = $request->headers->get('X-AUTH-TOKEN');

        if ($token == null) {
            return new SelfValidatingPassport(new UserBadge(''));
            // throw new Exception('No API token provided');
        } else {
            $user = $this->userRepository->findOneBy(['access_token' => $token]);
            if ($user == null) {
                throw new Exception('Bad API token provided');
            }
            return new SelfValidatingPassport(new UserBadge($user->getUserIdentifier()));
        }
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        // on success, let the request continue
        return null;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        return new JsonResponse([
            'message' => 'Invalid Token',
        ], Response::HTTP_UNAUTHORIZED);
    }
}
