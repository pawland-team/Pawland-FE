#!/bin/bash
export NVM_DIR="/home/ubuntu/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # nvm 스크립트 로드

cd /home/ubuntu/Pawland-FE
git pull origin main
nvm install
nvm use
npm install --no-audit
npm run build
pm2 restart next_app
# sudo systemctl restart nginx
