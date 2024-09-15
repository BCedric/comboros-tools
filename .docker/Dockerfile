ARG NODE_TAG
ARG APACHE_IMAGE
FROM node:$NODE_TAG as buildnode

# WORKDIR /app

# COPY package*.json ./
# RUN npm config set proxy $HTTP_PROXY
# RUN npm i

# COPY assets/ ./assets/
# COPY webpack.config.js ./

# RUN npm run build

# -----------------------------
FROM php:8.2-apache

RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

RUN apt-get update \
    && apt-get install -y --no-install-recommends locales apt-utils git libicu-dev g++ libpng-dev libxml2-dev libzip-dev libonig-dev libxslt-dev libldap2-dev vim;

RUN echo "en_US.UTF8 UTF8" >> /etc/locale.gen && \
    echo "fr_FR.UTF8 UTF8" >> /etc/locale.gen && \
    locale-gen

RUN curl -sSk https://getcomposer.org/installer | php -- --disable-tls aa && \
    mv composer.phar /usr/local/bin/composer

RUN docker-php-ext-configure intl
RUN docker-php-ext-install pdo pdo_mysql gd opcache intl zip calendar dom mbstring zip gd xsl
RUN docker-php-ext-configure ldap --with-libdir=lib/x86_64-linux-gnu/ \
    && docker-php-ext-install ldap
RUN pecl install apcu && docker-php-ext-enable apcu

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

RUN apt-get update
#unoconv : conversion .doc en .pdf
RUN apt-get -y install unoconv 
RUN mkdir -p /usr/share/man/man1
# RUN apt-get update -y && apt-get install -y default-jre 
RUN chmod 777 /var/www
RUN apt-get update && apt-get install -y ghostscript

RUN apt-get update && apt-get install -y libldap-common

RUN apt-get install cron -y

RUN a2enmod rewrite

# -----------------------------

WORKDIR  /var/www/html/

COPY assets assets
COPY bin bin
COPY config config
COPY public public
COPY src src
# COPY templates templates
COPY composer.json composer.json
COPY composer.lock composer.lock
COPY package.json package.json
# COPY package-lock.json package-lock.json
COPY webpack.config.js webpack.config.js
COPY .env .env
# COPY --from=buildnode /app/public/build /var/www/html/public/build

COPY .docker/vhosts.conf /etc/apache2/sites-available/000-default.conf
COPY .docker .docker
RUN chmod a+x /var/www/html/.docker/entrypoint.sh

ARG UPLOAD_DIR, IMG_DIR, FILES_DIR, ARCHIVES__DOCAPOST_DIR
RUN mkdir -p public/uploads
RUN chmod a+w public/uploads
RUN mkdir -p var/uploads
RUN chmod a+w var/uploads
RUN mkdir -p var/uploads/${FILES_DIR}
RUN chmod a+w var/uploads/${FILES_DIR}
RUN mkdir -p var/uploads/${IMG_DIR}
RUN chmod a+w var/uploads/${IMG_DIR}
RUN mkdir -p var/uploads/${UPLOAD_DIR}
RUN chmod a+w var/uploads/${UPLOAD_DIR}
RUN mkdir -p var/uploads/${ARCHIVES__DOCAPOST_DIR}
RUN chmod a+w var/uploads/${ARCHIVES__DOCAPOST_DIR}
RUN chmod a+w /tmp
RUN mkdir -p var
RUN chmod a+w -R var
RUN mkdir /var/www/.cache
RUN chmod a+w -R /var/www/.cache
RUN chmod 777 -R var
RUN chmod 777 -R public/uploads

# RUN echo 'upload_max_filesize = 8M' >> /usr/local/etc/php/conf.d/docker-php-upfilesize.ini;
RUN echo 'date.timezone=Europe/Paris' >> /usr/local/etc/php/conf.d/docker-php-upfilesize.ini;
# COPY .docker/crontab /etc/cron.d/my-cron-file

# RUN composer install --no-interaction --optimize-autoloader

CMD ["apache2-foreground"]