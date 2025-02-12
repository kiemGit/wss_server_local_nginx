Before proceeding, create self-signed SSL certificates:

    mkdir -p nginx/ssl && cd nginx/ssl
    openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes


build container

    docker-compose up --build -d

test using postman

    wss://192.168.0.170:4433
