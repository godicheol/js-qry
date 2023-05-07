## Usage

```js
import jsQry from 'js-qry';
```

```js
jsQry.exec(data, query); // return boolean
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
    }]
}

jsQry.exec(data, query); // true
```

- Strict

```js
var data = {
    id: 1
}

var query = {
    id: "1"
}

var isStrict = true;
// Prevent convert boolean string => "true" to true
// Prevent convert number string => "1" to 1
// Prevent convert array items => ["true", "1"] to [true, 1]
// Prevent convert RegExp string => "/Mike/i" to /Mike/i 

jsQry.exec(data, query); // true
jsQry.exec(data, query, isStrict); // false
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