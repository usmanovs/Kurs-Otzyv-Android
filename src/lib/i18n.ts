import { Language } from '../types';

export interface Translations {
  siteTitle: string;
  siteSubtitle: string;
  tagline: string;
  searchPlaceholder: string;
  allCategories: string;
  submitReviewBtn: string;
  addCourseBtn: string;
  navHome: string;
  navTeachers: string;
  navVideos: string;
  navLeaderboard: string;
  navReportScam: string;
  categories: Record<string, string>;
  format: Record<string, string>;
  ratings: Record<string, string>;
  sorting: Record<string, string>;
  leaderboard: {
    title: string;
    subtitle: string;
    topTitle: string;
    flaggedTitle: string;
    reviewsSuffix: string;
    lowReviewNotice: string;
  };
  hero: {
    badge: string;
    headlineLine1: string;
    headlineLine2: string;
    subtitle: string;
    searchPlaceholder: string;
    searchBtn: string;
    popularLabel: string;
    popularTags: string[];
    statsReviews: string;
    statsCourses: string;
    statsTeachers: string;
    statsVerified: string;
    socialProofLabel: string;
    socialProofMore: string;
  };
  warningBanner: {
    title: string;
    point1: string;
    point2: string;
    point3: string;
  };
  featuredVideosTitle: string;
  featuredVideosSubtitle: string;
  featuredVideosWatchBtn: string;
  reportScam: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Text: string;
    step2Title: string;
    step2Text: string;
    step3Title: string;
    step3Text: string;
    step4Title: string;
    step4Text: string;
    step5Title: string;
    step5Text: string;
    disclaimer: string;
    linkMvd: string;
    linkProkuror: string;
  };
  teacherDetail: {
    close: string;
    share: string;
    linkCopied: string;
    subScoresTitle: string;
    ratingDistribution: string;
    reviewsTab: string;
    allReviews: string;
    positive: string;
    negative: string;
    verifiedOnly: string;
    pros: string;
    cons: string;
    advice: string;
    pricePaid: string;
    cohort: string;
    duration: string;
    helpfulQuestion: string;
    recommendYes: string;
    recommendNo: string;
    scamWarningReported: string;
    noReviewsYet: string;
    writeReview: string;
  };
  addReviewModal: {
    title: string;
    subtitle: string;
    teacherName: string;
    newTeacherNamePlaceholder: string;
    showMoreDetails: string;
    showLessDetails: string;
    authorName: string;
    authorStatus: string;
    statusGraduate: string;
    statusCurrent: string;
    statusDropped: string;
    overallRating: string;
    teacherRating: string;
    practiceRating: string;
    jobSupportRating: string;
    valueRating: string;
    recommendQuestion: string;
    yes: string;
    no: string;
    pricePaid: string;
    durationMonths: string;
    cohortYear: string;
    reviewTitle: string;
    fullReview: string;
    prosLabel: string;
    consLabel: string;
    adviceLabel: string;
    whatsappLabel: string;
    whatsappNote: string;
    scamWarningCheckbox: string;
    verifiedCheckbox: string;
    submitBtn: string;
    cancelBtn: string;
    successNotice: string;
  };
  addTeacherModal: {
    title: string;
    subtitle: string;
    name: string;
    academy: string;
    category: string;
    categoryNone: string;
    gender: string;
    genderNone: string;
    genderFemale: string;
    genderMale: string;
    bio: string;
    photo: string;
    photoUrlPlaceholder: string;
    instagram: string;
    youtube: string;
    submitBtn: string;
    cancelBtn: string;
    errorName: string;
    successNotice: string;
  };
  teachersSection: {
    title: string;
    subtitle: string;
    addBtn: string;
    noReviewsYet: string;
    reviewsCount: string;
    emptyState: string;
    noSearchResults: string;
    filteredCount: string;
    clearSearch: string;
    allLetters: string;
    allGenders: string;
    onlyWithPhoto: string;
    onlyWithReviews: string;
  };
  stats: {
    coursesCount: string;
    reviewsCount: string;
    warningCoursesCount: string;
    independentNotice: string;
  };
}

