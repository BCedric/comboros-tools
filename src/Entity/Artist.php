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

    #[ORM\Column(type: Types::JSON, options: ['default' => '[]'])]
    private array $mealValues = [];

    #[ORM\Column(length: 255)]
    private ?string $hostingType = null;

    #[ORM\Column(type: Types::JSON, options: ['default' => '[]'])]
    private array $schoolNights = [];

    #[ORM\Column(length: 255)]
    private ?string $cityComing = null;

    #[ORM\Column(length: 255)]
    private ?string $cityReturn = null;

    #[ORM\Column(type: Types::JSON, options: ['default' => '[]'])]
    private array $transport = [];

    #[ORM\Column(length: 255)]
    private ?string $address = null;

    #[ORM\Column(length: 255)]
    private ?string $phoneNumber = null;

    #[ORM\Column(length: 255)]
    private ?string $job = null;

    #[ORM\Column]
    private ?bool $isGUSO = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $birthDate = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $birthCountry = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $IBAN = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $GUSONumber = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $performanceBreaksNumber = null;

    #[ORM\Column(nullable: true)]
    private ?int $birthCityPostCode = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $birthCity = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $comment = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $childrenCompanions = null;

    #[ORM\Column(length: 255)]
    private ?string $companionName = null;

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

    public function getMealValues(): array
    {
        return $this->mealValues;
    }

    public function setMealValues(array $mealValues): static
    {
        $this->mealValues = $mealValues;

        return $this;
    }

    public function getHostingType(): ?string
    {
        return $this->hostingType;
    }

    public function setHostingType(string $hostingType): static
    {
        $this->hostingType = $hostingType;

        return $this;
    }

    public function getSchoolNights(): array
    {
        return $this->schoolNights;
    }

    public function setSchoolNights(array $schoolNights): static
    {
        $this->schoolNights = $schoolNights;

        return $this;
    }

    public function getCityComing(): ?string
    {
        return $this->cityComing;
    }

    public function setCityComing(string $cityComing): static
    {
        $this->cityComing = $cityComing;

        return $this;
    }

    public function getCityReturn(): ?string
    {
        return $this->cityReturn;
    }

    public function setCityReturn(string $cityReturn): static
    {
        $this->cityReturn = $cityReturn;

        return $this;
    }

    public function getTransport(): array
    {
        return $this->transport;
    }

    public function setTransport(array $transport): static
    {
        $this->transport = $transport;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(string $phoneNumber): static
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    public function getJob(): ?string
    {
        return $this->job;
    }

    public function setJob(string $job): static
    {
        $this->job = $job;

        return $this;
    }

    public function isGUSO(): ?bool
    {
        return $this->isGUSO;
    }

    public function setIsGUSO(bool $isGUSO): static
    {
        $this->isGUSO = $isGUSO;

        return $this;
    }

    public function getBirthDate(): ?\DateTimeInterface
    {
        return $this->birthDate;
    }

    public function setBirthDate(\DateTimeInterface $birthDate): static
    {
        $this->birthDate = $birthDate;

        return $this;
    }

    public function getBirthCountry(): ?string
    {
        return $this->birthCountry;
    }

    public function setBirthCountry(string $birthCountry): static
    {
        $this->birthCountry = $birthCountry;

        return $this;
    }

    public function getIBAN(): ?string
    {
        return $this->IBAN;
    }

    public function setIBAN(string $IBAN): static
    {
        $this->IBAN = $IBAN;

        return $this;
    }

    public function getGUSONumber(): ?string
    {
        return $this->GUSONumber;
    }

    public function setGUSONumber(string $GUSONumber): static
    {
        $this->GUSONumber = $GUSONumber;

        return $this;
    }

    public function getPerformanceBreaksNumber(): ?string
    {
        return $this->performanceBreaksNumber;
    }

    public function setPerformanceBreaksNumber(string $performanceBreaksNumber): static
    {
        $this->performanceBreaksNumber = $performanceBreaksNumber;

        return $this;
    }

    public function getBirthCityPostCode(): ?int
    {
        return $this->birthCityPostCode;
    }

    public function setBirthCityPostCode(int $birthCityPostCode): static
    {
        $this->birthCityPostCode = $birthCityPostCode;

        return $this;
    }

    public function getBirthCity(): ?string
    {
        return $this->birthCity;
    }

    public function setBirthCity(string $birthCity): static
    {
        $this->birthCity = $birthCity;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(string $comment): static
    {
        $this->comment = $comment;

        return $this;
    }

    public function getChildrenCompanions(): ?string
    {
        return $this->childrenCompanions;
    }

    public function setChildrenCompanions(string $childrenCompanions): static
    {
        $this->childrenCompanions = $childrenCompanions;

        return $this;
    }

    public function getCompanionName(): ?string
    {
        return $this->companionName;
    }

    public function setCompanionName(string $companionName): static
    {
        $this->companionName = $companionName;

        return $this;
    }
}
