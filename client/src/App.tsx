import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import { theme } from "./shared/utils/theme";
import HomePage from "./pages/Home.page";
import SignupPage from "./pages/Signup.page";
import SigninPage from "./pages/Signin.page";
import PrivateRoute from "./features/auth/components/PrivateRoute";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute page={<HomePage />} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<SigninPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
