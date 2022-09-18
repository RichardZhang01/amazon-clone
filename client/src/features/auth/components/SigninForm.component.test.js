import { reducer, screen } from "../../../shared/utils/test-utils";

import SigninFormComponent from "./SigninForm.component";

describe("Sign-in Form", () => {
  let signInButton = null;

  beforeEach(() => {
    reducer(<SigninFormComponent />);
    signInButton = screen.getByRole("button", { name: /continue/i });
  });

  test("The sign-in button should be in the document", () => {
    expect(signInButton).toBeInTheDocument();
  });

  test("The sign-in button should initially be disabled", () => {
    expect(signInButton).toBeDisabled();
  });
});
