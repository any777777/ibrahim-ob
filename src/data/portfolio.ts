export type Locale = "ar" | "en";

export type LocalizedText = Record<Locale, string>;

export type Project = {
  slug: string;
  title: LocalizedText;
  category: LocalizedText;
  description: LocalizedText;
  url: string;
  image?: string;
  previewTone?: "qattaa" | "research";
};

export const WHATSAPP_NUMBER = "962798613275";
export const PHONE_DISPLAY = "079 861 3275";

export const projects: Project[] = [
  {
    slug: "ramq-cafe",
    title: { ar: "رمق كافيه", en: "Ramq Cafe" },
    category: { ar: "موقع تجاري محلي", en: "Local business website" },
    description: {
      ar: "تجربة عربية تضع الصور الحقيقية والمنتجات والموقع ووسائل الطلب في مسار واضح وسريع.",
      en: "An Arabic-first café experience that brings real photography, location details, and direct ordering into one focused journey.",
    },
    url: "https://ramq-cafe01.vercel.app",
    image: "/projects/ramq-cafe.png",
  },
  {
    slug: "omima-clinic",
    title: { ar: "عيادة الدكتورة أميما", en: "Omima Dental Clinic" },
    category: { ar: "موقع عيادة", en: "Clinic website" },
    description: {
      ar: "واجهة واضحة تعرض الخدمات الطبية والتجميلية وتبني الثقة قبل التواصل والحجز.",
      en: "A clear clinic presence that introduces medical and cosmetic services and builds confidence before booking.",
    },
    url: "https://omima-ashen.vercel.app",
    image: "/projects/omima-clinic.png",
  },
  {
    slug: "fitness-time",
    title: { ar: "فتنس تايم إربد", en: "Fitness Time Gym" },
    category: { ar: "موقع لياقة بدنية", en: "Fitness website" },
    description: {
      ar: "موقع عربي يعرض العروض والتدريب والمدربين والموقع بأسلوب قوي يناسب هوية النادي.",
      en: "An Arabic gym website presenting offers, coaching, and location through a bold fitness-led identity.",
    },
    url: "https://fitness-time-one.vercel.app",
    image: "/projects/fitness-time.png",
  },
  {
    slug: "five11-gym",
    title: { ar: "فايف 11 جيم", en: "Five11 Gym" },
    category: { ar: "موقع عضويات", en: "Membership website" },
    description: {
      ar: "تجربة تسويقية تجمع البرامج والحصص والعضويات والمدربين مع تواصل مباشر عبر واتساب.",
      en: "A membership-focused experience combining programs, classes, coaches, and direct WhatsApp contact.",
    },
    url: "https://five11-gym.vercel.app",
    image: "/projects/five11-gym.png",
  },
  {
    slug: "hurrat-jordan",
    title: { ar: "حُرّات وإجباري", en: "Hurrat Jordan" },
    category: { ar: "منصة تعليم جامعي", en: "University learning platform" },
    description: {
      ar: "منصة تنظّم الشروحات وأسئلة السنوات والتدريبات لمساقات الجامعات الأردنية.",
      en: "A learning platform organizing explanations, past papers, and practice material for Jordanian university courses.",
    },
    url: "https://hurrat-jordan.vercel.app",
    image: "/projects/hurrat-jordan.png",
  },
  {
    slug: "qattaa",
    title: { ar: "قطّعها", en: "Qattaa" },
    category: { ar: "منتج تعليمي", en: "Learning product" },
    description: {
      ar: "منصة تعلم عربية أولاً للدورات والدروس والاختبارات والمقالات وتتبع تقدم الطالب.",
      en: "An Arabic-first learning product for structured courses, lessons, quizzes, articles, and progress.",
    },
    url: "https://qattaa.vercel.app",
    image: "/projects/qattaa-mark.png",
    previewTone: "qattaa",
  },
  {
    slug: "graduation-project",
    title: { ar: "مختبر المقارنة التعليمية", en: "Educational Comparison Lab" },
    category: { ar: "مشروع بحثي", en: "Research interface" },
    description: {
      ar: "واجهة تفاعلية تقارن بين النموذج الأساسي وRAG وRAG المدعوم بالرسم البياني.",
      en: "An interactive interface comparing a baseline model, RAG, and graph-enhanced RAG.",
    },
    url: "https://graduation-project-nu-five.vercel.app",
    previewTone: "research",
  },
];

