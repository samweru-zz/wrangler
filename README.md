## Data Wrangler

This is an attempt at wrangling unruly data although unfinished, it gives a hint at how it can be accomplished. In the file `fix/people.json` exists a list of peoples records who may be related in some way. Wrangling assists us to find out how.

The aim is to create a network that recommends 'people you may know'

![data-wrangler](https://raw.githubusercontent.com/samweru/wrangler/master/pic/wrangler.png)
</br>Hey! Didn't say I succeded. :grin:

### Getting Started

Start your mongodb server
```sh
mongod --dbpath db/
```

Import your data
```sh
./bin/populate
```

Install dependencies
```sh
npm update
```

Run your application server
```sh
npm start
```

Defaultly runs on port `3000`

Run your tests
```sh
npm test
```

### Wrangler Scripts

There are a few scripts to `bin/wrangler/*` that assist in understanding the nature of the data. For example, you can run check `emailDuplicates.js` :

```sh
mongo bin/wrangler/emailDuplicates.js
```

There is no web client yet which means you may have to use a cli web client to run whatever web request are available. You can also check tests to see whatever functionality is available. Become a contributer, why not? :sweat_smile:




