import { ShieldCheck, Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { useLang, type Lang } from '@/i18n';

type Page = 'home' | 'dashboard' | 'governance';

export default function Navbar({
  page,
  onNavigate,
}: {
  page: Page;
  onNavigate: (p: Page) => void;
}) {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  const navItem = (label: string, target: Page) => (
    <button
      onClick={() => {
        onNavigate(target);
        setOpen(false);
      }}
      className={`text-sm font-medium transition-colors hover:text-gold-300 ${
        page === target ? 'text-gold-300' : 'text-slate-300'
      }`}
    >
      {label}
    </button>
  );

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-navy-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gold-400/30 blur-md group-hover:bg-gold-400/50 transition-colors" />
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-navy-500 to-navy-700 flex items-center justify-center border border-white/10">
                <ShieldCheck className="w-5 h-5 text-gold-300" />
              </div>
            </div>
            <div className="text-start">
              <div className="text-white font-bold text-lg leading-none">{t.nav.brand}</div>
              <div className="text-slate-400 text-xs mt-0.5">{t.nav.brandSub}</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navItem(t.nav.home, 'home')}
            {navItem(t.nav.dashboard, 'dashboard')}
            {navItem(t.nav.governance, 'governance')}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
            >
              <Globe className="w-4 h-4" />
              {lang === 'en' ? 'العربية' : 'English'}
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-4 py-2 rounded-lg bg-gold-400 text-navy-950 text-sm font-semibold hover:bg-gold-300 transition-colors"
            >
              {t.nav.cta}
            </button>
          </div>

          <button
            className="md:hidden text-slate-300 p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-navy-950/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-4">
            {navItem(t.nav.home, 'home')}
            {navItem(t.nav.dashboard, 'dashboard')}
            {navItem(t.nav.governance, 'governance')}
            <button
              onClick={() => {
                setLang(lang === 'en' ? ('ar' as Lang) : ('en' as Lang));
                setOpen(false);
              }}
              className="flex items-center gap-1.5 text-sm text-slate-300"
            >
              <Globe className="w-4 h-4" />
              {lang === 'en' ? 'العربية' : 'English'}
            </button>
            <button
              onClick={() => {
                onNavigate('dashboard');
                setOpen(false);
              }}
              className="w-full px-4 py-2 rounded-lg bg-gold-400 text-navy-950 text-sm font-semibold"
            >
              {t.nav.cta}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
