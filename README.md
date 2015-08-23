# Plex Posters using React/Redux

This is a project made with React and Redux for changing a lot of posters in your Plex (http://plex.tv) library.

## Getting started

Before trying this you need to have access to a plex server on the local network, or else you won't see anything.

```
git clone https://github.com/edenstrom/plex-posters
cd plex-posters
npm install
npm install -g gulp
gulp build
npm start
```

Also, check out config.js for changing the host/port to your plex server. Defaults to [http://localhost:32400](http://localhost:32400).

Then run open the browser to [http://localhost:3000](http://localhost:3000).

## Technologies used
* React
* Redux
* React-hot-loader
* Express
* Webpack
* Gulp


## Features

* Server rendered
* Fast loading
* Some caching of posters


## Things to do

* Clean the code up. In some places
* Not tested with Plex Home. Shouldn't work though.
* Clean up package.json. There are some unused packages there.
* Some design things. Design wasn't prioritized.
* Some best practices isn't followed.
* Really bad error reporting. If you're getting a gray screen, your plex settings could be wrong. Check out the sections method in PlexAPI.js.
* There are some hard coded variables in some places.

## Devmode

There's also hot reloading for both react and redux.

> NOTE: Uncomment line 4 in client/index.jsx for hot reloading for scss as well.

```
npm run dev
```

Then open the browser to [http://localhost:8080](http://localhost:8080).
