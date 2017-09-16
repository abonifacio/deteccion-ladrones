#!/bin/bash

set -e

if [[ `id -u` -ne 0 ]] ; then echo "Correr con sudo" ; exit 1 ; fi

mkdir simpleCVInstallTemp
cd simpleCVInstallTemp

apt-get install -y python2.7 ipython python-opencv python-scipy python-numpy python-pygame python-setuptools python-pip git python-pil
wget https://bootstrap.pypa.io/get-pip.py
python get-pip.py
pip install svgwrite

git clone https://github.com/sightmachine/SimpleCV.git repo

cd repo
python setup.py install

if type simplecv &> /dev/null; then
	echo "Se instaló simpleCV"
	cd ../..
	rm simpleCVInstallTemp -R -f
else
	echo "Error desconocido"
fi
