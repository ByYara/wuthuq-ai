import { useState, type FormEvent } from 'react';
import { BrainCircuit, CheckCircle2, CircleAlert, Info, RotateCcw, Sparkles } from 'lucide-react';
import { useLang } from '@/i18n';
import { predictCredit } from '@/knn';
import { supabase } from '@/supabaseClient';

type Assessment = {
  score: number;
  risk: 'low' | 'medium' | 'high';
  dti: number;
  factors: { label: string; signal: 'positive' | 'neutral' | 'negative' }[];
};

async function getDemoUserId(): Promise<string> {
  const storedUserId = window.localStorage.getItem('wuthuq-demo-user-id');

  if (storedUserId) {
    const { data, error } = await supabase.from('users').select('id').eq('id', storedUserId).maybeSingle();
    if (error) throw error;
    if (data?.id) return data.id;
  }

  const { data, error } = await supabase.from('users').insert({}).select('id').maybeSingle();
  if (error) throw error;
  if (!data?.id) throw new Error('Unable to create demo user');

  window.localStorage.setItem('wuthuq-demo-user-id', data.id);
  return data.id;
}

export default function DashboardPage() {
  const { t } = useLang();
  const [income, setIncome] = useState('');
  const [debts, setDebts] = useState('');
  const [loan, setLoan] = useState('');
  const [age, setAge] = useState('');
  const [employment, setEmployment] = useState(t.dashboard.employmentOptions[0]);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [isAssessing, setIsAssessing] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const assess = async (e: FormEvent) => {
    e.preventDefault();
    const monthlyIncome = Number(income);
    const monthlyDebts = Number(debts);
    const prediction = predictCredit(monthlyIncome, monthlyDebts);
    const dti = prediction.dti;
    const factors: Assessment['factors'] = [
      { label: t.dashboard.factorIncome, signal: monthlyIncome >= 10000 ? 'positive' : monthlyIncome >= 5000 ? 'neutral' : 'negative' },
      { label: t.dashboard.factorDti, signal: dti <= 35 ? 'positive' : dti <= 50 ? 'neutral' : 'negative' },
      { label: t.dashboard.factorAge, signal: 'neutral' },
      { label: t.dashboard.factorEmployment, signal: 'neutral' },
      { label: t.dashboard.factorBuffer, signal: monthlyIncome - monthlyDebts >= 7000 ? 'positive' : monthlyIncome - monthlyDebts >= 3500 ? 'neutral' : 'negative' },
    ];

    setIsAssessing(true);
    setSaveError(null);

    try {
      const userId = await getDemoUserId();
      const { data: financialRecord, error: financialError } = await supabase
        .from('financial_records')
        .insert({
          user_id: userId,
          monthly_income: monthlyIncome,
          existing_debts: monthlyDebts,
          debt_to_income_ratio: monthlyIncome > 0 ? monthlyDebts / monthlyIncome : 1,
          loan_amount: Number(loan),
          age: Number(age),
          employment_status: employment,
        })
        .select('id')
        .maybeSingle();

      if (financialError) throw financialError;
      if (!financialRecord?.id) throw new Error('Unable to save financial record');

      const { data: creditAssessment, error: assessmentError } = await supabase
        .from('credit_assessments')
        .insert({
          financial_record_id: financialRecord.id,
          credit_score: prediction.score,
          risk_level: prediction.risk,
          explanation: `KNN prediction based on ${prediction.neighbors.length} nearest historical examples.`,
        })
        .select('id')
        .maybeSingle();

      if (assessmentError) throw assessmentError;
      if (!creditAssessment?.id) throw new Error('Unable to save credit assessment');

      const { error: auditError } = await supabase.from('compliance_audit_logs').insert({
        assessment_id: creditAssessment.id,
        pdpl_compliant: true,
        bias_detected: false,
      });

      if (auditError) throw auditError;
      setAssessment({ score: prediction.score, risk: prediction.risk, dti, factors });
    } catch {
      setSaveError(t.dashboard.saveError);
    } finally {
      setIsAssessing(false);
    }
  };

  const reset = () => {
    setAssessment(null);
    setSaveError(null);
    setIncome('');
    setDebts('');
    setLoan('');
    setAge('');
  };

  const riskLabel = assessment?.risk === 'low' ? t.dashboard.low : assessment?.risk === 'medium' ? t.dashboard.medium : t.dashboard.high;
  const riskColor = assessment?.risk === 'low' ? 'text-emerald-400' : assessment?.risk === 'medium' ? 'text-amber-400' : 'text-rose-400';
  const riskBg = assessment?.risk === 'low' ? 'bg-emerald-400/10 border-emerald-400/20' : assessment?.risk === 'medium' ? 'bg-amber-400/10 border-amber-400/20' : 'bg-rose-400/10 border-rose-400/20';

  return (
    <div className="pt-28 pb-20 animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-gold-300 text-sm font-medium mb-4">
            <BrainCircuit className="w-4 h-4" />
            {t.dashboard.badge}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{t.dashboard.title}</h1>
          <p className="text-slate-400 max-w-2xl">{t.dashboard.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <form onSubmit={assess} className="lg:col-span-2 glass rounded-2xl p-6 sm:p-8 self-start">
            <div className="space-y-5">
              <Field label={t.dashboard.monthlyIncome} placeholder={t.dashboard.monthlyIncomePh} value={income} onChange={setIncome} required />
              <Field label={t.dashboard.existingDebts} placeholder={t.dashboard.existingDebtsPh} value={debts} onChange={setDebts} required />
              <Field label={t.dashboard.loanAmount} placeholder={t.dashboard.loanAmountPh} value={loan} onChange={setLoan} required />
              <Field label={t.dashboard.age} placeholder={t.dashboard.agePh} value={age} onChange={setAge} required />
              <label className="block">
                <span className="block text-sm font-medium text-slate-300 mb-2">{t.dashboard.employment}</span>
                <select value={employment} onChange={(e) => setEmployment(e.target.value)} className="w-full rounded-xl border border-white/10 bg-navy-900 text-white px-4 py-3 outline-none focus:border-gold-400/60 transition-colors">
                  {t.dashboard.employmentOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
              <button type="submit" disabled={isAssessing} className="w-full flex items-center justify-center gap-2 rounded-xl bg-gold-400 text-navy-950 font-semibold py-3.5 hover:bg-gold-300 disabled:opacity-70 transition-all">
                {isAssessing ? t.dashboard.assessing : <><Sparkles className="w-4 h-4" /> {t.dashboard.assess}</>}
              </button>
              {saveError && (
                <div className="flex items-center gap-2 text-sm text-rose-400 bg-rose-400/10 border border-rose-400/20 rounded-xl px-4 py-3">
                  <CircleAlert className="w-4 h-4 flex-shrink-0" />
                  <span>{saveError}</span>
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-6 text-xs text-slate-500 leading-relaxed">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{t.dashboard.disclaimer}</span>
            </div>
          </form>

          <div className="lg:col-span-3">
            {!assessment ? (
              <div className="h-full min-h-[460px] glass rounded-2xl flex flex-col items-center justify-center text-center p-8 border-dashed border-white/10">
                <div className="w-20 h-20 rounded-3xl bg-navy-600/40 border border-white/10 flex items-center justify-center mb-6 animate-float">
                  <BrainCircuit className="w-10 h-10 text-gold-300" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">{t.dashboard.assess}</h2>
                <p className="text-slate-500 max-w-sm">{t.dashboard.subtitle}</p>
              </div>
            ) : (
              <div className="space-y-5 animate-slide-in">
                <div className="glass rounded-2xl p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div>
                      <div className="text-sm text-slate-400 mb-1">{t.dashboard.scoreLabel}</div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-6xl font-bold text-white tabular-nums">{assessment.score}</span>
                        <span className="text-slate-500">/ 850</span>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-xl border ${riskBg} ${riskColor} font-semibold`}>{riskLabel}</div>
                  </div>
                  <div className="h-3 bg-navy-900 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-1000 ${assessment.risk === 'low' ? 'bg-emerald-400' : assessment.risk === 'medium' ? 'bg-amber-400' : 'bg-rose-400'}`} style={{ width: `${((assessment.score - 300) / 550) * 100}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-2"><span>300</span><span>540</span><span>680</span><span>850</span></div>
                </div>

                <div className="glass rounded-2xl p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-white font-semibold">{t.dashboard.explanationLabel}</h2>
                    <div className="text-sm text-slate-400"><span className="text-gold-300 font-semibold">{assessment.dti}%</span> {t.dashboard.dti}</div>
                  </div>
                  <div className="space-y-4">
                    {assessment.factors.map((factor) => {
                      const isPositive = factor.signal === 'positive';
                      const isNeutral = factor.signal === 'neutral';
                      return <div key={factor.label} className="flex items-center gap-3"><div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isPositive ? 'bg-emerald-400/10 text-emerald-400' : isNeutral ? 'bg-amber-400/10 text-amber-400' : 'bg-rose-400/10 text-rose-400'}`}>{isPositive ? <CheckCircle2 className="w-4 h-4" /> : isNeutral ? <Info className="w-4 h-4" /> : <CircleAlert className="w-4 h-4" />}</div><span className="text-sm text-slate-300 flex-1">{factor.label}</span><span className={`text-xs ${isPositive ? 'text-emerald-400' : isNeutral ? 'text-amber-400' : 'text-rose-400'}`}>{isPositive ? t.dashboard.positive : isNeutral ? t.dashboard.neutral : t.dashboard.negative}</span></div>;
                    })}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
                  <div title={t.dashboard.mlTooltip} className="flex items-center gap-2 text-xs text-slate-500 cursor-help"><BrainCircuit className="w-4 h-4 text-gold-300" /> {t.dashboard.badge}</div>
                  <button onClick={reset} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"><RotateCcw className="w-4 h-4" /> {t.dashboard.reset}</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder, value, onChange, required }: { label: string; placeholder: string; value: string; onChange: (value: string) => void; required?: boolean }) {
  return <label className="block"><span className="block text-sm font-medium text-slate-300 mb-2">{label}</span><input required={required} type="number" min="0" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-xl border border-white/10 bg-navy-900 text-white placeholder:text-slate-600 px-4 py-3 outline-none focus:border-gold-400/60 transition-colors" /></label>;
}
