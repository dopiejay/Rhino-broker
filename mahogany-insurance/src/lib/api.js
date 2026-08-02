const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

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
  return res.json();
}

export async function getContent() {
  try {
    const res = await fetch(`${API_URL}/api/content`);
    if (!res.ok) return {};
    return await res.json();
  } catch {
    return {};
  }
}

export async function submitQuote(payload) {
  const res = await fetch(`${API_URL}/api/quotes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handle(res);
}

export async function sendMessage(payload) {
  const res = await fetch(`${API_URL}/api/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handle(res);
}
