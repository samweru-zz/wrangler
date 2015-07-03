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

3) install dependencies via npm:

```sh	
 npm install <pkg>
```	

* expressjs - web framework
* express-session - sessioning
* jade - templationg
* monk - mongo client wrapper
* body-parser - request parameterizer
* node-uuid - universal ID generator
	
4) install mongodb - big data database

5) import data into mongodb

```sh
 ./bin/mongoload
```

4) run

```sh
 nmp start
```

