docker-restart:
	docker compose down -v
	docker compose up -d

install:
	npm install

start:
	npm start