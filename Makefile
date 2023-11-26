make.PHONY:
start:
	docker-compose up -d

.PHONY:
stop:
	docker-compose stop

.PHONY:
network-create:
	docker network create --gateway 172.16.0.1 --subnet 172.16.0.0/24 tikettera_network

.PHONY:
network-remove:
	docker network rm tikettera_network

.PHONY:
init:
	sudo chmod -R 777 ./docker/*
	docker-compose build
	docker-compose up -d

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
