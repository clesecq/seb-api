#!/bin/bash

trap 'kill %1' SIGINT
php artisan serve & yarn run watch
