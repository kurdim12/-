export type Lang = "en" | "ar";

export const translations = {
  en: {
    brand: {
      name: "Sehha-GIS",
      tagline: "National Health Intelligence Layer for Jordan",
      submission: "Submitted to HAAC 2026 · Built on Hakeem data",
    },
    nav: {
      home: "Overview",
      capacity: "Capacity",
      surveillance: "Surveillance",
      specialists: "Specialists",
      about: "About",
    },
    common: {
      governorate: "Governorate",
      population: "Population",
      explore: "Explore",
      learnMore: "Learn more",
      legend: "Legend",
      info: "Info",
      filter: "Filter",
      timeRange: "Time range",
      months12: "Last 12 months",
      months24: "Last 24 months",
      months36: "Last 36 months",
      forecast12: "12-month forecast",
      rank: "Rank",
      priority: "Priority",
      change: "Change",
      total: "Total",
      average: "Average",
      none: "None",
      all: "All",
      loading: "Loading map…",
      language: "العربية",
    },
    home: {
      hero: "National Health Intelligence Layer for Jordan",
      subhero:
        "Sehha-GIS turns Hakeem's 7 million patient records into a map that shows where to build hospitals, where outbreaks are starting, and where Jordanians travel too far for specialist care.",
      kpis: {
        population: "Population Covered",
        facilities: "Active Facilities",
        specialists: "Specialists Mapped",
        priorityZones: "High-Priority Zones",
      },
      layers: {
        title: "Map Layers",
        capacity: "Capacity",
        surveillance: "Disease Incidence",
        specialists: "Specialist Gaps",
      },
      modules: {
        capacity: {
          title: "Hospital Capacity Planning",
          desc: "Choropleth of beds per 1,000 with under-capacity zones flagged for investment.",
        },
        surveillance: {
          title: "Disease Surveillance & Forecasting",
          desc: "12-month forecasts per governorate with outbreak alerts above 2σ from baseline.",
        },
        specialists: {
          title: "Specialist Access Gaps",
          desc: "Specialists per 100k by specialty with a Travel Burden Index for each region.",
        },
      },
    },
    capacity: {
      title: "Hospital Capacity Planning",
      subtitle: "Where should Jordan build or expand the next hospital?",
      kpis: {
        bedsPer1k: "Avg Beds / 1,000",
        occupancy: "Avg Occupancy",
        under: "Under-Capacity Governorates",
      },
      table: {
        title: "Priority Investment Zones",
        rank: "Rank",
        governorate: "Governorate",
        beds: "Beds",
        per1k: "Beds / 1k",
        occupancy: "Occupancy",
        projectedDemand: "12-mo Demand",
        status: "Status",
      },
      status: {
        under: "Under-Capacity",
        balanced: "Balanced",
        over: "Over-Capacity",
      },
      tooltips: {
        bedsPer1k:
          "Hospital beds per 1,000 residents — WHO benchmark is roughly 3.0.",
        occupancy:
          "Average daily bed occupancy — over 85% indicates system strain.",
      },
    },
    surveillance: {
      title: "Disease Surveillance & Forecasting",
      subtitle: "Where is the next outbreak starting?",
      disease: "Condition",
      diseases: {
        diabetes: "Diabetes",
        hypertension: "Hypertension",
        flu: "Seasonal Flu",
        respiratory: "Chronic Respiratory",
      },
      kpis: {
        cases: "Total Cases (12mo)",
        mom: "MoM Change",
        alerts: "Governorates on Alert",
      },
      chart: {
        title: "Incidence & 12-month Forecast",
        history: "History",
        forecast: "Forecast",
        ci: "95% confidence",
      },
      watchlist: {
        title: "Watch List — Rising Trajectories",
        governorate: "Governorate",
        current: "Current monthly",
        projected: "Projected (12mo)",
        delta: "Δ",
        severity: "Severity",
      },
      severity: { high: "High", medium: "Medium", low: "Low" },
    },
    specialists: {
      title: "Specialist Access Gaps",
      subtitle: "Where do Jordanians travel too far for specialist care?",
      specialty: "Specialty",
      specialties: {
        cardiology: "Cardiology",
        oncology: "Oncology",
        pediatrics: "Pediatrics",
        neurology: "Neurology",
      },
      kpis: {
        total: "Specialists Mapped",
        per100k: "Avg per 100k",
        under: "Underserved Governorates",
      },
      table: {
        title: "Access Gaps & Travel Burden",
        governorate: "Governorate",
        specialists: "Specialists",
        per100k: "Per 100k",
        travelBurden: "Travel Burden",
        status: "Status",
      },
      status: {
        critical: "Critical Gap",
        underserved: "Underserved",
        adequate: "Adequate",
        wellServed: "Well-Served",
      },
      tooltips: {
        per100k: "Specialists per 100,000 residents in that governorate.",
        travelBurden:
          "Share of patients referred to facilities outside their governorate.",
      },
    },
    about: {
      title: "About Sehha-GIS",
      pitch: {
        title: "The pitch",
        p1: "Hakeem digitized over 7 million Jordanian patient records — one of the most comprehensive national EHR datasets in the region. But records become policy only when you can see them on a map.",
        p2: "Sehha-GIS turns Hakeem data into three actionable lenses: where to build the next hospital, where the next outbreak is starting, and where Jordanians travel too far for specialist care. One dashboard, three modules, twelve governorates, twelve-month forecasts.",
        p3: "Sehha-GIS is not a competitor to Hakeem — it is the intelligence layer that turns Hakeem into national policy.",
      },
      methodology: {
        title: "Methodology",
        p1: "This prototype runs on realistic synthetic data shaped to match published Jordanian epidemiology and facility distributions. Capacity figures are calibrated to WHO benchmarks; forecasts follow a base-trend-seasonality decomposition similar to Prophet or ARIMA outputs, with a 95% confidence band.",
      },
      limitations: {
        title: "Limitations",
        p1: "This is a hackathon prototype, not a production system. Data is synthetic and illustrative. The forecasting layer is a simplified seasonal model. Real deployment would require live Hakeem integration, formal model validation, and clinical review.",
      },
      roadmap: {
        title: "Future roadmap",
        items: [
          "Real-time Hakeem integration with anonymized claim-level rollups",
          "Mobile companion app for Ministry of Health regional officers",
          "SMS / WhatsApp alert pipeline for outbreak signals above 2σ",
        ],
      },
      author: "Author: Abdelrahman Elkurdi",
    },
    footer: {
      built: "Built on Hakeem data",
      submission: "Submitted to HAAC 2026",
      author: "© Abdelrahman Elkurdi",
    },
  },
  ar: {
    brand: {
      name: "صحة جي‑آي‑إس",
      tagline: "طبقة الذكاء الصحي الوطني للأردن",
      submission: "مقدّم إلى HAAC 2026 · مبنيّ على بيانات حكيم",
    },
    nav: {
      home: "نظرة عامة",
      capacity: "السعة",
      surveillance: "الترصّد",
      specialists: "الاختصاصيون",
      about: "حول",
    },
    common: {
      governorate: "المحافظة",
      population: "السكان",
      explore: "استكشاف",
      learnMore: "اعرف المزيد",
      legend: "المفتاح",
      info: "معلومات",
      filter: "تصفية",
      timeRange: "الفترة الزمنية",
      months12: "آخر 12 شهراً",
      months24: "آخر 24 شهراً",
      months36: "آخر 36 شهراً",
      forecast12: "توقع لـ 12 شهراً",
      rank: "الترتيب",
      priority: "الأولوية",
      change: "التغيّر",
      total: "الإجمالي",
      average: "المتوسط",
      none: "لا شيء",
      all: "الكل",
      loading: "جارٍ تحميل الخريطة…",
      language: "English",
    },
    home: {
      hero: "طبقة الذكاء الصحي الوطني للأردن",
      subhero:
        "تحوّل صحة جي‑آي‑إس سجلات حكيم لسبعة ملايين مريض إلى خريطة تكشف أين تُبنى المستشفيات، وأين تبدأ الموجات الوبائية، وأين يُضطرّ الأردنيون للسفر بعيداً لتلقي الرعاية التخصصية.",
      kpis: {
        population: "إجمالي السكان المشمولين",
        facilities: "المرافق الفعّالة",
        specialists: "الاختصاصيون المُعرَّفون",
        priorityZones: "مناطق ذات أولوية عالية",
      },
      layers: {
        title: "طبقات الخريطة",
        capacity: "السعة",
        surveillance: "معدلات الأمراض",
        specialists: "فجوات التخصص",
      },
      modules: {
        capacity: {
          title: "تخطيط سعة المستشفيات",
          desc: "خريطة لنِسَب الأسرّة لكل 1,000 نسمة مع تحديد المناطق ذات السعة الناقصة.",
        },
        surveillance: {
          title: "الترصّد الوبائي والتنبؤ",
          desc: "تنبؤات شهرية لـ 12 شهراً لكل محافظة مع تنبيهات للتجاوزات فوق انحرافين معياريين.",
        },
        specialists: {
          title: "فجوات الوصول للاختصاصيين",
          desc: "عدد الاختصاصيين لكل 100 ألف نسمة بحسب التخصص مع مؤشر عبء التنقّل.",
        },
      },
    },
    capacity: {
      title: "تخطيط سعة المستشفيات",
      subtitle: "أين ينبغي للأردن أن يبني أو يوسّع المستشفى التالي؟",
      kpis: {
        bedsPer1k: "متوسط الأسرّة / 1,000",
        occupancy: "متوسط الإشغال",
        under: "محافظات بسعة ناقصة",
      },
      table: {
        title: "مناطق الاستثمار ذات الأولوية",
        rank: "الترتيب",
        governorate: "المحافظة",
        beds: "الأسرّة",
        per1k: "أسرّة / ألف",
        occupancy: "الإشغال",
        projectedDemand: "الطلب المتوقّع (12ش)",
        status: "الحالة",
      },
      status: {
        under: "سعة ناقصة",
        balanced: "متوازنة",
        over: "سعة فائضة",
      },
      tooltips: {
        bedsPer1k: "أسرّة المستشفيات لكل 1,000 نسمة — معيار منظمة الصحة العالمية نحو 3.0.",
        occupancy: "متوسط نسبة إشغال الأسرّة يومياً — تجاوز 85% يدل على إجهاد المنظومة.",
      },
    },
    surveillance: {
      title: "الترصّد الوبائي والتنبؤ",
      subtitle: "من أين تبدأ الموجة الوبائية القادمة؟",
      disease: "الحالة",
      diseases: {
        diabetes: "السكري",
        hypertension: "ارتفاع ضغط الدم",
        flu: "الإنفلونزا الموسمية",
        respiratory: "الأمراض التنفّسية المزمنة",
      },
      kpis: {
        cases: "إجمالي الحالات (12ش)",
        mom: "التغيّر الشهري",
        alerts: "محافظات في حالة تنبيه",
      },
      chart: {
        title: "الإصابات والتنبؤ لـ 12 شهراً",
        history: "السجل",
        forecast: "التنبؤ",
        ci: "ثقة 95%",
      },
      watchlist: {
        title: "قائمة المتابعة — منحنيات صاعدة",
        governorate: "المحافظة",
        current: "المعدّل الشهري الحالي",
        projected: "المتوقّع (12ش)",
        delta: "Δ",
        severity: "الخطورة",
      },
      severity: { high: "مرتفع", medium: "متوسط", low: "منخفض" },
    },
    specialists: {
      title: "فجوات الوصول للاختصاصيين",
      subtitle: "أين يُضطرّ الأردنيون للسفر بعيداً للحصول على رعاية تخصصية؟",
      specialty: "التخصص",
      specialties: {
        cardiology: "أمراض القلب",
        oncology: "الأورام",
        pediatrics: "طب الأطفال",
        neurology: "طب الأعصاب",
      },
      kpis: {
        total: "إجمالي الاختصاصيين",
        per100k: "متوسط لكل 100 ألف",
        under: "محافظات ناقصة الخدمة",
      },
      table: {
        title: "فجوات الوصول وعبء التنقّل",
        governorate: "المحافظة",
        specialists: "الاختصاصيون",
        per100k: "لكل 100 ألف",
        travelBurden: "عبء التنقّل",
        status: "الحالة",
      },
      status: {
        critical: "فجوة حرجة",
        underserved: "ناقصة الخدمة",
        adequate: "كافية",
        wellServed: "مخدومة جيداً",
      },
      tooltips: {
        per100k: "عدد الاختصاصيين لكل 100,000 نسمة في تلك المحافظة.",
        travelBurden: "نسبة المرضى المُحالين إلى مرافق خارج محافظتهم.",
      },
    },
    about: {
      title: "حول صحة جي‑آي‑إس",
      pitch: {
        title: "العرض",
        p1: "أنجز نظام حكيم رقمنة سجلات أكثر من 7 ملايين مريض أردني — إحدى أشمل قواعد البيانات الصحية الوطنية في المنطقة. لكن السجلات لا تتحوّل إلى سياسات إلا حين تُرى على الخريطة.",
        p2: "تحوّل صحة جي‑آي‑إس بيانات حكيم إلى ثلاث عدسات قابلة للتنفيذ: أين يُبنى المستشفى التالي، وأين تبدأ الموجة الوبائية القادمة، وأين يُضطرّ الأردنيون للسفر بعيداً لرعاية تخصصية. لوحة واحدة، ثلاث وحدات، اثنتا عشرة محافظة، توقعات لاثني عشر شهراً.",
        p3: "صحة جي‑آي‑إس ليست منافِسة لحكيم — هي طبقة الذكاء التي تحوّل حكيم إلى سياسة وطنية.",
      },
      methodology: {
        title: "المنهجية",
        p1: "يعمل هذا النموذج الأوّلي على بيانات اصطناعية واقعية مصاغة لتطابق الأرقام المنشورة عن وبائيات الأردن وتوزيع المرافق. عوايد السعة مُعايَرة على معايير منظمة الصحة العالمية؛ والتنبؤات تتبع تفكيكاً (اتجاه + موسمية + ضوضاء) مماثلاً لمخرجات Prophet أو ARIMA، مع نطاق ثقة 95%.",
      },
      limitations: {
        title: "القيود",
        p1: "هذا نموذج أوّلي لمسابقة هاكاثون، وليس نظاماً إنتاجياً. البيانات اصطناعية وللتوضيح فقط. طبقة التنبؤ نموذج موسمي مبسّط. أي نشر فعلي يتطلب تكاملاً حياً مع حكيم، وتحققاً رسمياً من النماذج، ومراجعة سريرية.",
      },
      roadmap: {
        title: "خارطة الطريق",
        items: [
          "تكامل لحظي مع حكيم بتجميعات مجهولة على مستوى المطالبات",
          "تطبيق مرافق على الجوّال لمسؤولي المناطق في وزارة الصحة",
          "خط إنذار عبر الرسائل القصيرة وواتساب لإشارات التفشي فوق انحرافين معياريين",
        ],
      },
      author: "بقلم: عبدالرحمن الكردي",
    },
    footer: {
      built: "مبنيّ على بيانات حكيم",
      submission: "مقدّم إلى HAAC 2026",
      author: "© عبدالرحمن الكردي",
    },
  },
};

export type Translations = (typeof translations)["en"];
