<?php

namespace App\Controller\api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Mapping\Factory\ClassMetadataFactory;
use Symfony\Component\Serializer\Mapping\Loader\AttributeLoader;

abstract class AbstractAPIController extends AbstractController
{

    protected Serializer $serializer;

    public function __construct()
    {
        $classMetadataFactory = new ClassMetadataFactory(new AttributeLoader());
        $this->serializer = new Serializer(
            [new DateTimeNormalizer(), new ObjectNormalizer(
                $classMetadataFactory,
                defaultContext: [
                    'ignored_attributes' => ['lazyObjectState', 'lazyObjectInitialized', 'lazyObjectAsInitialized'],
                    'circular_reference_handler' => function ($object) {
                        return $object->getId();
                    },
                ]
            )],
            [new JsonEncoder()],

        );
    }
}
