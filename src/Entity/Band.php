<?php

namespace App\Entity;

use App\Repository\BandRepository;
use DateInterval;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Ignore;

#[ORM\Entity(repositoryClass: BandRepository::class)]
class Band
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    /**
     * @var Collection<int, Artist>
     */
    #[ORM\OneToMany(targetEntity: Artist::class, mappedBy: 'band')]
    private Collection $artists;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $start = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $end = null;

    #[ORM\ManyToOne]
    private ?Room $room = null;

    public function __construct()
    {
        $this->artists = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    /**
     * @return Collection<int, Artist>
     */
    public function getArtists(): Collection
    {
        return $this->artists;
    }

    public function addArtist(Artist $artist): static
    {
        if (!$this->artists->contains($artist)) {
            $this->artists->add($artist);
            $artist->setBand($this);
        }

        return $this;
    }

    public function removeArtist(Artist $artist): static
    {
        if ($this->artists->removeElement($artist)) {
            // set the owning side to null (unless already changed)
            if ($artist->getBand() === $this) {
                $artist->setBand(null);
            }
        }

        return $this;
    }

    #[Ignore]
    public function artistsToString()
    {
        return implode(', ', array_map(fn($a) => $a->getFirstname() . ' ' . $a->getLastname(), $this->getArtists()->toArray()));
    }

    #[Ignore]
    public function getCompanions()
    {
        $companions = array_merge(...array_map(fn($a) => $a->getCompanions(), $this->getArtists()->toArray()));
        $companions = array_filter($companions, fn($c) => $c != '');
        return implode(', ', $companions);
    }

    #[Ignore]
    public function getArrivals()
    {
        $arrivals = array_map(fn($a) => $a->getFirstname() . ' ' . $a->getLastname() . ' : ' . $a->getDateArrival()->format('d/m'), $this->artists->toArray());
        return implode(', ', $arrivals);
    }

    #[Ignore]
    public function getDepartures()
    {
        $arrivals = array_map(fn($a) => $a->getFirstname() . ' ' . $a->getLastname() . ' : ' . $a->getDateDeparture()->format('d/m'), $this->artists->toArray());
        return implode(', ', $arrivals);
    }

    #[Ignore]
    public function getConcert()
    {
        /** @var Datetime */
        $startDateTime = $this->getStart();
        if (intval($startDateTime->format('H')) < 5) {
            $day = intval($startDateTime->format('d')) - 1;
        } else {
            $day = intval($startDateTime->format('d'));
        }
        $installation = clone $startDateTime;
        $installation->sub(DateInterval::createFromDateString('30 minutes'));
        return "Dans la journée ou soirée du " . $day . "/" . $startDateTime->format('m') . ', de ' . $startDateTime->format('H\hi') . ' à ' . $this->getEnd()->format('H\hi') . ' à ' . $this->getRoom()->getLabel() . ' (installation à ' . $installation->format('H\hi') . ')';
    }

    public function getStart(): ?\DateTimeInterface
    {
        return $this->start;
    }

    public function setStart(\DateTimeInterface $start): static
    {
        $this->start = $start;

        return $this;
    }

    public function getEnd(): ?\DateTimeInterface
    {
        return $this->end;
    }

    public function setEnd(\DateTimeInterface $end): static
    {
        $this->end = $end;

        return $this;
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
}
