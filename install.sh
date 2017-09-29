#!/bin/bash

set -e

if [[ `id -u` -ne 0 ]] ; then echo "Correr con sudo" ; exit 1 ; fi

apt install -y nodejs npm libopencv-dev libvips

npm install -g bower

npm install
bower install
