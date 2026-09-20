import { useState } from "react";
import { Navigate } from "react-router-dom";
import { ShieldCheck, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(username, password);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy px-5">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <svg width="34" height="34" viewBox="0 0 64 64" aria-hidden="true">
              <rect width="64" height="64" rx="10" fill="#F26A21" />
            <circle cx="32" cy="32" r="20" fill="none" stroke="#003D25" strokeWidth="2" />
            <circle cx="32" cy="32" r="13" fill="none" stroke="#003D25" strokeWidth="1.5" opacity="0.75" />
              <circle cx="32" cy="32" r="6" fill="#00652F" />
          </svg>
          <span className="font-display text-xl text-white">Rhino Admin</span>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-sm p-8 space-y-5">
          <div className="flex items-center gap-2 text-navy mb-2">
            <ShieldCheck size={18} className="text-brass" />
            <h1 className="font-display text-lg">Sign in</h1>
          </div>

          {error && (
            <p className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-sm px-3 py-2.5">
              <AlertCircle size={15} className="shrink-0" /> {error}
            </p>
          )}

          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-navy mb-1.5">Username</label>
            <input
              id="username" type="text" required autoFocus value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-navy/20 rounded-sm px-3.5 py-2.5 text-sm focus-ring focus:border-steel"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-navy mb-1.5">Password</label>
            <input
              id="password" type="password" required value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-navy/20 rounded-sm px-3.5 py-2.5 text-sm focus-ring focus:border-steel"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-steel text-white font-semibold px-5 py-3 rounded-sm hover:bg-steel-dark transition-colors focus-ring disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
