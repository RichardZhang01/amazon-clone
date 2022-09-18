import { validateEmail } from "./email";

describe("Email validation", () => {
  let email = "";

  test("an empty email input should not be valid", () => {
    expect(validateEmail(email)).toEqual(false);
  });

  test("email input should have an @ symbol", () => {
    email = "test@email.com"
    expect(email.includes("@")).toEqual(true);
  });

  test("email input should have a . symbol", () => {
    expect(email.includes(".")).toEqual(true);
  });

  test("a valid email should pass validation", () => {
    expect(validateEmail(email)).toEqual(true);
  });

  test("an invalid email should not pass validation", () => {
    email = "test@email"
    expect(validateEmail(email)).toEqual(false);

    email = "testemail.com"
    expect(validateEmail(email)).toEqual(false);
    
    email = "test.com"
    expect(validateEmail(email)).toEqual(false);
  });
});
