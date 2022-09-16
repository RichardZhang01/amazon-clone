import axios from "axios";
import jwt_decode from "jwt-decode";
import { DecodedJwt } from "../models/DecodedJwt.interface";

import { DisplayUser } from "../models/DisplayUser.interface";
import { Jwt } from "../models/Jwt";
import { LoginUser } from "../models/LoginUser.interface";
import { NewUser } from "../models/NewUser";

const signup = async (newUser: NewUser): Promise<DisplayUser | null> => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API}/auth/signup`,
    newUser
  );

  return response.data;
};

const login = async (user: LoginUser): Promise<Jwt> => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API}/auth/login`,
    user
  );

  if (response.data) {
    localStorage.setItem("jwt", JSON.stringify(response.data));

    const decodedJwt: DecodedJwt = jwt_decode(response.data.token);
    localStorage.setItem("user", JSON.stringify(decodedJwt.user));
  }

  return response.data;
};

const logout = (): void => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("user");
};

const verifyJwt = async (jwt: string): Promise<boolean> => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API}/auth/verify-jwt`,
    { jwt }
  );

  if (response.data) {
    const jwtExpirationMs = response.data.exp * 1000;
    return jwtExpirationMs > Date.now();
  }

  return false;
};

const authService = {
  signup,
  login,
  logout,
  verifyJwt,
};

export default authService;
