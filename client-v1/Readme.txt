sudo docker build -t checkmate-01 .
sudo docker run -p 4173:4173 checkmate-01 

docker images 
docker ps -a

docker rm <id>
docker rmi <id>


#Self-Signed Certificate 
sudo apt update
sudo apt install openssl

openssl genpkey -algorithm RSA -out /etc/ssl/private/selfsigned.key -aes256
openssl req -new -x509 -key /etc/ssl/private/selfsigned.key -out /etc/ssl/certs/selfsigned.crt -days 365
openssl rsa -in /etc/ssl/private/selfsigned.key -out /etc/ssl/private/selfsigned.key

sudo nano /etc/nginx/sites-available/default


server {
    listen 80;
    server_name your-domain.com; # Replace with your domain or IP

    # Redirect all HTTP requests to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com; # Replace with your domain or IP

    ssl_certificate /etc/ssl/certs/selfsigned.crt;
    ssl_certificate_key /etc/ssl/private/selfsigned.key;

    location / {
        proxy_pass http://localhost:4173; # Forward requests to your Docker container
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}


sudo nginx -t
sudo systemctl reload nginx
