<?php

namespace App\Entity;

use App\Repository\TechRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TechRepository::class)]
class Tech
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $mail = null;

    #[ORM\Column(length: 255)]
    private ?string $tel = null;

    #[ORM\OneToOne(inversedBy: 'tech', cascade: ['persist', 'remove'])]
    private ?Room $room = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRoom(): ?Room
    {
        return $this->room;
    }

    public function setRoom(?Room $room): static
    {
        $this->room = $room;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getMail(): ?string
    {
        return $this->mail;
    }

    public function setMail(string $mail): static
    {
        $this->mail = $mail;

        return $this;
    }

    public function getTel(): ?string
    {
        return $this->tel;
    }

    public function setTel(string $tel): static
    {
        $this->tel = $tel;

        return $this;
    }

}
