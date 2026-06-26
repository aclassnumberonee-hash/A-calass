import { 
  EducationalStage, 
  Grade, 
  Subject, 
  Student, 
  Teacher, 
  Admin, 
  Package, 
  Week, 
  Content, 
  Subscription, 
  WalletHistory, 
  PromoCode, 
  AppNotification 
} from './types';

export const GOVERNORATES = [
  'القاهرة', 'الجيزة', 'الإسكندرية', 'الدقهلية', 'الغربية', 'المنوفية', 
  'القليوبية', 'البحيرة', 'الشرقية', 'الفيوم', 'بني سويف', 'المنيا', 
  'أسيوط', 'سوهاج', 'قنا', 'الأقصر', 'أسوان', 'دمياط', 'بورسعيد', 
  'السويس', 'الإسماعيلية', 'مطروح', 'الوادي الجديد', 'البحر الأحمر', 
  'شمال سيناء', 'جنوب سيناء', 'كفر الشيخ'
];

export const DEFAULT_STAGES: EducationalStage[] = [
  {
    id: 'stage_1',
    name: 'المرحلة الابتدائية',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop',
    order: 1
  },
  {
    id: 'stage_2',
    name: 'المرحلة الإعدادية',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop',
    order: 2
  },
  {
    id: 'stage_3',
    name: 'المرحلة الثانوية',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600&auto=format&fit=crop',
    order: 3
  }
];

export const DEFAULT_GRADES: Grade[] = [
  // Primary
  { id: 'grade_1_1', stageId: 'stage_1', name: 'الصف الرابع الابتدائي' },
  { id: 'grade_1_2', stageId: 'stage_1', name: 'الصف الخامس الابتدائي' },
  { id: 'grade_1_3', stageId: 'stage_1', name: 'الصف السادس الابتدائي' },
  // Preparatory
  { id: 'grade_2_1', stageId: 'stage_2', name: 'الصف الأول الإعدادي' },
  { id: 'grade_2_2', stageId: 'stage_2', name: 'الصف الثاني الإعدادي' },
  { id: 'grade_2_3', stageId: 'stage_2', name: 'الصف الثالث الإعدادي' },
  // Secondary
  { id: 'grade_3_1', stageId: 'stage_3', name: 'الصف الأول الثانوي' },
  { id: 'grade_3_2', stageId: 'stage_3', name: 'الصف الثاني الثانوي' },
  { id: 'grade_3_3', stageId: 'stage_3', name: 'الصف الثالث الثانوي' }
];

export const DEFAULT_SUBJECTS: Subject[] = [
  { id: 'sub_arabic', gradeId: 'grade_3_3', stageId: 'stage_3', name: 'اللغة العربية', icon: 'BookOpen' },
  { id: 'sub_physics', gradeId: 'grade_3_3', stageId: 'stage_3', name: 'الفيزياء', icon: 'Zap' },
  { id: 'sub_chemistry', gradeId: 'grade_3_3', stageId: 'stage_3', name: 'الكيمياء', icon: 'FlaskConical' },
  { id: 'sub_biology', gradeId: 'grade_3_3', stageId: 'stage_3', name: 'الأحياء', icon: 'Dna' },
  { id: 'sub_english', gradeId: 'grade_3_3', stageId: 'stage_3', name: 'اللغة الإنجليزية', icon: 'Globe' },
  { id: 'sub_math', gradeId: 'grade_3_3', stageId: 'stage_3', name: 'الرياضيات', icon: 'Binary' },

  { id: 'sub_prep_arabic', gradeId: 'grade_2_3', stageId: 'stage_2', name: 'اللغة العربية', icon: 'BookOpen' },
  { id: 'sub_prep_math', gradeId: 'grade_2_3', stageId: 'stage_2', name: 'الرياضيات', icon: 'Binary' },
  { id: 'sub_prep_science', gradeId: 'grade_2_3', stageId: 'stage_2', name: 'العلوم', icon: 'FlaskConical' }
];

