/* eslint-disable no-extend-native */
import { map, filter, forEach } from './ArrayMethods';

function toBinary(number) {
    return number.toString(2);
}

function isWordLongEnough(word) {
    return word.length > 6;
}

function logEachElementWithIndex(element, index) {
    return console.log(`array[${index}]=${element}`);
}

describe('ArrayMethods : map', () => {
    beforeAll(() => {
        Array.prototype.map = map;
    });
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
    beforeAll(() => {
        Array.prototype.filter = filter;
    });
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
    beforeAll(() => {
        Array.prototype.forEach = forEach;
    });
    it('should dispaly nothing', () => {
        [].forEach(logEachElementWithIndex);
    });
    it('should display array[0]=3', () => {
        ['3'].forEach(logEachElementWithIndex);
    });
});
