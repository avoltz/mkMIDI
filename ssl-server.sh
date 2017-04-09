#!/bin/sh

if [ ! -e key.pem  -o ! -e cert.pem ]; then
	openssl genrsa -des3 -out server.key.org 2048
	openssl req -new -key server.key.org -out server.csr
	openssl rsa -in server.key.org -out key.pem
	openssl x509 -req -days 365 -in server.csr -signkey key.pem -out cert.pem
	rm -f server.key.org server.csr
fi;

./node_modules/http-server/bin/http-server --ssl
