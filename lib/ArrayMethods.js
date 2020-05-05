/* eslint-disable import/prefer-default-export */

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

/**
 * The map() method creates a new array populated with the results
 * of calling a provided function on every element in the calling array.
 * @param {function} callback
 */
export const map = function (callback) {
    let index = 0;
    const length = this == null ? 0 : this.length;
    const result = new Array(length);

    while (index < length) {
        result[index] = callback(this[index], index, this);
        index++;
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
    let index = 0;
    let resultIndex = 0;
    const length = this == null ? 0 : this.length;
    const result = [];

    while (index < length) {
        const value = this[index];
        if (callback(value, index, this)) {
            result[resultIndex] = value;
        }
        index++;
        resultIndex++;
    }
    return result;
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

/**
 * The forEach() method executes a provided function once for each array element.
 * @param {function} callback
 */
export const forEach = function (callback) {
    let index = 0;
    const length = this == null ? 0 : this.length;

    while (index < length) {
        callback(this[index], index, this);
        index++;
    }
};
