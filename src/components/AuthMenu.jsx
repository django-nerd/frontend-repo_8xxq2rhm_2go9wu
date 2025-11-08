import { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { api } from '../lib/api';

export default function AuthMenu() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('vc_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  function logout() {
    localStorage.removeItem('vc_user');
    setUser(null);
  }

  if (!user) return null;

  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)} className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm">
        <User size={16} /> {user.username || user.email}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <div className="px-4 py-3 text-sm">
            <div className="font-semibold">{user.username || user.email}</div>
            <div className="text-xs text-gray-500 capitalize">Plan: {user.plan}</div>
          </div>
          <button onClick={logout} className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50">Logout</button>
        </div>
      )}
    </div>
  );
}
