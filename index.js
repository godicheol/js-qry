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
      str = str.split("\/").pop();
      var seen = {},
        item;
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
  var isItem = function(a) {
    return isBoolean(a, true) || isNumber(a, true) || isString(a, true) || isNull(a, true) || isUndefined(a, true);
  }
  // query validators
  var VALIDATORS = {
    $and: function(a, b, strict) {
      if (!isArray(b, true)) {
        return false;
      }
      var i;
      for (i = 0; i < b.length; i++) {
        if (!isObject(b[i], true)) {
          return false;
        }
      }
      return true;
    },
    $or: function(a, b, strict) {
      if (!isArray(b, true)) {
        return false;
      }
      var i;
      for (i = 0; i < b.length; i++) {
        if (!isObject(b[i], true)) {
          return false;
        }
      }
      return true;
    },
    $nor: function(a, b, strict) {
      if (!isArray(b, true)) {
        return false;
      }
      var i;
      for (i = 0; i < b.length; i++) {
        if (!isObject(b[i], true)) {
          return false;
        }
      }
      return true;
    },
    $not: function(a, b, strict) {
      return isObject(b, true);
    },
    $in: function(a, b, strict) {
      if (!isArray(b, true)) {
        return false;
      }
      var i;
      for (i = 0; i < b.length; i++) {
        if (!isItem(b[i], true)) {
          return false;
        }
      }
      return true;
    },
    $nin: function(a, b, strict) {
      if (!isArray(b, true)) {
        return false;
      }
      var i;
      for (i = 0; i < b.length; i++) {
        if (!isItem(b[i], true)) {
          return false;
        }
      }
      return true;
    },
    $gt: function(a, b, strict) {
      if (!isNumber(b, strict)) {
        return false;
      }
      return true;
    },
    $gte: function(a, b, strict) {
      if (!isNumber(b, strict)) {
        return false;
      }
      return true;
    },
    $lt: function(a, b, strict) {
      if (!isNumber(b, strict)) {
        return false;
      }
      return true;
    },
    $lte: function(a, b, strict) {
      if (!isNumber(b, strict)) {
        return false;
      }
      return true;
    },
    $mod: function(a, b, strict) {
      if (!isArray(b, true) || b.length !== 2) {
        return false;
      }
      if (!isNumber(b[0], strict)) {
        return false;
      }
      if (!isNumber(b[1], strict)) {
        return false;
      }
      return true;
    },
    $eq: function(a, b, strict) {
      return true;
    },
    $ne: function(a, b, strict) {
      return true;
    },
    $exists: function(a, b, strict) {
      if (!isBoolean(b, strict)) {
        return false;
      }
      return true;
    },
    $regexp: function(a, b, strict) {
      if (!isRegExp(b, strict)) {
        return false;
      }
      return true;
    },
    $size: function(a, b, strict) {
      if (!isNumber(b, strict)) {
        return false;
      }
      return true;
    },
  }
  // query operators
  var OPERATORS = {
    $and: function(a, b, strict) {
      var i;
      for (i = 0; i < b.length; i++) {
        if (!execQuery(a, b[i], strict)) {
          return false;
        }
      }
      return true;
    },
    $or: function(a, b, strict) {
      var i;
      for (i = 0; i < b.length; i++) {
        if (execQuery(a, b[i], strict)) {
          return true;
        }
      }
      return false;
    },
    $nor: function(a, b, strict) {
      var i;
      for (i = 0; i < b.length; i++) {
        if (execQuery(a, b[i], strict)) {
          return false;
        }
      }
      return true;
    },
    $not: function(a, b, strict) {
      return !execQuery(a, b, strict);
    },
    $in: function(a, b, strict) {
      var i;
      for (i = 0; i < b.length; i++) {
        if (calcQuery(a, b[i], "$eq", strict)) {
          return true;
        }
      }
      return false;
    },
    $nin: function(a, b, strict) {
      var i;
      for (i = 0; i < b.length; i++) {
        if (calcQuery(a, b[i], "$eq", strict)) {
          return false;
        }
      }
      return true;
    },
    $gt: function(a, b, strict) {
      if (!isNumber(a, strict)) {
        return false;
      }
      return toNumber(a) > toNumber(b);
    },
    $gte: function(a, b, strict) {
      if (!isNumber(a, strict)) {
        return false;
      }
      return toNumber(a) >= toNumber(b);
    },
    $lt: function(a, b, strict) {
      if (!isNumber(a, strict)) {
        return false;
      }
      return toNumber(a) < toNumber(b);
    },
    $lte: function(a, b, strict) {
      if (!isNumber(a, strict)) {
        return false;
      }
      return toNumber(a) <= toNumber(b);
    },
    $mod: function(a, b, strict) {
      if (!isNumber(a, strict)) {
        return false;
      }
      return toNumber(a) % toNumber(b[0]) === toNumber(b[1]);
    },
    $eq: function(a, b, strict) {
      if (!strict) {
        if (isNumber(a) && isNumber(b)) {
          // number string to number
          // boolean to 0, 1
          a = toNumber(a);
          b = toNumber(b);
        } else if (isBoolean(a) && isBoolean(b)) {
          // "true", "false" to boolean
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
        var i;
        for (i = 0; i < b.length; i++) {
          if (!calcQuery(a[i], b[i], "$eq", strict)) {
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
        var i;
        for (i = 0; i < b.length; i++) {
          if (!calcQuery(a[i], b[i], "$eq", strict)) {
            return true;
          }
        }
        return false;
      } else {
        return a !== b;
      }
    },
    $exists: function(a, b, strict) {
      return (a !== undefined && a !== null) && toBoolean(b);
    },
    $regexp: function(a, b, strict) {
      return toRegExp(b).test(a);
    },
    $size: function(a, b, strict) {
      if (!isArray(a, true)) {
        return false;
      }
      return a.length === toNumber(b);
    },
  }
  /**
   * 
   * @param {any} a 
   * @param {any} b 
   * @param {string} operator 
   * @param {boolean} strict 
   * @returns 
   */
  var chkQuery = function(a, b, operator, strict) {
    switch (operator) {
      case "$and":
        return VALIDATORS.$and(a, b, strict);
      case "$or":
        return VALIDATORS.$or(a, b, strict);
      case "$nor":
        return VALIDATORS.$nor(a, b, strict);
      case "$not":
        return VALIDATORS.$not(a, b, strict);
      case "$eq":
        return VALIDATORS.$eq(a, b, strict);
      case "$ne":
        return VALIDATORS.$ne(a, b, strict);
      case "$in":
        return VALIDATORS.$in(a, b, strict);
      case "$nin":
        return VALIDATORS.$nin(a, b, strict);
      case "$gt":
        return VALIDATORS.$gt(a, b, strict);
      case "$gte":
        return VALIDATORS.$gte(a, b, strict);
      case "$lt":
        return VALIDATORS.$lt(a, b, strict);
      case "$lte":
        return VALIDATORS.$lte(a, b, strict);
      case "$mod":
        return VALIDATORS.$mod(a, b, strict);
      case "$exists":
        return VALIDATORS.$exists(a, b, strict);
      case "$regexp":
        return VALIDATORS.$regexp(a, b, strict);
      case "$size":
        return VALIDATORS.$size(a, b, strict);
      default:
        return true;
    }
  }
  /**
   * 
   * @param {any} a 
   * @param {any} b 
   * @param {string} operator 
   * @param {boolean} strict 
   * @returns 
   */
  var calcQuery = function(a, b, operator, strict) {
    switch (operator) {
      case "$and":
        return OPERATORS.$and(a, b, strict);
      case "$or":
        return OPERATORS.$or(a, b, strict);
      case "$nor":
        return OPERATORS.$nor(a, b, strict);
      case "$not":
        return OPERATORS.$not(a, b, strict);
      case "$eq":
        return OPERATORS.$eq(a, b, strict); // equal
      case "$ne":
        return OPERATORS.$ne(a, b, strict); // not equal
      case "$in":
        return OPERATORS.$in(a, b, strict); // include
      case "$nin":
        return OPERATORS.$nin(a, b, strict); // exclude
      case "$gt":
        return OPERATORS.$gt(a, b, strict); // greater than
      case "$gte":
        return OPERATORS.$gte(a, b, strict); // greater than or equal
      case "$lt":
        return OPERATORS.$lt(a, b, strict); // less than or equal
      case "$lte":
        return OPERATORS.$lte(a, b, strict); // less than or equal
      case "$mod":
        return OPERATORS.$mod(a, b, strict); // modulo
      case "$exists":
        return OPERATORS.$exists(a, b, strict); // not null or undefined
      case "$regexp":
        return OPERATORS.$regexp(a, b, strict); // RegExp.test()
      case "$size":
        return OPERATORS.$size(a, b, strict); // Array.length
      default:
        if (!isObject(a, true)) {
          return false;
        } else if (isObject(b, true)) {
          return execQuery(a[operator], b, strict);
        } else {
          return calcQuery(a[operator], b, "$eq", strict);
        }
    }
  }
  /**
   * 
   * @param {any} a 
   * @param {object|string} b object or string json
   * @param {boolean|undefined} strict 
   * @returns 
   */
  var execQuery = function(a, b, strict) {
    if (!isObject(b)) {
      return false;
    }
    var arr = Object.entries(toObject(b)),
      i,
      key,
      value;
    for (i = 0; i < arr.length; i++) {
      key = arr[i][0];
      value = arr[i][1];
      if (!chkQuery(a, value, key, strict)) {
        throw new Error("Invalid argument type");
      }
      if (!calcQuery(a, value, key, strict)) {
        return false;
      }
    }
    return true;
  }

  return {
    exec: execQuery
  }
});