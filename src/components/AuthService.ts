import axios from "axios";
import jwtDecode from "jwt-decode";

interface LoginResponse {
  token: string;
}

const API_BASE_URL = "https://648b04fe17f1536d65ea23c6.mockapi.io";

export const login = async (email: string, password: string): Promise<void> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${API_BASE_URL}/CrudUsers`,
      {
        email,
        password,
      }
    );
    const token = response.data.token;
    localStorage.setItem("token", token); // Store the token in local storage
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Login failed");
  }
};

export const logout = (): void => {
  localStorage.removeItem("token"); // Remove the token from local storage
};

export const getCurrentUser = (): Record<string, unknown> | null => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode<Record<string, unknown>>(token);
    return decodedToken;
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  return token !== null;
};
