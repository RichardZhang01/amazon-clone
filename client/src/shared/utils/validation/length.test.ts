import { validateNameLength, validatePasswordLength } from "./length";

describe("Field length validation", () => {
  describe("Name field", () => {
    let name = "";

    test("a name should fail length validation if it is not set", () => {
      expect(validateNameLength(name)).toEqual(false);
    });

    test("a name should fail length validation if it is less than 2 characters", () => {
      name = "a"
      expect(validateNameLength(name)).toEqual(false);
    });

    test("a name should pass length validation if it is 2 characters", () => {
      name = "Al"
      expect(validateNameLength(name)).toEqual(true);
    });

    test("a name should pass length validation if it is more than 2 characters", () => {
      name = "Albert"
      expect(validateNameLength(name)).toEqual(true);

      name = "Albert L"
      expect(validateNameLength(name)).toEqual(true);
    });
  });

  describe("Password field", () => {
    let password = "";

    test("a password should fail length validation if it is not set", () => {
      expect(validatePasswordLength(password)).toEqual(false);
    });

    test("a password should fail length validation if it is less than 6 characters", () => {
      password = "pass"
      expect(validatePasswordLength(password)).toEqual(false);
    });

    test("a password should pass length validation if it is 6 characters", () => {
      password = "123456"
      expect(validatePasswordLength(password)).toEqual(true);
    });

    test("a password should pass length validation if it is more than 6 characters", () => {
      password = "password"
      expect(validatePasswordLength(password)).toEqual(true);
    });
  });
});
