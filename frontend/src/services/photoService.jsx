import { api, requestConfig } from "../utils/config";
import { apiFetch } from "../services/apiFetch";

// Publish an user photo
const publishPhoto = async (data, token) => {
  const config = requestConfig("POST", data, token, true);
  try {
    const res = await apiFetch(api + "/photos", config);
    if (!res) return;
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

// Get user photos
const getUserPhotos = async (id, token) => {
  const config = requestConfig("GET", null, token);
  try {
    const res = await apiFetch(api + "/photos/user/" + id, config);
    if (!res) return;
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

// Delete a photo
const deletePhoto = async (id, token) => {
  const config = requestConfig("DELETE", null, token);
  try {
    const res = await apiFetch(api + "/photos/" + id, config);
    if (!res) return;
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

// Update a photo
const updatePhoto = async (data, id, token) => {
  const config = requestConfig("PUT", data, token);
  try {
    const res = await apiFetch(api + "/photos/" + id, config);
    if (!res) return;
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

// Get a photo by id
const getPhoto = async (id, token) => {
  const config = requestConfig("GET", null, token);
  try {
    const res = await apiFetch(api + "/photos/" + id, config);
    if (!res) return;
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

// Like a photo
const like = async (id, token) => {
  const config = requestConfig("PUT", null, token);
  try {
    const res = await apiFetch(api + "/photos/like/" + id, config);
    if (!res) return;
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

// Add comment to a photo
const comment = async (data, id, token) => {
  const config = requestConfig("PUT", data, token);
  try {
    const res = await apiFetch(api + "/photos/comment/" + id, config);
    if (!res) return;
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

// Get all photos
const getPhotos = async (token) => {
  const config = requestConfig("GET", null, token);
  try {
    const res = await apiFetch(api + "/photos", config);
    if (!res) return;
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

// Search photo by title
const searchPhotos = async (query, token) => {
  const config = requestConfig("GET", null, token);
  try {
    const res = await apiFetch(api + `/photos/search?q=${query}`, config);
    if (!res) return;
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

const photoService = {
  publishPhoto,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
  getPhoto,
  like,
  comment,
  getPhotos,
  searchPhotos,
};

export default photoService;
