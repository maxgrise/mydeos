import { isGreaterThan } from '../src/VersionComparator';

describe('The VersionComparator', () => {
  describe('isGreaterThan', () => {
    it('should handle a basic usecase', () => {
      expect(isGreaterThan("1.3", "1.2")).toBeTruthy();
      expect(isGreaterThan("1.2", "1.3")).toBeFalsy();
    });

    it('should not accept non standard formats', () => {
      expect(() => isGreaterThan("1.3.2", "1.2")).toThrow();
      expect(() => isGreaterThan("1.3", "1")).toThrow();
    });

    it('should handle very large numbers', () => {
      expect(isGreaterThan("151351351351351351315.34565351432351423315423", "1.2")).toBeTruthy();
      expect(isGreaterThan("1.2", "98983928923839832.982399382389232398239")).toBeFalsy();
    });

    it('should throw on an non numeric character in the string', () => {
      expect(() => isGreaterThan("1..3", "1.2")).toThrow();
      expect(() => isGreaterThan("1+.3", "1.2")).toThrow();
      expect(() => isGreaterThan("1//.3", "1.2")).toThrow();
      expect(() => isGreaterThan("1*..3", "1.2")).toThrow();
      expect(() => isGreaterThan("+1..3", "1.2")).toThrow();
      expect(() => isGreaterThan("6.3a", "1.2")).toThrow();
      expect(() => isGreaterThan("v9", "1.2")).toThrow();
      expect(() => isGreaterThan("9", "v1.2")).toThrow();
    });

    it('should not apply a string ordering', () => {
      expect(isGreaterThan("1.3", "1.12")).toBeFalsy();
    });

    it('should not ignore trailing zeros', () => {
      expect(isGreaterThan("1.300", "1.12")).toBeTruthy();
      expect(isGreaterThan("1.12", "1.120")).toBeFalsy();
    });
  });
});
