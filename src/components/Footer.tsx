import { ShieldCheck } from 'lucide-react';
import { useLang } from '@/i18n';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t border-white/5 bg-navy-950 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-navy-500 to-navy-700 flex items-center justify-center border border-white/10">
                <ShieldCheck className="w-4 h-4 text-gold-300" />
              </div>
              <span className="text-white font-bold">{t.nav.brand}</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">{t.footer.tagline}</p>
          </div>

          {[
            { title: t.footer.product, links: t.footer.productLinks },
            { title: t.footer.company, links: t.footer.companyLinks },
            { title: t.footer.legal, links: t.footer.legalLinks },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 text-sm hover:text-gold-300 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Wuthuq AI. {t.footer.rights}
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>SDAIA Aligned</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span>PDPL Compliant</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span>ITU-T Y.3172</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
