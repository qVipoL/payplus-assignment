import { apiInstance } from "../../../shared/lib/api";

export const AuthEndpoints = {
  login: "/auth/login",
  register: "/auth/register",
};

type LoginDto = {
  idNumber: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
};

export const loginRequest = async ({ idNumber, password }: LoginDto) => {
  return apiInstance.post<LoginResponse>(AuthEndpoints.login, {
    idNumber,
    password,
  });
};

type RegisterDto = {
  idNumber: string;
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
};

type RegisterResponse = {
  accessToken: string;
};

export const registerRequest = async ({
  idNumber,
  confirmPassword,
  email,
  fullName,
  password,
}: RegisterDto) => {
  return apiInstance.post<RegisterResponse>(AuthEndpoints.register, {
    idNumber,
    confirmPassword,
    email,
    fullName,
    password,
  });
};