export const translations: Record<Language, Translations> = {
  ky: {
    siteTitle: "Kursotzyv.org",
    siteSubtitle: "Кыргызстандагы онлайн курстардын чынчыл сын-пикирлери",
    tagline: "Билим берүүдөгү ачык-айкындуулук жана студенттердин чыныгы тажрыйбасы",
    searchPlaceholder: "Мугалимдин, курстун же академиянын аты...",
    allCategories: "Бардык багыттар",
    submitReviewBtn: "Сын-пикир калтыруу",
    addCourseBtn: "Жаңы курс кошуу",
    navHome: "Башкы",
    navTeachers: "Мугалимдер",
    navVideos: "Видеолор",
    navLeaderboard: "Рейтинг",
    navReportScam: "Кайда кайрылуу",
    categories: {
      all: "Бардыгы",
      it_programming: "IT жана Программалоо",
      design_uiux: "Дизайн жана UI/UX",
      languages: "Чет тилдери",
      marketing_smm: "Маркетинг жана SMM",
      business_trading: "Бизнес жана Трейдинг",
      data_analytics: "Маалымат аналитикасы",
      psychology: "Психология",
      beauty_cosmetology: "Сулуулук жана Косметология",
      driving_school: "Айдоочулук курстары",
      cooking_culinary: "Ашпозчулук",
      finance_accounting: "Финансы жана Бухгалтерия",
      kids_development: "Балдарды өнүктүрүү",
      arts_music: "Искусство жана Музыка",
      ort_school: "ЖРТ жана Мектеп",
      public_speaking: "Чечендик өнөр / Ораторлук",
    },
    format: {
      all: "Бардык форматтар",
      online: "Онлайн гана",
      offline: "Офлайн",
      hybrid: "Гибрид (Онлайн + Офлайн)",
    },
    ratings: {
      all: "Бардык баалар",
      high: "4.0+ (Мыктылар)",
      medium: "3.0 - 4.0 (Орточо)",
      low: "3.0 төмөн (⚠️ Шектүү / Даттануу көп)",
    },
    sorting: {
      label: "Иреттөө:",
      default: "Демейки тартип",
      price_asc: "Арзан курстар",
      price_desc: "Кымбат курстар",
    },
    leaderboard: {
      title: "Мугалимдер рейтинги",
      subtitle: "Сын-пикирлер боюнча эсептелген орточо баа",
      topTitle: "Эң жогорку баа алгандар",
      flaggedTitle: "Этияттык менен таанышыңыз",
      reviewsSuffix: "пикир",
      lowReviewNotice: "Аз сандагы пикирге негизделген — көбүрөөк пикир чогулгандан кийин өзгөрүшү мүмкүн.",
    },
    hero: {
      badge: "Бул жерде мугалим жарнамаланбайт. Чыныгы баа берилет.",
      headlineLine1: "Алданбаңыз.",
      headlineLine2: "Билип тандаңыз.",
      subtitle: "Алдамчы курстардан сактаныңыз — студенттердин реалдуу пикирин окуңуз.",
      searchPlaceholder: "Мугалимдин же ментордун атын издеңиз...",
      searchBtn: "Издөө",
      popularLabel: "Көп изделгендер:",
      popularTags: ["IT жана Программалоо", "Психология", "Бизнес жана Трейдинг", "Маркетинг жана SMM"],
      statsReviews: "сын-пикир",
      statsCourses: "курс",
      statsTeachers: "мугалим",
      statsVerified: "ырасталган",
      socialProofLabel: "Чыныгы мугалимдер, чыныгы пикирлер",
      socialProofMore: "дагы мугалим",
    },
    warningBanner: {
      title: "Шектүү курстардан кантип сактануу керек?",
      point1: "«1 айда $2000 табасың» деген жалган убадаларга ишенбеңиз — кесиптик билим алуу убакытты жана мээнетти талап кылат.",
      point2: "Келишимди жана акчаны кайтаруу (refund) шарттарын картага акча которуудан мурун кылдат окуп чыгыңыз.",
      point3: "Мугалимдердин чыныгы резюмесин, LinkedIn профилин жана мурунку бүтүрүүчүлөрдүн портфолиосун сураңыз.",
    },
    featuredVideosTitle: "Шектүү курстар жөнүндө видеолор",
    featuredVideosSubtitle: "Башка авторлордун чыныгы окуялары жана иликтөөлөрү — YouTube аркылуу көрүңүз",
    featuredVideosWatchBtn: "YouTube'дан көрүү",
    reportScam: {
      title: "Алдамчылыкка кабылдыңызбы? Кайда кайрылуу керек",
      subtitle: "Акчаңызды алдап алышса же жалган убада менен курска тартышса, бул КР Кылмыш-жаза кодексинин 209-беренеси («Алдамчылык») боюнча каралат — укук коргоо органдарына кайрылыңыз.",
      step1Title: "1. Далилдерди чогултуңуз",
      step1Text: "Келишимди, төлөм чектерин, банктык которуу тастыктамаларын, чаттардын/соцтармактардын скриншотторун жана уюштуруучунун аты-жөнүн сактап коюңуз.",
      step2Title: "2. Жашаган жериңиздеги милиция бөлүмүнө (РОВД/УВД) кайрылыңыз",
      step2Text: "Арыз жазуу түрүндө берилет жана каттоо китебине киргизилет — анонимдүү арыздар кабыл алынбайт. Кызматкерден кабарлама (талон) алууну унутпаңыз.",
      step3Title: "3. Шашылыш учурда чалыңыз",
      step3Text: "Милиция — 102, бирдиктүү өзгөчө кырдаалдар кызматы — 112.",
      step4Title: "4. Онлайн кайрылуу берүү",
      step4Text: "ИИМдин электрондук кызматтар порталы аркылуу да кайрылуу калтырсаңыз болот.",
      step5Title: "5. Милиция териштирбей жатса, прокуратурага даттаныңыз",
      step5Text: "Укук коргоо органдарынын аракетсиздигине Башкы прокуратурага кайрылып, даттануу берүүгө укугуңуз бар.",
      disclaimer: "Бул маалымат жалпы багыт берүү үчүн гана, юридикалык кеңеш эмес. Расмий сайттардан тактап алыңыз.",
      linkMvd: "ИИМдин электрондук кызматтар порталы",
      linkProkuror: "Башкы прокуратура",
    },
    teacherDetail: {
      close: "Жабуу",
      share: "Бөлүшүү",
      linkCopied: "Шилтеме көчүрүлдү!",
      subScoresTitle: "Критерийлер боюнча баалар",
      ratingDistribution: "Баалоо шкаласы",
      reviewsTab: "Студенттердин пикирлери",
      allReviews: "Бардыгы",
      positive: "Оң пикирлер (4-5★)",
      negative: "Сын/Терс (1-3★)",
      verifiedOnly: "Тастыкталган",
      pros: "Артыкчылыктары:",
      cons: "Кемчиликтери жана көйгөйлөрү:",
      advice: "Жаңы баштагандарга кеңеш:",
      pricePaid: "Төлөнгөн суммасы:",
      cohort: "Окуган жылы:",
      duration: "Окуу узактыгы:",
      helpfulQuestion: "Бул сын-пикир пайдалуу болдубу?",
      recommendYes: "Бул мугалимди сунуштайт",
      recommendNo: "Бул мугалимди СУНУШТАБАЙТ",
      scamWarningReported: "Жалган жумуш убадасы же төлөм көйгөйү боюнча даттануу катталган",
      noReviewsYet: "Бул мугалимге азырынча сын-пикир калтырыла элек. Сиз биринчи болуп пикир калтырыңыз!",
      writeReview: "Сын-пикир жазуу",
    },
    addReviewModal: {
      title: "Мугалимге сын-пикир калтыруу",
      subtitle: "Сиздин чынчыл пикириңиз башка студенттерге туура тандоо жасоого жардам берет",
      teacherName: "Мугалимдин же ментордун аты-жөнү",
      newTeacherNamePlaceholder: "Тизмеде жок болсо, атын толук жазыңыз...",
      showMoreDetails: "Кошумча маалымат кошуу (милдеттүү эмес)",
      showLessDetails: "Кошумча маалыматты жашыруу",
      authorName: "Сиздин атыңыз (же лакап ат)",
      authorStatus: "Сиздин статусуңуз:",
      statusGraduate: "Курсту толук бүтүрдүм",
      statusCurrent: "Учурда окуп жатам",
      statusDropped: "Курсту таштап кеттим (нааразымын)",
      overallRating: "Жалпы бааңыз (1ден 5ке чейин):",
      teacherRating: "Мугалимдердин жана менторлордун сапаты:",
      practiceRating: "Практикалык тапшырмалар жана деңгээл:",
      jobSupportRating: "Жумушка орношууга көмөктөшүү (карьера борбору):",
      valueRating: "Баасы менен сапатынын дал келиши:",
      recommendQuestion: "Бул мугалимди башкаларга сунуштайсызбы?",
      yes: "Ооба, сунуштайм",
      no: "Жок, сунуштабайм",
      pricePaid: "Курска төлөгөн суммаңыз (сом менен):",
      durationMonths: "Канча ай окудуңуз?",
      cohortYear: "Кайсы жылы окудуңуз? (мис: 2024)",
      reviewTitle: "Сын-пикириңиздин кыскача маңызы (баш сөзү)",
      fullReview: "Толук сын-пикириңиз (окутуу кандай өттү, реалдуу тажрыйбаңыз):",
      prosLabel: "Жакшы жактары (плюстары, үтүр же жаңы сап менен):",
      consLabel: "Кемчиликтери жана көйгөйлөрү (минустары):",
      adviceLabel: "Жаңы баштагандарга же окуй тургандарга кеңешиңиз:",
      whatsappLabel: "WhatsApp номериңиз (милдеттүү эмес)",
      whatsappNote: "Журналисттер сиз менен маек куруу үчүн байланышса болобу? Номериңиз эч жерде ачык көрсөтүлбөйт — бул купуя сакталат.",
      scamWarningCheckbox: 'Бул курста жалган убадалар (мисалы "1 айда жумушка орноштурабыз", "акчаны кайтарып бербей коюу") болду деп билдирем',
      verifiedCheckbox: "Мен чындыгында бул мугалимдин окуучусу болгонумду тастыктайм",
      submitBtn: "Сын-пикирди жарыялоо",
      cancelBtn: "Жокко чыгаруу",
      successNotice: "Сын-пикириңиз ийгиликтүү кошулду жана базада сакталды!",
    },
    addTeacherModal: {
      title: "Жаңы мугалим же ментор кошуу",
      subtitle: "Мугалимди кошкондон кийин, ал боюнча сын-пикир калтырса болот",
      name: "Мугалимдин же ментордун толук аты-жөнү",
      academy: "Иштеген академиясы же мектеби (милдеттүү эмес)",
      category: "Багыты (категориясы)",
      categoryNone: "Категория тандалган жок",
      gender: "Жынысы",
      genderNone: "Тандалган жок",
      genderFemale: "Аял",
      genderMale: "Эркек",
      bio: "Кыскача маалымат (адистиги, тажрыйбасы)",
      photo: "Сүрөтүнүн URL шилтемеси (милдеттүү эмес)",
      photoUrlPlaceholder: "https://... же сүрөт дареги",
      instagram: "Instagram шилтемеси (милдеттүү эмес)",
      youtube: "YouTube шилтемеси (милдеттүү эмес)",
      submitBtn: "Мугалимди кошуу",
      cancelBtn: "Жокко чыгаруу",
      errorName: "Мугалимдин атын жазыңыз",
      successNotice: "Мугалим базага ийгиликтүү кошулду!",
    },
    teachersSection: {
      title: "Мугалимдер жана менторлор",
      subtitle: "Сын-пикирлерде аталган жана коомчулук кошкон мугалимдер",
      addBtn: "Мугалим кошуу",
      noReviewsYet: "Азырынча сын-пикир жок",
      reviewsCount: "сын-пикир",
      emptyState: "Мугалимдер табылган жок.",
      noSearchResults: "Издөөгө дал келген мугалим табылган жок.",
      filteredCount: "мугалим табылды",
      clearSearch: "Издөөнү тазалоо",
      allLetters: "Бардыгы",
      allGenders: "Бардык жыныс",
      onlyWithPhoto: "Сүрөтү барлар гана",
      onlyWithReviews: "Сын-пикири барлар гана",
    },
    stats: {
      coursesCount: "Талданган курстар",
      reviewsCount: "Чынчыл сын-пикирлер",
      warningCoursesCount: "Шектүү курстар аныкталды",
      independentNotice: "100% көз карандысыз жана ачык портал",
    },
  },
  ru: {
    siteTitle: "Kursotzyv.org",
    siteSubtitle: "Честные отзывы об онлайн-курсах в Кыргызстане",
    tagline: "Прозрачность в образовании и реальный опыт студентов",
    searchPlaceholder: "Поиск преподавателя, курса или школы...",
    allCategories: "Все направления",
    submitReviewBtn: "Оставить отзыв",
    addCourseBtn: "Добавить курс",
    navHome: "Главная",
    navTeachers: "Преподаватели",
    navVideos: "Видео",
    navLeaderboard: "Рейтинг",
    navReportScam: "Куда обращаться",
    categories: {
      all: "Все направления",
      it_programming: "IT и Программирование",
      design_uiux: "Дизайн и UI/UX",
      languages: "Иностранные языки",
      marketing_smm: "Маркетинг и SMM",
      business_trading: "Бизнес и Трейдинг",
      data_analytics: "Аналитика данных",
      psychology: "Психология",
      beauty_cosmetology: "Красота и Косметология",
      driving_school: "Автошколы",
      cooking_culinary: "Кулинария",
      finance_accounting: "Финансы и Бухгалтерия",
      kids_development: "Детское развитие",
      arts_music: "Искусство и Музыка",
      ort_school: "ОРТ и Школьные предметы",
      public_speaking: "Ораторское мастерство",
    },
    format: {
      all: "Все форматы",
      online: "Только онлайн",
      offline: "Офлайн",
      hybrid: "Гибридный (Онлайн + Офлайн)",
    },
    ratings: {
      all: "Все оценки",
      high: "4.0+ (Отличные)",
      medium: "3.0 - 4.0 (Средние)",
      low: "Ниже 3.0 (⚠️ Сомнительные / Много жалоб)",
    },
    sorting: {
      label: "Сортировка:",
      default: "По умолчанию",
      price_asc: "Сначала недорогие",
      price_desc: "Сначала дорогие",
    },
    leaderboard: {
      title: "Рейтинг преподавателей",
      subtitle: "Средняя оценка на основе реальных отзывов студентов",
      topTitle: "Самые высокие оценки",
      flaggedTitle: "Будьте внимательны (Низкие оценки)",
      reviewsSuffix: "отзывов",
      lowReviewNotice: "Основано на небольшом числе отзывов — рейтинг может измениться.",
    },
    hero: {
      badge: "Здесь не рекламируют учителей. Здесь дают реальную оценку.",
      headlineLine1: "Не дайте себя обмануть.",
      headlineLine2: "Выбирайте осознанно.",
      subtitle: "Остерегайтесь сомнительных курсов — читайте проверенные отзывы студентов.",
      searchPlaceholder: "Поиск преподавателя или ментора...",
      searchBtn: "Найти",
      popularLabel: "Популярные темы:",
      popularTags: ["IT и Программирование", "Психология", "Бизнес и Трейдинг", "Маркетинг и SMM"],
      statsReviews: "отзывов",
      statsCourses: "курсов",
      statsTeachers: "преподавателей",
      statsVerified: "подтверждено",
      socialProofLabel: "Реальные преподаватели, честные отзывы",
      socialProofMore: "еще учителей",
    },
    warningBanner: {
      title: "Как уберечься от сомнительных курсов?",
      point1: "Не верьте обещаниям «За 1 месяц выйдете на доход $2000» — качественное обучение требует времени и усердия.",
      point2: "Внимательно читайте договор и условия возврата средств (refund) до перевода денег на карту.",
      point3: "Требуйте реальное резюме преподавателей, профиль LinkedIn и примеры работ выпускников.",
    },
    featuredVideosTitle: "Видеорасследования о курсах",
    featuredVideosSubtitle: "Истории пострадавших и аналитика от авторов — смотрите на YouTube",
    featuredVideosWatchBtn: "Смотреть на YouTube",
    reportScam: {
      title: "Столкнулись с обманом? Куда обращаться",
      subtitle: "Если у вас выманили деньги или заманили ложными обещаниями, это подпадает под ст. 209 УК КР («Мошенничество»). Не молчите — защищайте свои права.",
      step1Title: "1. Соберите доказательства",
      step1Text: "Сохраните договор, чеки об оплате, квитанции банковских переводов, скриншоты переписок и ФИО организаторов.",
      step2Title: "2. Обратитесь в РОВД / УВД по месту жительства",
      step2Text: "Заявление подается в письменном виде и регистрируется в журнале учёта. Обязательно получите талон-уведомление.",
      step3Title: "3. Экстренные номера",
      step3Text: "Милиция — 102, единая служба спасения — 112.",
      step4Title: "4. Электронное обращение",
      step4Text: "Вы можете подать заявление через портал электронных услуг МВД КР.",
      step5Title: "5. Если милиция бездействует — прокуратура",
      step5Text: "Вы имеете законное право обжаловать бездействие следственных органов в Генеральной прокуратуре.",
      disclaimer: "Материал носит ознакомительный характер и не является юридической консультацией.",
      linkMvd: "Портал электронных услуг МВД КР",
      linkProkuror: "Генеральная прокуратура КР",
    },
    teacherDetail: {
      close: "Закрыть",
      share: "Поделиться",
      linkCopied: "Ссылка скопирована!",
      subScoresTitle: "Оценки по критериям",
      ratingDistribution: "Шкала оценок",
      reviewsTab: "Отзывы студентов",
      allReviews: "Все",
      positive: "Положительные (4-5★)",
      negative: "Критика (1-3★)",
      verifiedOnly: "Проверенные",
      pros: "Преимущества:",
      cons: "Недостатки и проблемы:",
      advice: "Совет новичкам:",
      pricePaid: "Оплаченная сумма:",
      cohort: "Год обучения:",
      duration: "Длительность:",
      helpfulQuestion: "Был ли этот отзыв полезен?",
      recommendYes: "Рекомендует преподавателя",
      recommendNo: "НЕ рекомендует преподавателя",
      scamWarningReported: "Поступила жалоба на невыполненные обещания или возврат средств",
      noReviewsYet: "Об этом преподавателе пока нет отзывов. Станьте первым!",
      writeReview: "Написать отзыв",
    },
    addReviewModal: {
      title: "Оставить отзыв о преподавателе",
      subtitle: "Ваш честный отзыв поможет другим студентам сделать правильный выбор",
      teacherName: "ФИО преподавателя или ментора",
      newTeacherNamePlaceholder: "Если нет в списке, укажите полное имя...",
      showMoreDetails: "Дополнительные детали (необязательно)",
      showLessDetails: "Скрыть дополнительные детали",
      authorName: "Ваше имя (или псевдоним)",
      authorStatus: "Ваш статус:",
      statusGraduate: "Успешно закончил курс",
      statusCurrent: "Обучаюсь прямо сейчас",
      statusDropped: "Бросил обучение (разочарован)",
      overallRating: "Общая оценка (от 1 до 5):",
      teacherRating: "Качество преподавания и подача материала:",
      practiceRating: "Практические задания и обратная связь:",
      jobSupportRating: "Помощь в трудоустройстве (карьерный центр):",
      valueRating: "Соответствие цены и качества:",
      recommendQuestion: "Порекомендуете ли этого преподавателя другим?",
      yes: "Да, рекомендую",
      no: "Нет, не рекомендую",
      pricePaid: "Сколько вы заплатили за обучение (в сомах):",
      durationMonths: "Сколько месяцев учились?",
      cohortYear: "В каком году проходили обучение? (напр: 2024)",
      reviewTitle: "Краткая суть вашего отзыва (заголовок)",
      fullReview: "Подробный отзыв (как проходило обучение, реальный опыт):",
      prosLabel: "Плюсы (через запятую или с новой строки):",
      consLabel: "Минусы и проблемы:",
      adviceLabel: "Совет тем, кто планирует учиться:",
      whatsappLabel: "Ваш WhatsApp номер (необязательно)",
      whatsappNote: "Могут ли журналисты связаться с вами для интервью? Номер нигде не публикуется публично.",
      scamWarningCheckbox: 'Сообщаю о невыполненных обещаниях ("трудоустроим за месяц", "отказ в возврате денег")',
      verifiedCheckbox: "Я подтверждаю, что являлся реальным студентом данного преподавателя",
      submitBtn: "Опубликовать отзыв",
      cancelBtn: "Отмена",
      successNotice: "Ваш отзыв успешно сохранён в базе данных!",
    },
    addTeacherModal: {
      title: "Добавить преподавателя или ментора",
      subtitle: "После добавления студенты смогут оставить о нём отзыв",
      name: "ФИО преподавателя или ментора",
      academy: "Школа или академия (необязательно)",
      category: "Направление (категория)",
      categoryNone: "Категория не выбрана",
      gender: "Пол",
      genderNone: "Не указан",
      genderFemale: "Женский",
      genderMale: "Мужской",
      bio: "Краткая информация (специализация, опыт)",
      photo: "Ссылка на фото (необязательно)",
      photoUrlPlaceholder: "https://... или ссылка на аватар",
      instagram: "Ссылка на Instagram (необязательно)",
      youtube: "Ссылка на YouTube (необязательно)",
      submitBtn: "Добавить преподавателя",
      cancelBtn: "Отмена",
      errorName: "Пожалуйста, введите имя преподавателя",
      successNotice: "Преподаватель успешно добавлен в базу!",
    },
    teachersSection: {
      title: "Преподаватели и менторы",
      subtitle: "Упомянутые в отзывах и добавленные сообществом",
      addBtn: "Добавить ментора",
      noReviewsYet: "Пока нет отзывов",
      reviewsCount: "отзывов",
      emptyState: "Преподаватели не найдены.",
      noSearchResults: "По вашему запросу никто не найден.",
      filteredCount: "найдено преподавателей",
      clearSearch: "Сбросить поиск",
      allLetters: "Все",
      allGenders: "Любой пол",
      onlyWithPhoto: "Только с фото",
      onlyWithReviews: "Только с отзывами",
    },
    stats: {
      coursesCount: "Изученных курсов",
      reviewsCount: "Честных отзывов",
      warningCoursesCount: "Выявлено сомнительных",
      independentNotice: "100% независимый и открытый портал",
    },
  },
};
