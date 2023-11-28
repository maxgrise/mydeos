import { isOverlapping } from '../src/OverlapChecker';

describe('The OverlapChecker', () => {
  describe('isGreaterThan', () => {
    it('should consider partial overlap as overlap', () => {
      expect(isOverlapping({ start: 1, finish: 4 }, { start: 3, finish: 5 })).toBeTruthy();
    });

    it('should consider equal bounds as overlap', () => {
      expect(isOverlapping({ start: 1, finish: 4 }, { start: 4, finish: 5 })).toBeTruthy();
    });

    it('should consider complete overlap as overlap', () => {
      expect(isOverlapping({ start: 1, finish: 8 }, { start: 4, finish: 5 })).toBeTruthy();
    });

    it('should handle a second line after the first with no overlap', () => {
      expect(isOverlapping({ start: 1, finish: 8 }, { start: 9, finish: 10 })).toBeFalsy();
    });


    it('should handle a second line before the first with no overlap', () => {
      expect(isOverlapping({ start: 3, finish: 8 }, { start: 1, finish: 2 })).toBeFalsy();
    });


    it('should handle a reversed second line', () => {
      expect(isOverlapping({ start: 1, finish: 8 }, { start: 9, finish: 5 })).toBeTruthy();
    });

    it('should handle a reversed first line', () => {
      expect(isOverlapping({ start: 9, finish: 3 }, { start: 1, finish: 4 })).toBeTruthy();
    });

    it('should handle a negative bound first line', () => {
      expect(isOverlapping({ start: -5, finish: 3 }, { start: 1, finish: 4 })).toBeTruthy();
    });

    it('should handle a negative bound reversed line', () => {
      expect(isOverlapping({ start: -5, finish: 3 }, { start: 5, finish: -4 })).toBeTruthy();
    });

    it('should handle a negative bound exclusion without reverse', () => {
      expect(isOverlapping({ start: -5, finish: 3 }, { start: -7, finish: -6 })).toBeFalsy();
    });

    it('should handle a negative bound exclusion with reverse', () => {
      expect(isOverlapping({ start: -5, finish: 3 }, { start: -7, finish: -10 })).toBeFalsy();
    });

    it('should handle very large numbers', () => {
      expect(isOverlapping({ start: 0, finish: 64684351351684351 }, { start: 1, finish: 98999999999999999999 })).toBeTruthy();
      expect(isOverlapping({ start: 132213123213213, finish: 13221312321321333213123213 }, { start: 1, finish: 2 })).toBeFalsy();
    });

    it('should handle very small numbers', () => {
      expect(isOverlapping({ start: 0.0000000000000001, finish: 0.00000000000000012 }, { start: 0.00000000000000011, finish: 0.0000000000000005 })).toBeTruthy();
      expect(isOverlapping({ start: 0.00000000000000001, finish: 0.000000000000000012 }, { start: 0.000000000000000013, finish: 2 })).toBeFalsy();
    });

    it('should not modify original object by sideffect', () => {
      let first = { start: 1, finish: 4 };
      let firstCopy = { ...first };
      let second = { start: 3, finish: 5 };
      let secondCopy = { ...second };

      expect(isOverlapping(first, second)).toBeTruthy();
      expect(first.start).toStrictEqual(firstCopy.start)
      expect(first.finish).toStrictEqual(firstCopy.finish)
      expect(second.start).toStrictEqual(secondCopy.start)
      expect(second.finish).toStrictEqual(secondCopy.finish)
    });
  });
});
