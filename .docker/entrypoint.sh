#!/bin/bash -e

composer install --no-interaction --optimize-autoloader

php bin/console doctrine:database:create --if-not-exists
php bin/console c:c
php bin/console doctrine:schema:update -f
chmod a+w -R var

# Gestion des droits (ne pas modifier)
groupmod -g 100000 www-data
usermod -u 100000 www-data

chmod -R 777 ./var/cache
chmod -R 775 ./var/log

apache2-foreground