import { Palette, Wand2, Layers } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Designed for creators of all levels</h2>
          <p className="mt-4 text-gray-600">Sketch your idea or just describe it. Our creator studio transforms prompts and rough drawings into expressive characters with intuitive controls for facial features, body shape, and proportions.</p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Feature icon={Wand2} title="AI-assisted generation" desc="Go from words to animated characters in seconds." />
            <Feature icon={Palette} title="Deep customization" desc="Adjust face, hands, head, height, weight and more." />
            <Feature icon={Layers} title="Exports that work" desc="From previews to rig-ready assets for your pipeline." />
          </div>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-fuchsia-200 via-pink-200 to-amber-100" />
          <p className="mt-3 text-sm text-gray-500">This preview illustrates the workflow area where your character comes to life.</p>
        </div>
      </div>
    </section>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-gray-200 p-4">
      <div className="mb-2 flex items-center gap-2 text-gray-900">
        <Icon className="text-fuchsia-500" />
        <span className="font-semibold">{title}</span>
      </div>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}
