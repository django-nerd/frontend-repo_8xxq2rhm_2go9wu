import { Check, Crown, Star } from 'lucide-react';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    tagline: 'Get started with essentials',
    features: [
      'Prompt-based basic characters',
      'Limited customization sliders',
      'Watermark + ads supported',
      'Community export presets',
    ],
    cta: 'Start for free',
    highlight: false,
  },
  {
    name: 'Plus',
    price: '$9/mo',
    tagline: 'More power. No ads.',
    features: [
      'Advanced customization controls',
      'HD exports without watermark',
      'Ad-free experience',
      'Priority render queue',
    ],
    cta: 'Upgrade to Plus',
    highlight: true,
    icon: Star,
  },
  {
    name: 'Pro',
    price: '$29/mo',
    tagline: 'Full features. Pro pipelines.',
    features: [
      'All Plus features',
      'Full body rig exports',
      'Commercial license',
      'Early access to labs',
    ],
    cta: 'Go Pro',
    highlight: false,
    icon: Crown,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Choose your plan</h2>
          <p className="mt-2 text-gray-600">Start free, then scale with features that fit your creative flow.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div key={tier.name} className={`relative rounded-2xl border ${tier.highlight ? 'border-fuchsia-300 bg-white shadow-xl ring-2 ring-fuchsia-200' : 'border-gray-200 bg-white shadow'} p-6`}>
              <div className="mb-4 flex items-center gap-2">
                {tier.icon ? <tier.icon className="text-fuchsia-500" /> : null}
                <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
              </div>
              <div className="mb-6">
                <div className="text-3xl font-extrabold text-gray-900">{tier.price}</div>
                <div className="text-sm text-gray-600">{tier.tagline}</div>
              </div>
              <ul className="space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" /> {f}
                  </li>
                ))}
              </ul>
              <button className={`mt-6 w-full rounded-xl px-4 py-2 font-semibold ${tier.highlight ? 'bg-fuchsia-600 text-white hover:bg-fuchsia-700' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
                {tier.cta}
              </button>
              {tier.name === 'Free' && (
                <p className="mt-3 text-center text-xs text-gray-500">Includes ads and limited features</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
