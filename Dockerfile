FROM node:9.11.2-jessie
RUN apt-get update
RUN apt-get install -y nginx
WORKDIR /app
COPY . /app
EXPOSE 80
RUN  npm cache verify
RUN  npm install  && npm run build  && cp -r dist/* /var/www/html  && rm -rf /app
CMD ["nginx","-g","daemon off;"]


