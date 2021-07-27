#!/bin/bash

trap 'kill %1' SIGINT
php artisan serve & npm run watch
