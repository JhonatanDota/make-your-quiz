FROM php:8.0.5
ENV COMPOSER_ALLOW_SUPERUSER=1

WORKDIR /app
COPY . /app

RUN apt-get update -y && apt-get install -y openssl zip unzip git
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

EXPOSE 8000