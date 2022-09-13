import React, { ReactNode } from "react";
import { Grid } from "@mui/material";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Grid
      sx={{ p: 1 }}
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <img src="amazon_logo_black.png" alt="amazon-logo" height="55px" />
      <main>{children}</main>
    </Grid>
  );
};

export default AuthLayout;
