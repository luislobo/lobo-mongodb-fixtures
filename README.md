[![Build Status](https://travis-ci.org/luislobo/lobo-mongodb-fixtures.svg?branch=master)](https://travis-ci.org/luislobo/lobo-mongodb-fixtures)

#lobo-mongodb-fixtures

This is a forked version of [pow-mongodb-fixtures](https://github.com/powmedia/pow-mongodb-fixtures), that merges all other forks into this one, trying to keep
it up to date.

Simple fixture loader for MongoDB on NodeJS.  Makes managing relationships between documents easier.

Fixtures can be in one file, or divided up into separate files for organisation
(e.g. one file per model)

The fixture files must export objects which are keyed by the MongoDB collection name, each
containing the data for documents within that.

##Installation

```sh
npm install lobo-mongodb-fixtures
```

##Examples
With the file below, 3 documents will be inserted into the 'users' collection and 2 into the 'businesses' collection:

```javascript
//fixtures.js
exports.users = [
    { name: 'Gob' },
    { name: 'Buster' },
    { name: 'Steve Holt' }
];

exports.businesses = [
    { name: 'The Banana Stand' },
    { name: 'Bluth Homes' }
];
```

You can also load fixtures as an object where each document is keyed, in case you want to reference another document. This example uses the included `createObjectId` helper:

```javascript
//users.js
var id = require('lobo-mongodb-fixtures').createObjectId;

var users = exports.users = {
	user1: {
        _id: id(),
        name: 'Michael'
    },
    user2: {
        _id: id(),
        name: 'George Michael',
        father: users.user1._id
    },
    user3: {
        _id: id('4ed2b809d7446b9a0e000014'),
        name: 'Tobias'
    }
}
```

##CLI usage

A CLI program is included for quickly loading fixture files. To use it install the module globally:

```sh
npm install lobo-mongodb-fixtures -g
```

Then use the program to install a file or directory:

```sh
mongofixtures <dbname> <fixture file>
```

```sh
mongofixtures appdb fixtures/users.js
```

##API

###`connect(dbname, options)`

Returns a new Loader instance, configured to interact with a certain database.

Options:

- host (Default: localhost)
- port (Default: 27017)
- user
- pass
- safe (Default: false)

Usage:

```javascript
var fixtures = require('lobo-mongodb-fixtures').connect('dbname');

var fixtures2 = require('lobo-mongodb-fixtures').connect('dbname', {
  	host: 'http://dbhost.com/',
  	port: 1234
});
```

###`load(data, callback)`

Adds documents to the relevant collection. If the collection doesn't exist it will be created first.

```javascript
var fixtures = require('lobo-mongodb-fixtures').connect('mydb');

//Objects
fixtures.load({
    users: [
        { name: 'Maeby' },
        { name: 'George Michael' }
    ]
}, callback);

//Files
fixtures.load(__dirname + '/fixtures/users.js', callback);

//Directories (loads all files in the directory)
fixtures.load(__dirname + '/fixtures', callback);
```

###`clear(callback)`

Clears existing data.

```javascript
fixtures.clear(function(err) {
    //Drops the database
});

fixtures.clear('foo', function(err) {
    //Clears the 'foo' collection
});

fixtures.clear(['foo', 'bar'], function(err) {
    //Clears the 'foo' and 'bar' collections
});
```

###`clearAllAndLoad(data, callback)`

Drops the database (clear all collections) and loads data.

###`clearAndLoad(data, callback)`

Clears the collections that have documents in the `data` that is passed in, and then loads data.

```javascript
var data = { users: [...] };

fixtures.clearAndLoad(data, function(err) {
    //Clears only the 'users' collection then loads data
});
```

###`addModifier(callback)`

Adds a modifier (function) which gets called for each document that is to be inserted. The signature of this function
should be:

```javascript
    (collectionName, document, callback)
```

* collectionName - name of collection
* document - the document which is to be inserted
* callback - function with signature (err, modifiedDocument). This should be called with the modified document.

Modifiers are chained in the order in which they're added. For example:

```javascript
var data = { users: [...] };

// this modifier will get called first
fixtures.addModifier(function(collectionName, doc, cb) {
  doc.createdAt = new Date();

  cb(null, doc);
});

// this modifier will get called second with the result from the first modifier call
fixtures.addModifier(function(collectionName, doc, cb) {
  doc.updatedAt = new Date();

  cb(null, doc);
});

fixtures.load(data, function(err) {
    // each loaded data item will have the createdAt and updatedAt keys set.
});
```
