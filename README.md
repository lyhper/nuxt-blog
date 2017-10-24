# nuxt-blog

> this is a blog project, which is based on server side render.

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

## Usage

+ modify the config.json in the root directory
  - blogTitle: web page title
  - blogDescription: web page description
  - blogKeyword: web page keyword
  - repo: your github repository with markdown in it
  - path: the path of your markdown
  - branch: your github repository branch

+ add your favicon to the /static

+ deploy

  - server side render: 

  ```bash
  npm run build

  npm start
  ```

  - static page:

  ```bash
  npm run generate
  ```
  all the static resources are in the /dist

## License

[MIT](http://opensource.org/licenses/MIT)
