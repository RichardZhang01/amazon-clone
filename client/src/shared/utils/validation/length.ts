import { LengthOptions } from "./models/options/length";
import { ValidatorFn } from "./models/ValidatorFn";

const _validateLength: ValidatorFn = (
  text: string,
  options?: LengthOptions
): boolean => {
  const textLength = text.trim().length;

  if (options?.min && textLength < options.min) return false;
  if (options?.max && textLength > options.max) return false;

  return true;
};

export const validateNameLength: ValidatorFn = (name: string): boolean => {
  return _validateLength(name, { min: 2 });
}

export const validatePasswordLength: ValidatorFn = (password: string): boolean => {
  return _validateLength(password, { min: 6 });
}