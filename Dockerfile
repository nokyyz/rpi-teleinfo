FROM resin/rpi-raspbian:wheezy-2015-11-04
MAINTAINER Nokyyz <nokyyz@yahoo.fr>

ENV SERIAL_PORT_PATH /dev/ttyACM0 

RUN npm install
