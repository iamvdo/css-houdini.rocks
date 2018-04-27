# Houdini experiments

See live https://css-houdini.rocks

## Build Nuxt.js project

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate

# deploy
$ npm run deploy -- --remote=<remote>
```

## Add new demo

* Add metadata in `store/data.json`
* Create new folder in `static/posts`
  * `index.html` for demo content
  * `index.js` for JS to be executed when demo is loaded
  * `paint.js` for `registerPaint`