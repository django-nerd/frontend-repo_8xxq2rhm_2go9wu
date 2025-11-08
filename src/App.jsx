import Hero from './components/Hero';
import About from './components/About';
import Customizer from './components/Customizer';
import Pricing from './components/Pricing';

function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <a href="#" className="text-lg font-extrabold tracking-tight text-white">Vibe Characters</a>
        <nav className="hidden items-center gap-6 text-sm text-white/80 sm:flex">
          <a href="#about" className="hover:text-white">About</a>
          <a href="#studio" className="hover:text-white">Studio</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <a href="#" className="rounded-full bg-white px-3 py-1.5 font-semibold text-gray-900">Get Started</a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-gray-600">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p>© {new Date().getFullYear()} Vibe Characters. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gray-900">Privacy</a>
            <a href="#" className="hover:text-gray-900">Terms</a>
            <a href="#" className="hover:text-gray-900">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <About />
      <Customizer />
      <Pricing />
      <Footer />
    </div>
  );
}
