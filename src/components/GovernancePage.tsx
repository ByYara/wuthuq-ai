import { useLang } from '@/i18n';
import { Eye, LockKeyhole, Scale, UserRoundCheck, Check, ShieldCheck, Network, Database, Cpu, BrainCircuit, ArrowRight } from 'lucide-react';

export default function GovernancePage() {
  const { t } = useLang();
  const pillars = [
    { icon: Scale, title: t.governance.p1Title, desc: t.governance.p1Desc, tag: t.governance.p1Tag, color: 'text-gold-300', bg: 'bg-gold-400/10' },
    { icon: LockKeyhole, title: t.governance.p2Title, desc: t.governance.p2Desc, tag: t.governance.p2Tag, color: 'text-sky-300', bg: 'bg-sky-400/10' },
    { icon: ShieldCheck, title: t.governance.p3Title, desc: t.governance.p3Desc, tag: t.governance.p3Tag, color: 'text-emerald-300', bg: 'bg-emerald-400/10' },
    { icon: UserRoundCheck, title: t.governance.p4Title, desc: t.governance.p4Desc, tag: t.governance.p4Tag, color: 'text-amber-300', bg: 'bg-amber-400/10' },
  ];

  return (
    <div className="pt-28 pb-20 animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-gold-300 text-sm font-medium mb-4"><Eye className="w-4 h-4" /> SDAIA AI Ethics Framework</div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">{t.governance.title}</h1>
          <p className="text-lg text-slate-400 leading-relaxed">{t.governance.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {pillars.map((pillar, i) => (
            <article key={pillar.title} className="glass rounded-2xl p-7 sm:p-8 hover:bg-white/[0.07] transition-all hover:-translate-y-1" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex items-start justify-between mb-6">
                <div className={`w-12 h-12 rounded-xl ${pillar.bg} border border-white/10 flex items-center justify-center`}><pillar.icon className={`w-6 h-6 ${pillar.color}`} /></div>
                <span className="text-xs font-medium text-slate-400 border border-white/10 rounded-full px-3 py-1">{pillar.tag}</span>
              </div>
              <h2 className="text-xl font-semibold text-white mb-3">{pillar.title}</h2>
              <p className="text-slate-400 leading-relaxed text-sm">{pillar.desc}</p>
            </article>
          ))}
        </div>

        <section className="mt-16 glass rounded-2xl p-8 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-xl bg-gold-400/10 flex items-center justify-center"><ShieldCheck className="w-5 h-5 text-gold-300" /></div><h2 className="text-xl font-semibold text-white">{t.governance.principlesTitle}</h2></div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xl">Wuthuq AI translates national AI ethics principles into measurable controls throughout the model lifecycle — from data collection to post-decision monitoring.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:w-1/2">
              {t.governance.principles.map((principle) => <div key={principle} className="flex items-center gap-2 text-sm text-slate-300"><Check className="w-4 h-4 text-gold-300" /> {principle}</div>)}
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-10">
            <div className="flex items-center gap-2 text-gold-300 text-sm font-medium mb-4"><Network className="w-4 h-4" /> ITU-T Y.3172</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{t.governance.ituTitle}</h2>
            <p className="text-slate-400 max-w-3xl leading-relaxed">{t.governance.ituSubtitle}</p>
          </div>

          <div className="space-y-4">
            {[
              { icon: Database, title: t.governance.ituStage1Title, desc: t.governance.ituStage1Desc, num: '01' },
              { icon: Cpu, title: t.governance.ituStage2Title, desc: t.governance.ituStage2Desc, num: '02' },
              { icon: BrainCircuit, title: t.governance.ituStage3Title, desc: t.governance.ituStage3Desc, num: '03' },
              { icon: ShieldCheck, title: t.governance.ituStage4Title, desc: t.governance.ituStage4Desc, num: '04' },
            ].map((stage, i) => (
              <div key={stage.num} className="glass rounded-2xl p-6 sm:p-7 hover:bg-white/[0.07] transition-all group">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="flex items-center gap-3 sm:flex-col sm:items-center sm:gap-2 sm:w-20 flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-navy-600/40 border border-white/10 flex items-center justify-center group-hover:bg-gold-400/20 group-hover:border-gold-400/30 transition-colors">
                      <stage.icon className="w-5 h-5 text-gold-300" />
                    </div>
                    <span className="text-xs font-mono text-gold-300/60">{stage.num}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-2">{stage.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{stage.desc}</p>
                  </div>
                  {i < 3 && (
                    <div className="hidden sm:flex items-center justify-center sm:w-8 flex-shrink-0">
                      <ArrowRight className="w-5 h-5 text-gold-400/40 rtl:rotate-180" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 glass rounded-2xl p-8 sm:p-10">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-400/10 flex items-center justify-center"><Network className="w-5 h-5 text-gold-300" /></div>
                  <h3 className="text-xl font-semibold text-white">{t.governance.ituCapabilitiesTitle}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xl">Wuthuq AI implements the core Y.3172 capabilities across its pipeline, ensuring every decision is traceable, fair, and reviewable.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:w-1/2">
                {t.governance.ituCapabilities.map((cap) => (
                  <div key={cap} className="flex items-center gap-2 text-sm text-slate-300"><Check className="w-4 h-4 text-gold-300" /> {cap}</div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