export const copy = {
  ar: {
    nav: { work: "الأعمال", services: "الخدمة", pricing: "الأسعار", about: "عني" },
    language: "English",
    whatsapp: "تواصل عبر واتساب",
    availability: "أستقبل مشاريع جديدة في الأردن",
    heroTitle: "موقعك، جاهز من الفكرة إلى التشغيل.",
    heroBody:
      "أصمم موقعك، أستضيفه، أربطه بنطاقك، وأديره عنك بالكامل. أنت تطلب النتيجة—وأنا أتولى كل ما وراءها.",
    seeWork: "شاهد الأعمال",
    estimate: "احسب تكلفة موقعك",
    selectedWork: "العمل المختار",
    browseHint: "اختر عملاً من الرصة، ثم افتحه لتجربته كاملاً.",
    visitProject: "افتح الموقع",
    nextProject: "العمل التالي",
    previousProject: "العمل السابق",
    serviceTitle: "خدمة متكاملة لموقعك، من شخص واحد.",
    serviceBody:
      "لا تحتاج إلى مطور واستضافة وشخص للصيانة كلٌ على حدة. تحصل على مسار واحد واضح ومسؤول واحد عن النتيجة.",
    services: [
      ["تصميم مخصص", "واجهة تناسب نشاطك وشخصية زبونك."],
      ["استضافة ونطاق", "تشغيل سريع وربط كامل داخل الأردن وخارجه."],
      ["إدارة مستمرة", "تحديثات ونسخ احتياطي وصيانة عند الحاجة."],
      ["دعم مباشر", "تتواصل معي مباشرة دون طبقات أو تذاكر معقدة."],
    ],
    processTitle: "من طلب بسيط إلى موقع يعمل.",
    processBody: "أحتاج منك فكرة المشروع ومحتواه الأساسي. بعد ذلك تصبح التفاصيل التقنية مسؤوليتي.",
    process: [
      ["نحدد المطلوب", "مكالمة أو محادثة قصيرة لفهم النشاط والهدف."],
      ["أبني وأراجع", "تصميم وتنفيذ على مراحل واضحة مع مراجعتك."],
      ["أنشر وأدير", "ربط النطاق والاستضافة، ثم دعم مستمر عند اختيارك."],
    ],
    calculatorTitle: "احسب تكلفة موقعك",
    calculatorIntro: "تقدير أولي شفاف يساعدنا على بدء الحديث من رقم واضح.",
    siteType: "نوع المشروع",
    pages: "عدد الصفحات",
    extras: "إضافات المشروع",
    oneTime: "تكلفة الإنشاء التقديرية",
    annual: "الاشتراك السنوي",
    from: "ابتداءً من",
    jod: "د.أ",
    priceNote: "هذا تقدير أولي وليس عرض سعر نهائياً. السعر يتأكد بعد مراجعة المحتوى والمتطلبات.",
    sendEstimate: "أرسل اختياراتي عبر واتساب",
    types: {
      landing: ["صفحة واحدة", "عرض مركز لخدمة أو نشاط واحد."],
      business: ["موقع أعمال", "عدة صفحات لنشاطك وخدماتك."],
      commerce: ["متجر إلكتروني", "منتجات وطلبات وتجربة شراء."],
      platform: ["منصة مخصصة", "تعليم، عضويات، أو نظام خاص."],
    },
    options: {
      bilingual: ["عربي + إنجليزي", "واجهة كاملة باللغتين."],
      motion: ["حركة متقدمة", "انتقالات ومشهد تفاعلي خاص."],
      hosting: ["استضافة + نطاق", "تشغيل وربط لمدة سنة."],
      management: ["إدارة كاملة", "صيانة وتحديثات ونسخ احتياطي."],
    },
    aboutTitle: "أنا إبراهيم عبيدات.",
    aboutBody:
      "أبني مواقع ومنصات عربية واضحة، وأتعامل مع المشروع كخدمة كاملة لا كملفات تُسلّم وتُترك. هدفي أن يصبح امتلاك موقع إلكتروني أبسط قرار تقني في مشروعك.",
    finalTitle: "أخبرني ماذا تريد. وسأتولى الباقي.",
    finalBody: "أرسل فكرة مشروعك على واتساب، وسأرد عليك بالخطوة التالية وتقدير أوضح.",
    footer: "تصميم، تطوير، استضافة وإدارة من الأردن.",
  },
  en: {
    nav: { work: "Work", services: "Service", pricing: "Pricing", about: "About" },
    language: "العربية",
    whatsapp: "Chat on WhatsApp",
    availability: "Available for new projects in Jordan",
    heroTitle: "Your website, ready from idea to launch.",
    heroBody:
      "I design, host, connect, and manage your website end to end. You ask for the outcome—I handle everything behind it.",
    seeWork: "View selected work",
    estimate: "Estimate your website",
    selectedWork: "Selected work",
    browseHint: "Choose a project from the stack, then open it for the full experience.",
    visitProject: "Open website",
    nextProject: "Next project",
    previousProject: "Previous project",
    serviceTitle: "One complete website service. One person accountable.",
    serviceBody:
      "You do not need separate people for design, hosting, and maintenance. You get one clear path and one owner for the result.",
    services: [
      ["Custom design", "A website shaped around your business and customer."],
      ["Hosting and domain", "Fast deployment and complete domain setup."],
      ["Ongoing management", "Updates, backups, and maintenance when needed."],
      ["Direct support", "You speak directly with me, without complicated ticketing."],
    ],
    processTitle: "From a simple request to a working website.",
    processBody: "I need your idea and core content. From there, the technical details become my responsibility.",
    process: [
      ["Define the need", "A short call or chat to understand the business and goal."],
      ["Build and review", "Design and development in clear stages, with your review."],
      ["Launch and manage", "Domain, hosting, and ongoing support when you choose it."],
    ],
    calculatorTitle: "Estimate your website",
    calculatorIntro: "A transparent first estimate so our conversation starts with a clear number.",
    siteType: "Project type",
    pages: "Number of pages",
    extras: "Project extras",
    oneTime: "Estimated build cost",
    annual: "Annual subscription",
    from: "From",
    jod: "JOD",
    priceNote: "This is an initial estimate, not a final quote. Pricing is confirmed after reviewing your content and requirements.",
    sendEstimate: "Send my choices on WhatsApp",
    types: {
      landing: ["One-page site", "A focused page for one service or business."],
      business: ["Business website", "Multiple pages for your business and services."],
      commerce: ["Online store", "Products, orders, and a buying experience."],
      platform: ["Custom platform", "Learning, memberships, or a tailored system."],
    },
    options: {
      bilingual: ["Arabic + English", "A complete bilingual experience."],
      motion: ["Advanced motion", "Purpose-built transitions and interaction."],
      hosting: ["Hosting + domain", "Deployment and domain for one year."],
      management: ["Full management", "Maintenance, updates, and backups."],
    },
    aboutTitle: "I’m Ibrahim Obaidat.",
    aboutBody:
      "I build clear Arabic-first websites and platforms, treating each project as a complete service rather than files that are delivered and abandoned. My goal is to make owning a website the simplest technical decision in your business.",
    finalTitle: "Tell me what you need. I’ll handle the rest.",
    finalBody: "Send your idea on WhatsApp. I’ll reply with the next step and a clearer estimate.",
    footer: "Design, development, hosting, and management from Jordan.",
  },
} as const;

