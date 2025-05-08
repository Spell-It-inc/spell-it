# Update system packages
sudo yum update -y

# Install curl and git
sudo yum install -y curl git

# Install Node.js 18 from Nodesource (RPM version)
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

npm install -g pm2

# Clone your project
git clone https://github.com/Spell-It-inc/spell-it.git
cd spell-it

npm install
