FROM rss-reader_default-img:latest

LABEL maintainer="HACHET Amaury"

WORKDIR /home/dev

RUN mkdir RSS-Reader

COPY . ./RSS-Reader

#Change directory
WORKDIR /home/dev/RSS-Reader

#Install the project
RUN npm install

#Express will be launched on the 3000 port
EXPOSE 3000

#Launch node when the container is launched
CMD [ "npm", "run","start" ]