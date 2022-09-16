import React, { FC, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Box,
  Grid,
  TextField,
  InputLabel,
  Typography,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import useInput from "../../../hooks/input/use-input";
import {
  validateNameLength,
  validatePasswordLength,
} from "../../../shared/utils/validation/length";
import { validateEmail } from "../../../shared/utils/validation/email";
import { NewUser } from "../models/NewUser";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/input/redux/hooks";
import { signup, reset } from "../authSlice";

const SignupFormComponent: FC = () => {
  const {
    text: name,
    shouldDisplayError: nameHasError,
    textChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    clearHandler: nameClearHandler,
  } = useInput(validateNameLength);

  const {
    text: email,
    shouldDisplayError: emailHasError,
    textChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    clearHandler: emailClearHandler,
  } = useInput(validateEmail);

  const {
    text: password,
    shouldDisplayError: passwordHasError,
    textChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    clearHandler: passwordClearHandler,
  } = useInput(validatePasswordLength);

  const {
    text: confirmPassword,
    textChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    clearHandler: confirmPasswordClearHandler,
  } = useInput(validatePasswordLength);

  const clearForm = () => {
    nameClearHandler();
    emailClearHandler();
    passwordClearHandler();
    confirmPasswordClearHandler();
  };

  const dispatch = useAppDispatch();

  const { isLoading, isSuccess } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      clearForm();
      navigate("/login");
    }
  }, [isSuccess, dispatch]);

  const onSubmitHandler = (formSubmitEvent: FormEvent<HTMLFormElement>) => {
    formSubmitEvent.preventDefault();

    if (password !== confirmPassword) return;
    if (nameHasError || emailHasError || passwordHasError) return;
    if (
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    )
      return;

    const newUser: NewUser = {
      name,
      email,
      password,
    };

    dispatch(signup(newUser));
  };

  if (isLoading)
    return <CircularProgress sx={{ marginTop: "64px" }} color="primary" />;

  return (
    <Box
      sx={{
        border: 1,
        padding: 2,
        borderRadius: 1,
        borderColor: "#d3d3d3",
        width: "315px",
        marginTop: 1,
      }}
    >
      <form onSubmit={onSubmitHandler}>
        <Grid container direction="column" justifyContent="flex-start">
          <Typography variant="h4" component="h1">
            Create Account
          </Typography>

          <InputLabel
            sx={{ fontWeight: 500, marginTop: 1, color: "#000000" }}
            htmlFor="name"
          >
            Your name
          </InputLabel>
          <TextField
            value={name}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            error={nameHasError}
            helperText={nameHasError ? "Please enter your name" : ""}
            type="text"
            name="name"
            id="name"
            variant="outlined"
            size="small"
            placeholder="First and last name"
          />

          <InputLabel
            sx={{ fontWeight: 500, marginTop: 1, color: "#000000" }}
            htmlFor="email"
          >
            Email
          </InputLabel>
          <TextField
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            error={emailHasError}
            helperText={emailHasError ? "Please enter a valid email" : ""}
            type="email"
            name="email"
            id="email"
            variant="outlined"
            size="small"
          />

          <InputLabel
            sx={{ fontWeight: 500, marginTop: 1, color: "#000000" }}
            htmlFor="password"
          >
            Password
          </InputLabel>
          <TextField
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            error={passwordHasError}
            helperText={
              passwordHasError ? "Password must be at least 6 characters" : ""
            }
            type="password"
            name="password"
            id="password"
            variant="outlined"
            size="small"
            placeholder="At least 6 characters"
          />

          <InputLabel
            sx={{ fontWeight: 500, marginTop: 1, color: "#000000" }}
            htmlFor="confirmPassword"
          >
            Re-enter password
          </InputLabel>
          <TextField
            value={confirmPassword}
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
            error={confirmPassword.length > 0 && password !== confirmPassword}
            helperText={
              confirmPassword.length > 0 && password !== confirmPassword
                ? "Passwords must match"
                : ""
            }
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            variant="outlined"
            size="small"
          />

          <Button
            variant="contained"
            style={{
              marginTop: "16px",
              height: "31px",
              backgroundColor: "#f0c14b",
              color: "black",
              borderColor: "#a88734 #9c7e31 #846a29",
              textTransform: "none",
            }}
            type="submit"
          >
            Continue
          </Button>
        </Grid>
      </form>

      <div style={{ marginTop: "30px" }}>
        <small>
          <span>By creating an account, you agree to Amazon's </span>
        </small>
      </div>

      <div>
        <small>
          <a
            href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_register_notification_condition_of_use?ie=UTF8&nodeId=508088"
            style={{ textDecoration: "none" }}
          >
            {" "}
            Conditions of use
          </a>{" "}
          and{" "}
          <a
            href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_register_notification_privacy_notice?ie=UTF8&nodeId=468496"
            style={{ textDecoration: "none" }}
          >
            Privacy Notice
          </a>
        </small>
      </div>

      <Divider sx={{ marginTop: "36px", marginBottom: "36px" }} />

      <div>
        <small>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "#0000ee" }}
          >
            Sign In
          </Link>
        </small>
      </div>

      <div>
        <small>
          Buying for work?
          <a
            href="https://www.amazon.com/business/register/org/landing?ref_=ap_altreg_ab"
            style={{ textDecoration: "none" }}
          >
            {" "}
            Create a free business account
          </a>{" "}
        </small>
      </div>
    </Box>
  );
};

export default SignupFormComponent;
