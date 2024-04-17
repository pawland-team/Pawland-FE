#!/bin/bash
cd /home/ubuntu/Pawland-FE
git pull origin main
nvm install
nvm use
npm run build
pm2 restart next_app
