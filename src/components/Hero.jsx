import { useState, useMemo, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, User, Lock } from 'lucide-react';
import { api } from '../lib/api';

export default function Hero() {
  const [authOpen, setAuthOpen] = useState(false);
  const [mode, setMode] = useState('login');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('vc_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const titleGradient = useMemo(
    () => (
      'bg-gradient-to-br from-fuchsia-400 via-pink-400 to-amber-300 bg-clip-text text-transparent'
    ),
    []
  );

  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/atN3lqky4IzF-KEP/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center text-white">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm backdrop-blur">
          <Rocket size={16} /> Launching the future of character creation
        </span>
        <h1 className={`text-balance text-4xl font-extrabold leading-tight sm:text-6xl ${titleGradient}`}>
          Create Animated Characters from Prompts and Sketches
        </h1>
        <p className="mt-4 max-w-2xl text-balance text-white/80 sm:text-lg">
          Turn ideas and rough drawings into customizable, animated 3D characters. Tweak faces, hands, head, body shape, height, weight, and more — all in a delightful interface.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#pricing" className="pointer-events-auto rounded-full bg-white px-6 py-3 font-semibold text-gray-900 shadow-lg transition hover:shadow-xl">
            Start Free
          </a>
          {!user && (
            <button onClick={() => setAuthOpen(true)} className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/20">
              <User size={18} /> Login / Sign up
            </button>
          )}
        </div>
      </div>

      {authOpen && (
        <AuthModal mode={mode} setMode={setMode} onClose={() => setAuthOpen(false)} onAuthed={(u) => { setUser(u); localStorage.setItem('vc_user', JSON.stringify(u)); setAuthOpen(false); }} />)
      }
    </section>
  );
}

function AuthModal({ mode, setMode, onClose, onAuthed }) {
  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get('email');
    const password = form.get('password');
    const username = form.get('username');
    try {
      const path = mode === 'login' ? '/api/auth/login' : '/api/auth/signup';
      const user = await api(path, { method: 'POST', body: { email, password, username } });
      onAuthed(user);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-2 rounded-full bg-gray-100 p-1">
            <button onClick={() => setMode('login')} className={`rounded-full px-4 py-2 text-sm font-semibold ${mode === 'login' ? 'bg-white shadow' : 'text-gray-600'}`}>Login</button>
            <button onClick={() => setMode('signup')} className={`rounded-full px-4 py-2 text-sm font-semibold ${mode === 'signup' ? 'bg-white shadow' : 'text-gray-600'}`}>Sign up</button>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-gray-500 hover:bg-gray-100" aria-label="Close">
            <Lock size={18} />
          </button>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input name="email" type="email" required className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none ring-0 focus:border-gray-400" placeholder="you@example.com" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
            <input name="password" type="password" required className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none ring-0 focus:border-gray-400" placeholder="••••••••" />
          </div>
          {mode === 'signup' && (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Username</label>
              <input name="username" type="text" required className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none ring-0 focus:border-gray-400" placeholder="Your handle" />
            </div>
          )}
          <button type="submit" className="w-full rounded-lg bg-gray-900 px-4 py-2 font-semibold text-white hover:bg-gray-800">
            {mode === 'login' ? 'Login' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
}
