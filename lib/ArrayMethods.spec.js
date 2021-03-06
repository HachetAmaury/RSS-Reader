/* eslint-disable no-extend-native */
import { map, filter, forEach, reduce } from './ArrayMethods';

function toBinary(number) {
    return number.toString(2);
}

function isWordLongEnough(word) {
    return word.length > 6;
}

function logEachElementWithIndex(element, index) {
    return console.log(`array[${index}]=${element}`);
}

function reducer(accumulator, currentValue) {
    return accumulator + currentValue;
}

// Override Array method with customs one from lib
Array.prototype.map = map;
Array.prototype.filter = filter;
Array.prototype.forEach = forEach;
Array.prototype.reduce = reduce;

describe('ArrayMethods : map', () => {
    it('should return []', () => {
        expect([].map(toBinary)).toEqual([]);
    });
    it('should return [1]', () => {
        expect([1].map(toBinary)).toEqual(['1']);
    });
    it('should return [1,10,255]', () => {
        expect([1, 2, 255].map(toBinary)).toEqual(['1', '10', '11111111']);
    });
});

describe('ArrayMethods : filter', () => {
    it('should return []', () => {
        expect([].filter(isWordLongEnough)).toEqual([]);
    });
    it('should return []', () => {
        expect(['elite'].filter(isWordLongEnough)).toEqual([]);
    });
    it('should return ["explosion"]', () => {
        expect(['explosion'].filter(isWordLongEnough)).toEqual(['explosion']);
    });
});

describe('ArrayMethods : forEach', () => {
    it('should display nothing', () => {
        [].forEach(logEachElementWithIndex);
    });
    it('should display array[0]=3', () => {
        ['3'].forEach(logEachElementWithIndex);
    });
});

describe('ArrayMethods : reduce', () => {
    it('should return 3', () => {
        expect([].reduce(reducer, 3)).toEqual(3);
    });

    it('should return 3', () => {
        expect([3].reduce(reducer)).toEqual(3);
    });

    it('should return 10', () => {
        expect([1, 2, 3, 4].reduce(reducer)).toEqual(10);
    });
});
