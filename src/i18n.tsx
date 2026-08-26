import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Lang = 'en' | 'ar';

type LangContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  dir: 'ltr' | 'rtl';
  t: (typeof translations)[Lang];
};

const LangContext = createContext<LangContextValue | null>(null);

export const translations = {
  en: {
    dir: 'ltr' as const,
    nav: {
      brand: 'Wuthuq AI',
      brandSub: 'وثوق AI',
      home: 'Home',
      dashboard: 'Demo Dashboard',
      governance: 'Governance',
      cta: 'Request Demo',
    },
    hero: {
      badge: 'Aligned with SDAIA AI Ethics · ITU-T Y.3172',
      title: 'AI-Powered Credit Scoring for Saudi Arabia',
      subtitle:
        'Wuthuq AI helps banks and fintech lenders make fair, transparent, and data-driven credit decisions — advancing financial inclusion across the Kingdom.',
      ctaPrimary: 'Try the Live Demo',
      ctaSecondary: 'Explore Governance',
      stat1Value: '850',
      stat1Label: 'Score Range',
      stat2Value: '< 2s',
      stat2Label: 'Decision Latency',
      stat3Value: 'Y.3172',
      stat3Label: 'ITU Standard',
      stat4Value: 'PDPL',
      stat4Label: 'Compliant',
    },
    pipeline: {
      title: 'How It Works',
      subtitle:
        'A four-stage pipeline following the ITU-T Y.3172 architectural framework for machine learning assisted decision making.',
      stage1Title: 'Data Sources',
      stage1Desc:
        'Consented financial data, transaction history, and alternative data streams — collected lawfully under PDPL.',
      stage2Title: 'Processing',
      stage2Desc:
        'Feature engineering, normalization, and bias-aware preprocessing to ensure fair representation across demographics.',
      stage3Title: 'ML Model',
      stage3Desc:
        'Explainable ensemble model trained on anonymized data, producing a calibrated credit score with confidence intervals.',
      stage4Title: 'Decision & Policy',
      stage4Desc:
        'Risk classification mapped to lender policy rules, with human-in-the-loop review for edge cases and appeals.',
      arrow: '→',
    },
    features: {
      title: 'Built for Responsible Lending',
      subtitle: 'Every decision is auditable, explainable, and aligned with Saudi regulatory frameworks.',
      f1Title: 'Explainable AI',
      f1Desc:
        'Every score comes with a human-readable explanation of the top contributing factors — no black boxes.',
      f2Title: 'Bias Guardrails',
      f2Desc:
        'Continuous fairness monitoring across gender, age, and region to prevent discriminatory outcomes.',
      f3Title: 'Financial Inclusion',
      f3Desc:
        'Alternative data signals help thin-file applicants access credit they would be denied by traditional scoring.',
      f4Title: 'Regulatory Alignment',
      f4Desc:
        'Designed against SAMA guidelines, PDPL data protection, and SDAIA AI ethics principles from day one.',
    },
    dashboard: {
      title: 'Live Credit Assessment Demo',
      subtitle:
        'Enter the applicant details below to generate an instant credit score and risk classification.',
      monthlyIncome: 'Monthly Income (SAR)',
      monthlyIncomePh: 'e.g. 12,000',
      existingDebts: 'Existing Monthly Debt Payments (SAR)',
      existingDebtsPh: 'e.g. 3,500',
      loanAmount: 'Requested Loan Amount (SAR)',
      loanAmountPh: 'e.g. 50,000',
      age: 'Applicant Age',
      agePh: 'e.g. 32',
      employment: 'Employment Status',
      employmentOptions: ['Employed', 'Self-employed', 'Government', 'Retired'],
      assess: 'Assess Creditworthiness',
      assessing: 'Saving assessment...',
      saveError: 'We could not save this assessment. Please try again.',
      reset: 'New Assessment',
      scoreLabel: 'Credit Score',
      riskLabel: 'Risk Level',
      explanationLabel: 'Why This Score',
      badge: 'Powered by K-Nearest Neighbors ML Model',
      mlTooltip: 'This model learns from historical patterns in similar applications rather than using fixed rules.',
      low: 'Low Risk',
      medium: 'Medium Risk',
      high: 'High Risk',
      dti: 'Debt-to-Income Ratio',
      factors: 'Key Factors',
      disclaimer:
        'This is a demonstration using a simplified scoring model. Production deployments use calibrated models validated against historical portfolio data.',
      factorIncome: 'Stable income relative to obligations',
      factorDti: 'Debt-to-income ratio',
      factorAge: 'Credit history length proxy',
      factorEmployment: 'Employment stability',
      factorBuffer: 'Residual income buffer',
      positive: 'favors approval',
      neutral: 'neutral',
      negative: 'increases risk',
    },
    governance: {
      title: 'Governance & Responsible AI',
      subtitle:
        'Wuthuq AI is built on four governance pillars that ensure fairness, privacy, accountability, and human oversight.',
      p1Title: 'Bias Guardrails',
      p1Desc:
        'Models are evaluated for disparate impact across protected attributes before deployment and re-audited quarterly. Drift detection triggers automatic alerts when subgroup performance deviates beyond set thresholds.',
      p1Tag: 'Fairness',
      p2Title: 'PDPL Compliance',
      p2Desc:
        'All personal data is processed under explicit consent, stored within Saudi data residency boundaries, and handled per the Personal Data Protection Law. Data subjects can access, correct, and request deletion of their data.',
      p2Tag: 'Privacy',
      p3Title: 'SAMA Regulatory Alignment',
      p3Desc:
        'Decision logic maps to Saudi Central Bank (SAMA) responsible lending guidelines, including debt-burden ratio limits and responsible finance principles. Audit logs are retained for regulatory inspection.',
      p3Tag: 'Regulation',
      p4Title: 'Human Oversight',
      p4Desc:
        'Every automated decision can be reviewed, overridden, and appealed by a human credit officer. High-impact denials require sign-off before being communicated to the applicant.',
      p4Tag: 'Accountability',
      principlesTitle: 'SDAIA AI Ethics Principles',
      principles: [
        'Fairness & Non-discrimination',
        'Transparency & Explainability',
        'Privacy & Security',
        'Accountability',
        'Reliability & Safety',
        'Human Oversight',
      ],
      ituTitle: 'ITU-T Y.3172 Compliance',
      ituSubtitle:
        'ITU-T Y.3172 defines an architectural framework for machine learning-assisted decision making. Wuthuq AI maps each stage of its pipeline to the standard\u2019s requirements for responsible, auditable AI.',
      ituStage1Title: 'Data Source \u2192 Data Collection & Governance',
      ituStage1Desc:
        'Y.3172 requires that data acquisition be lawful, consented, and traceable. Wuthuq AI ingests only PDPL-consented financial and alternative data, with full provenance logging for every field used in scoring.',
      ituStage2Title: 'Processing \u2192 Feature Engineering & Preprocessing',
      ituStage2Desc:
        'The standard mandates bias-aware preprocessing and documented feature pipelines. Wuthuq AI applies normalization, fairness-aware sampling, and protected-attribute exclusion, with transformations version-controlled and replayable for audit.',
      ituStage3Title: 'ML Model \u2192 Model Training & Validation',
      ituStage3Desc:
        'Y.3172 calls for explainable, validated models with performance and fairness metrics recorded. Wuthuq AI uses an explainable ensemble, validated for calibration and disparate impact, with model cards capturing training data, metrics, and limitations.',
      ituStage4Title: 'Decision/Policy \u2192 Decision & Human Oversight',
      ituStage4Desc:
        'The standard requires that automated decisions be governed by policy rules with human-in-the-loop review. Wuthuq AI maps scores to lender policy thresholds, routes edge cases to credit officers, and logs every decision for appeal and regulatory inspection.',
      ituCapabilitiesTitle: 'Y.3172 Capabilities Implemented',
      ituCapabilities: [
        'Data provenance & lineage tracking',
        'Bias detection & fairness metrics',
        'Model explainability & interpretability',
        'Decision audit logging',
        'Human-in-the-loop override',
        'Continuous performance monitoring',
      ],
    },
    footer: {
      tagline: 'Responsible AI credit scoring for the Kingdom of Saudi Arabia.',
      product: 'Product',
      productLinks: ['Demo Dashboard', 'Governance', 'Request Demo'],
      company: 'Company',
      companyLinks: ['About', 'Careers', 'Contact'],
      legal: 'Legal',
      legalLinks: ['Privacy Policy', 'Terms of Service', 'PDPL Notice'],
      rights: 'All rights reserved.',
    },
  },
  ar: {
    dir: 'rtl' as const,
    nav: {
      brand: 'وثوق AI',
      brandSub: 'Wuthuq AI',
      home: 'الرئيسية',
      dashboard: 'لوحة تجريبية',
      governance: 'الحوكمة',
      cta: 'اطلب عرضاً',
    },
    hero: {
      badge: 'متوافق مع مبادئ أخلاقيات الذكاء الاصطناعي لـ SDAIA · ITU-T Y.3172',
      title: 'التسجيل الائتماني بالذكاء الاصطناعي للمملكة العربية السعودية',
      subtitle:
        'يساعد وثوق AI البنوك وشركات التقنية المالية على اتخاذ قرارات ائتمانية عادلة وشفافة ومدفوعة بالبيانات — لتعزيز الشمول المالي في المملكة.',
      ctaPrimary: 'جرّب العرض المباشر',
      ctaSecondary: 'استكشف الحوكمة',
      stat1Value: '850',
      stat1Label: 'نطاق النتيجة',
      stat2Value: '< 2ث',
      stat2Label: 'زمن القرار',
      stat3Value: 'Y.3172',
      stat3Label: 'معيار ITU',
      stat4Value: 'PDPL',
      stat4Label: 'متوافق',
    },
    pipeline: {
      title: 'كيف يعمل',
      subtitle: 'مسار من أربع مراحل يتبع إطار ITU-T Y.3172 المعماري لاتخاذ القرار بمساعدة التعلم الآلي.',
      stage1Title: 'مصادر البيانات',
      stage1Desc:
        'بيانات مالية بموافقة المستخدم، وتاريخ المعاملات، ومصادر بيانات بديلة — تُجمع بشكل قانوني وفق نظام حماية البيانات الشخصية.',
      stage2Title: 'المعالجة',
      stage2Desc:
        'هندسة الميزات والتطبيع والمعالجة المسبقة الواعية بالتحيز لضمان تمثيل عادل عبر الفئات الديموغرافية.',
      stage3Title: 'نموذج التعلم الآلي',
      stage3Desc:
        'نموذج تفسيري مُدرّب على بيانات مجهولة الهوية، ينتج درجة ائتمانية معايرة مع فواصل ثقة.',
      stage4Title: 'القرار والسياسة',
      stage4Desc:
        'تصنيف المخاطر مرتبط بقواعد سياسة المُقرض، مع مراجعة بشرية للحالات الحدية والطعون.',
      arrow: '←',
    },
    features: {
      title: 'مصمم للإقراض المسؤول',
      subtitle: 'كل قرار قابل للتدقيق والتفسير، ومتوافق مع الأطر التنظيمية السعودية.',
      f1Title: 'ذكاء اصطناعي تفسيري',
      f1Desc: 'كل درجة تأتي مع شرح مقروء للعوامل الرئيسية المساهمة — لا صناديق سوداء.',
      f2Title: 'حواجز التحيز',
      f2Desc: 'مراقبة مستمرة للعدالة عبر الجنس والعمر والمنطقة لمنع النتائج التمييزية.',
      f3Title: 'الشمول المالي',
      f3Desc: 'إشارات البيانات البديلة تساعد المتقدمين ذوي الملفات الرفيعة على الوصول للائتمان.',
      f4Title: 'التوافق التنظيمي',
      f4Desc: 'مصمم وفق إرشادات SAMA وحماية البيانات PDPL ومبادئ SDAIA لأخلاقيات الذكاء الاصطناعي.',
    },
    dashboard: {
      title: 'تقييم ائتماني مباشر تجريبي',
      subtitle: 'أدخل بيانات المتقدم أدناه لإنشاء درجة ائتمانية فورية وتصنيف للمخاطر.',
      monthlyIncome: 'الدخل الشهري (ريال)',
      monthlyIncomePh: 'مثال: 12,000',
      existingDebts: 'الديون الشهرية الحالية (ريال)',
      existingDebtsPh: 'مثال: 3,500',
      loanAmount: 'مبلغ القرض المطلوب (ريال)',
      loanAmountPh: 'مثال: 50,000',
      age: 'عمر المتقدم',
      agePh: 'مثال: 32',
      employment: 'حالة التوظيف',
      employmentOptions: ['موظف', 'عمل حر', 'حكومي', 'متقاعد'],
      assess: 'قيّم الجدارة الائتمانية',
      assessing: 'جاري حفظ التقييم...',
      saveError: 'تعذر حفظ هذا التقييم. يرجى المحاولة مرة أخرى.',
      reset: 'تقييم جديد',
      scoreLabel: 'الدرجة الائتمانية',
      riskLabel: 'مستوى المخاطر',
      explanationLabel: 'لماذا هذه الدرجة',
      badge: 'مدعوم بنموذج K-Nearest Neighbors للتعلم الآلي',
      mlTooltip: 'يتعلم هذا النموذج من الأنماط التاريخية في الطلبات المشابهة بدلاً من استخدام قواعد ثابتة.',
      low: 'مخاطر منخفضة',
      medium: 'مخاطر متوسطة',
      high: 'مخاطر مرتفعة',
      dti: 'نسبة الدين إلى الدخل',
      factors: 'العوامل الرئيسية',
      disclaimer:
        'هذا عرض توضيحي باستخدام نموذج تسجيل مبسط. تستخدم عمليات النشر الإنتاجية نماذج معايرة ومُتحقق منها مقابل بيانات محفظة تاريخية.',
      factorIncome: 'دخل مستقر مقارنة بالالتزامات',
      factorDti: 'نسبة الدين إلى الدخل',
      factorAge: 'مؤشر طول التاريخ الائتماني',
      factorEmployment: 'استقرار التوظيف',
      factorBuffer: 'هامش الدخل المتبقي',
      positive: 'يفضّل الموافقة',
      neutral: 'محايد',
      negative: 'يزيد المخاطر',
    },
    governance: {
      title: 'الحوكمة والذكاء الاصطناعي المسؤول',
      subtitle: 'بُني وثوق AI على أربع ركائز حوكمة تضمن العدالة والخصوصية والمساءلة والإشراف البشري.',
      p1Title: 'حواجز التحيز',
      p1Desc:
        'تُقيّم النماذج للتأثير التفاضلي عبر السمات المحمية قبل النشر وتُدقق ربع سنوياً. يُطلق اكتشاف الانحراف تنبيهات تلقائية عند تجاوز أداء المجموعات الفرعية للحدود المحددة.',
      p1Tag: 'العدالة',
      p2Title: 'الامتثال لـ PDPL',
      p2Desc:
        'تُعالج جميع البيانات الشخصية بموافقة صريحة، وتُخزن ضمن حدود إقامة البيانات السعودية، وفق نظام حماية البيانات الشخصية. يمكن لأصحاب البيانات الوصول وتصحيح وحذف بياناتهم.',
      p2Tag: 'الخصوصية',
      p3Title: 'التوافق مع لوائح SAMA',
      p3Desc:
        'ترتبط منطق القرار بإرشادات البنك المركزي السعودي (SAMA) للإقراض المسؤول، بما في ذلك حدود نسبة عبء الدين ومبادئ التمويل المسؤول. تُحتفظ بسجلات التدقيق للتفتيش التنظيمي.',
      p3Tag: 'التنظيم',
      p4Title: 'الإشراف البشري',
      p4Desc:
        'كل قرار آلي يمكن مراجعته وتجاوزه والطعن فيه من قبل مسؤول ائتماني بشري. تتطلب الرفض عالي التأثير موافقة قبل إبلاغ المتقدم.',
      p4Tag: 'المساءلة',
      principlesTitle: 'مبادئ SDAIA لأخلاقيات الذكاء الاصطناعي',
      principles: [
        'العدالة وعدم التمييز',
        'الشفافية والقابلية للتفسير',
        'الخصوصية والأمان',
        'المساءلة',
        'الموثوقية والسلامة',
        'الإشراف البشري',
      ],
      ituTitle: 'الامتثال لمعيار ITU-T Y.3172',
      ituSubtitle:
        'يحدد معيار ITU-T Y.3172 إطاراً معمارياً لاتخاذ القرار بمساعدة التعلم الآلي. يربط وثوق AI كل مرحلة من مساره بهذا المعيار لضمان ذكاء اصطناعي مسؤول وقابل للتدقيق.',
      ituStage1Title: 'مصدر البيانات ← جمع البيانات وحوكامتها',
      ituStage1Desc:
        'يتطلب Y.3172 أن يكون الحصول على البيانات قانونياً وبموافقة وقابلاً للتتبع. يستقبل وثوق AI فقط البيانات المالية والبديلة بموافقة وفق PDPL، مع تسجيل كامل لمصدر كل حقل يُستخدم في التسجيل.',
      ituStage2Title: 'المعالجة ← هندسة الميزات والمعالجة المسبقة',
      ituStage2Desc:
        'يفرض المعيار معالجة مسبقة واعية بالتحيز ومسارات ميزات موثقة. يطبق وثوق AI التطبيع وأخذ العينات الواعية بالعدالة واستبعاد السمات المحمية، مع تحويلات خاضعة للتحكم في الإصدار وقابلة لإعادة التشغيل للتدقيق.',
      ituStage3Title: 'نموذج التعلم الآلي ← تدريب النموذج والتحقق',
      ituStage3Desc:
        'يستدعي Y.3172 نماذج تفسيرية ومتحقق منها مع تسجيل مقاييس الأداء والعدالة. يستخدم وثوق AI نموذجاً تفسيرياً، مُتحقق منه من المعايرة والتأثير التفاضلي، مع بطاقات نموذج توثق بيانات التدقيق والمقاييس والقيود.',
      ituStage4Title: 'القرار/السياسة ← القرار والإشراف البشري',
      ituStage4Desc:
        'يتطلب المعيار أن تحكم قواعد السياسة القرارات الآلية مع مراجعة بشرية. يربط وثوق AI الدرجات بحدود سياسة المُقرض، ويوجّه الحالات الحدية لمسؤولي الائتمان، ويسجل كل قرار للطعن والتفتيش التنظيمي.',
      ituCapabilitiesTitle: 'قدرات Y.3172 المُنفذة',
      ituCapabilities: [
        'تتبع مصدر البيانات وسلسلة النسب',
        'اكتشاف التحيز ومقاييس العدالة',
        'تفسير النموذج وقابلية الفهم',
        'تسجيل تدقيق القرارات',
        'تجاوز بشري في الحلقة',
        'مراقبة مستمرة للأداء',
      ],
    },
    footer: {
      tagline: 'تسجيل ائتماني مسؤول بالذكاء الاصطناعي للمملكة العربية السعودية.',
      product: 'المنتج',
      productLinks: ['لوحة تجريبية', 'الحوكمة', 'اطلب عرضاً'],
      company: 'الشركة',
      companyLinks: ['من نحن', 'الوظائف', 'تواصل'],
      legal: 'قانوني',
      legalLinks: ['سياسة الخصوصية', 'شروط الخدمة', 'إشعار PDPL'],
      rights: 'جميع الحقوق محفوظة.',
    },
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const value: LangContextValue = {
    lang,
    setLang,
    dir: lang === 'ar' ? 'rtl' : 'ltr',
    t: translations[lang],
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
