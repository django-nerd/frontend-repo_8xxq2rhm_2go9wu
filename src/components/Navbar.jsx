import AuthMenu from './AuthMenu';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <a href="#" className="text-lg font-extrabold tracking-tight text-white">Vibe Characters</a>
        <nav className="hidden items-center gap-6 text-sm text-white/80 sm:flex">
          <a href="#about" className="hover:text-white">About</a>
          <a href="#studio" className="hover:text-white">Studio</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <AuthMenu />
        </nav>
      </div>
    </header>
  );
}
