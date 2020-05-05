/* eslint-disable import/prefer-default-export */

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

/**
 * The map() method creates a new array populated with the results
 * of calling a provided function on every element in the calling array.
 * @param {function} callback
 */
export const map = function (callback) {
    let index = -1;
    const length = this == null ? 0 : this.length;
    const result = new Array(length);

    while (++index < length) {
        result[index] = callback(this[index], index, this);
    }
    return result;
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

/**
 *
 * The filter() method creates a new array with all elements that
 * pass the test implemented by the provided function.} this
 * @param {function} callback
 */

export const filter = function (callback) {
    let index = -1;
    let resultIndex = 0;
    const length = this == null ? 0 : this.length;
    const result = [];

    while (++index < length) {
        const value = this[index];
        if (callback(value, index, this)) {
            result[resultIndex++] = value;
        }
    }
    return result;
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

/**
 * The forEach() method executes a provided function once for each array element.
 * @param {function} callback
 */
export const forEach = function (callback) {
    let index = -1;
    const length = this == null ? 0 : this.length;

    while (++index < length) {
        callback(this[index], index, this);
    }
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

/**
 * The reduce() method executes a reducer function (that you provide)
 * on each element of the array, resulting in a single output value.
 * @param {function} callback
 * @param {*} initialValue
 */
export const reduce = function (callback, initialValue) {
    let index = -1;
    const length = this == null ? 0 : this.length;
    let accumulator = null;

    if (arguments.length > 1) {
        accumulator = initialValue;
    } else {
        accumulator = this[++index];
    }

    while (++index < length) {
        accumulator = callback(accumulator, this[index], index, this);
    }
    return accumulator;
};
