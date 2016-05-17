# SPA for OSCON 2016

## Develop locally

First:

```bash
git clone https://github.com/capouch/oscon16.git
cd oscon16
npm install
```

##ATTENTION MAC USERS
If npm install gives you errors failing to install sharp, run next commands:

- Only if you are missing node and git:
```bash
brew install nodejs
brew install git
```
- Command that should fix the problem with sharp:
```bash
brew install homebrew/science/vips --with-webp --with-graphicsmagick
```
Try installing sharp now it should work.


###Production Version

Transpile the Javascript using Babel:

```bash
npm run build
npm start
```
```bash
localhost:2016
or
127.0.0.1:2016
```
Note the bundled file is *not* kept in the repo and needs to be generated after
checkout with `npm run build`. Also after any change, `npm run build` has to be
executed to get the newest version of the code


###Development Version

Run with webpack, hot reload is included so there is no need for refreshing the server:

```bash
npm run serve
```
```bash
localhost:8080
```

###Electron Version

####Online
Run electron app with access to the online database:

```bash
git checkout electron-dist
npm run build
```
And then in the separate terminal/tab:

```bash
electron .
```


####Local
```bash
git checkout electron-local
npm run build
npm start
```
And then in the separate terminal/tab:

```bash
electron .
```


#### Still needs more testing
Run inside a docker container:

```
docker run -p 3000:80 -v "$PWD"/public:/usr/local/apache2/htdocs/ httpd:2.4
```

Visit `http://<YOUR_DOCKER_MACHINE_IP>:3000`

Run app in server mode:

```
npm start
```









MAC

brew install nodejs
brew install git
brew install homebrew/science/vips --with-webp --with-graphicsmagick