export const DEFAULT_TEACHERS: Teacher[] = [
  {
    id: 'teacher_1',
    name: 'الأستاذ أنس الديب',
    email: 'anas@eldeeb.com',
    phone: '01100196131',
    bio: 'خبير مادة الفيزياء للمرحلة الثانوية مع أكثر من ١٥ عاماً من التفوق وصناعة أوائل الجمهورية.',
    subjectId: 'sub_physics',
    gradeIds: ['grade_3_1', 'grade_3_2', 'grade_3_3'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop', // professional teacher
    commissionRate: 10,
    supportPhone: '01100196131',
    supportTelegram: 'anas_eldeeb_physics',
    supportAssistantName: 'أ. محمود عبد الباري (كبير المساعدين)',
    supportApologyMessage: 'نعتذر عن أي تأخير في الرد بسبب ضغط رسائل الطلاب، فريق الدعم العلمي للأستاذ أنس الديب معك لحظة بلحظة وسيتم إجابتك في أقرب وقت.'
  },
  {
    id: 'teacher_2',
    name: 'الأستاذ محمود الديب',
    email: 'mahmoud@eldeeb.com',
    phone: '01023958772',
    bio: 'معلم أول اللغة العربية وبلاغتها وأدبها لجميع المراحل الثانوية والإعدادية بأسلوب ممتع ومبسط.',
    subjectId: 'sub_arabic',
    gradeIds: ['grade_2_3', 'grade_3_3'],
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
    commissionRate: 15,
    supportPhone: '01023958772',
    supportTelegram: 'mahmoud_arabic_support',
    supportAssistantName: 'أ. سامح الهواري',
    supportApologyMessage: 'مرحباً بك، فريق الدعم العلمي لمادة لغة الضاد مع الأستاذ محمود الديب يتلقى استفسارك وسنجيبك فوراً.'
  },
  {
    id: 'teacher_3',
    name: 'الدكتورة رانيا أحمد',
    email: 'rania@eldeeb.com',
    phone: '01234567890',
    bio: 'مدرس الكيمياء والعلوم الحيوية بطرق الشرح الحديثة والتفاعلية.',
    subjectId: 'sub_chemistry',
    gradeIds: ['grade_3_3'],
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop',
    commissionRate: 12,
    supportPhone: '01234567890',
    supportTelegram: 'chem_rania_support',
    supportAssistantName: 'د. ياسمين ممدوح',
    supportApologyMessage: 'طاقم الدعم العلمي للدكتورة رانيا معك، نعتذر عن أي تأخير طفيف وسنقوم بشرح السؤال لك بالتفصيل.'
  }
];

export const DEFAULT_PACKAGES: Package[] = [
  {
    id: '5000',
    name: 'كورس الفيزياء المتكامل - الباب الأول لثالثة ثانوي',
    description: 'يغطي هذا الكورس شرحاً تفصيلياً للتيار الكهربي وقانون أوم وتوصيل المقاومات وقانونا كيرشوف مع حل كتاب الامتحان بالكامل.',
    teacherId: 'teacher_1',
    gradeId: 'grade_3_3',
    stageId: 'stage_3',
    subjectId: 'sub_physics',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop',
    price: 150,
    originalPrice: 200,
    type: 'monthly',
    createdAt: '2026-06-01'
  },
  {
    id: '5001',
    name: 'المحاضرة التأسيسية المجانية في علم الفيزياء',
    description: 'شرح أساسيات التحويلات الفيزيائية وحساب المثلثات وصيغ الأبعاد الأساسية التي لا غنى عنها لكل طالب في الثانوية العامة.',
    teacherId: 'teacher_1',
    gradeId: 'grade_3_3',
    stageId: 'stage_3',
    subjectId: 'sub_physics',
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=600&auto=format&fit=crop',
    price: 0,
    originalPrice: 50,
    type: 'offer',
    createdAt: '2026-06-01'
  },
  {
    id: '5002',
    name: 'باقة المراجعة النهائية للغة العربية - النحو والبلاغة',
    description: 'مراجعة شاملة لجميع ثوابت الإعراب وأبواب النحو السبعة مع تدريبات مخصصة وصناعة الفارق في ورقة الامتحان.',
    teacherId: 'teacher_2',
    gradeId: 'grade_3_3',
    stageId: 'stage_3',
    subjectId: 'sub_arabic',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop',
    price: 120,
    originalPrice: 180,
    type: 'monthly',
    createdAt: '2026-06-02'
  }
];

export const DEFAULT_WEEKS: Week[] = [
  {
    id: '1',
    name: 'الأسبوع الأول: قانون أوم وقانونا كيرشوف',
    description: 'المحاضرة الأولى من منهج الفيزياء لعام ٢٠٢٦ وتشمل شدة التيار الكهربي وفرق الجهد وتطبيق قانون أوم.',
    packageIds: ['5000', '5001'],
    gradeId: 'grade_3_3',
    stageId: 'stage_3',
    subjectId: 'sub_physics',
    teacherId: 'teacher_1'
  },
  {
    id: '2',
    name: 'الأسبوع الثاني: توصيل المقاومات الكهربائية',
    description: 'طرق توصيل المقاومات على التوالي والتوازي وحساب المقاومة المكافئة للمدارات المعقدة.',
    packageIds: ['5000'],
    gradeId: 'grade_3_3',
    stageId: 'stage_3',
    subjectId: 'sub_physics',
    teacherId: 'teacher_1'
  }
];

export const DEFAULT_CONTENT: Content[] = [
  {
    id: '100',
    name: 'فيديو الشرح: التيار الكهربي وقانون أوم بالتفصيل',
    description: 'شرح مفهوم التيار واتجاهه وشدة التيار وفرق الجهد والمقاومة الكهربائية وقانون أوم.',
    type: 'video',
    url: 'dQw4w9WgXcQ', // Youtube Embed ID (Rickroll as nice placeholder or educational concept)
    weekIds: ['1'],
    gradeId: 'grade_3_3',
    stageId: 'stage_3',
    subjectId: 'sub_physics',
    teacherId: 'teacher_1'
  },
  {
    id: '101',
    name: 'فيديو الواجب: حل مسائل وتدريبات قانون أوم',
    description: 'فيديو مفصل لحل مسائل الواجب للتأكد من فهم القوانين والحل بالطرق الصحيحة السريعة.',
    type: 'video',
    url: 'rT7aDljvpHY',
    weekIds: ['1'],
    gradeId: 'grade_3_3',
    stageId: 'stage_3',
    subjectId: 'sub_physics',
    teacherId: 'teacher_1'
  },
  {
    id: '102',
    name: 'ملف المذكرة: مذكرة الأسبوع الأول pdf',
    description: 'ملف PDF يحتوي على ملخص الشرح وأسئلة الواجب المطلوب حلها للأسبوع الأول.',
    type: 'pdf',
    url: 'https://docs.google.com/viewer?srcid=1_X_p15-hN2vYFwEa07R32tC3v1v6Vp_F&pid=explorer&efh=false&a=v&chrome=false&embedded=true',
    weekIds: ['1'],
    gradeId: 'grade_3_3',
    stageId: 'stage_3',
    subjectId: 'sub_physics',
    teacherId: 'teacher_1'
  },
  {
    id: '103',
    name: 'امتحان MCQ الأسبوع الأول: اختبار الفهم الشامل',
    description: 'اختبر نفسك بأسئلة اختيار من متعدد تفاعلية مع رصد النتيجة وتصحيح الأخطاء فورياً.',
    type: 'quiz',
    url: 'quiz_103',
    weekIds: ['1'],
    gradeId: 'grade_3_3',
    stageId: 'stage_3',
    subjectId: 'sub_physics',
    teacherId: 'teacher_1',
    questions: [
      {
        id: 'q1',
        questionText: 'إذا زاد طول موصل معدني إلى الضعف وقلت مساحة مقطعه إلى النصف، فإن مقاومته الكهربائية تفعل ماذا؟',
        options: [
          'تظل ثابتة',
          'تقل إلى الربع',
          'تزداد إلى الضعف',
          'تزداد إلى أربعة أمثالها'
        ],
        correctOptionIndex: 3,
        explanation: 'المقاومة تناسب طردياً مع الطول وعكسياً مع المساحة (R = ρ * L / A). زيادة الطول للضعف (2) وقسمة المساحة على نصف (1/2) تعطي 2 / (1/2) = 4 أمثال.'
      },
      {
        id: 'q2',
        questionText: 'كمية الشحنة الكهربية المارة عبر مقطع موصل في زمن قدره ثانية واحدة عندما يمر به تيار شدته ١ أمبير تسمى:',
        options: [
          'الفولت',
          'الكولوم',
          'الأوم',
          'الوات'
        ],
        correctOptionIndex: 1,
        explanation: 'الكولوم هو كمية الشحنة الكهربية المارة عندما تكون شدة التيار ١ أمبير والزمن ١ ثانية (Q = I * t).'
      },
      {
        id: 'q3',
        questionText: 'موصل مقاومته ١٠ أوم يمر به تيار شدته ٠.٥ أمبير، فإذا زاد التيار المار فيه إلى ١ أمبير مع ثبوت درجة الحرارة، فإن مقاومته تصبح:',
        options: [
          '٥ أوم',
          '١٠ أوم',
          '٢٠ أوم',
          '٤٠ أوم'
        ],
        correctOptionIndex: 1,
        explanation: 'المقاومة صفة ملازمة للموصل وتتوقف على نوع مادته وأبعاده ودرجة حرارته، ولا تتغير بتغير شدة التيار المار فيه.'
      }
    ]
  },
  {
    id: '104',
    name: 'واجب MCQ المحاضرة الأولى',
    description: 'واجب إضافي بنظام الاختيارات لتقييم أدائك.',
    type: 'quiz',
    url: 'quiz_104',
    weekIds: ['1'],
    gradeId: 'grade_3_3',
    stageId: 'stage_3',
    subjectId: 'sub_physics',
    teacherId: 'teacher_1',
    questions: [
      {
        id: 'w1',
        questionText: 'وحدة قياس المقاومة النوعية لمادة موصل هي:',
        options: [
          'أوم / متر',
          'أوم * متر',
          'أمبير / فولت',
          'فولت * متر'
        ],
        correctOptionIndex: 1,
        explanation: 'وحدة المقاومة النوعية هي أوم * متر (Ω.m).'
      }
    ]
  }
];

export const DEFAULT_PROMO_CODES: PromoCode[] = [
  {
    id: 'A-CLASS-PHYSICS100',
    packageId: '5000',
    teacherId: 'teacher_1',
    price: 150,
    status: 'active',
    createdAt: '2026-06-25'
  },
  {
    id: 'A-CLASS-FREE555',
    packageId: '5000',
    teacherId: 'teacher_1',
    price: 150,
    status: 'active',
    createdAt: '2026-06-25'
  }
];

export const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_1',
    title: 'مرحباً بك في منصة A CLASS التعليمية',
    message: 'يسعدنا انضمامك لأقوى وأحدث منصة تعليمية ذكية في مصر. تمتع بتجربة فريدة ومتميزة معنا.',
    date: '2026-06-25T12:00:00Z',
    status: 'unread',
    targetType: 'all'
  },
  {
    id: 'notif_2',
    title: 'امتحان شامل في مادة الفيزياء قريباً!',
    message: 'يعلن الأستاذ أنس الديب عن عقد امتحان شامل بجوائز قيمة للمتفوقين لجميع طلاب الصف الثالث الثانوي الأسبوع القادم.',
    date: '2026-06-25T14:30:00Z',
    status: 'unread',
    targetType: 'grade',
    targetGradeId: 'grade_3_3'
  }
];

