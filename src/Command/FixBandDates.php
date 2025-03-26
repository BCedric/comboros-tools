<?php

namespace App\Command;

use App\Repository\BandRepository;
use DateInterval;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand('app:fix-band-dates')]
class FixBandDates extends Command
{

    public function __construct(
        private EntityManagerInterface $em,
        private BandRepository $bandRepository
    ) {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $bands = $this->bandRepository->findAll();
        foreach ($bands as $band) {
            $dateStart = $band->getStart();
            if (strtotime($dateStart) != 0) {
                $copy = clone $dateStart;

                $copy->sub(new DateInterval('P7D'));
                $band->setStart($copy);
            }

            $dateEnd = $band->getEnd();
            if (strtotime($dateEnd) != 0) {
                $copy = clone $dateEnd;
                $copy->sub(new DateInterval('P7D'));
                $band->setEnd($copy);
            }
            $output->write($band->getName());
            $output->writeln(' ' . $band->getStart()->format('d/m'));
        }
        $this->em->flush();
        return Command::SUCCESS;
    }
}
