import React from "react";
import AuthLayout from "../features/auth/components/Auth.layout";
import SignupFormComponent from "../features/auth/components/SignupForm.component";

const SignupPage = () => {
  return (
    <AuthLayout>
      <SignupFormComponent />
    </AuthLayout>
  );
};

export default SignupPage;
