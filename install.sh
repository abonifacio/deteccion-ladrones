#!/bin/bash

set -e

if [[ `id -u` -ne 0 ]] ; then echo "Correr con sudo" ; exit 1 ; fi

apt install libopencv-dev libvips

npm install
bower install --allow-root
