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
    var getType=function(e){return Object.prototype.toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase()},isBoolean=function(e){switch(getType(e)){case"boolean":return!0;case"number":return 0===e||1===e;case"string":return"0"===e||"1"===e||"false"===e||"true"===e;default:return!1}},toBoolean=function(e){switch(getType(e)){case"boolean":return e;case"number":return 1===e;case"string":return"1"===e||"true"===e;default:throw Error("Invalid argument type")}},isNumber=function(e){switch(getType(e)){case"boolean":return!0;case"number":return!Number.isNaN(e)&&Number.isFinite(e);case"string":return!Number.isNaN(parseFloat(e))&&Number.isFinite(parseFloat(e));case"date":return!Number.isNaN(e.valueOf());default:return!1}},toNumber=function(e){switch(getType(e)){case"boolean":return e?1:0;case"number":return e;case"string":return parseFloat(e);case"date":return e.valueOf();default:throw Error("Invalid argument type")}},isString=function(e){switch(getType(e)){case"boolean":case"string":case"regexp":return!0;case"number":return!Number.isNaN(e)&&Number.isFinite(e);case"date":return!Number.isNaN(e.valueOf());default:return!1}},toString=function(e){switch(getType(e)){case"boolean":return e?"true":"false";case"number":return e.toString(10);case"string":return e;case"regexp":return e.toString();case"date":return e.toISOString();default:throw Error("Invalid argument type")}},isObject=function(e){switch(getType(e)){case"string":return function(e){try{return"object"===getType(JSON.parse(e))}catch(t){return!1}}(e);case"object":return!0;default:return!1}},toObject=function(e){switch(getType(e)){case"string":return JSON.parse(e);case"object":return e;default:throw Error("Invalid argument type")}},isArray=function(e){switch(getType(e)){case"string":return function(e){try{return"array"===getType(JSON.parse(e))}catch(t){return!1}}(e);case"array":return!0;default:return!1}},toArray=function(e){switch(getType(e)){case"string":return JSON.parse(e);case"array":return e;default:throw Error("Invalid argument type")}},isFunction=function(e){return"function"===getType(e)},toFunction=function(e){if("function"===getType(e))return e;throw Error("Invalid argument type")},isNull=function(e){switch(getType(e)){case"string":return"null"===e;case"null":return!0;default:return!1}},toNull=function(e){switch(getType(e)){case"string":return null;case"null":return e;default:throw Error("Invalid argument type")}},isUndefined=function(e){switch(getType(e)){case"string":return"undefined"===e;case"undefined":return!0;default:return!1}},toUndefined=function(e){switch(getType(e)){case"string":return;case"undefined":return e;default:throw Error("Invalid argument type")}},isDate=function(e){switch(getType(e)){case"number":case"string":return!Number.isNaN(new Date(e).valueOf());case"date":return!Number.isNaN(e.valueOf());default:return!1}},toDate=function(e){switch(getType(e)){case"number":case"string":return new Date(e);case"date":return e;default:throw Error("Invalid argument type")}},isRegExp=function(e){switch(getType(e)){case"string":return function(e){if(!/^\/.*\/[dgimsuy]{0,7}$/.test(e))return!1;e=e.split("/").pop();var t,r={};for(t of e.split("")){if(r[t])return!1;r[t]=!0}return!0}(e);case"regexp":return!0;default:return!1}},toRegExp=function(e){switch(getType(e)){case"string":var t,r;return r=(t=e).split("/").pop(),RegExp(t.replace(/^\/|\/[dgimsuy]{0,7}$/g,""),r);case"regexp":return e;default:throw Error("Invalid argument type")}};

    var isBooleanStrict = function(a) {
        return getType(a) === "boolean";
    }
    var isNumberStrict = function(a) {
        return getType(a) === "number";
    }
    var isStringStrict = function(a) {
        return getType(a) === "string";
    }
    var isRegExpStrict = function(a) {
        return getType(a) === "regexp";
    }
    var isObjectStrict = function(a) {
        return getType(a) === "object";
    }
    var isArrayStrict = function(a) {
        return getType(a) === "array";
    }
    var isNullStrict = function(a) {
        return getType(a) === "null";
    }
    var isUndefinedStrict = function(a) {
        return getType(a) === "undefined";
    }
    var isItemOfArray = function(a) {
        return isBooleanStrict(a) || isNumberStrict(a) || isStringStrict(a) || isNullStrict(a) || isUndefinedStrict(a);
    }
    
    // query validators
    var VALIDATORS = {
        $and: function(a, b, isStrict) {
            if (!isArrayStrict(b)) {
                return false;
            }
            var i;
            for (i = 0; i < b.length; i++) {
                if (!isObjectStrict(b[i])) {
                    return false;
                }
            }
            return true;
        },
        $or: function(a, b, isStrict) {
            if (!isArrayStrict(b)) {
                return false;
            }
            var i;
            for (i = 0; i < b.length; i++) {
                if (!isObjectStrict(b[i])) {
                    return false;
                }
            }
            return true;
        },
        $nor: function(a, b, isStrict) {
            if (!isArrayStrict(b)) {
                return false;
            }
            var i;
            for (i = 0; i < b.length; i++) {
                if (!isObjectStrict(b[i])) {
                    return false;
                }
            }
            return true;
        },
        $not: function(a, b, isStrict) {
            return isObjectStrict(b);
        },
        $in: function (a, b, isStrict) {
            if (!isArrayStrict(b)) {
                return false;
            }
            var i;
            for (i = 0; i < b.length; i++) {
                if (!isItemOfArray(b[i])) {
                    return false;
                }
            }
            return true;
        },
        $nin: function(a, b, isStrict) {
            if (!isArrayStrict(b)) {
                return false;
            }
            var i;
            for (i = 0; i < b.length; i++) {
                if (!isItemOfArray(b[i])) {
                    return false;
                }
            }
            return true;
        },
        $gt: function(a, b, isStrict) {
            if (isStrict) {
                if (!isNumberStrict(b)) {
                    return false;
                }
            } else {
                if (!isNumber(b)) {
                    return false;
                }
            }
            return true;
        },
        $gte: function(a, b, isStrict) {
            if (isStrict) {
                if (!isNumberStrict(b)) {
                    return false;
                }
            } else {
                if (!isNumber(b)) {
                    return false;
                }
            }
            return true;
        },
        $lt: function(a, b, isStrict) {
            if (isStrict) {
                if (!isNumberStrict(b)) {
                    return false;
                }
            } else {
                if (!isNumber(b)) {
                    return false;
                }
            }
            return true;
        },
        $lte: function(a, b, isStrict) {
            if (isStrict) {
                if (!isNumberStrict(b)) {
                    return false;
                }
            } else {
                if (!isNumber(b)) {
                    return false;
                }
            }
            return true;
        },
        $mod: function(a, b, isStrict) {
            if (!isArrayStrict(b) || b.length !== 2) {
                return false;
            }
            if (isStrict) {
                if (!isNumberStrict(b[0])) {
                    return false;
                }
                if (!isNumberStrict(b[1])) {
                    return false;
                }
            } else {
                if (!isNumber(b[0])) {
                    return false;
                }
                if (!isNumber(b[1])) {
                    return false;
                }
            }
            return true;
        },
        $eq: function(a, b, isStrict) {
            return true;
        },
        $ne: function(a, b, isStrict) {
            return true;
        },
        $exists: function(a, b, isStrict) {
            if (isStrict) {
                if (!isBooleanStrict(b)) {
                    return false;
                }
            } else {
                if (!isBoolean(b)) {
                    return false;
                }
            }
            return true;
        },
        $regexp: function(a, b, isStrict) {
            if (isStrict) {
                if (!isRegExpStrict(b)) {
                    return false;
                }
            } else {
                if (!isRegExp(b)) {
                    return false;
                }
            }
            return true;
        },
        $size: function(a, b, isStrict) {
            if (isStrict) {
                if (!isNumberStrict(b)) {
                    return false;
                }
            } else {
                if (!isNumber(b)) {
                    return false;
                }
            }
            return true;
        },
    }
    // query operators
    var OPERATORS = {
        $and: function(a, b, isStrict) {
            var i;
            for (i = 0; i < b.length; i++) {
                if (!execQuery(a, b[i], isStrict)) {
                    return false;
                }
            }
            return true;
        },
        $or: function(a, b, isStrict) {
            var i;
            for (i = 0; i < b.length; i++) {
                if (execQuery(a, b[i], isStrict)) {
                    return true;
                }
            }
            return false;
        },
        $nor: function(a, b, isStrict) {
            var i;
            for (i = 0; i < b.length; i++) {
                if (execQuery(a, b[i], isStrict)) {
                    return false;
                }
            }
            return true;
        },
        $not: function(a, b, isStrict) {
            return !execQuery(a, b, isStrict);
        },
        $in: function (a, b, isStrict) {
            var i;
            for (i = 0; i < b.length; i++) {
                if (calcQuery(a, b[i], "$eq", isStrict)) {
                    return true;
                }
            }
            return false;
        },
        $nin: function(a, b, isStrict) {
            var i;
            for (i = 0; i < b.length; i++) {
                if (calcQuery(a, b[i], "$eq", isStrict)) {
                    return false;
                }
            }
            return true;
        },
        $gt: function(a, b, isStrict) {
            if (isStrict) {
                if (!isNumberStrict(a)) {
                    return false;
                }
            } else {
                if (!isNumber(a)) {
                    return false;
                }
            }
            return toNumber(a) > toNumber(b);
        },
        $gte: function(a, b, isStrict) {
            if (isStrict) {
                if (!isNumberStrict(a)) {
                    return false;
                }
            } else {
                if (!isNumber(a)) {
                    return false;
                }
            }
            return toNumber(a) >= toNumber(b);
        },
        $lt: function(a, b, isStrict) {
            if (isStrict) {
                if (!isNumberStrict(a)) {
                    return false;
                }
            } else {
                if (!isNumber(a)) {
                    return false;
                }
            }
            return toNumber(a) < toNumber(b);
        },
        $lte: function(a, b, isStrict) {
            if (isStrict) {
                if (!isNumberStrict(a)) {
                    return false;
                }
            } else {
                if (!isNumber(a)) {
                    return false;
                }
            }
            return toNumber(a) <= toNumber(b);
        },
        $mod: function(a, b, isStrict) {
            if (isStrict) {
                if (!isNumberStrict(a)) {
                    return false;
                }
            } else {
                if (!isNumber(a)) {
                    return false;
                }
            }
            return toNumber(a) % toNumber(b[0]) === toNumber(b[1]);
        },
        $eq: function(a, b, isStrict) {
            if (!isStrict) {
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
            } else if (isArrayStrict(b)) {
                if (a.length !== b.length) {
                    return false;
                }
                var i;
                for (i = 0; i < b.length; i++) {
                    if (!calcQuery(a[i], b[i], "$eq", isStrict)) {
                        return false;
                    }
                }
                return true;
            } else {
                return a === b;
            }
        },
        $ne: function(a, b, isStrict) {
            if (!isStrict) {
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
            } else if (isArrayStrict(b)) {
                if (a.length !== b.length) {
                    return true;
                }
                var i;
                for (i = 0; i < b.length; i++) {
                    if (!calcQuery(a[i], b[i], "$eq", isStrict)) {
                        return true;
                    }
                }
                return false;
            } else {
                return a !== b;
            }
        },
        $exists: function(a, b, isStrict) {
            return (a !== undefined && a !== null) && toBoolean(b);
        },
        $regexp: function(a, b, isStrict) {
            return toRegExp(b).test(a);
        },
        $size: function(a, b, isStrict) {
            if (!isArrayStrict(a)) {
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
     * @param {boolean} isStrict 
     * @returns 
     */
    var chkQuery = function(a, b, operator, isStrict) {
        switch (operator) {
            case "$and":
                return VALIDATORS.$and(a, b, isStrict);
            case "$or":
                return VALIDATORS.$or(a, b, isStrict);
            case "$nor":
                return VALIDATORS.$nor(a, b, isStrict);
            case "$not":
                return VALIDATORS.$not(a, b, isStrict);
            case "$eq":
                return VALIDATORS.$eq(a, b, isStrict);
            case "$ne":
                return VALIDATORS.$ne(a, b, isStrict);
            case "$in":
                return VALIDATORS.$in(a, b, isStrict);
            case "$nin":
                return VALIDATORS.$nin(a, b, isStrict);
            case "$gt":
                return VALIDATORS.$gt(a, b, isStrict);
            case "$gte":
                return VALIDATORS.$gte(a, b, isStrict);
            case "$lt":
                return VALIDATORS.$lt(a, b, isStrict);
            case "$lte":
                return VALIDATORS.$lte(a, b, isStrict);
            case "$mod":
                return VALIDATORS.$mod(a, b, isStrict);
            case "$exists":
                return VALIDATORS.$exists(a, b, isStrict);
            case "$regexp":
                return VALIDATORS.$regexp(a, b, isStrict);
            case "$size":
                return VALIDATORS.$size(a, b, isStrict);
            default:
                return true;
        }
    }
    /**
     * 
     * @param {any} a 
     * @param {any} b 
     * @param {string} operator 
     * @param {boolean} isStrict 
     * @returns 
     */
    var calcQuery = function(a, b, operator, isStrict) {
        switch (operator) {
            case "$and":
                return OPERATORS.$and(a, b, isStrict);
            case "$or":
                return OPERATORS.$or(a, b, isStrict);
            case "$nor":
                return OPERATORS.$nor(a, b, isStrict);
            case "$not":
                return OPERATORS.$not(a, b, isStrict);
            case "$eq":
                return OPERATORS.$eq(a, b, isStrict); // equal
            case "$ne":
                return OPERATORS.$ne(a, b, isStrict); // not equal
            case "$in":
                return OPERATORS.$in(a, b, isStrict); // include
            case "$nin":
                return OPERATORS.$nin(a, b, isStrict); // exclude
            case "$gt":
                return OPERATORS.$gt(a, b, isStrict); // greater than
            case "$gte":
                return OPERATORS.$gte(a, b, isStrict); // greater than or equal
            case "$lt":
                return OPERATORS.$lt(a, b, isStrict); // less than or equal
            case "$lte":
                return OPERATORS.$lte(a, b, isStrict); // less than or equal
            case "$mod":
                return OPERATORS.$mod(a, b, isStrict); // moduleo
            case "$exists":
                return OPERATORS.$exists(a, b, isStrict); // not null or undefined
            case "$regexp":
                return OPERATORS.$regexp(a, b, isStrict); // RegExp.test()
            case "$size":
                return OPERATORS.$size(a, b, isStrict); // Array.length
            default:
                if (!isObjectStrict(a)) {
                    return false;
                } else if (isObjectStrict(b)) {
                    return execQuery(a[operator], b, isStrict);
                } else {
                    return calcQuery(a[operator], b, "$eq", isStrict);
                }
        }
    }
    /**
     * 
     * @param {any} a 
     * @param {object|string} b object or string json
     * @param {boolean|undefined} isStrict 
     * @returns 
     */
    var execQuery = function(a, b, isStrict) {
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
            if (!chkQuery(a, value, key, isStrict)) {
                throw new Error("Invalid argument type");
            }
            if (!calcQuery(a, value, key, isStrict)) {
                return false;
            }
        }
        return true;
    }

    return {
        exec: execQuery
    }
});