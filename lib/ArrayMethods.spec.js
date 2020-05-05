import { map } from './ArrayMethods';

function toBinary(number) {
    return number.toString(2);
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
