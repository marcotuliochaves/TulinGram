import { api, requestConfig } from "../utils/config";
import { apiFetch } from "../services/apiFetch";

// Get user details
const profile = async (data, token) => {
  const config = requestConfig("GET", data, token);
  try {
    const res = await apiFetch(api + "/users/profile", config);
    if (!res) return; // interrompe caso já tenha redirecionado
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

// Update user details
const updateProfile = async (data, token) => {
  const config = requestConfig("PUT", data, token, true);
  try {
    const res = await apiFetch(api + "/users/", config);
    if (!res) return;
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

// Get user details
const getUserDetails = async (id) => {
  const config = requestConfig("GET");
  try {
    const res = await apiFetch(api + "/users/" + id, config);
    if (!res) return;
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

const userService = {
  profile,
  updateProfile,
  getUserDetails,
};

export default userService;
