#!/bin/bash

yum update -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v

# transfer project to ec2 instance
sudo apt install git
git clone https://github.com/Spell-It-inc/spell-it.git
cd spell-it