import React from "react";
import { logout } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks/input/redux/hooks";

const HomePage = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button
        onClick={logoutHandler}
        style={{
          backgroundColor: "green",
          cursor: "pointer",
          height: "40px",
          width: "60px",
          padding: "8px",
          color: "white",
        }}
      >
        logout
      </button>
      {user?.email}
    </div>
  );
};

export default HomePage;
