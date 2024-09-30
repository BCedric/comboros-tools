<?php

namespace App\Entity;

use App\Repository\ArtistRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ArtistRepository::class)]
class Artist
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    private ?string $lastname = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $dateArrival = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $dateDeparture = null;

    #[ORM\Column(type: Types::JSON, options: ['default' => '[]'])]
    private array $companions = [];

    #[ORM\ManyToOne(inversedBy: 'artists')]
    private ?Band $band = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getDateArrival(): ?\DateTimeInterface
    {
        return $this->dateArrival;
    }

    public function setDateArrival(\DateTimeInterface $dateArrival): static
    {
        $this->dateArrival = $dateArrival;

        return $this;
    }

    public function getDateDeparture(): ?\DateTimeInterface
    {
        return $this->dateDeparture;
    }

    public function setDateDeparture(\DateTimeInterface $dateDeparture): static
    {
        $this->dateDeparture = $dateDeparture;

        return $this;
    }

    public function getCompanions(): array
    {
        return $this->companions;
    }

    public function setCompanions(array $companions): static
    {
        $this->companions = $companions;

        return $this;
    }

    public function getBand(): ?Band
    {
        return $this->band;
    }

    public function setBand(?Band $band): static
    {
        $this->band = $band;

        return $this;
    }
}
