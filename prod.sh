#!/bin/bash

git pull
composer install --optimize-autoloader --no-dev
php artisan config:cache
# php artisan route:cache
php artisan view:cache
yarn install
yarn run prod
