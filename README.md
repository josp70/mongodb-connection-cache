mongodb-connection
=========

A simple library to store and share a database connection.

## Installation

  `npm install mongodb-connection`

## Usage

```javascript
const db = require('mongodb-connection');

db.connect('mongodb://localhost:27018/test').then(db => {
  // first use of db
});
```
After connecting you can use the database instance by invoking db.get()

```javascript
db.get()
```

## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing
coding style. Add unit tests for any new or changed
functionality. Lint and test your code.
