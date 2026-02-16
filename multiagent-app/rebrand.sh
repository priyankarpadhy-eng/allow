#!/bin/sh
sed -i 's/"nameShort": "OpenVSCode Server"/"nameShort": "Alloy"/g' /home/.openvscode-server/product.json
sed -i 's/"nameLong": "OpenVSCode Server"/"nameLong": "Alloy IDE"/g' /home/.openvscode-server/product.json
sed -i 's/"applicationName": "openvscode-server"/"applicationName": "alloy"/g' /home/.openvscode-server/product.json
