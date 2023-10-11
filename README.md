# Muon Explorer

[Muon Explorer](https://explorer.muon.net) provides a user-friendly interface for users to view requests, applications and nodes of the Muon oracle network.

## Installation

Before proceeding with the installation of the Muon Explorer Backend, please ensure that you have the following prerequisites installed:

-  Node.js
-  npm
-  pm2

You can install and use [nvm](https://github.com/nvm-sh/nvm) to install above prerequisites using the following commands:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts
npm install npm@latest -g
npm  install pm2@latest -g
```

After having the prerequisites installed, the Muon Explorer can be cloned and built using the following commands:

```bash
git clone https://github.com/muon-protocol/Muon-Explorer.git
cd Muon-Explorer
npm i
npm run build
```

After building the the Muon Explorer can be started using the following command:

```bash
pm2 start npm --name front_muon -- run start -- -p 3004
```

#### Notes

-  Muon Explorer queries the API provided by the [Muon Explorer Backend](https://github.com/muon-protocol/Muon-Explorer-Backend) to retrive requests' and applications' information so the backend should be run as a prerequisite to have the frontend working.
-  The nginx of the explorer server is required to be configured to provide the following endpoints by adding a server block with following reverse proxy configurations:

```
location / {
        proxy_pass http://127.0.0.1:3004;
}
location /api/v1/applications {
        proxy_pass http://127.0.0.1:8004/api/v1/applications;
}
location /api/v1/requests {
        proxy_pass http://127.0.0.1:8004/api/v1/requests;
}
location /api/v1/nodes {
        proxy_pass http://<monitor-service-ip>/nodes;
}
location /query/v1/ {
        proxy_pass http://127.0.0.1:8000/v1/;
}
```
