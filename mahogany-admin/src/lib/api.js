const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
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

export async function login(username, password) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return handle(res);
}

export async function getContent() {
  const res = await fetch(`${API_URL}/api/content`);
  return handle(res);
}

export async function updateContent(token, key, data) {
  const res = await fetch(`${API_URL}/api/content/${key}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders(token) },
    body: JSON.stringify(data),
  });
  return handle(res);
}

export async function getQuotes(token) {
  const res = await fetch(`${API_URL}/api/quotes`, { headers: authHeaders(token) });
  return handle(res);
}

export async function updateQuoteStatus(token, id, status) {
  const res = await fetch(`${API_URL}/api/quotes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders(token) },
    body: JSON.stringify({ status }),
  });
  return handle(res);
}

export async function deleteQuote(token, id) {
  const res = await fetch(`${API_URL}/api/quotes/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  return handle(res);
}

export async function getMessages(token) {
  const res = await fetch(`${API_URL}/api/messages`, { headers: authHeaders(token) });
  return handle(res);
}

export async function updateMessageStatus(token, id, status) {
  const res = await fetch(`${API_URL}/api/messages/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders(token) },
    body: JSON.stringify({ status }),
  });
  return handle(res);
}

export async function deleteMessage(token, id) {
  const res = await fetch(`${API_URL}/api/messages/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  return handle(res);
}
