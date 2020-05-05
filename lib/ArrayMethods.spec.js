/* eslint-disable no-extend-native */
import { map, filter } from './ArrayMethods';

function toBinary(number) {
    return number.toString(2);
}

function isWordLongEnough(word) {
    return word.length > 6;
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
