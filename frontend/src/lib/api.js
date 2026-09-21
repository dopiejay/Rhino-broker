const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:4000" : "");

// Uploaded images are stored on the backend under /uploads/. Turn that
// relative path into an absolute one; pass everything else through.
export function resolveImage(src) {
  if (typeof src === "string" && src.startsWith("/uploads/")) {
    return API_URL + src;
  }
  return src;
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

export async function submitLead(payload) {
  const res = await fetch(`${API_URL}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handle(res);
}
