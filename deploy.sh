#!/bin/bash
cd /home/ubuntu/Pawland-FE
git pull origin main
sudo nvm install
sudo nvm use
sudo npm run build
pm2 restart next_app
