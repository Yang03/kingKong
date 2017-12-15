#!/usr/bash

git pull origin master
npm run stop
sleep 3
npm run start

cd client
rm -rf ./dist
npm run client



