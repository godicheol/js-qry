## Usage

```js
import jsQry from 'js-qry';
```

```js
jsQry.match(data, query); // return boolean
```

```js
var data = {
    id: 1,
    isFatted: true,
    name: "mike",
    age: 10,
    size: {
        height: 100,
        weight: 100,
    },
    items: [
        "bag",
        "book",
        "pencil",
        1,
        true
    ]
}

var query = {
    // convert "1" to 1
    id: "1",
    // convert "true" to true
    isFatted: "true",
    // id: 1 or 2 or 3 without 4, 5
    $and: [{
        id: {
            $in: [1,2,3]
        }
    }, {
        id: {
            $nin: [4, 5]
        }
    }],
    // without age: 11 - 20
    $or: [{
        age: {
            $gt: 20
        }
    }, {
        age: {
            $lte: 10 
        }
    }],
    // name: mike
    $and: [{
        name: {
            $regexp: /mike/
        }
    }, {
        name: {
            $regexp: "/mike/"
        }
    }, {
        name: {
            $regexp: "/Mike/i"
        }
    }],
    // dot notation
    $and: [{
        "size.weight": {
            $gt: 90
        }
    }, {
        "size.height": 100
    }]
}

jsQry.match(data, query); // true
```

- Strict

```js
var data = {
    id: 1
}

var query = {
    id: "1"
}

var strict = true;

jsQry.match(data, query); // true
jsQry.match(data, query, strict); // false

// String "undefined" to undefined
// String "null" to null
// String "true" to true
// String "1" to 1
// Number 1 to "1"
// Number 1 to true
// Boolean true to 1
// Boolean true to "true"
// Array ["true", "1"] to [true, 1]
// RegExp "/Mike/i" to /Mike/i 
// ...
```

#### Operators

- $and
- $or
- $nor
- $not
- $eq
- $ne
- $in
- $nin
- $gt
- $gte
- $lt
- $lte
- $mod
- $exists
- $regexp
- $size