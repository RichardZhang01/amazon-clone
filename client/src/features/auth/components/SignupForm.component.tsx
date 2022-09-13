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
        borderColor: "#ccccccc",
        width: "350px",
        marginTop: 2,
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
            Name
          </InputLabel>
          <TextField
            type="text"
            name="name"
            id="name"
            variant="outlined"
            size="small"
          />

          <InputLabel
            sx={{ fontWeight: 500, marginTop: 1, color: "#000000" }}
            htmlFor="email"
          >
            Email
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
            placeholder="Must be at least 6 characters"
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
            Sign Up
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
          <a href="#" style={{ textDecoration: "none" }}>
            {" "}
            Conditions of use
          </a>{" "}
          and{" "}
          <a href="#" style={{ textDecoration: "none" }}>
            Privacy Policy
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
            Log In
          </Link>
        </small>
      </div>

			<div>
        <small>
					Buying for work?
          <a href="#" style={{ textDecoration: "none" }}>
            {" "}
            Create a free business account
          </a>{" "}
        </small>
      </div>
    </Box>
  );
};

export default SignupFormComponent;
