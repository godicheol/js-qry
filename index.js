// Universal module definition
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS
    module.exports = factory();
  } else {
    // Browser
    root.jsQry = factory();
  }
})(this, function() {
  'use strict';

  // https://github.com/godicheol/js-type
  var getType = function(a) {
    return Object.prototype.toString.call(a).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }
  var isBoolean = function(a, strict) {
    switch (getType(a)) {
      case "boolean":
        return true;
      case "number":
        return !strict && (a === 0 || a === 1);
      case "string":
        return !strict && (a === "0" || a === "1" || a === "false" || a === "true");
      default:
        return false;
    }
  }
  var toBoolean = function(a, strict) {
    switch (getType(a)) {
      case "boolean":
        return a;
      case "number":
        if (strict) {
          throw new Error("Invalid argument type");
        }
        return a === 1;
      case "string":
        if (strict) {
          throw new Error("Invalid argument type");
        }
        return a === "1" || a === "true";
      default:
        throw new Error("Invalid argument type");
    }
  }
  var isNumber = function(a, strict) {
    switch (getType(a)) {
      case "boolean":
        return !strict;
      case "number":
        return !Number.isNaN(a) && Number.isFinite(a);
      case "string":
        return !strict && (!Number.isNaN(parseFloat(a)) && Number.isFinite(parseFloat(a)));
      case "date":
        return !strict && !Number.isNaN(a.valueOf());
      default:
        return false;
    }
  }
  var toNumber = function(a, strict) {
    switch (getType(a)) {
      case "boolean":
        if (strict) {
          throw new Error("Invalid argument type");
        }
        return a ? 1 : 0;
      case "number":
        return a;
      case "string":
        if (strict) {
          throw new Error("Invalid argument type");
        }
        return parseFloat(a);
      case "date":
        if (strict) {
          throw new Error("Invalid argument type");
        }
        return a.valueOf();
      default:
        throw new Error("Invalid argument type");
    }
  }
  var isString = function(a, strict) {
    switch (getType(a)) {
      case "boolean":
        return !strict;
      case "number":
        return !strict && (!Number.isNaN(a) && Number.isFinite(a));
      case "string":
        return true;
      case "regexp":
        return !strict;
      case "date":
        return !strict && !Number.isNaN(a.valueOf());
      default:
        return false;
    }
  }
  var toString = function(a, strict) {
    switch (getType(a)) {
      case "boolean":
        if (strict) {
          throw new Error("Invalid argument type");
        }
        return a ? "true" : "false";
      case "number":
        if (strict) {
          throw new Error("Invalid argument type");
        }
        return a.toString(10)
      case "string":
        return a;
      case "regexp":
        if (strict) {
          throw new Error("Invalid argument type");
        }
        return a.toString();
      case "date":
        if (strict) {
          throw new Error("Invalid argument type");
        }
        return a.toISOString();
      default:
        throw new Error("Invalid argument type");
    }
  }
  var isObject = function(a, strict) {
    var isJsonObject = function(str) {
      try {
        return getType(JSON.parse(str)) === "object";
      } catch (err) {
        return false;
      }
    }
    switch (getType(a)) {
      case "string":
        return !strict && isJsonObject(a);
      case "object":
        return true;
      default:
        return false;
    }
  }
  var toObject = function(a, strict) {
    switch (getType(a)) {
      case "string":
        if (strict) {
          throw new Error("Invalid argument type");
        }
        return JSON.parse(a);
      case "object":
        return a;
      default:
        throw new Error("Invalid argument type");
    }
  }
  var isArray = function(a, strict) {
    var isJsonArray = function(str) {
      try {
        return getType(JSON.parse(str)) === "array";
      } catch (err) {
        return false;
      }
    }
    switch (getType(a)) {
      case "string":
        return !strict && isJsonArray(a);
      case "array":
        return true;
      default:
        return false;
    }
  }
  var toArray = function(a, strict) {
    switch (getType(a)) {
      case "string":
        if (strict) {
          throw new Error("Invalid argument type");
        }
        return JSON.parse(a);
      case "array":
        return a;
      default:
        throw new Error("Invalid argument type");
    }
  }
  var isFunction = function(a, strict) {
    switch (getType(a)) {
      case "function":
        return true;
      default:
        return false;
    }
  }
  var toFunction = function(a, strict) {
    switch (getType(a)) {
      case "function":
        return a;
      default:
        throw new Error("Invalid argument type");
    }
  }
  var isNull = function(a, strict) {
    switch (getType(a)) {
      case "string":
        return !strict && a === "null";
      case "null":
        return true;
      default:
        return false;
    }
  }
  var toNull = function(a, strict) {
    switch (getType(a)) {
      case "string":
        if (strict) {
          throw new Error("Invalid argument type");
        }
        return null;
      case "null":
        return a;
      default:
        throw new Error("Invalid argument type");
    }
  }
  var isUndefined = function(a, strict) {
    switch (getType(a)) {
      case "string":
        return !strict && a === "undefined";
      case "undefined":
        return true;
      default:
        return false;
    }
  }
  var toUndefined = function(a, strict) {
    switch (getType(a)) {
      case "string":
        if (strict) {
          throw new Error("Invalid argument type");
        }
        return undefined;
      case "undefined":
        return a;
      default:
        throw new Error("Invalid argument type");
    }
  }
  var isDate = function(a, strict) {
    switch (getType(a)) {
      case "number":
        return !strict && !Number.isNaN(new Date(a).valueOf());
      case "string":
        return !strict && !Number.isNaN(new Date(a).valueOf());
      case "date":
        return !Number.isNaN(a.valueOf());
      default:
        return false;
    }
  }
  var toDate = function(a, strict) {
    switch (getType(a)) {
      case "number": {
        if (strict) {
          throw new Error("Invalid argument type");
        }
        return new Date(a);
      }
      case "string": {
        if (strict) {
          throw new Error("Invalid argument type");
        }
        return new Date(a);
      }
      case "date":
        return a;
      default:
        throw new Error("Invalid argument type");
    }
  }
  var isRegExp = function(a, strict) {
    var isValidRegExpString = function(str) {
      if (!/^\/.*\/[dgimsuy]{0,7}$/.test(str)) {
        return false;
      }
      var seen = {}, item;
      str = str.split("\/").pop();
      for (item of str.split("")) {
        if (seen[item]) {
          return false;
        }
        seen[item] = true;
      }
      return true;
    }
    switch (getType(a)) {
      case "string":
        return !strict && isValidRegExpString(a);
      case "regexp":
        return true;
      default:
        return false;
    }
  }
  var toRegExp = function(a, strict) {
    var stringToRegExp = function(str) {
      var flags = str.split("\/").pop(),
        source = str.replace(/^\/|\/[dgimsuy]{0,7}$/g, "");
      return new RegExp(source, flags);
    }
    switch (getType(a)) {
      case "string":
        if (strict) {
          throw new Error("Invalid argument type");
        }
        return stringToRegExp(a);
      case "regexp":
        return a;
      default:
        throw new Error("Invalid argument type");
    }
  }

  // item in array
  var isItem = function(a) {
    return isBoolean(a, true) || isNumber(a, true) || isString(a, true) || isNull(a, true) || isUndefined(a, true);
  }

  var MATCHERS = {
    $and: function(a, b, strict) {
      if (!isArray(b, true)) {
        throw new Error("Invalid argument type");
      }
      for (var i = 0; i < b.length; i++) {
        if (!isObject(b[i], true)) {
          throw new Error("Invalid argument type");
        }
        if (!execQuery(a, b[i], strict)) {
          return false;
        }
      }
      for (i = 0; i < b.length; i++) {
        
      }
      return true;
    },
    $or: function(a, b, strict) {
      if (!isArray(b, true)) {
        throw new Error("Invalid argument type");
      }
      for (var i = 0; i < b.length; i++) {
        if (!isObject(b[i], true)) {
          throw new Error("Invalid argument type");
        }
        if (execQuery(a, b[i], strict)) {
          return true;
        }
      }
      return false;
    },
    $nor: function(a, b, strict) {
      if (!isArray(b, true)) {
        throw new Error("Invalid argument type");
      }
      for (var i = 0; i < b.length; i++) {
        if (!isObject(b[i], true)) {
          throw new Error("Invalid argument type");
        }
        if (execQuery(a, b[i], strict)) {
          return false;
        }
      }
      return true;
    },
    $not: function(a, b, strict) {
      if (!isObject(b, true)) {
        throw new Error("Invalid argument type");
      }
      return !execQuery(a, b, strict);
    },
    $in: function(a, b, strict) {
      if (!isArray(b, true)) {
        throw new Error("Invalid argument type");
      }
      for (var i = 0; i < b.length; i++) {
        if (!isItem(b[i], true)) {
          throw new Error("Invalid argument type");
        }
        if (matchQuery(a, b[i], "$eq", strict)) {
          return true;
        }
      }
      return false;
    },
    $nin: function(a, b, strict) {
      if (!isArray(b, true)) {
        throw new Error("Invalid argument type");
      }
      for (var i = 0; i < b.length; i++) {
        if (!isItem(b[i], true)) {
          throw new Error("Invalid argument type");
        }
        if (matchQuery(a, b[i], "$eq", strict)) {
          return false;
        }
      }
      return true;
    },
    $gt: function(a, b, strict) {
      if (!isNumber(b, strict)) {
        throw new Error("Invalid argument type");
      }
      if (!isNumber(a, strict)) {
        return false;
      }
      return toNumber(a) > toNumber(b);
    },
    $gte: function(a, b, strict) {
      if (!isNumber(b, strict)) {
        throw new Error("Invalid argument type");
      }
      if (!isNumber(a, strict)) {
        return false;
      }
      return toNumber(a) >= toNumber(b);
    },
    $lt: function(a, b, strict) {
      if (!isNumber(b, strict)) {
        throw new Error("Invalid argument type");
      }
      if (!isNumber(a, strict)) {
        return false;
      }
      return toNumber(a) < toNumber(b);
    },
    $lte: function(a, b, strict) {
      if (!isNumber(b, strict)) {
        throw new Error("Invalid argument type");
      }
      if (!isNumber(a, strict)) {
        return false;
      }
      return toNumber(a) <= toNumber(b);
    },
    $mod: function(a, b, strict) {
      if (!isArray(b, true) || b.length !== 2) {
        throw new Error("Invalid argument type");
      }
      if (!isNumber(b[0], strict)) {
        throw new Error("Invalid argument type");
      }
      if (!isNumber(b[1], strict)) {
        throw new Error("Invalid argument type");
      }
      if (!isNumber(a, strict)) {
        return false;
      }
      return toNumber(a) % toNumber(b[0]) === toNumber(b[1]);
    },
    $eq: function(a, b, strict) {
      if (!strict) {
        if (isNumber(a) && isNumber(b)) {
          a = toNumber(a);
          b = toNumber(b);
        } else if (isBoolean(a) && isBoolean(b)) {
          a = toBoolean(a);
          b = toBoolean(b);
        }
      }
      if (getType(a) !== getType(b)) {
        return false;
      } else if (isArray(b, true)) {
        if (a.length !== b.length) {
          return false;
        }
        for (var i = 0; i < b.length; i++) {
          if (!matchQuery(a[i], b[i], "$eq", strict)) {
            return false;
          }
        }
        return true;
      } else {
        return a === b;
      }
    },
    $ne: function(a, b, strict) {
      if (!strict) {
        if (isNumber(a) && isNumber(b)) {
          a = toNumber(a);
          b = toNumber(b);
        } else if (isBoolean(a) && isBoolean(b)) {
          a = toBoolean(a);
          b = toBoolean(b);
        }
      }
      if (getType(a) !== getType(b)) {
        return true;
      } else if (isArray(b, true)) {
        if (a.length !== b.length) {
          return true;
        }
        for (var i = 0; i < b.length; i++) {
          if (!matchQuery(a[i], b[i], "$eq", strict)) {
            return true;
          }
        }
        return false;
      } else {
        return a !== b;
      }
    },
    $exists: function(a, b, strict) {
      if (!isBoolean(b, strict)) {
        throw new Error("Invalid argument type");
      }
      return (a !== undefined && a !== null) === toBoolean(b);
    },
    $regexp: function(a, b, strict) {
      if (!isRegExp(b, strict)) {
        throw new Error("Invalid argument type");
      }
      return toRegExp(b).test(a);
    },
    $size: function(a, b, strict) {
      if (!isNumber(b, strict)) {
        throw new Error("Invalid argument type");
      }
      if (!isArray(a, true)) {
        return false;
      }
      return a.length === toNumber(b);
    },
    $func: function(a, b, strict) {
      if (!isFunction(b, strict)) {
        throw new Error("Invalid argument type");
      }
      return b(a, strict);
    },
  }
  var matchQuery = function(a, b, key, strict) {
    var parts, part;

    if (isString(key, true)) {
      parts = key.split("\."); // dot notation
    } else if (isArray(key, true)) {
      parts = key;
    } else {
      throw new Error("Invalid argument type");
    }

    part = parts.shift(); // operator
    if (parts.length > 0) {
      if (isObject(a, true)) {
        return matchQuery(a[part], b, parts, strict);
      } else {
        return matchQuery(undefined, b, parts, strict);
      }
    }
    switch (part) {
      case "$and":
        return MATCHERS.$and(a, b, strict);
      case "$or":
        return MATCHERS.$or(a, b, strict);
      case "$nor":
        return MATCHERS.$nor(a, b, strict);
      case "$not":
        return MATCHERS.$not(a, b, strict);
      case "$eq":
        return MATCHERS.$eq(a, b, strict); // equal
      case "$ne":
        return MATCHERS.$ne(a, b, strict); // not equal
      case "$in":
        return MATCHERS.$in(a, b, strict); // include
      case "$nin":
        return MATCHERS.$nin(a, b, strict); // exclude
      case "$gt":
        return MATCHERS.$gt(a, b, strict); // greater than
      case "$gte":
        return MATCHERS.$gte(a, b, strict); // greater than or equal
      case "$lt":
        return MATCHERS.$lt(a, b, strict); // less than or equal
      case "$lte":
        return MATCHERS.$lte(a, b, strict); // less than or equal
      case "$mod":
        return MATCHERS.$mod(a, b, strict); // modulo
      case "$exists":
        return MATCHERS.$exists(a, b, strict); // not null or undefined
      case "$regexp":
        return MATCHERS.$regexp(a, b, strict); // RegExp.test()
      case "$size":
        return MATCHERS.$size(a, b, strict); // Array.length
      case "$func":
        return MATCHERS.$func(a, b, strict); // b(a)
      default:
        if (!isObject(a, true)) {
          return false;
        } else if (isObject(b, true)) {
          return execQuery(a[part], b, strict);
        } else {
          return matchQuery(a[part], b, "$eq", strict);
        }
    }
  }

  var execQuery = function(a, b, strict) {
    if (!isObject(b, strict)) {
      throw new Error("Invalid argument type");
    }
    if (!isUndefined(strict, true) && !isBoolean(strict, true)) {
      throw new Error("Invalid argument type");
    }
    var arr = Object.entries(toObject(b)), i, key, value;
    for (i = 0; i < arr.length; i++) {
      key = arr[i][0];
      value = arr[i][1];
      if (!matchQuery(a, value, key, strict)) {
        return false;
      }
    }
    return true;
  }

  return {
    /**
     * 
     * @param {object} a data
     * @param {object|string} b object or jsonString
     * @param {boolean|undefined} strict 
     * @returns 
     */
    match: function(a, b, strict) {
      if (!isObject(a, true)) {
        throw new Error("Invalid argument type");
      }
      return execQuery(a, b, strict);
    }
  }
});