.ONESHELL:
.PHONEY: build build-local check-dir sync

build:
	docker build -t ailuoga/admin:latest .
build-local:
	docker build -t ailuoga/admin:local -f ./local.Dockerfile .
check-dir:
	ssh root@vultr '[ ! -d "/var/www/admin" ] && mkdir -p /var/www/admin || rm -rf /var/www/admin/*'
sync:
	rsync -azvP ./dist/*  root@vultr:/var/www/admin