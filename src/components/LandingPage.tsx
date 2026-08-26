import {
  ArrowRight,
  Database,
  Cpu,
  BrainCircuit,
  ShieldCheck,
  Sparkles,
  Eye,
  Scale,
  Users,
  Landmark,
  CheckCircle2,
} from 'lucide-react';
import { useLang } from '@/i18n';

type Page = 'home' | 'dashboard' | 'governance';

export default function LandingPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const { t } = useLang();

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-navy-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-1/4 w-[500px] h-[500px] bg-gold-400/10 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-gold-200 mb-8 animate-fade-in-up">
              <Sparkles className="w-3.5 h-3.5" />
              {t.hero.badge}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight text-balance mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              {t.hero.title}
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <button
                onClick={() => onNavigate('dashboard')}
                className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-400 text-navy-950 font-semibold hover:bg-gold-300 transition-all hover:scale-105 glow"
              >
                {t.hero.ctaPrimary}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('governance')}
                className="px-6 py-3 rounded-xl glass text-white font-semibold hover:bg-white/10 transition-colors"
              >
                {t.hero.ctaSecondary}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-20 max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {[
              { value: t.hero.stat1Value, label: t.hero.stat1Label },
              { value: t.hero.stat2Value, label: t.hero.stat2Label },
              { value: t.hero.stat3Value, label: t.hero.stat3Label },
              { value: t.hero.stat4Value, label: t.hero.stat4Label },
            ].map((s) => (
              <div key={s.label} className="glass rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-gold-300 mb-1">{s.value}</div>
                <div className="text-sm text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t.pipeline.title}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">{t.pipeline.subtitle}</p>
          </div>

          <PipelineDiagram />
        </div>
      </section>

      {/* Features */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t.features.title}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">{t.features.subtitle}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Eye, title: t.features.f1Title, desc: t.features.f1Desc },
              { icon: Scale, title: t.features.f2Title, desc: t.features.f2Desc },
              { icon: Users, title: t.features.f3Title, desc: t.features.f3Desc },
              { icon: Landmark, title: t.features.f4Title, desc: t.features.f4Desc },
            ].map((f, i) => (
              <div
                key={f.title}
                className="glass rounded-2xl p-6 hover:bg-white/[0.07] transition-all hover:-translate-y-1 group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-navy-600/40 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-gold-400/20 group-hover:border-gold-400/30 transition-colors">
                  <f.icon className="w-6 h-6 text-gold-300" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative glass rounded-3xl p-10 sm:p-14 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-navy-600/20 via-transparent to-gold-400/10" />
            <div className="relative">
              <CheckCircle2 className="w-12 h-12 text-gold-300 mx-auto mb-6" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {t.hero.ctaPrimary}
              </h2>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto">{t.dashboard.subtitle}</p>
              <button
                onClick={() => onNavigate('dashboard')}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-400 text-navy-950 font-semibold hover:bg-gold-300 transition-all hover:scale-105"
              >
                {t.nav.dashboard}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function PipelineDiagram() {
  const { t } = useLang();

  const stages = [
    { icon: Database, title: t.pipeline.stage1Title, desc: t.pipeline.stage1Desc, num: '01' },
    { icon: Cpu, title: t.pipeline.stage2Title, desc: t.pipeline.stage2Desc, num: '02' },
    { icon: BrainCircuit, title: t.pipeline.stage3Title, desc: t.pipeline.stage3Desc, num: '03' },
    { icon: ShieldCheck, title: t.pipeline.stage4Title, desc: t.pipeline.stage4Desc, num: '04' },
  ];

  return (
    <div className="relative">
      {/* Desktop horizontal */}
      <div className="hidden lg:block">
        <div className="flex items-stretch gap-0">
          {stages.map((stage, i) => (
            <div key={stage.num} className="flex items-stretch flex-1">
              <div className="glass rounded-2xl p-6 flex-1 hover:bg-white/[0.07] transition-colors group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-gold-300/60">{stage.num}</span>
                  <div className="w-11 h-11 rounded-xl bg-navy-600/40 border border-white/10 flex items-center justify-center group-hover:bg-gold-400/20 group-hover:border-gold-400/30 transition-colors">
                    <stage.icon className="w-5 h-5 text-gold-300" />
                  </div>
                </div>
                <h3 className="text-white font-semibold mb-2">{stage.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{stage.desc}</p>
              </div>
              {i < stages.length - 1 && (
                <div className="flex items-center px-3">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400/60 animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400/40 animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400/20 animate-pulse" style={{ animationDelay: '0.4s' }} />
                    <ArrowRight className="w-5 h-5 text-gold-400/60 rtl:rotate-180" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile vertical */}
      <div className="lg:hidden space-y-4">
        {stages.map((stage, i) => (
          <div key={stage.num}>
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-gold-300/60">{stage.num}</span>
                <div className="w-11 h-11 rounded-xl bg-navy-600/40 border border-white/10 flex items-center justify-center">
                  <stage.icon className="w-5 h-5 text-gold-300" />
                </div>
              </div>
              <h3 className="text-white font-semibold mb-2">{stage.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{stage.desc}</p>
            </div>
            {i < stages.length - 1 && (
              <div className="flex justify-center py-2">
                <ArrowRight className="w-5 h-5 text-gold-400/60 rotate-90" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
