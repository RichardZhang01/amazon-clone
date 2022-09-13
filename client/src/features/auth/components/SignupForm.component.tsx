import React, { FC, FormEvent } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Grid,
  TextField,
  InputLabel,
  Typography,
  Button,
  Divider,
} from "@mui/material";

const SignupFormComponent: FC = () => {
  const onSubmitHandler = (formSubmitEvent: FormEvent<HTMLFormElement>) => {
    formSubmitEvent.preventDefault();

    console.log("clicked");
  };

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
            Mobile number or email
          </InputLabel>
          <TextField
            type="text"
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
