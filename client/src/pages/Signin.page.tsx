import React from "react";
import AuthLayout from "../features/auth/components/Auth.layout";
import SigninFormComponent from "../features/auth/components/SigninForm.component";

const SigninPage = () => {
  return (
    <AuthLayout>
      <SigninFormComponent />
    </AuthLayout>
  );
};

export default SigninPage;
