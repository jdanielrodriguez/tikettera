.PHONY: start
start:
	docker-compose up -d

.PHONY: stop
stop:
	docker-compose stop

.PHONY: network-create
network-create:
	docker network create --gateway 172.16.0.1 --subnet 172.16.0.0/24 tikettera_network

.PHONY: network-remove
network-remove:
	docker network rm tikettera_network

.PHONY: init
init:
	docker network inspect tikettera_network >/dev/null 2>&1 || docker network create --subnet=172.16.0.0/24 tikettera_network
	docker volume inspect tikettera_db_data >/dev/null 2>&1 || docker volume create tikettera_db_data
	docker volume inspect tikettera_redis_data >/dev/null 2>&1 || docker volume create tikettera_redis_data
	docker volume inspect tikettera_minio_data >/dev/null 2>&1 || docker volume create tikettera_minio_data
	docker-compose build
	docker-compose up -d

.PHONY: rebuild
rebuild:
	docker-compose -f docker-compose.yml up --build --force-recreate -d

.PHONY: seed
seed:
	docker-compose exec tikettera_app php artisan migrate --seed

.PHONY:
node-restart:
	docker stop tikettera_node
	docker start tikettera_node

.PHONY:
nginx-shell:
	docker exec -it tikettera_nginx /bin/bash

.PHONY:
php-shell:
	docker exec -it tikettera_app /bin/bash

.PHONY:
node-shell:
	docker exec -it tikettera_node /bin/bash

.PHONY:
db-shell:
	docker exec -it tikettera_db /bin/bash
