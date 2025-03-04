import type { AuthProvider } from "@refinedev/core";
import { ACCESS_TOKEN_KEY } from "../../../shared/lib/api";
import { loginRequest, registerRequest } from "../api";
import { jwtDecode } from "jwt-decode";
import { LoginFormTypes } from "./login-page";
import { RegisterFormTypes } from "./register-page";

export const authProvider: AuthProvider = {
  login: async ({ idNumber, password }: LoginFormTypes) => {
    try {
      const {
        data: { accessToken },
      } = await loginRequest({ idNumber, password });

      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

      return {
        success: true,
        redirectTo: "/",
      };
    } catch (error) {
      return {
        success: false,
        error: {
          name: "Login Error",
          message: "Invalid email or password",
        },
      };
    }
  },
  // executes on logout
  logout: async () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  // executes on register
  register: async ({
    idNumber,
    confirmPassword,
    email,
    fullName,
    password,
  }: RegisterFormTypes) => {
    if (password !== confirmPassword) {
      return {
        success: false,
        error: {
          name: "Register Error",
          message: "Passwords do not match",
        },
      };
    }

    try {
      const {
        data: { accessToken },
      } = await registerRequest({
        email,
        fullName,
        password,
        confirmPassword,
        idNumber,
      });

      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

      return {
        success: true,
        successNotification: {
          message: "Registration successful",
        },
        redirectTo: "/",
      };
    } catch (error) {
      return {
        success: false,
        error: {
          name: "Register Error",
          message: (error as Error)?.message,
        },
      };
    }
  },
  check: async () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (token) {
      const decoded = jwtDecode<{ sub: string; name: string }>(token);

      return {
        id: decoded?.sub,
        name: decoded?.name,
      };
    }

    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
