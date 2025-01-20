<?php

namespace App\Security\Voter;

use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class FDRVoter extends Voter
{
    const EDIT = "EDIT";

    public function __construct(private readonly Security $security) {}

    protected function supports(string $attribute, $subject): bool
    {
        return (in_array($attribute, [
            self::EDIT,
        ])

        );
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        /** @var Utilisateur */
        switch ($attribute) {
            case self::EDIT:
                return $this->security->isGranted('ROLE_USER');
            default:
                return false;
        }
    }
}
