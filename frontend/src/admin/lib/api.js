const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:4000" : "");

const TOKEN_KEY = "rhino_admin_token";
const REFRESH_KEY = "rhino_admin_refresh_token";

let onNewToken = null;
let onSessionExpired = null;
let refreshInFlight = null;

export function registerAuthListeners({ onNewToken: n, onSessionExpired: e }) {
  onNewToken = n;
  onSessionExpired = e;
}

function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

async function handle(res) {
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      // ignore — use default message
    }
    throw new Error(message);
  }
  if (res.status === 204) return null;
  return res.json();
}

function rawFetch(path, options, auth) {
  const headers = {
    ...(options.body && !(options.body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
    ...options.headers,
  };
  if (auth) {
    const token = getStoredToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  return fetch(`${API_URL}${path}`, { ...options, headers });
}

async function refreshSession() {
  if (refreshInFlight) return refreshInFlight;
  refreshInFlight = (async () => {
    const refreshToken = localStorage.getItem(REFRESH_KEY);
    if (!refreshToken) return false;
    try {
      const res = await fetch(`${API_URL}/api/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      if (!res.ok) return false;
      const data = await res.json();
      onNewToken?.(data.token, data.refreshToken);
      return true;
    } catch {
      return false;
    } finally {
      refreshInFlight = null;
    }
  })();
  return refreshInFlight;
}

async function request(path, options = {}, auth = true) {
  const res = await rawFetch(path, options, auth);
  if (res.status === 401 && auth) {
    const refreshed = await refreshSession();
    if (refreshed) {
      const retryRes = await rawFetch(path, options, true);
      return handle(retryRes);
    }
    onSessionExpired?.();
  }
  return handle(res);
}

export async function login(username, password) {
  const res = await rawFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  }, false);
  return handle(res);
}

export async function getContent() {
  const res = await rawFetch("/api/content", {}, false);
  return handle(res);
}

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);
  return request("/api/uploads", {
    method: "POST",
    body: formData,
    headers: {},
  });
}

// Uploaded images are stored on the backend under /uploads/. Turn that
// relative path into an absolute one for previews; pass everything else
// through (e.g. bundled assets or external URLs).
export function resolveImage(src) {
  if (typeof src === "string" && src.startsWith("/uploads/")) {
    return API_URL + src;
  }
  return src;
}

export async function updateContent(key, data) {
  return request(`/api/content/${key}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function getQuotes() {
  return request("/api/quotes");
}

export async function updateQuoteStatus(id, status) {
  return request(`/api/quotes/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function deleteQuote(id) {
  return request(`/api/quotes/${id}`, { method: "DELETE" });
}

export async function getLeads() {
  return request("/api/leads");
}

export async function updateLeadStatus(id, status) {
  return request(`/api/leads/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function deleteLead(id) {
  return request(`/api/leads/${id}`, { method: "DELETE" });
}

export async function getAdmins() {
  return request("/api/admins");
}

export async function createAdmin(username, password) {
  return request("/api/admins", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function deleteAdmin(id) {
  return request(`/api/admins/${id}`, { method: "DELETE" });
}
