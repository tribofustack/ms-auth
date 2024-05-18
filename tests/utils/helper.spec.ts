import { isValidCPF } from '../../src/utils/helper';

describe('isValidCPF', () => {
  it('should return false for invalid CPF with incorrect length', () => {
    expect(isValidCPF('1234567890')).toBe(false);
    expect(isValidCPF('123456789012')).toBe(false);
  });

  it('should return false for invalid CPF with non-numeric characters', () => {
    expect(isValidCPF('1234567890a')).toBe(false);
  });

  it('should return false for CPF with all identical digits', () => {
    expect(isValidCPF('11111111111')).toBe(false);
  });

  it('should return false for CPF with invalid check digits', () => {
    expect(isValidCPF('123')).toBe(false);
  });

  it('should return true for valid CPF', () => {
    expect(isValidCPF('41115491873')).toBe(true);
  });

  it('should return true for another valid CPF', () => {
    expect(isValidCPF('52998224725')).toBe(true);
  });
});
