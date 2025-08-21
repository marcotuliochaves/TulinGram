import { api, requestConfig } from "../utils/config";
import { apiFetch } from "../services/apiFetch";

// Register an user

const register = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await apiFetch(api + "/users/register", config);
    if (!res) return;
    const json = await res.json();

    if (json._id) {
      localStorage.setItem("user", JSON.stringify(json));
    }
    return json;
  } catch (error) {
    console.error(error);
  }
};

// Logout an user
const logout = () => {
  localStorage.removeItem("user");
};

// Sign in an user
const login = async (data) => {
  const config = requestConfig("POST", data);
  try {
    const res = await apiFetch(api + "/users/login", config);
    if (!res) return;

    const json = await res.json();

    if (json._id) {
      localStorage.setItem("user", JSON.stringify(json));
    }
    return json;
  } catch (error) {
    console.error(error);
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
