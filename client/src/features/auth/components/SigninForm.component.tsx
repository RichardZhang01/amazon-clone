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

const SigninFormComponent: FC = () => {
  const onSubmitHandler = (formSubmitEvent: FormEvent<HTMLFormElement>) => {
    formSubmitEvent.preventDefault();

    console.log("clicked");
  };

  return (
    <>
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
              Sign in
            </Typography>

            <InputLabel
              sx={{ fontWeight: 500, marginTop: 1, color: "#000000" }}
              htmlFor="email"
            >
              Email or mobile phone number
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
            <span>By continuing, you agree to Amazon's </span>
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
      </Box>

      <div style={{ marginTop: "16px" }}>
        <Divider>
          <small style={{ color: "#767676" }}>New to Amazon?</small>
        </Divider>

        <Link
					to="/signup"
					style={{ textDecoration: "none", color: "#0000ee" }}
				>
					<Button
            variant="contained"
            style={{
							width: "100%",
              marginTop: "12px",
              height: "31px",
              backgroundColor: "#f1f1f1",
              color: "black",
              textTransform: "none",
            }}
          >
            Create your Amazon account
          </Button>
				</Link>

      </div>
    </>
  );
};

export default SigninFormComponent;
