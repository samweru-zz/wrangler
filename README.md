Refugees United Challenge #2
=============================

## getting started

1) install nodejs 

```sh
 wget -c https://nodejs.org/dist/v0.12.5/node-v0.12.5-linux-x64.tar.gz

 tar xvf node-v0.12.5-linux-x64.tar.gz

 ./configure
 make
 make install
```

2) clone project

```sh	
 git clone <path> && cd <path>
```

3) install dependencies locally via npm:

```sh	
 npm install <pkg>
```

3.1) install globally and link packages locally:

```sh	
 sudo npm i <pkg> -g
 npm link <pkg>
```	

* expressjs - web framework
* express-session - sessioning
* mustache-express - templating engine
* (optional) express-bunyan-logger - default logger level in app.js - `off`
* mongojs - implements the mongo api
* body-parser - request parameterizer
* node-uuid - universal ID generator
	
4) install mongodb - big data database

```sh
 sudo apt-get install mongodb
```

5) import data into mongodb

```sh
 ./bin/moload
```

4) run

```sh
 nmp start
```

4.1) OR if you have installed nodemon (nodejs on daemon) and bunyan logger

```sh
 nodemon | bunyan
```