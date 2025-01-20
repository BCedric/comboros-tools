<?php
/**
 * Created by PhpStorm.
 * User: piraynau
 * Date: 16/03/18
 * Time: 10:37
 */

namespace App\Security;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class UserProviderAPI implements UserProviderInterface
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function loadUserByIdentifier(string $username): UserInterface
    {
        $user = $this->userRepository->findOneBy(['username' => $username]);

        if ($user !== null) {
            return $user;
        } else {
            return new User($username, "xxx", null);
        }
    }

    /**
     * {@inheritdoc}
     */
    public function loadUserByUsername(string $username): UserInterface
    {
        throw new UnsupportedUserException(sprintf('Username "%s" does not exist.', $username));
    }

    /**
     * {@inheritdoc}
     */
    public function refreshUser(UserInterface $user): UserInterface
    {
        return $this->loadUserByIdentifier($user->getUserIdentifier());
    }

    /**
     * {@inheritdoc}
     */
    public function supportsClass(string $class): bool
    {
        return User::class === $class;
    }
}