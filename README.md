# Scene:History

This software is all about keeping track of high-resolution historical images.

The canonical site incarnate is at https://scene-history.palaver.net

Link to OSCON presentation slides: https://slides.com/capouch/spa-bootcamp/
    
Vagrant box and instructions (120MB): http://oscon.saintjoe-cs.org:8111/    

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
http://127.0.0.1:2016
```
Note the bundle.js file, which webpack creates and is sent to the client is
*not* kept in the repo and needs to be generated after checkout with
`npm run build`. After changing the client-side codebase, `npm run build` must be
executed to freshen up the bundle


###Development Version

Run with webpack, hot reload is included so there is no need for refreshing the client:

```bash
npm run serve
```
```bash
http://127.0.0.1:8080
```

###Electron Version

To install the electron client, run (as root or administrator user):
```bash
npm install -g electron-prebuilt
```
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


### Docker
Run inside a docker container:

```
docker run -p 3000:80 -v "$PWD"/public:/usr/local/apache2/htdocs/ httpd:2.4
```

Visit `http://<YOUR_DOCKER_MACHINE_IP>:3000`

Run app in server mode:

```
npm start
```
