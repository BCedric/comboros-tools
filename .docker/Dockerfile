ARG NODE_TAG
ARG APACHE_IMAGE
FROM node:$NODE_TAG as buildnode

WORKDIR /app

COPY package*.json ./
RUN npm config set proxy $HTTP_PROXY
RUN npm i

COPY assets/ ./assets/
COPY webpack.config.js ./

RUN npm run build

# -----------------------------
FROM bcedric/comboros-tools

WORKDIR  /var/www/html/

COPY assets assets
COPY bin bin
COPY config config
COPY public public
COPY src src
COPY templates templates
COPY composer.json composer.json
COPY composer.lock composer.lock
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY webpack.config.js webpack.config.js
COPY .env .env
COPY --from=buildnode /app/public/build /var/www/html/public/build

COPY .docker .docker
RUN chmod a+x /var/www/html/.docker/entrypoint.sh

ARG UPLOAD_DIR, IMG_DIR
RUN mkdir -p public/uploads
RUN chmod a+w public/uploads
RUN mkdir -p var/uploads
RUN chmod a+w var/uploads
RUN mkdir -p var/uploads/${IMG_DIR}
RUN chmod a+w var/uploads/${IMG_DIR}
RUN mkdir -p var/uploads/${UPLOAD_DIR}
RUN chmod a+w var/uploads/${UPLOAD_DIR}
RUN chmod a+w /tmp
RUN mkdir -p var
RUN chmod a+w -R var
RUN mkdir /var/www/.cache
RUN chmod a+w -R /var/www/.cache
RUN chmod 777 -R var
RUN chmod 777 -R public/uploads

RUN echo 'date.timezone=Europe/Paris' >> /usr/local/etc/php/conf.d/docker-php-upfilesize.ini;


CMD ["apache2-foreground"]