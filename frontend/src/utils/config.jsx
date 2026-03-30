<<<<<<< HEAD
export const api = "https://tulingramofc.onrender.com/api";
export const uploads = "https://tulingramofc.onrender.com/uploads";
=======
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = `${BASE_URL}/api`;
export const uploads = `${BASE_URL}/uploads`;
>>>>>>> de0b5c0 (fix: cors production final)

export const requestConfig = (method, data, token = null, image = null) => {
  let config;

  if (image) {
    config = {
      method,
      body: data,
      headers: {},
    };
  } else if (method === "DELETE" || data === null) {
    config = {
      method,
      headers: {},
    };
  } else {
    config = {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};