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

RUN curl -sS https://getcomposer.org/installer | php -- \
--install-dir=/usr/bin --filename=composer

RUN apt-get update
#unoconv : conversion .doc en .pdf
RUN apt-get -y install unoconv 
RUN mkdir -p /usr/share/man/man1
# RUN apt-get update -y && apt-get install -y default-jre 
RUN chmod 777 /var/www
RUN apt-get update && apt-get install -y ghostscript

RUN apt-get update && apt-get install -y libldap-common

RUN apt-get install cron -y

COPY vhosts.conf /etc/apache2/sites-available/000-default.conf

RUN echo 'date.timezone=Europe/Paris' >> /usr/local/etc/php/conf.d/docker-php-upfilesize.ini;

RUN a2enmod rewrite
