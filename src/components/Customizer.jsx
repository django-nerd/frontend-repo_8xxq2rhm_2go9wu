import { useEffect, useState } from 'react';
import { SlidersHorizontal, Image as ImageIcon, Sparkles } from 'lucide-react';
import { api } from '../lib/api';

export default function Customizer() {
  const [settings, setSettings] = useState({
    face: 50,
    hands: 50,
    head: 50,
    height: 170,
    weight: 65,
  });
  const [prompt, setPrompt] = useState('A playful cyberpunk fox with neon highlights');
  const [sketch, setSketch] = useState(null);
  const [preview, setPreview] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('vc_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  function handleChange(key, value) {
    setSettings((s) => ({ ...s, [key]: Number(value) }));
  }

  async function handleGenerate(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await api('/api/characters/generate', {
        method: 'POST',
        body: { prompt, settings },
      });
      setPreview(data.preview_url);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="studio" className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 flex items-center gap-2 text-gray-900">
        <Sparkles className="text-fuchsia-500" />
        <h2 className="text-2xl font-bold">Creator Studio</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <form onSubmit={handleGenerate} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">Prompt</label>
              <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="h-28 w-full resize-none rounded-xl border border-gray-300 p-3 outline-none focus:border-gray-400" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">Upload rough sketch (optional)</label>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-gray-300 p-4 hover:bg-gray-50">
                <ImageIcon />
                <span className="text-sm text-gray-600">Drop image here or click to upload</span>
                <input type="file" accept="image/*" onChange={(e) => setSketch(e.target.files?.[0] || null)} className="hidden" />
              </label>
              {sketch && (
                <p className="mt-2 text-xs text-gray-500">Selected: {sketch.name}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { key: 'face', label: 'Face' },
                { key: 'hands', label: 'Hands' },
                { key: 'head', label: 'Head' },
                { key: 'height', label: 'Height', min: 120, max: 220 },
                { key: 'weight', label: 'Weight', min: 40, max: 120 },
              ].map(({ key, label, min = 0, max = 100 }) => (
                <div key={key} className="rounded-xl border border-gray-200 p-4">
                  <div className="mb-1 flex items-center justify-between text-sm font-medium text-gray-700">
                    <span className="flex items-center gap-2"><SlidersHorizontal className="h-4 w-4 text-fuchsia-500" /> {label}</span>
                    <span className="text-gray-500">{settings[key]}</span>
                  </div>
                  <input
                    type="range"
                    min={min}
                    max={max}
                    value={settings[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full"
                  />
                </div>
              ))}
            </div>

            <button type="submit" disabled={loading} className="w-full rounded-xl bg-gray-900 px-4 py-3 font-semibold text-white hover:bg-gray-800 disabled:opacity-60">{loading ? 'Generating…' : 'Generate Character'}</button>
          </form>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-gray-700">Live Preview</h3>
            <div className="flex h-80 items-center justify-center overflow-hidden rounded-xl bg-gray-50">
              {preview ? (
                <img src={preview} alt="preview" className="h-full w-auto" />
              ) : (
                <div className="text-center text-gray-500">
                  <div className="mb-2 text-xs">(Preview placeholder)</div>
                  <div className="text-sm">Your character render will appear here.</div>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-gray-700">Current Settings</h3>
            <pre className="max-h-48 overflow-auto rounded-lg bg-gray-900 p-4 text-xs text-white">{JSON.stringify({ prompt, settings, sketch: sketch?.name || null }, null, 2)}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}
