import { useEffect, useState } from "react";
import { UserPlus, Trash2, ShieldCheck, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getAdmins, createAdmin, deleteAdmin } from "../lib/api";

export default function AdminUsers() {
  const { username } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ username: "", password: "" });
  const [saving, setSaving] = useState(false);

  function load() {
    setLoading(true);
    getAdmins()
      .then(setAdmins)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleCreate(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await createAdmin(form.username, form.password);
      setForm({ username: "", password: "" });
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this admin account? They'll no longer be able to sign in.")) return;
    setError("");
    try {
      await deleteAdmin(id);
      setAdmins((a) => a.filter((x) => x.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="p-8 max-w-4xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-gold-dark mb-1">Access</p>
      <h1 className="font-display text-3xl text-charcoal mb-8">Admin Users</h1>

      {error && (
        <p className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-6">
          <AlertCircle size={14} /> {error}
        </p>
      )}

      <section className="bg-white border border-navy/10 rounded-2xl p-6 shadow-card mb-8">
        <div className="flex items-center gap-2 mb-5">
          <ShieldCheck size={18} className="text-steel" />
          <h2 className="font-display text-xl text-navy">Add a new admin</h2>
        </div>
        <form onSubmit={handleCreate} className="grid sm:grid-cols-[1fr_1fr_auto] gap-3 items-start">
          <div>
            <label className="block text-xs font-medium text-ink/60 mb-1">Username</label>
            <input
              type="text" required minLength={3} value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full border border-navy/15 rounded-lg px-3 py-2 text-sm focus-ring focus:border-navy"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink/60 mb-1">Password (min 8 chars)</label>
            <input
              type="password" required minLength={8} value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border border-navy/15 rounded-lg px-3 py-2 text-sm focus-ring focus:border-navy"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-1.5 bg-navy text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-navy-dark transition-colors focus-ring disabled:opacity-60 mt-4 sm:mt-0"
          >
            <UserPlus size={15} /> {saving ? "Adding..." : "Add Admin"}
          </button>
        </form>
      </section>

      <section className="bg-white border border-navy/10 rounded-2xl p-6 shadow-card">
        <h2 className="font-display text-xl text-navy mb-5">Current logins</h2>
        {loading && <p className="text-sm text-ink/60">Loading...</p>}
        {!loading && admins.length === 0 && (
          <p className="text-sm text-ink/60">No admin accounts yet.</p>
        )}
        <ul className="divide-y divide-navy/5">
          {admins.map((a) => (
            <li key={a.id} className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="text-sm font-semibold text-navy flex items-center gap-2">
                  {a.username}
                  {a.username === username && (
                    <span className="text-[10px] font-semibold uppercase tracking-widest bg-brass/10 text-brass-dark border border-brass/30 rounded-full px-2 py-0.5">
                      You
                    </span>
                  )}
                </p>
                <p className="text-xs text-ink/50">{new Date(a.created_at).toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => handleDelete(a.id)}
                disabled={a.username === username}
                className="text-ink/40 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-ring"
                aria-label={`Delete ${a.username}`}
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
