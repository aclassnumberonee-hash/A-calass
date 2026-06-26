import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Zap, 
  FlaskConical, 
  Dna, 
  Globe, 
  Binary, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Edit, 
  Users, 
  Bell, 
  Wallet, 
  Lock, 
  Key, 
  Send, 
  Sparkles, 
  ShieldAlert, 
  Search, 
  TrendingUp, 
  Settings, 
  ArrowRight,
  LogOut,
  Sliders,
  DollarSign,
  UserCheck,
  GraduationCap
} from 'lucide-react';
import { 
  EducationalStage, 
  Grade, 
  Subject, 
  Teacher, 
  Student, 
  WalletHistory, 
  Subscription, 
  PromoCode, 
  AppNotification,
  Package
} from '../types';

export function AdminDashboard({ 
  isDarkMode = true,
  onLogout,
  onImpersonateTeacher
}: { 
  isDarkMode?: boolean;
  onLogout: () => void;
  onImpersonateTeacher: (teacher: Teacher) => void;
}) {
  // DB States
  const [stages, setStages] = useState<EducationalStage[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [ledger, setLedger] = useState<WalletHistory[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);

  // Editing state variables
  const [editingStage, setEditingStage] = useState<EducationalStage | null>(null);
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  // Additional states for Teacher Add/Edit
  const [tSubjectId, setTSubjectId] = useState('');
  const [tGradeIds, setTGradeIds] = useState<string[]>([]);

  // Navigation Panel
  const [activeTab, setActiveTab] = useState<'stages' | 'grades' | 'subjects' | 'teachers' | 'students' | 'ban' | 'stats' | 'wallet' | 'passwords' | 'notifications' | 'impersonate' | 'codes'>('stats');

  // Search helpers
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStageId, setSelectedStageId] = useState('');
  const [selectedGradeId, setSelectedGradeId] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [selectedTeacherId, setSelectedTeacherId] = useState('');

  // Modals / forms states
  const [showStageModal, setShowStageModal] = useState(false);
  const [stageName, setStageName] = useState('');
  const [stageImage, setStageImage] = useState('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop');

  const [showGradeModal, setShowGradeModal] = useState(false);
  const [gradeName, setGradeName] = useState('');
  const [gradeStageId, setGradeStageId] = useState('');

  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [subjectName, setSubjectName] = useState('');
  const [subStageId, setSubStageId] = useState('');
  const [subGradeId, setSubGradeId] = useState('');

  // Add new teacher wizard
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [tName, setTName] = useState('');
  const [tEmail, setTEmail] = useState('');
  const [tPhone, setTPhone] = useState('');
  const [tBio, setTBio] = useState('');
  const [tPass, setTPass] = useState('teacher123');
  const [tCommission, setTCommission] = useState(15);
  const [tSupportPhone, setTSupportPhone] = useState('01100196131');
  const [tSupportTelegram, setTSupportTelegram] = useState('anas_eldeeb_support');
  const [tAssistant, setTAssistant] = useState('أ. أحمد الخطيب');
  const [tApology, setTApology] = useState('نعتذر مسبقاً عن أي تأخير في الرد بسبب ضغط المراجعات.');

  // Manual wallet action
  const [walletStudentCode, setWalletStudentCode] = useState('');
  const [walletAmount, setWalletAmount] = useState('');
  const [walletActionType, setWalletActionType] = useState<'charge' | 'deduct'>('charge');

  // Password reset action
  const [resetCode, setResetCode] = useState('');
  const [resetNewPass, setResetNewPass] = useState('');

  // Notifications send form
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMsg, setNotifMsg] = useState('');
  const [notifTarget, setNotifTarget] = useState<'all' | 'teachers' | 'students'>('all');

  // Promo code generation form
  const [codePkgId, setCodePkgId] = useState('');
  const [codeCount, setCodeCount] = useState(10);
  const [codeValue, setCodeValue] = useState(150);

  // Load and refresh state
  useEffect(() => {
    refreshDB();
  }, []);

  const refreshDB = () => {
    const stgs = JSON.parse(localStorage.getItem('aclass_stages') || '[]');
    const grds = JSON.parse(localStorage.getItem('aclass_grades') || '[]');
    const sbjs = JSON.parse(localStorage.getItem('aclass_subjects') || '[]');
    const tchs = JSON.parse(localStorage.getItem('aclass_teachers') || '[]');
    
    setStages(stgs);
    setGrades(grds);
    setSubjects(sbjs);
    setTeachers(tchs);
    setStudents(JSON.parse(localStorage.getItem('aclass_students') || '[]'));
    setLedger(JSON.parse(localStorage.getItem('aclass_wallet_history') || '[]'));
    setSubscriptions(JSON.parse(localStorage.getItem('aclass_subscriptions') || '[]'));
    setPromoCodes(JSON.parse(localStorage.getItem('aclass_promo_codes') || '[]'));
    setNotifications(JSON.parse(localStorage.getItem('aclass_notifications') || '[]'));
    setPackages(JSON.parse(localStorage.getItem('aclass_packages') || '[]'));

    if (sbjs.length > 0 && !tSubjectId) {
      setTSubjectId(sbjs[0].id);
    }
  };

  // Grouped Menu Tabs for layout clean lookup
  const group1 = [
    { id: 'stages', label: 'إدارة المراحل الدراسية', icon: Sliders },
    { id: 'grades', label: 'إدارة الصفوف', icon: GraduationCap },
    { id: 'subjects', label: 'إدارة المواد', icon: BookOpen }
  ];

  const group2 = [
    { id: 'teachers', label: 'إدارة المدرسين', icon: Users },
    { id: 'students', label: 'إدارة الطلاب المستهدفة', icon: UserCheck },
    { id: 'ban', label: 'مركز حظر المستخدمين', icon: ShieldAlert }
  ];

  const group3 = [
    { id: 'stats', label: 'إحصائيات المنصة', icon: TrendingUp },
    { id: 'wallet', label: 'المحفظة المركزية والمالية', icon: Wallet },
    { id: 'passwords', label: 'تغيير كلمات المرور', icon: Key },
    { id: 'notifications', label: 'إرسال الإشعارات', icon: Bell }
  ];

  const group4 = [
    { id: 'impersonate', label: 'التحكم التجسسي بالمدرس', icon: Lock },
    { id: 'codes', label: 'أكواد الشراء والخصم', icon: Sparkles }
  ];

  // ACTION: ADD STAGE
  const handleAddStage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stageName.trim()) return;

    const all = [...stages];
    const newStage: EducationalStage = {
      id: 'stage_' + Date.now(),
      name: stageName,
      image: stageImage,
      order: all.length + 1
    };
    all.push(newStage);
    localStorage.setItem('aclass_stages', JSON.stringify(all));
    setStages(all);
    setShowStageModal(false);
    setStageName('');
  };

  // ACTION: ADD GRADE
  const handleAddGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradeName.trim() || !gradeStageId) return;

    const all = [...grades];
    const newGrade: Grade = {
      id: 'grade_' + Date.now(),
      stageId: gradeStageId,
      name: gradeName
    };
    all.push(newGrade);
    localStorage.setItem('aclass_grades', JSON.stringify(all));
    setGrades(all);
    setShowGradeModal(false);
    setGradeName('');
  };

  // ACTION: ADD TEACHER
  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tName.trim() || !tEmail.trim() || !tPhone.trim()) {
      alert('يرجى كتابة اسم وإيميل وهاتف المدرس.');
      return;
    }
    if (!tSubjectId) {
      alert('يرجى اختيار المادة التعليمية للمدرس.');
      return;
    }
    if (tGradeIds.length === 0) {
      alert('يرجى اختيار صف دراسي واحد على الأقل للمدرس.');
      return;
    }

    const all = [...teachers];
    const nextId = 'teacher_' + Date.now();
    const newTeacher: Teacher = {
      id: nextId,
      name: tName,
      email: tEmail,
      phone: tPhone,
      bio: tBio || 'مدرس متميز في مادته التعليمية.',
      subjectId: tSubjectId,
      gradeIds: tGradeIds,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
      commissionRate: tCommission,
      supportPhone: tSupportPhone,
      supportTelegram: tSupportTelegram,
      supportAssistantName: tAssistant,
      supportApologyMessage: tApology
    };

    all.push(newTeacher);
    localStorage.setItem('aclass_teachers', JSON.stringify(all));

    // Save initial password mapping
    const passwords = JSON.parse(localStorage.getItem('aclass_auth_passwords') || '{}');
    passwords[nextId] = tPass;
    localStorage.setItem('aclass_auth_passwords', JSON.stringify(passwords));

    setTeachers(all);
    setShowTeacherModal(false);
    // Reset fields
    setTName(''); setTEmail(''); setTPhone(''); setTBio('');
    setTGradeIds([]);
    alert('تم إضافة المدرس الجديد واعتماده بنجاح!');
    refreshDB();
  };

  // ACTION: ADD SUBJECT
  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectName.trim() || !subStageId || !subGradeId) {
      alert('يرجى كتابة اسم المادة واختيار المرحلة والصف.');
      return;
    }

    const all = [...subjects];
    const newSubject: Subject = {
      id: 'sub_' + Date.now(),
      stageId: subStageId,
      gradeId: subGradeId,
      name: subjectName,
      icon: 'BookOpen'
    };
    all.push(newSubject);
    localStorage.setItem('aclass_subjects', JSON.stringify(all));
    setSubjects(all);
    setShowSubjectModal(false);
    setSubjectName('');
    alert('تم إضافة المادة الجديدة بنجاح! 📚');
    refreshDB();
  };

  // ACTION: SAVE EDIT STAGE
  const handleEditStage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStage || !editingStage.name.trim()) return;

    const updated = stages.map(s => s.id === editingStage.id ? editingStage : s);
    localStorage.setItem('aclass_stages', JSON.stringify(updated));
    setStages(updated);
    setEditingStage(null);
    alert('تم تعديل المرحلة التعليمية بنجاح!');
    refreshDB();
  };

  // ACTION: SAVE EDIT GRADE
  const handleEditGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGrade || !editingGrade.name.trim() || !editingGrade.stageId) return;

    const updated = grades.map(g => g.id === editingGrade.id ? editingGrade : g);
    localStorage.setItem('aclass_grades', JSON.stringify(updated));
    setGrades(updated);
    setEditingGrade(null);
    alert('تم تعديل الصف الدراسي بنجاح!');
    refreshDB();
  };

  // ACTION: SAVE EDIT SUBJECT
  const handleEditSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubject || !editingSubject.name.trim() || !editingSubject.stageId || !editingSubject.gradeId) return;

    const updated = subjects.map(s => s.id === editingSubject.id ? editingSubject : s);
    localStorage.setItem('aclass_subjects', JSON.stringify(updated));
    setSubjects(updated);
    setEditingSubject(null);
    alert('تم تعديل المادة التعليمية بنجاح!');
    refreshDB();
  };

  // ACTION: SAVE EDIT TEACHER
  const handleEditTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeacher || !editingTeacher.name.trim() || !editingTeacher.email.trim() || !editingTeacher.phone.trim()) {
      alert('يرجى ملء الاسم والبريد والهاتف.');
      return;
    }

    const updated = teachers.map(t => t.id === editingTeacher.id ? editingTeacher : t);
    localStorage.setItem('aclass_teachers', JSON.stringify(updated));
    setTeachers(updated);
    setEditingTeacher(null);
    alert('تم حفظ تعديلات المعلم بنجاح! 🎓');
    refreshDB();
  };

  // ACTION: DELETE STAGE
  const handleDeleteStage = (stageId: string) => {
    const hasGrades = grades.some(g => g.stageId === stageId);
    if (hasGrades) {
      alert('لا يمكن حذف هذه المرحلة لوجود صفوف دراسية مرتبطة بها. يرجى حذف الصفوف أولاً.');
      return;
    }
    if (window.confirm('هل أنت متأكد من حذف هذه المرحلة التعليمية؟')) {
      const updated = stages.filter(s => s.id !== stageId);
      localStorage.setItem('aclass_stages', JSON.stringify(updated));
      setStages(updated);
      alert('تم حذف المرحلة بنجاح.');
      refreshDB();
    }
  };

  // ACTION: DELETE GRADE
  const handleDeleteGrade = (gradeId: string) => {
    const hasSubjects = subjects.some(s => s.gradeId === gradeId);
    const hasPackages = packages.some(p => p.gradeId === gradeId);
    if (hasSubjects || hasPackages) {
      alert('لا يمكن حذف هذا الصف لوجود مواد أو باقات تعليمية مرتبطة به. يرجى حذف الملحقات أولاً.');
      return;
    }
    if (window.confirm('هل أنت متأكد من حذف هذا الصف الدراسي؟')) {
      const updated = grades.filter(g => g.id !== gradeId);
      localStorage.setItem('aclass_grades', JSON.stringify(updated));
      setGrades(updated);
      alert('تم حذف الصف بنجاح.');
      refreshDB();
    }
  };

  // ACTION: DELETE SUBJECT
  const handleDeleteSubject = (subjectId: string) => {
    const hasTeachers = teachers.some(t => t.subjectId === subjectId);
    const hasPackages = packages.some(p => p.subjectId === subjectId);
    if (hasTeachers || hasPackages) {
      alert('لا يمكن حذف هذه المادة لوجود معلمين أو باقات تعليمية مرتبطة بها.');
      return;
    }
    if (window.confirm('هل أنت متأكد من حذف هذه المادة؟')) {
      const updated = subjects.filter(s => s.id !== subjectId);
      localStorage.setItem('aclass_subjects', JSON.stringify(updated));
      setSubjects(updated);
      alert('تم حذف المادة بنجاح.');
      refreshDB();
    }
  };

  // ACTION: DELETE TEACHER
  const handleDeleteTeacher = (teacherId: string) => {
    const hasPackages = packages.some(p => p.teacherId === teacherId);
    if (hasPackages) {
      alert('لا يمكن حذف هذا المعلم لوجود باقات/كورسات مرتبطة به في النظام. يرجى حذف باقاته أولاً.');
      return;
    }
    if (window.confirm('هل أنت متأكد من حذف هذا المعلم نهائياً من المنصة؟')) {
      const updated = teachers.filter(t => t.id !== teacherId);
      localStorage.setItem('aclass_teachers', JSON.stringify(updated));
      setTeachers(updated);
      alert('تم حذف المعلم بنجاح.');
      refreshDB();
    }
  };

  // ACTION: DELETE PROMO CODE
  const handleDeletePromoCode = (codeId: string) => {
    if (window.confirm('هل أنت متأكد من حذف وإلغاء هذا الكود؟')) {
      const codes: PromoCode[] = JSON.parse(localStorage.getItem('aclass_promo_codes') || '[]');
      const filtered = codes.filter(c => c.id !== codeId);
      localStorage.setItem('aclass_promo_codes', JSON.stringify(filtered));
      setPromoCodes(filtered);
      alert('تم حذف الكود بنجاح.');
      refreshDB();
    }
  };

  // ACTION: MANUAL WALLET ACTION
  const handleWalletAction = (e: React.FormEvent) => {
    e.preventDefault();
    const sCode = parseInt(walletStudentCode);
    const amountVal = parseFloat(walletAmount);
    if (isNaN(sCode) || isNaN(amountVal)) {
      alert('البيانات المدخلة غير صحيحة.');
      return;
    }

    const allStudents: Student[] = JSON.parse(localStorage.getItem('aclass_students') || '[]');
    const target = allStudents.find(s => s.studentCode === sCode);
    if (!target) {
      alert('كود الطالب غير مسجل في النظام.');
      return;
    }

    const change = walletActionType === 'charge' ? amountVal : -amountVal;
    
    // Update balance
    const updated = allStudents.map(s => {
      if (s.id === target.id) {
        return { ...s, wallet: Math.max(0, s.wallet + change) };
      }
      return s;
    });
    localStorage.setItem('aclass_students', JSON.stringify(updated));

    // Add financial ledger
    const ledgers: WalletHistory[] = JSON.parse(localStorage.getItem('aclass_wallet_history') || '[]');
    ledgers.push({
      id: 'm_tx_' + Date.now(),
      studentId: target.id,
      amount: amountVal,
      type: walletActionType === 'charge' ? 'charge' : 'purchase',
      date: new Date().toISOString(),
      status: 'success'
    });
    localStorage.setItem('aclass_wallet_history', JSON.stringify(ledgers));

    alert('تم تعديل رصيد محفظة الطالب وإدراج العملية بالسجل المالي!');
    setWalletStudentCode('');
    setWalletAmount('');
    refreshDB();
  };

  // Approve pending charge request
  const handleApproveCharge = (txId: string) => {
    const ledgers: WalletHistory[] = JSON.parse(localStorage.getItem('aclass_wallet_history') || '[]');
    const tx = ledgers.find(l => l.id === txId);
    if (!tx) return;

    // Find student
    const allStudents: Student[] = JSON.parse(localStorage.getItem('aclass_students') || '[]');
    const studentIndex = allStudents.findIndex(s => s.id === tx.studentId);
    if (studentIndex === -1) {
      alert('عذراً، لم يتم العثور على الطالب صاحب الطلب.');
      return;
    }

    if (window.confirm(`هل أنت متأكد من الموافقة على شحن مبلغ ${tx.amount} جنيهاً في محفظة الطالب: ${allStudents[studentIndex].firstName} ${allStudents[studentIndex].lastName}؟`)) {
      // 1. Credit wallet
      allStudents[studentIndex].wallet += tx.amount;
      localStorage.setItem('aclass_students', JSON.stringify(allStudents));

      // 2. Set request to success
      const updatedLedger = ledgers.map(item => {
        if (item.id === txId) {
          return { ...item, status: 'success' as const };
        }
        return item;
      });
      localStorage.setItem('aclass_wallet_history', JSON.stringify(updatedLedger));

      alert('تم الموافقة على طلب الشحن وتفعيل رصيد محفظة الطالب بنجاح! 🚀');
      refreshDB();
    }
  };

  // Reject/Delete pending charge request
  const handleRejectCharge = (txId: string) => {
    if (window.confirm('هل أنت متأكد من رفض هذا الطلب؟ سيتم إدراج حالته كمرفوض.')) {
      const ledgers: WalletHistory[] = JSON.parse(localStorage.getItem('aclass_wallet_history') || '[]');
      const updatedLedger = ledgers.map(item => {
        if (item.id === txId) {
          return { ...item, status: 'failed' as const };
        }
        return item;
      });
      localStorage.setItem('aclass_wallet_history', JSON.stringify(updatedLedger));
      alert('تم رفض طلب الشحن المعلق بنجاح.');
      refreshDB();
    }
  };

  // ACTION: PASSWORD RESET
  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    const code = parseInt(resetCode);
    if (isNaN(code) || !resetNewPass.trim()) {
      alert('يرجى ملء كود المستخدم وكلمة السر الجديدة.');
      return;
    }

    // Search student first
    const allStudents: Student[] = JSON.parse(localStorage.getItem('aclass_students') || '[]');
    const student = allStudents.find(s => s.studentCode === code);
    
    if (student) {
      const passwords = JSON.parse(localStorage.getItem('aclass_auth_passwords') || '{}');
      passwords[student.id] = resetNewPass;
      localStorage.setItem('aclass_auth_passwords', JSON.stringify(passwords));
      alert(`تم تعيين كلمة مرور جديدة بنجاح للطالب: ${student.firstName} ${student.lastName}`);
      setResetCode('');
      setResetNewPass('');
      return;
    }

    alert('مستخدم غير مسجل بالكود المدخل.');
  };

  // ACTION: USER BAN / UNBAN
  const handleToggleStudentBan = (studentId: string, isBanned: boolean) => {
    const all = [...students];
    const updated = all.map(s => {
      if (s.id === studentId) {
        return { ...s, isBanned, banReason: isBanned ? 'مخالفة الشروط وإساءة استخدام المنصة' : undefined };
      }
      return s;
    });
    localStorage.setItem('aclass_students', JSON.stringify(updated));
    setStudents(updated);
    alert(isBanned ? 'تم حظر حساب الطالب بنجاح وفصل الجلسة!' : 'تم فك الحظر وإعادة تنشيط الحساب.');
  };

  // ACTION: GENERATE CODES
  const handleGenerateCodes = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codePkgId) {
      alert('يرجى اختيار باقة المدرس.');
      return;
    }

    const codes: PromoCode[] = JSON.parse(localStorage.getItem('aclass_promo_codes') || '[]');
    const pkg = packages.find(p => p.id === codePkgId);
    const resolvedTeacherId = pkg ? pkg.teacherId : 'teacher_1';
    
    for (let i = 0; i < codeCount; i++) {
      const randStr = Math.random().toString(36).substring(2, 7).toUpperCase();
      const codeStr = `A-CLASS-CODE-${randStr}`;
      
      const newCode: PromoCode = {
        id: codeStr,
        packageId: codePkgId,
        teacherId: resolvedTeacherId,
        price: codeValue,
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0]
      };
      codes.push(newCode);
    }

    localStorage.setItem('aclass_promo_codes', JSON.stringify(codes));
    setPromoCodes(codes);
    alert(`تم توليد عدد ${codeCount} كود شحن بنجاح!`);
    refreshDB();
  };

  // ACTION: SEND NOTIFICATION
  const handleSendNotif = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifTitle.trim() || !notifMsg.trim()) return;

    const notifs: AppNotification[] = JSON.parse(localStorage.getItem('aclass_notifications') || '[]');
    const newNotif: AppNotification = {
      id: 'notif_manual_' + Date.now(),
      title: notifTitle,
      message: notifMsg,
      date: new Date().toISOString(),
      status: 'unread',
      targetType: notifTarget === 'all' ? 'all' : notifTarget === 'teachers' ? 'teachers' : 'students'
    };
    notifs.push(newNotif);
    localStorage.setItem('aclass_notifications', JSON.stringify(notifs));
    setNotifications(notifs);

    setNotifTitle('');
    setNotifMsg('');
    alert('تم بث الإشعار المخصص لجميع المستخدمين بنجاح!');
  };

  // Spy / impersonate teacher logic
  const handleImpersonateClick = () => {
    if (!selectedTeacherId) {
      alert('يرجى اختيار المعلم أولاً.');
      return;
    }
    const t = teachers.find(teach => teach.id === selectedTeacherId);
    if (t) {
      onImpersonateTeacher(t);
    }
  };

  // Filter students based on search query
  const filteredStudentsList = students.filter(s => 
    s.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.lastName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.phone.includes(searchQuery) ||
    String(s.studentCode).includes(searchQuery)
  );

  return (
    <div className={`min-h-screen font-sans text-right flex flex-col md:flex-row relative transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-950 text-white dark' : 'bg-slate-50 text-slate-900 light-dashboard'
    }`}>
      
      {/* 1. SIDEBAR PANEL */}
      <aside className={`w-full md:w-64 flex flex-col justify-between shrink-0 z-20 transition-all duration-300 ${
        isDarkMode ? 'bg-slate-900 border-l border-slate-800' : 'bg-white border-l border-slate-200'
      }`}>
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-2">
            <Lock className="w-6 h-6 text-amber-500 animate-pulse" />
            <span className="font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-emerald-500">A CLASS</span>
          </div>

          <div className={`p-4 rounded-xl border transition-all ${
            isDarkMode ? 'bg-slate-950 border-slate-850' : 'bg-slate-100 border-slate-200/60'
          }`}>
            <span className="text-[10px] text-amber-500 font-bold block uppercase tracking-wider">المدير العام للمنصة:</span>
            <h4 className={`font-black text-sm ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>م. أنس الديب</h4>
            <p className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>صلاحيات الإدارة الكاملة</p>
          </div>

          <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
            
            {/* Group 1: Core System */}
            <div className="space-y-1">
              <h5 className="text-[10px] text-slate-500 font-bold px-2 uppercase">هيكلة النظام</h5>
              {group1.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full py-2 px-3 rounded-lg text-right font-bold text-xs flex items-center gap-2 transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-cyan-500 text-slate-950 shadow-md' 
                      : isDarkMode 
                        ? 'text-slate-300 hover:bg-slate-800' 
                        : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Group 2: User management */}
            <div className="space-y-1">
              <h5 className="text-[10px] text-slate-500 font-bold px-2 uppercase">إدارة المستخدمين</h5>
              {group2.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full py-2 px-3 rounded-lg text-right font-bold text-xs flex items-center gap-2 transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-cyan-500 text-slate-950 shadow-md' 
                      : isDarkMode 
                        ? 'text-slate-300 hover:bg-slate-800' 
                        : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Group 3: operations */}
            <div className="space-y-1">
              <h5 className="text-[10px] text-slate-500 font-bold px-2 uppercase">العمليات والرقابة</h5>
              {group3.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full py-2 px-3 rounded-lg text-right font-bold text-xs flex items-center gap-2 transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-cyan-500 text-slate-950 shadow-md' 
                      : isDarkMode 
                        ? 'text-slate-300 hover:bg-slate-800' 
                        : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Group 4: special control */}
            <div className="space-y-1">
              <h5 className="text-[10px] text-slate-500 font-bold px-2 uppercase">التحكم الفائق</h5>
              {group4.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full py-2 px-3 rounded-lg text-right font-bold text-xs flex items-center gap-2 transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-cyan-500 text-slate-950 shadow-md' 
                      : isDarkMode 
                        ? 'text-slate-300 hover:bg-slate-800' 
                        : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

          </div>
        </div>

        <div className="p-6 border-t border-slate-800/60">
          <button
            onClick={onLogout}
            className="w-full py-2.5 px-4 rounded-xl text-right text-xs font-bold text-rose-500 hover:bg-rose-500/10 flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* 2. DYNAMIC WORKSPACE CONTENT */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
        
        {/* TAB 1: STAGE */}
        {activeTab === 'stages' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-slate-100 text-base">إدارة المراحل التعليمية الرئيسية</h3>
              <button
                onClick={() => {
                  setStageName('');
                  setShowStageModal(true);
                }}
                className="px-4 py-2 bg-cyan-500 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                إضافة مرحلة جديدة
              </button>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold pb-2">
                    <th className="pb-3">رقم المرحلة</th>
                    <th className="pb-3">الاسم بالكامل</th>
                    <th className="pb-3">الصفوف المرتبطة بها</th>
                    <th className="pb-3 text-left">أدوات التحكم</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {stages.map(stage => (
                    <tr key={stage.id} className="text-slate-300">
                      <td className="py-3 font-mono text-cyan-400">#{stage.id}</td>
                      <td className="py-3 font-bold">{stage.name}</td>
                      <td className="py-3 font-mono">{grades.filter(g => g.stageId === stage.id).length} صفوف</td>
                      <td className="py-3 text-left">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditingStage(stage)}
                            className="p-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
                            title="تعديل المرحلة"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteStage(stage.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                            title="حذف المرحلة"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: GRADES */}
        {activeTab === 'grades' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-slate-100 text-base">ربط الصفوف التعليمية بالمراحل</h3>
              <button
                onClick={() => {
                  setGradeName('');
                  setGradeStageId(stages[0]?.id || '');
                  setShowGradeModal(true);
                }}
                className="px-4 py-2 bg-cyan-500 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                إضافة صف جديد
              </button>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold pb-2">
                    <th className="pb-3">ID الصف</th>
                    <th className="pb-3">اسم الصف الدراسي</th>
                    <th className="pb-3">المرحلة التعليمية</th>
                    <th className="pb-3 text-left">أدوات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {grades.map(grade => {
                    const st = stages.find(s => s.id === grade.stageId);
                    return (
                      <tr key={grade.id} className="text-slate-300">
                        <td className="py-3 font-mono text-cyan-400">#{grade.id}</td>
                        <td className="py-3 font-bold">{grade.name}</td>
                        <td className="py-3">{st?.name || 'مرحلة مفقودة'}</td>
                        <td className="py-3 text-left">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setEditingGrade(grade)}
                              className="p-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
                              title="تعديل الصف"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteGrade(grade.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                              title="حذف الصف"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: SUBJECTS */}
        {activeTab === 'subjects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-slate-100 text-base">المواد التعليمية وربط الأقسام</h3>
              <button
                onClick={() => {
                  setSubjectName('');
                  setSubStageId(stages[0]?.id || '');
                  setSubGradeId(grades[0]?.id || '');
                  setShowSubjectModal(true);
                }}
                className="px-4 py-2 bg-cyan-500 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                إضافة مادة جديدة
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subjects.map(sub => {
                const gr = grades.find(g => g.id === sub.gradeId);
                return (
                  <div key={sub.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center gap-4">
                    <div className="flex-1 text-right">
                      <h4 className="font-bold text-slate-200 text-sm">{sub.name}</h4>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{gr?.name || 'الصف العام'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setEditingSubject(sub)}
                        className="p-1 text-slate-400 hover:text-cyan-400 transition-colors"
                        title="تعديل المادة"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteSubject(sub.id)}
                        className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                        title="حذف المادة"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <span className="text-xs px-2 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded font-bold font-mono">
                        #{sub.id}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB: TEACHERS */}
        {activeTab === 'teachers' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-slate-100 text-base">إدارة حسابات المدرسين بالمنصة</h3>
              <button
                onClick={() => setShowTeacherModal(true)}
                className="px-4 py-2 bg-cyan-500 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                إضافة واعتماد معلم جديد
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teachers.map(t => (
                <div key={t.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4 relative group">
                  <div className="flex items-center gap-4 flex-1">
                    <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full object-cover border-2 border-slate-700" />
                    <div className="space-y-1 text-right flex-1">
                      <h4 className="font-extrabold text-slate-200 text-base">{t.name}</h4>
                      <p className="text-xs text-slate-400">إيميل: {t.email}</p>
                      <div className="flex gap-2 pt-2">
                        <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-bold rounded">عمولة المنصة: {t.commissionRate}%</span>
                        <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold rounded">الوضع: نشط</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => setEditingTeacher(t)}
                      className="p-2 bg-slate-950 border border-slate-850 text-slate-400 hover:text-cyan-400 rounded-xl transition-colors"
                      title="تعديل بيانات المعلم"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteTeacher(t.id)}
                      className="p-2 bg-slate-950 border border-slate-850 text-slate-400 hover:text-rose-500 rounded-xl transition-colors"
                      title="حذف المعلم نهائياً"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: STUDENTS */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-3">
              <h3 className="font-extrabold text-slate-100 text-base">إدارة الطلاب وتصحيح الحسابات</h3>
              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 text-slate-500 absolute top-3 right-3" />
                <input
                  type="text"
                  placeholder="بحث باسم الطالب، هاتف، أو كود..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-9 pl-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold pb-2">
                    <th className="pb-3">كود الطالب</th>
                    <th className="pb-3">الاسم</th>
                    <th className="pb-3">رقم الهاتف</th>
                    <th className="pb-3">المحفظة</th>
                    <th className="pb-3">الحالة</th>
                    <th className="pb-3 text-left">أدوات حظر</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {filteredStudentsList.map(s => (
                    <tr key={s.id} className="text-slate-300">
                      <td className="py-3 font-mono text-cyan-400 font-bold">#{s.studentCode}</td>
                      <td className="py-3 font-bold">{s.firstName} {s.lastName}</td>
                      <td className="py-3 font-mono">{s.phone}</td>
                      <td className="py-3 font-bold text-emerald-400">{s.wallet} ج</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${s.isBanned ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                          {s.isBanned ? 'محظور' : 'نشط'}
                        </span>
                      </td>
                      <td className="py-3 text-left">
                        {s.isBanned ? (
                          <button
                            onClick={() => handleToggleStudentBan(s.id, false)}
                            className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded"
                          >
                            فك الحظر
                          </button>
                        ) : (
                          <button
                            onClick={() => handleToggleStudentBan(s.id, true)}
                            className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] rounded"
                          >
                            حظر الحساب
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: BAN CENTER */}
        {activeTab === 'ban' && (
          <div className="max-w-md mx-auto p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl space-y-6">
            <h3 className="font-extrabold text-slate-100 text-base flex items-center gap-1.5">
              <ShieldAlert className="w-5 h-5 text-rose-500" />
              مركز العقوبات والحظر الفوري
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              قم بحظر فوري لأي حساب طالب يقوم بتداول الحساب أو إساءة الاستخدام. سيتم قطع الاتصال والخروج التلقائي للجلسة فوراً.
            </p>

            <form onSubmit={(e) => {
              e.preventDefault();
              const sCode = parseInt(walletStudentCode);
              if (isNaN(sCode)) return;
              const s = students.find(stud => stud.studentCode === sCode);
              if (s) {
                handleToggleStudentBan(s.id, true);
                setWalletStudentCode('');
              } else {
                alert('كود الطالب غير صحيح.');
              }
            }} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">أدخل كود الطالب المراد حظره:</label>
                <input
                  type="text"
                  placeholder="مثال: 5000"
                  value={walletStudentCode}
                  onChange={(e) => setWalletStudentCode(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md"
              >
                تطبيق الحظر الفوري وفصل الحساب
              </button>
            </form>
          </div>
        )}

        {/* TAB: STATS OVERVIEW */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
                <span className="text-[10px] text-slate-400 block font-bold">إجمالي طلاب المنصة:</span>
                <h3 className="text-2xl font-black text-cyan-400">{students.length} طالب</h3>
              </div>
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
                <span className="text-[10px] text-slate-400 block font-bold">إجمالي المدرسين:</span>
                <h3 className="text-2xl font-black text-amber-400">{teachers.length} مدرسين</h3>
              </div>
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
                <span className="text-[10px] text-slate-400 block font-bold">مبيعات الكورسات الإجمالية:</span>
                <h3 className="text-2xl font-black text-emerald-400">{subscriptions.length} اشتراكاً</h3>
              </div>
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
                <span className="text-[10px] text-slate-400 block font-bold">أكواد الشراء المصدرة:</span>
                <h3 className="text-2xl font-black text-cyan-400">{promoCodes.length} كود</h3>
              </div>
            </div>

            {/* Simulated interactive graph info */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
              <h4 className="font-extrabold text-slate-100 text-sm">النشاط المالي الحي بالمنصة:</h4>
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-850 h-44 flex items-end justify-between gap-2">
                <div className="w-1/12 bg-cyan-500 h-[20%] rounded-t text-[9px] text-center font-bold text-slate-900 pt-1">40 ج</div>
                <div className="w-1/12 bg-cyan-500 h-[40%] rounded-t text-[9px] text-center font-bold text-slate-900 pt-1">80 ج</div>
                <div className="w-1/12 bg-cyan-500 h-[30%] rounded-t text-[9px] text-center font-bold text-slate-900 pt-1">60 ج</div>
                <div className="w-1/12 bg-cyan-500 h-[65%] rounded-t text-[9px] text-center font-bold text-slate-900 pt-1">130 ج</div>
                <div className="w-1/12 bg-cyan-500 h-[50%] rounded-t text-[9px] text-center font-bold text-slate-900 pt-1">100 ج</div>
                <div className="w-1/12 bg-emerald-500 h-[85%] rounded-t text-[9px] text-center font-bold text-slate-900 pt-1">170 ج</div>
                <div className="w-1/12 bg-cyan-500 h-[60%] rounded-t text-[9px] text-center font-bold text-slate-900 pt-1">120 ج</div>
              </div>
              <p className="text-xs text-slate-400 text-center">📈 نسبة نمو مبيعات الاشتراكات لعام ٢٠٢٦ تفاعلياً بمعدل ممتاز.</p>
            </div>
          </div>
        )}

        {/* TAB: WALLET MANAGMENT */}
        {activeTab === 'wallet' && (
          <div className="space-y-6 text-right">
            
            {/* PENDING CHARGE REQUESTS */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-slate-100 text-sm flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                    <span>طلبات شحن الرصيد المعلقة بانتظار المراجعة والتأكيد</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">الطلبات التي أرسلها الطلاب بعد تحويل كاش لإضافتها يدوياً لمحفظتهم.</p>
                </div>
                <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/25 rounded-full text-xs font-bold">
                  {ledger.filter(l => l.status === 'pending').length} طلب معلق
                </span>
              </div>

              <div className="divide-y divide-slate-800 max-h-80 overflow-y-auto">
                {(() => {
                  const pendingList = ledger.filter(l => l.status === 'pending');
                  if (pendingList.length === 0) {
                    return (
                      <div className="p-6 text-center text-slate-400 text-xs">
                        لا توجد طلبات شحن معلقة حالياً. جميع الحسابات تمت تسويتها بنجاح! 🎉
                      </div>
                    );
                  }

                  return pendingList.map(item => {
                    const st = students.find(s => s.id === item.studentId);
                    return (
                      <div key={item.id} className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-850/20 transition-colors">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-200 font-bold text-xs">
                              {st ? `${st.firstName} ${st.lastName}` : 'طالب مجهول'}
                            </span>
                            <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-cyan-400 font-mono">
                              كود: #{st?.studentCode}
                            </span>
                          </div>
                          {item.senderPhone && (
                            <p className="text-[11px] text-slate-400">
                              رقم المحول منه: <strong className="text-slate-300 font-mono">{item.senderPhone}</strong>
                            </p>
                          )}
                          {item.notes && (
                            <p className="text-[11px] text-slate-400 italic">
                              ملاحظات الطالب: "{item.notes}"
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                          <div className="text-right">
                            <span className="text-[10px] text-slate-400 block font-bold">القيمة المطلوبة:</span>
                            <span className="text-sm font-black text-emerald-400 font-mono">{item.amount} ج</span>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => handleRejectCharge(item.id)}
                              className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 hover:border-rose-500/40 rounded-xl text-xs font-bold transition-all"
                            >
                              رفض الطلب
                            </button>
                            <button
                              onClick={() => handleApproveCharge(item.id)}
                              className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl text-xs font-black transition-all shadow-md"
                            >
                              موافقة وشحن ✅
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
                <h4 className="font-extrabold text-slate-100 text-sm">تعديل رصيد محفظة طالب يدوياً</h4>
                <p className="text-[11px] text-slate-400">إضافة رصيد (شحن يدوي بعد مراجعة إيصال التحويل) أو خصم رصيد للتعديل.</p>
                
                <form onSubmit={handleWalletAction} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">كود الطالب (#5000+)</label>
                    <input
                      type="text"
                      placeholder="مثال: 5000"
                      value={walletStudentCode}
                      onChange={(e) => setWalletStudentCode(e.target.value)}
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">القيمة بالجنيه</label>
                      <input
                        type="number"
                        placeholder="150"
                        value={walletAmount}
                        onChange={(e) => setWalletAmount(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">نوع العملية</label>
                      <select
                        value={walletActionType}
                        onChange={(e: any) => setWalletActionType(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:outline-none"
                      >
                        <option value="charge">شحن رصيد يدوياً</option>
                        <option value="deduct">خصم رصيد</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-black text-xs rounded-xl"
                  >
                    اعتماد العملية وتعديل الرصيد
                  </button>
                </form>
              </div>

              {/* Transactions list */}
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
                <h4 className="font-extrabold text-slate-100 text-sm">سجل العمليات المالية والليدجر المركزي</h4>
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {ledger.map(item => {
                    const st = students.find(s => s.id === item.studentId);
                    return (
                      <div key={item.id} className="p-3 bg-slate-950 border border-slate-850 rounded-xl flex justify-between items-center text-[11px]">
                        <div>
                          <strong className="text-slate-200 block">طالب: {st ? `${st.firstName} ${st.lastName}` : 'مجهول'}</strong>
                          <span className="text-slate-400">{item.type === 'charge' ? 'شحن رصيد' : 'شراء كورس'}</span>
                        </div>
                        <span className={item.type === 'charge' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                          {item.type === 'charge' ? '+' : '-'}{item.amount} ج
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB: PASSWORDS */}
        {activeTab === 'passwords' && (
          <div className="max-w-md mx-auto p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl space-y-4">
            <h3 className="font-extrabold text-slate-100 text-base flex items-center gap-1.5">
              <Key className="w-5 h-5 text-cyan-400" />
              تعديل وإعادة تعيين كلمة مرور مستخدم
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              أداة الدعم الفني السريع للأدمن لإعادة تعيين كلمة سر الطالب دون الحاجة لمعرفة القديمة.
            </p>

            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">أدخل كود الطالب (#5000+):</label>
                <input
                  type="text"
                  placeholder="5000"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">كلمة المرور الجديدة:</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={resetNewPass}
                  onChange={(e) => setResetNewPass(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-black text-xs rounded-xl shadow"
              >
                حفظ وإعادة تعيين كلمة السر
              </button>
            </form>
          </div>
        )}

        {/* TAB: NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <div className="max-w-md mx-auto p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl space-y-4">
            <h3 className="font-extrabold text-slate-100 text-base flex items-center gap-1.5">
              <Bell className="w-5 h-5 text-cyan-400" />
              إرسال وبث التنبيهات المخصصة بالمنصة
            </h3>
            <p className="text-xs text-slate-400">ستظهر الرسائل فورياً بلوحات تحكم الفئات المستهدفة المحددة:</p>

            <form onSubmit={handleSendNotif} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">عنوان الرسالة والتنبيه:</label>
                <input
                  type="text"
                  placeholder="عنوان الإعلان"
                  value={notifTitle}
                  onChange={(e) => setNotifTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">مضمون الإعلان:</label>
                <textarea
                  placeholder="اكتب تفاصيل الرسالة المراد توجيهها..."
                  value={notifMsg}
                  onChange={(e) => setNotifMsg(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs h-24"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">توجيه الهدف (Targeting):</label>
                <select
                  value={notifTarget}
                  onChange={(e: any) => setNotifTarget(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs"
                >
                  <option value="all">جميع مستخدمي المنصة</option>
                  <option value="teachers">المدرسين والمعلمين فقط</option>
                  <option value="students">جميع طلاب الصفوف والمراحل</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-black text-xs rounded-xl shadow"
              >
                بث وإرسال الإشعار الآن
              </button>
            </form>
          </div>
        )}

        {/* TAB: CODES */}
        {activeTab === 'codes' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
                <h4 className="font-extrabold text-slate-100 text-sm">توليد أكواد الشراء لربط الباقات</h4>
                <p className="text-[11px] text-slate-400">تتيح لك توليد سلسلة عشوائية من الأكواد لتوزيعها بالمكتبات.</p>

                <form onSubmit={handleGenerateCodes} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">عدد الأكواد المطلوبة</label>
                      <input
                        type="number"
                        value={codeCount}
                        onChange={(e) => setCodeCount(parseInt(e.target.value))}
                        className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">قيمة الكود (ج)</label>
                      <input
                        type="number"
                        value={codeValue}
                        onChange={(e) => setCodeValue(parseInt(e.target.value))}
                        className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">ربط الكود بباقة المدرس</label>
                    <select
                      value={codePkgId}
                      onChange={(e) => setCodePkgId(e.target.value)}
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:outline-none"
                    >
                      <option value="">-- اختر الباقة المعتمدة --</option>
                      {packages.map(p => {
                        const t = teachers.find(teach => teach.id === p.teacherId);
                        return (
                          <option key={p.id} value={p.id}>
                            {p.name} ({t ? t.name : 'معلم مجهول'}) - {p.price} ج
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-black text-xs rounded-xl shadow"
                  >
                    توليد الأكواد وحفظها بالسيستم
                  </button>
                </form>
              </div>

              {/* Codes Register view */}
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
                <h4 className="font-extrabold text-slate-100 text-sm">سجل الأكواد الفعالة والمستخدمة بالمنصة</h4>
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {promoCodes.map(c => {
                    const pkg = packages.find(p => p.id === c.packageId);
                    return (
                      <div key={c.id} className="p-3 bg-slate-950 border border-slate-850 rounded-xl flex justify-between items-center text-[11px]">
                        <div>
                          <strong className="text-cyan-400 block font-mono font-bold">{c.id}</strong>
                          <div className="text-slate-400 mt-1 flex flex-col gap-0.5">
                            <span>القيمة المدفوعة: {c.price} ج</span>
                            <span className="text-[10px] text-slate-500">الباقة: {pkg ? pkg.name : 'باقة مجهولة'}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${c.status === 'used' ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                            {c.status === 'used' ? 'تم استخدامه' : 'متاح'}
                          </span>
                          <button
                            onClick={() => handleDeletePromoCode(c.id)}
                            className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                            title="حذف الكود"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB: SUPERVISORY IMPERSONATION CONTROL */}
        {activeTab === 'impersonate' && (
          <div className="max-w-xl mx-auto p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl space-y-6 text-right">
            <h3 className="font-extrabold text-slate-100 text-base flex items-center gap-1.5">
              <Lock className="w-5 h-5 text-amber-500" />
              التحكم التجسسي والدخول للوحة المدرس (Spy Mode)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              أقوى أداة رقابة تتيح لك اختيار المدرس والدخول المباشر لحسابه لإضافة حصص أو تعديل الأسعار كأنك هو شخصياً دون الخروج من حساب الأدمن الخاص بك.
            </p>

            {/* Tree-View Path selector */}
            <div className="space-y-4 p-5 rounded-2xl bg-slate-950 border border-slate-850">
              <h4 className="font-bold text-slate-200 text-xs">مسار التنقل الشجري (Stage {'>'} Grade {'>'} Teacher):</h4>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold">1. تصفح المرحلة الدراسية:</label>
                  <select
                    value={selectedStageId}
                    onChange={(e) => setSelectedStageId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 text-xs"
                  >
                    {stages.map(st => (
                      <option key={st.id} value={st.id}>{st.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold">2. اختيار الصف الدراسي:</label>
                  <select
                    value={selectedGradeId}
                    onChange={(e) => setSelectedGradeId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 text-xs"
                  >
                    {grades.filter(g => g.stageId === selectedStageId).map(g => (
                      <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold">3. اختيار المعلم المعتمد لولوجه:</label>
                  <select
                    value={selectedTeacherId}
                    onChange={(e) => setSelectedTeacherId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 text-xs focus:outline-none"
                  >
                    <option value="">-- اختر المعلم --</option>
                    {teachers.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={handleImpersonateClick}
              className="w-full py-3.5 rounded-xl font-black text-sm bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white flex items-center justify-center gap-2 shadow-lg"
            >
              <Key className="w-4 h-4 animate-bounce" />
              دخول كمعلم فوري (Access Dashboard)
            </button>
          </div>
        )}

      </main>

      {/* CORE STAGES MODAL */}
      {showStageModal && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAddStage} className="max-w-sm w-full p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 text-right shadow-2xl">
            <h3 className="font-extrabold text-slate-200 text-sm">إضافة مرحلة جديدة لـ A CLASS</h3>
            <div className="space-y-1">
              <label className="text-xs text-slate-300">اسم المرحلة بالكامل:</label>
              <input
                type="text"
                placeholder="المرحلة الابتدائية"
                value={stageName}
                onChange={(e) => setStageName(e.target.value)}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setShowStageModal(false)} className="w-1/3 py-2 bg-slate-950 text-slate-400 text-xs font-bold rounded-lg">إلغاء</button>
              <button type="submit" className="w-2/3 py-2 bg-cyan-500 text-slate-950 text-xs font-bold rounded-lg">حفظ المرحلة</button>
            </div>
          </form>
        </div>
      )}

      {/* CORE GRADES MODAL */}
      {showGradeModal && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAddGrade} className="max-w-sm w-full p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 text-right shadow-2xl">
            <h3 className="font-extrabold text-slate-200 text-sm">إضافة صف دراسي جديد</h3>
            <div className="space-y-1">
              <label className="text-xs text-slate-300">اسم الصف:</label>
              <input
                type="text"
                placeholder="الصف الأول الثانوي"
                value={gradeName}
                onChange={(e) => setGradeName(e.target.value)}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-300">المرحلة المرتبط بها:</label>
              <select
                value={gradeStageId}
                onChange={(e) => setGradeStageId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:outline-none"
              >
                {stages.map(st => (
                  <option key={st.id} value={st.id}>{st.name}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setShowGradeModal(false)} className="w-1/3 py-2 bg-slate-950 text-slate-400 text-xs font-bold rounded-lg">إلغاء</button>
              <button type="submit" className="w-2/3 py-2 bg-cyan-500 text-slate-950 text-xs font-bold rounded-lg">حفظ الصف</button>
            </div>
          </form>
        </div>
      )}

      {/* NEW TEACHER ADMISSION WIZARD */}
      {showTeacherModal && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <form onSubmit={handleAddTeacher} className="max-w-lg w-full p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 text-right shadow-2xl overflow-y-auto my-8">
            <h3 className="font-extrabold text-slate-100 text-base border-b border-slate-800 pb-2 flex items-center gap-1.5">
              <Plus className="w-5 h-5 text-cyan-400" />
              إعداد ملف مدرس واعتماده بـ A CLASS
            </h3>

            {/* Section 1: Personal Details */}
            <div className="space-y-3">
              <h4 className="text-xs text-cyan-400 font-bold">1. البيانات الشخصية والأساسية</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400">اسم المدرس الثلاثي:</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: أ. أنس الديب"
                    value={tName}
                    onChange={(e) => setTName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400">البريد الإلكتروني (لتسجيل الدخول):</label>
                  <input
                    type="email"
                    required
                    placeholder="anas@eldeeb.com"
                    value={tEmail}
                    onChange={(e) => setTEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400">رقم الهاتف الفعلي:</label>
                  <input
                    type="text"
                    required
                    placeholder="01100196131"
                    value={tPhone}
                    onChange={(e) => setTPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400">كلمة المرور الافتراضية:</label>
                  <input
                    type="text"
                    placeholder="teacher123"
                    value={tPass}
                    onChange={(e) => setTPass(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Subject and Grades Multi-selection */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400">المادة الدراسية الأساسية:</label>
                  <select
                    required
                    value={tSubjectId}
                    onChange={(e) => setTSubjectId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs"
                  >
                    <option value="">-- اختر المادة --</option>
                    {subjects.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400">الصفوف الدراسية التي يدرسها:</label>
                  <div className="max-h-28 overflow-y-auto p-2 bg-slate-950 border border-slate-850 rounded-xl space-y-1 text-right">
                    {grades.map(g => (
                      <label key={g.id} className="flex items-center gap-2 text-[10px] text-slate-300 hover:text-white cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tGradeIds.includes(g.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setTGradeIds([...tGradeIds, g.id]);
                            } else {
                              setTGradeIds(tGradeIds.filter(id => id !== g.id));
                            }
                          }}
                          className="rounded text-cyan-500 bg-slate-900 border-slate-800 focus:ring-0 focus:ring-offset-0"
                        />
                        <span>{g.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Support Details */}
            <div className="space-y-3 pt-2 border-t border-slate-800/60">
              <h4 className="text-xs text-cyan-400 font-bold">2. إعدادات الدعم العلمي للمدرس</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400">اسم مسؤول الدعم (المساعد الرئيسي):</label>
                  <input
                    type="text"
                    placeholder="أ. محمود الخطيب"
                    value={tAssistant}
                    onChange={(e) => setTAssistant(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400">نسبة أرباح المنصة (%):</label>
                  <input
                    type="number"
                    value={tCommission}
                    onChange={(e) => setTCommission(parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400">رسالة اعتذار التأخير المخصصة لطلابه:</label>
                <textarea
                  value={tApology}
                  onChange={(e) => setTApology(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs h-16"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800/60">
              <button
                type="button"
                onClick={() => setShowTeacherModal(false)}
                className="w-1/3 py-2.5 bg-slate-950 border border-slate-800 text-slate-300 text-xs font-bold rounded-xl"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="w-2/3 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-black text-xs rounded-xl shadow-lg"
              >
                إضافة المدرس واعتماده فورا
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CORE SUBJECTS MODAL */}
      {showSubjectModal && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAddSubject} className="max-w-sm w-full p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 text-right shadow-2xl">
            <h3 className="font-extrabold text-slate-200 text-sm">إضافة مادة تعليمية جديدة</h3>
            <div className="space-y-1">
              <label className="text-xs text-slate-300">اسم المادة:</label>
              <input
                type="text"
                required
                placeholder="مثال: علم النفس والاجتماع"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-300">المرحلة التعليمية:</label>
              <select
                required
                value={subStageId}
                onChange={(e) => {
                  setSubStageId(e.target.value);
                  const filteredGrades = grades.filter(g => g.stageId === e.target.value);
                  if (filteredGrades.length > 0) {
                    setSubGradeId(filteredGrades[0].id);
                  } else {
                    setSubGradeId('');
                  }
                }}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:outline-none"
              >
                <option value="">-- اختر المرحلة --</option>
                {stages.map(st => (
                  <option key={st.id} value={st.id}>{st.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-300">الصف الدراسي المرتبط:</label>
              <select
                required
                value={subGradeId}
                onChange={(e) => setSubGradeId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:outline-none"
              >
                <option value="">-- اختر الصف --</option>
                {grades.filter(g => g.stageId === subStageId).map(g => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setShowSubjectModal(false)} className="w-1/3 py-2 bg-slate-950 text-slate-400 text-xs font-bold rounded-lg">إلغاء</button>
              <button type="submit" className="w-2/3 py-2 bg-cyan-500 text-slate-950 text-xs font-bold rounded-lg">حفظ المادة</button>
            </div>
          </form>
        </div>
      )}

      {/* EDIT STAGES MODAL */}
      {editingStage && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleEditStage} className="max-w-sm w-full p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 text-right shadow-2xl">
            <h3 className="font-extrabold text-slate-200 text-sm">تعديل المرحلة التعليمية</h3>
            <div className="space-y-1">
              <label className="text-xs text-slate-300">الاسم بالكامل:</label>
              <input
                type="text"
                required
                value={editingStage.name}
                onChange={(e) => setEditingStage({ ...editingStage, name: e.target.value })}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setEditingStage(null)} className="w-1/3 py-2 bg-slate-950 text-slate-400 text-xs font-bold rounded-lg">إلغاء</button>
              <button type="submit" className="w-2/3 py-2 bg-cyan-500 text-slate-950 text-xs font-bold rounded-lg">حفظ التغييرات</button>
            </div>
          </form>
        </div>
      )}

      {/* EDIT GRADES MODAL */}
      {editingGrade && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleEditGrade} className="max-w-sm w-full p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 text-right shadow-2xl">
            <h3 className="font-extrabold text-slate-200 text-sm">تعديل الصف الدراسي</h3>
            <div className="space-y-1">
              <label className="text-xs text-slate-300">اسم الصف:</label>
              <input
                type="text"
                required
                value={editingGrade.name}
                onChange={(e) => setEditingGrade({ ...editingGrade, name: e.target.value })}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-300">المرحلة المرتبطة:</label>
              <select
                required
                value={editingGrade.stageId}
                onChange={(e) => setEditingGrade({ ...editingGrade, stageId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:outline-none"
              >
                {stages.map(st => (
                  <option key={st.id} value={st.id}>{st.name}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setEditingGrade(null)} className="w-1/3 py-2 bg-slate-950 text-slate-400 text-xs font-bold rounded-lg">إلغاء</button>
              <button type="submit" className="w-2/3 py-2 bg-cyan-500 text-slate-950 text-xs font-bold rounded-lg">حفظ التغييرات</button>
            </div>
          </form>
        </div>
      )}

      {/* EDIT SUBJECTS MODAL */}
      {editingSubject && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleEditSubject} className="max-w-sm w-full p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 text-right shadow-2xl">
            <h3 className="font-extrabold text-slate-200 text-sm">تعديل المادة التعليمية</h3>
            <div className="space-y-1">
              <label className="text-xs text-slate-300">اسم المادة:</label>
              <input
                type="text"
                required
                value={editingSubject.name}
                onChange={(e) => setEditingSubject({ ...editingSubject, name: e.target.value })}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-300">المرحلة التعليمية:</label>
              <select
                required
                value={editingSubject.stageId}
                onChange={(e) => {
                  const stageId = e.target.value;
                  const filteredGrades = grades.filter(g => g.stageId === stageId);
                  setEditingSubject({
                    ...editingSubject,
                    stageId,
                    gradeId: filteredGrades.length > 0 ? filteredGrades[0].id : ''
                  });
                }}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:outline-none"
              >
                {stages.map(st => (
                  <option key={st.id} value={st.id}>{st.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-300">الصف الدراسي:</label>
              <select
                required
                value={editingSubject.gradeId}
                onChange={(e) => setEditingSubject({ ...editingSubject, gradeId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:outline-none"
              >
                {grades.filter(g => g.stageId === editingSubject.stageId).map(g => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setEditingSubject(null)} className="w-1/3 py-2 bg-slate-950 text-slate-400 text-xs font-bold rounded-lg">إلغاء</button>
              <button type="submit" className="w-2/3 py-2 bg-cyan-500 text-slate-950 text-xs font-bold rounded-lg">حفظ التغييرات</button>
            </div>
          </form>
        </div>
      )}

      {/* EDIT TEACHERS MODAL */}
      {editingTeacher && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <form onSubmit={handleEditTeacher} className="max-w-lg w-full p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 text-right shadow-2xl overflow-y-auto my-8">
            <h3 className="font-extrabold text-slate-100 text-base border-b border-slate-800 pb-2">تعديل بيانات المعلم</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400">الاسم بالكامل:</label>
                  <input
                    type="text"
                    required
                    value={editingTeacher.name}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400">البريد الإلكتروني:</label>
                  <input
                    type="email"
                    required
                    value={editingTeacher.email}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400">رقم الهاتف الفعلي:</label>
                  <input
                    type="text"
                    required
                    value={editingTeacher.phone}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400">نسبة أرباح المنصة (%):</label>
                  <input
                    type="number"
                    value={editingTeacher.commissionRate}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, commissionRate: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400">المادة الدراسية:</label>
                  <select
                    required
                    value={editingTeacher.subjectId}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, subjectId: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs"
                  >
                    {subjects.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400">الصفوف الدراسية التي يدرسها:</label>
                  <div className="max-h-24 overflow-y-auto p-2 bg-slate-950 border border-slate-850 rounded-xl space-y-1 text-right">
                    {grades.map(g => (
                      <label key={g.id} className="flex items-center gap-2 text-[10px] text-slate-300 hover:text-white cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingTeacher.gradeIds.includes(g.id)}
                          onChange={(e) => {
                            const gradeIds = e.target.checked
                              ? [...editingTeacher.gradeIds, g.id]
                              : editingTeacher.gradeIds.filter(id => id !== g.id);
                            setEditingTeacher({ ...editingTeacher, gradeIds });
                          }}
                          className="rounded text-cyan-500 bg-slate-900 border-slate-800"
                        />
                        <span>{g.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400">نبذة تعريفية للمدرس:</label>
                <textarea
                  value={editingTeacher.bio}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, bio: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs h-16"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400">اسم المساعد:</label>
                  <input
                    type="text"
                    value={editingTeacher.supportAssistantName}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, supportAssistantName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400">هاتف الدعم (واتساب):</label>
                  <input
                    type="text"
                    value={editingTeacher.supportPhone}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, supportPhone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800/60">
              <button type="button" onClick={() => setEditingTeacher(null)} className="w-1/3 py-2.5 bg-slate-950 border border-slate-800 text-slate-300 text-xs font-bold rounded-xl">إلغاء</button>
              <button type="submit" className="w-2/3 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-black text-xs rounded-xl shadow-lg">حفظ التعديلات</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