export const DEFAULT_STUDENTS: Student[] = [
  {
    id: 'student_1',
    studentCode: 5000,
    firstName: 'أحمد',
    lastName: 'محمد محمود',
    phone: '01112223344',
    parentPhone: '01112223355',
    email: 'ahmed@gmail.com',
    governorate: 'القاهرة',
    city: 'مدينة نصر',
    stageId: 'stage_3',
    gradeId: 'grade_3_3',
    section: 'scientific_math',
    birthDate: '2008-05-15',
    gender: 'male',
    wallet: 300, // starting wallet
    status: 'active',
    isBanned: false
  }
];

export function getLocalStorageData<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return defaultValue;
  }
}

export function saveLocalStorageData<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
}

export function seedDatabase() {
  if (typeof window === 'undefined') return;
  
  getLocalStorageData('aclass_stages', DEFAULT_STAGES);
  getLocalStorageData('aclass_grades', DEFAULT_GRADES);
  getLocalStorageData('aclass_subjects', DEFAULT_SUBJECTS);
  getLocalStorageData('aclass_teachers', DEFAULT_TEACHERS);
  getLocalStorageData('aclass_packages', DEFAULT_PACKAGES);
  getLocalStorageData('aclass_weeks', DEFAULT_WEEKS);
  getLocalStorageData('aclass_content', DEFAULT_CONTENT);
  getLocalStorageData('aclass_promo_codes', DEFAULT_PROMO_CODES);
  getLocalStorageData('aclass_notifications', DEFAULT_NOTIFICATIONS);
  
  // Custom auth passwords mapping
  // We can store a dictionary of userId -> password in localStorage to handle authentication securely in mock state
  const defaultPasswords = {
    'admin_1': 'admin2009',
    'student_1': '123456',
    'teacher_1': 'teacher123',
    'teacher_2': 'teacher123',
    'teacher_3': 'teacher123',
  };
  getLocalStorageData('aclass_auth_passwords', defaultPasswords);
  
  // Students table
  getLocalStorageData('aclass_students', DEFAULT_STUDENTS);
  
  // Subscriptions
  getLocalStorageData('aclass_subscriptions', [] as Subscription[]);
  
  // Wallet histories
  getLocalStorageData('aclass_wallet_history', [
    {
      id: 'w_init',
      studentId: 'student_1',
      amount: 300,
      type: 'charge',
      date: '2026-06-25T10:00:00Z',
      status: 'success'
    }
  ] as WalletHistory[]);
  
  // Quiz results
  getLocalStorageData('aclass_quiz_results', []);
}
