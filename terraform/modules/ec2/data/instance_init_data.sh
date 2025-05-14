#!/bin/bash

sudo yum update -y
sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts

# # transfer project to ec2 instance
# sudo apt install git
# git clone https://github.com/Spell-It-inc/spell-it.git
# cd spell-it