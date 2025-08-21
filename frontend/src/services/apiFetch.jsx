// apiFetch.js
export async function apiFetch(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
  });

  if (response.status === 401) {
    // Limpa dados locais
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.clear();

    // Dispara evento global
    if (window.location.pathname !== "/login") {
      window.dispatchEvent(new Event("sessionExpired"));
    }
  }

  return response;
}
