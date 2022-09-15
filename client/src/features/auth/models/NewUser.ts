import { SignupFormField } from "./signupFormField.interface";

export type NewUser = Omit<SignupFormField, "confirmPassword">;
