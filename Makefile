make.PHONY:
start:
	docker-compose up -d

.PHONY:
stop:
	docker-compose stop

.PHONY:
init:
	sudo chmod -R 777 ./docker/*
	docker-compose build
	docker-compose up -d

.PHONY:
nginx-shell:
	docker exec -it tikettera_nginx /bin/bash

.PHONY:
php-shell:
	docker exec -it tikettera_app /bin/bash

.PHONY:
db-shell:
	docker exec -it tikettera_db /bin/bash
