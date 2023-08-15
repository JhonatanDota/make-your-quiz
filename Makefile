build:
	docker-compose up --build

up:
	docker-compose up

down:
	docker-compose down

setup:
	docker-compose exec backend bash -c "php artisan migrate:fresh && php artisan db:seed"

sh:
	docker-compose exec backend bash

sh-front:
	docker-compose exec frontend bash