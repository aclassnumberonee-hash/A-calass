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
  FileText, 
  Video, 
  FileQuestion, 
  Award, 
  LogOut, 
  TrendingUp, 
  Wallet,
  Settings,
  Calendar,
  Sparkles,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { Teacher, Package, Week, Content, Student, Subscription, AppNotification, EducationalStage, Grade, Subject, PromoCode, QuizQuestion } from '../types';

export function TeacherDashboard({ 
  teacher, 
  isDarkMode, 
  onLogout 
}: { 
  teacher: Teacher; 
  isDarkMode: boolean; 
  onLogout: () => void;
}) {
  const [stages, setStages] = useState<EducationalStage[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  
  // Scope settings (Onboarding)
  const [gradeIdsScope, setGradeIdsScope] = useState<string[]>(teacher.gradeIds || []);
  const [isOnboarded, setIsOnboarded] = useState(teacher.gradeIds && teacher.gradeIds.length > 0);
  const [showWizard, setShowWizard] = useState(!isOnboarded);

  // Filter bar
  const [selectedStageId, setSelectedStageId] = useState('');
  const [selectedGradeId, setSelectedGradeId] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');

  // Sidebar navigation
  const [activeTab, setActiveTab] = useState<'overview' | 'packages' | 'weeks' | 'content' | 'students' | 'notifications' | 'promo-codes'>('overview');

  // DB States
  const [packages, setPackages] = useState<Package[]>([]);
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [contentList, setContentList] = useState<Content[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);

  // Promo Codes state
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [codePkgId, setCodePkgId] = useState('');
  const [codeCount, setCodeCount] = useState(10);
  const [codeValue, setCodeValue] = useState(0);

  // Quiz Question Manager state
  const [selectedQuizContent, setSelectedQuizContent] = useState<Content | null>(null);
  const [showQuestionsModal, setShowQuestionsModal] = useState(false);
  const [newQText, setNewQText] = useState('');
  const [newQOpt1, setNewQOpt1] = useState('');
  const [newQOpt2, setNewQOpt2] = useState('');
  const [newQOpt3, setNewQOpt3] = useState('');
  const [newQOpt4, setNewQOpt4] = useState('');
  const [newQCorrect, setNewQCorrect] = useState<number>(0);
  const [newQExplanation, setNewQExplanation] = useState('');

  // Notifications states
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMsg, setNotifMsg] = useState('');
  const [notifTargetType, setNotifTargetType] = useState<'grade' | 'all-students'>('grade');

  // Modals / Editors Form state
  const [showPkgModal, setShowPkgModal] = useState(false);
  const [editingPkgId, setEditingPkgId] = useState<string | null>(null);
  const [pkgName, setPkgName] = useState('');
  const [pkgDesc, setPkgDesc] = useState('');
  const [pkgPrice, setPkgPrice] = useState(100);
  const [pkgOrigPrice, setPkgOrigPrice] = useState(150);
  const [pkgType, setPkgType] = useState<'monthly' | '3-months' | 'weekly' | 'offer'>('monthly');

  const [showWeekModal, setShowWeekModal] = useState(false);
  const [editingWeekId, setEditingWeekId] = useState<string | null>(null);
  const [weekName, setWeekName] = useState('');
  const [weekDesc, setWeekDesc] = useState('');
  const [weekPkgIds, setWeekPkgIds] = useState<string[]>([]);

  const [showContentModal, setShowContentModal] = useState(false);
  const [editingContentId, setEditingContentId] = useState<string | null>(null);
  const [contentName, setContentName] = useState('');
  const [contentDesc, setContentDesc] = useState('');
  const [contentType, setContentType] = useState<'video' | 'pdf' | 'quiz' | 'image'>('video');
  const [contentUrl, setContentUrl] = useState('');
  const [contentWeekIds, setContentWeekIds] = useState<string[]>([]);

  // Load state and Seed databases
  useEffect(() => {
    const allStages = JSON.parse(localStorage.getItem('aclass_stages') || '[]');
    const allGrades = JSON.parse(localStorage.getItem('aclass_grades') || '[]');
    const allSubjects = JSON.parse(localStorage.getItem('aclass_subjects') || '[]');
    setStages(allStages);
    setGrades(allGrades);
    setSubjects(allSubjects);

    if (allStages.length > 0) setSelectedStageId(allStages[0].id);
    
    // Fetch scope list
    const teachers: Teacher[] = JSON.parse(localStorage.getItem('aclass_teachers') || '[]');
    const currentT = teachers.find(t => t.id === teacher.id);
    if (currentT) {
      setGradeIdsScope(currentT.gradeIds || []);
      setIsOnboarded(currentT.gradeIds && currentT.gradeIds.length > 0);
    }

    refreshDB();
  }, [teacher.id]);

  const refreshDB = () => {
    setPackages(JSON.parse(localStorage.getItem('aclass_packages') || '[]'));
    setWeeks(JSON.parse(localStorage.getItem('aclass_weeks') || '[]'));
    setContentList(JSON.parse(localStorage.getItem('aclass_content') || '[]'));
    setStudents(JSON.parse(localStorage.getItem('aclass_students') || '[]'));
    setSubscriptions(JSON.parse(localStorage.getItem('aclass_subscriptions') || '[]'));
    setNotifications(JSON.parse(localStorage.getItem('aclass_notifications') || '[]'));
    setPromoCodes(JSON.parse(localStorage.getItem('aclass_promo_codes') || '[]'));
  };

  // Sync stage changes with grades
  useEffect(() => {
    const stageGrades = grades.filter(g => g.stageId === selectedStageId && gradeIdsScope.includes(g.id));
    if (stageGrades.length > 0) {
      setSelectedGradeId(stageGrades[0].id);
    } else {
      setSelectedGradeId('');
    }
  }, [selectedStageId, gradeIdsScope, grades]);

  // Sync grade changes with subjects
  useEffect(() => {
    setSelectedSubjectId(teacher.subjectId || '');
  }, [selectedGradeId]);

  // ONBOARDING SAVE
  const handleSaveScope = () => {
    if (gradeIdsScope.length === 0) {
      alert('يرجى اختيار صف دراسي واحد على الأقل للتدريس!');
      return;
    }

    const allTeachers: Teacher[] = JSON.parse(localStorage.getItem('aclass_teachers') || '[]');
    const updated = allTeachers.map(t => {
      if (t.id === teacher.id) {
        return { ...t, gradeIds: gradeIdsScope };
      }
      return t;
    });

    localStorage.setItem('aclass_teachers', JSON.stringify(updated));
    setIsOnboarded(true);
    setShowWizard(false);
    refreshDB();
  };

  // PACKAGE MANAGEMENT
  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkgName.trim()) return;

    const allPkgs: Package[] = JSON.parse(localStorage.getItem('aclass_packages') || '[]');
    
    if (editingPkgId) {
      const updated = allPkgs.map(p => {
        if (p.id === editingPkgId) {
          return {
            ...p,
            name: pkgName,
            description: pkgDesc,
            price: pkgPrice,
            originalPrice: pkgOrigPrice,
            type: pkgType
          };
        }
        return p;
      });
      localStorage.setItem('aclass_packages', JSON.stringify(updated));
    } else {
      const nextId = String(allPkgs.reduce((max, p) => parseInt(p.id) > max ? parseInt(p.id) : max, 4999) + 1);
      const newPkg: Package = {
        id: nextId,
        name: pkgName,
        description: pkgDesc,
        teacherId: teacher.id,
        gradeId: selectedGradeId,
        stageId: selectedStageId,
        subjectId: selectedSubjectId,
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop',
        price: pkgPrice,
        originalPrice: pkgOrigPrice,
        type: pkgType,
        createdAt: new Date().toISOString().split('T')[0]
      };
      allPkgs.push(newPkg);
      localStorage.setItem('aclass_packages', JSON.stringify(allPkgs));
    }

    setShowPkgModal(false);
    setEditingPkgId(null);
    setPkgName('');
    setPkgDesc('');
    refreshDB();
  };

  const handleDeletePackage = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الباقة؟ سيتم إزالتها من تصفح الطلاب.')) {
      const all = JSON.parse(localStorage.getItem('aclass_packages') || '[]');
      const filtered = all.filter((p: any) => p.id !== id);
      localStorage.setItem('aclass_packages', JSON.stringify(filtered));
      refreshDB();
    }
  };

  // WEEK MANAGEMENT
  const handleSaveWeek = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weekName.trim() || weekPkgIds.length === 0) {
      alert('يرجى ملء الحقول وربط الباقة.');
      return;
    }

    const allWeeks: Week[] = JSON.parse(localStorage.getItem('aclass_weeks') || '[]');

    if (editingWeekId) {
      const updated = allWeeks.map(w => {
        if (w.id === editingWeekId) {
          return {
            ...w,
            name: weekName,
            description: weekDesc,
            packageIds: weekPkgIds
          };
        }
        return w;
      });
      localStorage.setItem('aclass_weeks', JSON.stringify(updated));
    } else {
      const nextId = String(allWeeks.reduce((max, w) => parseInt(w.id) > max ? parseInt(w.id) : max, 0) + 1);
      const newWeek: Week = {
        id: nextId,
        name: weekName,
        description: weekDesc,
        packageIds: weekPkgIds,
        gradeId: selectedGradeId,
        stageId: selectedStageId,
        subjectId: selectedSubjectId,
        teacherId: teacher.id
      };
      allWeeks.push(newWeek);
      localStorage.setItem('aclass_weeks', JSON.stringify(allWeeks));
    }

    setShowWeekModal(false);
    setEditingWeekId(null);
    setWeekName('');
    setWeekDesc('');
    setWeekPkgIds([]);
    refreshDB();
  };

  const handleDeleteWeek = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الأسبوع؟')) {
      const all = JSON.parse(localStorage.getItem('aclass_weeks') || '[]');
      const filtered = all.filter((w: any) => w.id !== id);
      localStorage.setItem('aclass_weeks', JSON.stringify(filtered));
      refreshDB();
    }
  };

  // CONTENT MANAGEMENT
  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contentName.trim() || !contentUrl.trim() || contentWeekIds.length === 0) {
      alert('يرجى كتابة الاسم، الرابط، واختيار الأسبوع التابع له المحتوى.');
      return;
    }

    const allContent: Content[] = JSON.parse(localStorage.getItem('aclass_content') || '[]');

    if (editingContentId) {
      const updated = allContent.map(c => {
        if (c.id === editingContentId) {
          return {
            ...c,
            name: contentName,
            description: contentDesc,
            type: contentType,
            url: contentUrl,
            weekIds: contentWeekIds
          };
        }
        return c;
      });
      localStorage.setItem('aclass_content', JSON.stringify(updated));
    } else {
      const nextId = String(allContent.reduce((max, c) => parseInt(c.id) > max ? parseInt(c.id) : max, 99) + 1);
      
      // Default sample questions if type is Quiz
      const questions = contentType === 'quiz' ? [
        {
          id: 'q_' + Date.now() + '_1',
          questionText: 'السؤال التأسيسي الأول: ما هي مقاومة الموصل المعدني؟',
          options: ['ثابتة دائماً', 'تزداد بالحرارة', 'تقل بالحرارة', 'تتغير عشوائياً'],
          correctOptionIndex: 1,
          explanation: 'ارتفاع درجة الحرارة يزيد سعة اهتزازة جزيئات الفلز وبالتالي تزداد مقاومته الممانعة لمرور الشحنات.'
        }
      ] : undefined;

      const newContent: Content = {
        id: nextId,
        name: contentName,
        description: contentDesc,
        type: contentType,
        url: contentUrl,
        weekIds: contentWeekIds,
        gradeId: selectedGradeId,
        stageId: selectedStageId,
        subjectId: selectedSubjectId,
        teacherId: teacher.id,
        questions
      };
      allContent.push(newContent);
      localStorage.setItem('aclass_content', JSON.stringify(allContent));
    }

    setShowContentModal(false);
    setEditingContentId(null);
    setContentName('');
    setContentDesc('');
    setContentUrl('');
    setContentWeekIds([]);
    refreshDB();
  };

  const handleDeleteContent = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
      const all = JSON.parse(localStorage.getItem('aclass_content') || '[]');
      const filtered = all.filter((c: any) => c.id !== id);
      localStorage.setItem('aclass_content', JSON.stringify(filtered));
      refreshDB();
    }
  };

  // ACTION: GENERATE PROMO CODES
  const handleGenerateCodes = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codePkgId) {
      alert('يرجى اختيار الكورس أولاً.');
      return;
    }

    const codes: PromoCode[] = JSON.parse(localStorage.getItem('aclass_promo_codes') || '[]');
    
    for (let i = 0; i < codeCount; i++) {
      const randStr = Math.random().toString(36).substring(2, 7).toUpperCase();
      const codeStr = `A-CLASS-CODE-${randStr}`;
      
      const newCode: PromoCode = {
        id: codeStr,
        packageId: codePkgId,
        teacherId: teacher.id,
        price: codeValue,
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0]
      };
      codes.push(newCode);
    }

    localStorage.setItem('aclass_promo_codes', JSON.stringify(codes));
    setShowCodeModal(false);
    setCodePkgId('');
    setCodeCount(10);
    alert(`تم توليد عدد ${codeCount} كود بنجاح! 🎉`);
    refreshDB();
  };

  // ACTION: DELETE PROMO CODE
  const handleDeleteCode = (codeId: string) => {
    if (window.confirm('هل أنت متأكد من إلغاء/حذف هذا الكود؟')) {
      const codes: PromoCode[] = JSON.parse(localStorage.getItem('aclass_promo_codes') || '[]');
      const filtered = codes.filter(c => c.id !== codeId);
      localStorage.setItem('aclass_promo_codes', JSON.stringify(filtered));
      refreshDB();
    }
  };

  // ACTION: SEND NOTIFICATION
  const handleSendNotif = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifTitle.trim() || !notifMsg.trim()) {
      alert('يرجى كتابة عنوان الإعلان ومحتواه.');
      return;
    }

    const notifs: AppNotification[] = JSON.parse(localStorage.getItem('aclass_notifications') || '[]');
    const newNotif: AppNotification = {
      id: 'notif_teacher_' + Date.now(),
      title: `${teacher.name}: ${notifTitle}`,
      message: notifMsg,
      date: new Date().toISOString(),
      status: 'unread',
      targetType: notifTargetType === 'grade' ? 'grade' : 'students',
      targetGradeId: notifTargetType === 'grade' ? selectedGradeId : undefined
    };

    notifs.push(newNotif);
    localStorage.setItem('aclass_notifications', JSON.stringify(notifs));
    
    setNotifTitle('');
    setNotifMsg('');
    alert('تم بث الإعلان بنجاح إلى طلابك! 🚀');
    refreshDB();
  };

  // ACTION: SAVE QUIZ QUESTION
  const handleSaveQuizQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuizContent) return;
    if (!newQText.trim() || !newQOpt1.trim() || !newQOpt2.trim() || !newQOpt3.trim() || !newQOpt4.trim()) {
      alert('يرجى ملء نص السؤال والخيارات الأربعة بالكامل.');
      return;
    }

    const newQuestion: QuizQuestion = {
      id: 'q_' + Date.now(),
      questionText: newQText,
      options: [newQOpt1, newQOpt2, newQOpt3, newQOpt4],
      correctOptionIndex: newQCorrect,
      explanation: newQExplanation.trim() || undefined
    };

    const allContent: Content[] = JSON.parse(localStorage.getItem('aclass_content') || '[]');
    const updated = allContent.map(c => {
      if (c.id === selectedQuizContent.id) {
        const questions = c.questions || [];
        return {
          ...c,
          questions: [...questions, newQuestion]
        };
      }
      return c;
    });

    localStorage.setItem('aclass_content', JSON.stringify(updated));
    
    // Update local state in-place for active modal
    setSelectedQuizContent(prev => {
      if (!prev) return null;
      return {
        ...prev,
        questions: [...(prev.questions || []), newQuestion]
      };
    });

    // Reset fields
    setNewQText('');
    setNewQOpt1('');
    setNewQOpt2('');
    setNewQOpt3('');
    setNewQOpt4('');
    setNewQCorrect(0);
    setNewQExplanation('');

    refreshDB();
  };

  // ACTION: DELETE QUIZ QUESTION
  const handleDeleteQuizQuestion = (qId: string) => {
    if (!selectedQuizContent) return;
    if (window.confirm('هل أنت متأكد من حذف هذا السؤال؟')) {
      const allContent: Content[] = JSON.parse(localStorage.getItem('aclass_content') || '[]');
      const updated = allContent.map(c => {
        if (c.id === selectedQuizContent.id) {
          const questions = c.questions || [];
          return {
            ...c,
            questions: questions.filter(q => q.id !== qId)
          };
        }
        return c;
      });

      localStorage.setItem('aclass_content', JSON.stringify(updated));

      setSelectedQuizContent(prev => {
        if (!prev) return null;
        return {
          ...prev,
          questions: (prev.questions || []).filter(q => q.id !== qId)
        };
      });

      refreshDB();
    }
  };

  // FILTERED STATS & OVERVIEW DATA
  const curGradePackages = packages.filter(p => p.teacherId === teacher.id && p.gradeId === selectedGradeId);
  const curGradePkgIds = curGradePackages.map(p => p.id);
  const curGradeWeeks = weeks.filter(w => w.teacherId === teacher.id && w.gradeId === selectedGradeId);
  const curGradeContents = contentList.filter(c => c.teacherId === teacher.id && c.gradeId === selectedGradeId);

  // Filter student subscriptions to teacher's packages in the current grade
  const enrolledStudentIds = subscriptions
    .filter(sub => curGradePkgIds.includes(sub.packageId) && sub.status === 'active')
    .map(sub => sub.studentId);
  const enrolledStudents = students.filter(s => enrolledStudentIds.includes(s.id));

  // Compute total earnings (with commission deduction)
  const totalRawEarnings = subscriptions
    .filter(sub => curGradePkgIds.includes(sub.packageId) && sub.status === 'active')
    .reduce((sum, sub) => {
      const pkg = packages.find(p => p.id === sub.packageId);
      return sum + (pkg?.price || 0);
    }, 0);
  
  const netEarnings = Math.ceil(totalRawEarnings * (1 - (teacher.commissionRate / 100)));

  return (
    <div className={`min-h-screen font-sans text-right flex flex-col md:flex-row relative transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-950 text-white dark' : 'bg-slate-50 text-slate-900 light-dashboard'
    }`}>
      
      {/* ONBOARDING WIZARD OVERLAY */}
      {showWizard && (
        <div className="fixed inset-0 bg-slate-950/95 z-50 flex items-center justify-center p-4">
          <div className="max-w-xl w-full p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 text-right">
            <div className="text-center space-y-2">
              <Award className="w-12 h-12 text-cyan-400 mx-auto animate-pulse" />
              <h2 className="text-2xl font-black text-slate-100">معالج التخصيص والمراحل للتدريس</h2>
              <p className="text-xs text-slate-400">يرجى تحديد الصفوف الدراسية التي تقوم بتدريسها لتفعيل لوحة التحكم:</p>
            </div>

            <div className="space-y-3">
              {grades.map(grade => {
                const isSelected = gradeIdsScope.includes(grade.id);
                return (
                  <div
                    key={grade.id}
                    onClick={() => {
                      if (isSelected) {
                        setGradeIdsScope(prev => prev.filter(id => id !== grade.id));
                      } else {
                        setGradeIdsScope(prev => [...prev, grade.id]);
                      }
                    }}
                    className={`p-4 rounded-xl border cursor-pointer flex justify-between items-center transition-all ${
                      isSelected ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : 'bg-slate-950 border-slate-850 text-slate-400'
                    }`}
                  >
                    <span>{grade.name}</span>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className="w-4 h-4 rounded border-slate-850 text-cyan-500"
                    />
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleSaveScope}
              className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-black text-sm rounded-xl shadow-lg"
            >
              حفظ التخصصات والدخول للوحة التحكم
            </button>
          </div>
        </div>
      )}

      {/* 1. SIDEBAR */}
      <aside className={`w-full md:w-64 flex flex-col justify-between shrink-0 z-20 transition-all duration-300 ${
        isDarkMode ? 'bg-slate-900 border-l border-slate-800' : 'bg-white border-l border-slate-200'
      }`}>
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-cyan-400" />
            <span className="font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 font-sans">A CLASS</span>
          </div>

          <div className={`p-4 rounded-xl border space-y-1 transition-all ${
            isDarkMode ? 'bg-slate-950 border-slate-850' : 'bg-slate-100 border-slate-200/60'
          }`}>
            <span className="text-[10px] text-cyan-500 font-bold block uppercase tracking-wider">المعلم المشرف:</span>
            <h4 className={`font-black text-sm ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>{teacher.name}</h4>
            <p className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>لوحة تحكم المعلم الفائقة</p>
          </div>

          <nav className="flex flex-col gap-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full py-3 px-4 rounded-xl text-right font-bold text-sm flex items-center gap-2.5 transition-colors ${
                activeTab === 'overview' 
                  ? 'bg-cyan-500 text-slate-950 shadow-md' 
                  : isDarkMode 
                    ? 'text-slate-300 hover:bg-slate-800' 
                    : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              الرئيسية والإحصائيات
            </button>
            <button
              onClick={() => setActiveTab('packages')}
              className={`w-full py-3 px-4 rounded-xl text-right font-bold text-sm flex items-center gap-2.5 transition-colors ${
                activeTab === 'packages' 
                  ? 'bg-cyan-500 text-slate-950 shadow-md' 
                  : isDarkMode 
                    ? 'text-slate-300 hover:bg-slate-800' 
                    : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              إدارة الكورسات والباقات
            </button>
            <button
              onClick={() => setActiveTab('weeks')}
              className={`w-full py-3 px-4 rounded-xl text-right font-bold text-sm flex items-center gap-2.5 transition-colors ${
                activeTab === 'weeks' 
                  ? 'bg-cyan-500 text-slate-950 shadow-md' 
                  : isDarkMode 
                    ? 'text-slate-300 hover:bg-slate-800' 
                    : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-5 h-5" />
              إدارة الفصول والأسابيع
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`w-full py-3 px-4 rounded-xl text-right font-bold text-sm flex items-center gap-2.5 transition-colors ${
                activeTab === 'content' 
                  ? 'bg-cyan-500 text-slate-950 shadow-md' 
                  : isDarkMode 
                    ? 'text-slate-300 hover:bg-slate-800' 
                    : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Video className="w-5 h-5" />
              رفع وإدارة المحتوى
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`w-full py-3 px-4 rounded-xl text-right font-bold text-sm flex items-center gap-2.5 transition-colors ${
                activeTab === 'students' 
                  ? 'bg-cyan-500 text-slate-950 shadow-md' 
                  : isDarkMode 
                    ? 'text-slate-300 hover:bg-slate-800' 
                    : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Users className="w-5 h-5" />
              قائمة الطلاب والاشتراكات
            </button>
            <button
              onClick={() => setActiveTab('promo-codes')}
              className={`w-full py-3 px-4 rounded-xl text-right font-bold text-sm flex items-center gap-2.5 transition-colors ${
                activeTab === 'promo-codes' 
                  ? 'bg-cyan-500 text-slate-950 shadow-md' 
                  : isDarkMode 
                    ? 'text-slate-300 hover:bg-slate-800' 
                    : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              أكواد السنتر والاشتراكات
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full py-3 px-4 rounded-xl text-right font-bold text-sm flex items-center gap-2.5 transition-colors ${
                activeTab === 'notifications' 
                  ? 'bg-cyan-500 text-slate-950 shadow-md' 
                  : isDarkMode 
                    ? 'text-slate-300 hover:bg-slate-800' 
                    : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Bell className="w-5 h-5" />
              إرسال التنبيهات والإعلانات
            </button>
          </nav>
        </div>

        <div className={`p-6 border-t space-y-2 ${isDarkMode ? 'border-slate-800/60' : 'border-slate-100'}`}>
          <button
            onClick={() => setShowWizard(true)}
            className={`w-full py-2.5 px-4 text-xs font-bold rounded-xl border flex items-center gap-2 transition-colors ${
              isDarkMode 
                ? 'border-slate-800 text-cyan-400 bg-transparent hover:bg-slate-850' 
                : 'border-slate-200 text-cyan-600 bg-white hover:bg-slate-50'
            }`}
          >
            <Settings className="w-4 h-4" />
            تعديل تخصصات التدريس
          </button>
          <button
            onClick={onLogout}
            className="w-full py-3 px-4 rounded-xl text-right text-sm font-bold text-rose-500 hover:bg-rose-500/10 flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            تسجيل الخروج الآمن
          </button>
        </div>
      </aside>

      {/* 2. DYNAMIC WORKSPACE */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
        
        {/* TOP FILTER BAR: STAGE > GRADE > SUBJECT */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-3xl flex flex-wrap gap-4 items-center">
          <span className="text-xs text-slate-400 font-bold">فلتر العمل والتحكم الحالي:</span>
          
          <div className="flex gap-2">
            <select
              value={selectedStageId}
              onChange={(e) => setSelectedStageId(e.target.value)}
              className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold focus:outline-none"
            >
              {stages.map(st => (
                <option key={st.id} value={st.id}>{st.name}</option>
              ))}
            </select>

            <select
              value={selectedGradeId}
              onChange={(e) => setSelectedGradeId(e.target.value)}
              className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold focus:outline-none"
            >
              {grades
                .filter(g => g.stageId === selectedStageId && gradeIdsScope.includes(g.id))
                .map(g => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
            </select>

            <div className="px-3 py-1.5 bg-slate-950 border border-slate-850 text-cyan-400 rounded-xl text-xs font-black">
              المادة: {subjects.find(s => s.id === teacher.subjectId)?.name || 'الفيزياء'}
            </div>
          </div>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
                <span className="text-xs text-slate-400 block font-bold">إجمالي الكورسات المرفوعة:</span>
                <h3 className="text-3xl font-black text-cyan-400">{curGradePackages.length} باقات</h3>
              </div>
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
                <span className="text-xs text-slate-400 block font-bold">الطلاب المشتركين حالياً:</span>
                <h3 className="text-3xl font-black text-emerald-400">{enrolledStudents.length} طلاب</h3>
              </div>
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
                <span className="text-xs text-slate-400 block font-bold">أرباحك الصافية (بعد العمولات):</span>
                <h3 className="text-3xl font-black text-amber-400">{netEarnings} جنيهاً</h3>
              </div>
            </div>

            {/* Quick Summary of Weeks */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
              <h4 className="font-extrabold text-slate-100 text-sm">الهيكل التنظيمي الحالي لصفك الدراسي:</h4>
              <div className="space-y-2">
                {curGradeWeeks.map(w => (
                  <div key={w.id} className="p-3 bg-slate-950/60 rounded-xl border border-slate-850 flex justify-between items-center text-xs">
                    <div>
                      <strong className="text-slate-200 block">{w.name}</strong>
                      <span className="text-slate-400">{w.description}</span>
                    </div>
                    <span className="px-2.5 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-lg font-mono">
                      {contentList.filter(c => c.weekIds.includes(w.id)).length} محاضرات
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PACKAGE LIST (KURSES) */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-slate-100 text-base">إدارة كورسات وباقات الصف الدراسي المختار</h3>
              <button
                onClick={() => {
                  setEditingPkgId(null);
                  setPkgName('');
                  setPkgDesc('');
                  setPkgPrice(150);
                  setPkgOrigPrice(200);
                  setShowPkgModal(true);
                }}
                className="px-4 py-2 bg-cyan-500 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                إضافة باقة جديدة
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {curGradePackages.map(pkg => (
                <div key={pkg.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="px-2 py-0.5 bg-slate-950 text-slate-400 rounded text-[10px] font-mono">#{pkg.id}</span>
                      <span className="text-xs font-bold text-amber-500">سعر: {pkg.price} ج</span>
                    </div>
                    <h4 className="font-extrabold text-slate-200 text-base">{pkg.name}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{pkg.description}</p>
                  </div>

                  <div className="flex gap-2 border-t border-slate-800/40 pt-3">
                    <button
                      onClick={() => {
                        setEditingPkgId(pkg.id);
                        setPkgName(pkg.name);
                        setPkgDesc(pkg.description);
                        setPkgPrice(pkg.price);
                        setPkgOrigPrice(pkg.originalPrice);
                        setPkgType(pkg.type);
                        setShowPkgModal(true);
                      }}
                      className="flex-1 py-2 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-xs font-bold text-cyan-400 rounded-lg flex items-center justify-center gap-1.5"
                    >
                      <Edit className="w-4 h-4" />
                      تعديل الكورس
                    </button>
                    <button
                      onClick={() => handleDeletePackage(pkg.id)}
                      className="py-2 px-3 border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 rounded-lg flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WEEK MANAGEMENT */}
        {activeTab === 'weeks' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-slate-100 text-base">إدارة وتقسيم أسابيع الفصول المنهجية</h3>
              <button
                onClick={() => {
                  setEditingWeekId(null);
                  setWeekName('');
                  setWeekDesc('');
                  setWeekPkgIds([]);
                  setShowWeekModal(true);
                }}
                className="px-4 py-2 bg-cyan-500 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                إضافة أسبوع جديد
              </button>
            </div>

            <div className="space-y-4">
              {curGradeWeeks.map(w => (
                <div key={w.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center text-right">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-slate-950 text-slate-400 rounded text-[10px] font-mono">أسبوع {w.id}</span>
                      <h4 className="font-extrabold text-slate-100 text-base">{w.name}</h4>
                    </div>
                    <p className="text-xs text-slate-400">{w.description}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingWeekId(w.id);
                        setWeekName(w.name);
                        setWeekDesc(w.description);
                        setWeekPkgIds(w.packageIds);
                        setShowWeekModal(true);
                      }}
                      className="p-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-cyan-400 rounded-lg"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteWeek(w.id)}
                      className="p-2.5 border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTENT MANAGEMENT */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-slate-100 text-base">رفع وإدارة محتوى المحاضرات (فيديو، ملفات، امتحانات)</h3>
              <button
                onClick={() => {
                  setEditingContentId(null);
                  setContentName('');
                  setContentDesc('');
                  setContentType('video');
                  setContentUrl('');
                  setContentWeekIds([]);
                  setShowContentModal(true);
                }}
                className="px-4 py-2 bg-cyan-500 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                إضافة محتوى جديد
              </button>
            </div>

            <div className="space-y-3">
              {curGradeContents.map(c => (
                <div key={c.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-850 text-cyan-400 flex items-center justify-center">
                      {c.type === 'video' && <Video className="w-5 h-5" />}
                      {c.type === 'pdf' && <FileText className="w-5 h-5" />}
                      {c.type === 'quiz' && <FileQuestion className="w-5 h-5" />}
                      {c.type === 'image' && <Sparkles className="w-5 h-5" />}
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-200 text-sm">{c.name}</h5>
                      <span className="text-[10px] text-slate-400 uppercase font-mono">النوع: {c.type}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {c.type === 'quiz' && (
                      <button
                        onClick={() => {
                          setSelectedQuizContent(c);
                          setShowQuestionsModal(true);
                        }}
                        type="button"
                        className="px-3 py-1.5 bg-cyan-500 text-slate-950 hover:bg-cyan-600 rounded-lg font-black text-[10px] flex items-center gap-1 shadow-sm transition-all"
                        title="إدارة أسئلة الاختبار"
                      >
                        <FileQuestion className="w-3.5 h-3.5" />
                        إدارة الأسئلة ({c.questions?.length || 0})
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setEditingContentId(c.id);
                        setContentName(c.name);
                        setContentDesc(c.description);
                        setContentType(c.type);
                        setContentUrl(c.url);
                        setContentWeekIds(c.weekIds);
                        setShowContentModal(true);
                      }}
                      className="p-2 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-cyan-400 rounded-lg"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteContent(c.id)}
                      className="p-2 border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STUDENTS LIST */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            <h3 className="font-extrabold text-slate-100 text-base">الطلاب المشتركين في كورساتك حالياً</h3>
            
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl overflow-x-auto">
              {enrolledStudents.length === 0 ? (
                <div className="p-4 text-center text-slate-400 text-xs">
                  لا يوجد طلاب مشتركين في كورسات هذا الصف الدراسي حتى الآن.
                </div>
              ) : (
                <table className="w-full text-right text-xs">
                  <thead>
                    <tr className="border-b border-slate-850 text-slate-400 uppercase font-bold">
                      <th className="pb-3">كود الطالب</th>
                      <th className="pb-3">الاسم بالكامل</th>
                      <th className="pb-3">المحافظة</th>
                      <th className="pb-3">رقم هاتف الطالب</th>
                      <th className="pb-3">رقم ولي الأمر</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {enrolledStudents.map(student => (
                      <tr key={student.id} className="text-slate-300">
                        <td className="py-3 font-mono text-cyan-400 font-bold">#{student.studentCode}</td>
                        <td className="py-3 font-bold">{student.firstName} {student.lastName}</td>
                        <td className="py-3">{student.governorate}</td>
                        <td className="py-3 font-mono">{student.phone}</td>
                        <td className="py-3 font-mono">{student.parentPhone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* TAB: PROMO CODES */}
        {activeTab === 'promo-codes' && (
          <div className="space-y-6 text-right">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 className="font-extrabold text-slate-100 text-lg">أكواد السنتر والاشتراكات المباشرة</h3>
                <p className="text-xs text-slate-400">أنشئ أكواد شحن خاصة بك لتوزيعها على طلاب السنتر لتفعيل الكورسات مباشرة دون شحن محفظتهم.</p>
              </div>
              <button
                onClick={() => {
                  if (curGradePackages.length === 0) {
                    alert('يرجى إنشاء باقة/كورس أولاً قبل توليد الأكواد!');
                    return;
                  }
                  setCodePkgId(curGradePackages[0].id);
                  setCodeValue(0);
                  setCodeCount(10);
                  setShowCodeModal(true);
                }}
                className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5 shadow-md transition-all"
              >
                <Plus className="w-4 h-4" />
                توليد أكواد اشتراك جديدة
              </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
                <span className="text-xs text-slate-400 block font-bold">إجمالي الأكواد المولدة:</span>
                <h4 className="text-2xl font-black text-slate-100">{promoCodes.filter(code => packages.filter(p => p.teacherId === teacher.id).map(p => p.id).includes(code.packageId)).length} كود</h4>
              </div>
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
                <span className="text-xs text-slate-400 block font-bold">الأكواد الفعالة بانتظار الاستخدام:</span>
                <h4 className="text-2xl font-black text-amber-400">{promoCodes.filter(code => packages.filter(p => p.teacherId === teacher.id).map(p => p.id).includes(code.packageId) && code.status === 'active').length} كود</h4>
              </div>
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
                <span className="text-xs text-slate-400 block font-bold">الأكواد المستعملة من الطلاب:</span>
                <h4 className="text-2xl font-black text-emerald-400">{promoCodes.filter(code => packages.filter(p => p.teacherId === teacher.id).map(p => p.id).includes(code.packageId) && code.status === 'used').length} كود</h4>
              </div>
            </div>

            {/* Codes List */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl overflow-x-auto space-y-4">
              <div className="border-b border-slate-850 pb-3 flex justify-between items-center">
                <h4 className="font-extrabold text-slate-200 text-sm">قائمة الأكواد وتفاصيلها:</h4>
                <span className="text-[10px] text-slate-400">عرض أحدث الأكواد أولاً</span>
              </div>

              {promoCodes.filter(code => packages.filter(p => p.teacherId === teacher.id).map(p => p.id).includes(code.packageId)).length === 0 ? (
                <div className="p-10 text-center text-slate-400 text-xs">
                  لم تقم بتوليد أي أكواد بعد. اضغط على الزر بالأعلى للبدء! 🎁
                </div>
              ) : (
                <table className="w-full text-right text-xs">
                  <thead>
                    <tr className="border-b border-slate-850 text-slate-400 uppercase font-bold">
                      <th className="pb-3 text-right">كود الاشتراك المباشر</th>
                      <th className="pb-3 text-right">الكورس المرتبط</th>
                      <th className="pb-3 text-center">الحالة</th>
                      <th className="pb-3 text-right">المستخدم</th>
                      <th className="pb-3 text-center">تاريخ الإنشاء</th>
                      <th className="pb-3 text-center">الإجراء</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {promoCodes.filter(code => packages.filter(p => p.teacherId === teacher.id).map(p => p.id).includes(code.packageId)).slice().reverse().map(code => {
                      const pkg = packages.find(p => p.id === code.packageId);
                      const usedStudent = students.find(s => s.id === code.usedByStudentId);
                      return (
                        <tr key={code.id} className="text-slate-300 hover:bg-slate-850/10 transition-colors">
                          <td className="py-3 font-mono text-cyan-400 font-black select-all">{code.id}</td>
                          <td className="py-3 font-bold text-slate-200">{pkg ? pkg.name : 'كورس مجهول'}</td>
                          <td className="py-3 text-center">
                            {code.status === 'active' ? (
                              <span className="px-2 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-[10px] font-bold">
                                فعال / متاح
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] font-bold">
                                مستخدم ✅
                              </span>
                            )}
                          </td>
                          <td className="py-3">
                            {usedStudent ? (
                              <div className="flex flex-col">
                                <span className="font-bold text-slate-100">{usedStudent.firstName} {usedStudent.lastName}</span>
                                <span className="text-[10px] text-slate-400 font-mono">#{usedStudent.studentCode}</span>
                              </div>
                            ) : (
                              <span className="text-slate-500">-</span>
                            )}
                          </td>
                          <td className="py-3 text-center font-mono text-slate-400">{code.createdAt}</td>
                          <td className="py-3 text-center">
                            {code.status === 'active' ? (
                              <button
                                onClick={() => handleDeleteCode(code.id)}
                                className="p-1.5 border border-rose-500/20 hover:border-rose-500/50 text-rose-500 hover:bg-rose-500/10 rounded-lg text-xs font-bold transition-all"
                                title="إلغاء وحذف الكود"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            ) : (
                              <span className="text-slate-500 text-[10px] font-bold">مغلق</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* TAB: NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <div className="space-y-6 text-right">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
              <div className="space-y-1">
                <h3 className="font-extrabold text-slate-100 text-base">بث الإعلانات والتنبيهات المباشرة لطلابك</h3>
                <p className="text-xs text-slate-400">اكتب إعلان عام أو رسالة توجيهية لتظهر للطلاب في لوحة التحكم الخاصة بهم فوراً.</p>
              </div>

              <form onSubmit={handleSendNotif} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 block">عنوان الإعلان</label>
                  <input
                    type="text"
                    value={notifTitle}
                    onChange={(e) => setNotifTitle(e.target.value)}
                    placeholder="مثال: تنبيه هام بخصوص موعد الامتحان التجريبي القادم"
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:ring-1 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 block">محتوى الإعلان</label>
                  <textarea
                    value={notifMsg}
                    onChange={(e) => setNotifMsg(e.target.value)}
                    placeholder="اكتب هنا تفاصيل الإعلان بالتفصيل..."
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:ring-1 focus:ring-cyan-500 focus:outline-none h-28"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 block">الفئة المستهدفة من طلابك</label>
                    <select
                      value={notifTargetType}
                      onChange={(e: any) => setNotifTargetType(e.target.value)}
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:outline-none"
                    >
                      <option value="grade">جميع طلاب الصف الدراسي الحالي فقط</option>
                      <option value="all-students">جميع الطلاب المشتركين لدي في كل الصفوف</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                      <Bell className="w-4 h-4" />
                      بث الإعلان الآن 🚀
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Notification History */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
              <h4 className="font-extrabold text-slate-200 text-sm">سجل الإعلانات السابقة:</h4>
              <div className="divide-y divide-slate-850">
                {(() => {
                  const mySentNotifs = notifications.filter(n => n.title.startsWith(`${teacher.name}:`));
                  if (mySentNotifs.length === 0) {
                    return (
                      <div className="py-6 text-center text-slate-500 text-xs">
                        لم تقم ببث أي إعلانات سابقة بعد.
                      </div>
                    );
                  }
                  return mySentNotifs.slice().reverse().map(notif => (
                    <div key={notif.id} className="py-4 space-y-1">
                      <div className="flex justify-between items-center">
                        <h5 className="font-bold text-slate-200 text-sm">{notif.title.replace(`${teacher.name}: `, '')}</h5>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {new Date(notif.date).toLocaleDateString('ar-EG')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 whitespace-pre-wrap">{notif.message}</p>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* PACKAGE EDIT/ADD MODAL */}
      {showPkgModal && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSavePackage} className="max-w-md w-full p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4 text-right">
            <h3 className="font-extrabold text-slate-100 text-base">{editingPkgId ? 'تعديل الكورس' : 'إضافة كورس وباقة جديدة'}</h3>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">اسم الكورس / الباقة</label>
              <input
                type="text"
                value={pkgName}
                onChange={(e) => setPkgName(e.target.value)}
                placeholder="مثال: الباب الأول - شرح النحو والمشتقات"
                className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">الوصف التفصيلي</label>
              <textarea
                value={pkgDesc}
                onChange={(e) => setPkgDesc(e.target.value)}
                placeholder="اكتب ماذا سيتعلم الطالب بالتفصيل في هذا الكورس"
                className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs h-24"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">السعر بعد الخصم (ج)</label>
                <input
                  type="number"
                  value={pkgPrice}
                  onChange={(e) => setPkgPrice(parseInt(e.target.value))}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">السعر الأصلي (ج)</label>
                <input
                  type="number"
                  value={pkgOrigPrice}
                  onChange={(e) => setPkgOrigPrice(parseInt(e.target.value))}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">نوع الباقة</label>
              <select
                value={pkgType}
                onChange={(e: any) => setPkgType(e.target.value)}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:outline-none"
              >
                <option value="monthly">باقة شهرية</option>
                <option value="weekly">باقة أسبوعية</option>
                <option value="3-months">باقة مجمعة ٣ شهور</option>
                <option value="offer">عرض خاص وحصري</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowPkgModal(false)}
                className="w-1/3 py-2 bg-slate-950 border border-slate-800 text-slate-300 text-xs font-bold rounded-lg"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="w-2/3 py-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 text-xs font-black rounded-lg"
              >
                حفظ الباقة
              </button>
            </div>
          </form>
        </div>
      )}

      {/* WEEK EDIT/ADD MODAL */}
      {showWeekModal && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveWeek} className="max-w-md w-full p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4 text-right">
            <h3 className="font-extrabold text-slate-100 text-base">{editingWeekId ? 'تعديل الأسبوع المنهجي' : 'إضافة أسبوع منهج جديد'}</h3>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">عنوان الأسبوع</label>
              <input
                type="text"
                value={weekName}
                onChange={(e) => setWeekName(e.target.value)}
                placeholder="الأسبوع الأول: توصيل المقاومات"
                className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">وصف موجز</label>
              <input
                type="text"
                value={weekDesc}
                onChange={(e) => setWeekDesc(e.target.value)}
                placeholder="ما هي المفاهيم التي يتم طرحها خلال الأسبوع"
                className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">ربط الكورسات المعتمدة (باقات المدرس المتاحة)</label>
              <select
                multiple
                value={weekPkgIds}
                onChange={(e) => {
                  const opts = Array.from((e.target as HTMLSelectElement).selectedOptions, option => option.value);
                  setWeekPkgIds(opts);
                }}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:outline-none h-24"
              >
                {curGradePackages.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <span className="text-[10px] text-slate-400 block mt-1">💡 اضغط على الزر مع السحب (أو Ctrl) لاختيار أكثر من باقة في نفس الوقت.</span>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowWeekModal(false)}
                className="w-1/3 py-2 bg-slate-950 border border-slate-800 text-slate-300 text-xs font-bold rounded-lg"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="w-2/3 py-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 text-xs font-black rounded-lg"
              >
                حفظ الأسبوع
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CONTENT EDIT/ADD MODAL */}
      {showContentModal && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveContent} className="max-w-md w-full p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4 text-right">
            <h3 className="font-extrabold text-slate-100 text-base">{editingContentId ? 'تعديل المحاضرة' : 'إضافة محتوى ومحاضرة جديدة'}</h3>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">عنوان المحاضرة</label>
              <input
                type="text"
                value={contentName}
                onChange={(e) => setContentName(e.target.value)}
                placeholder="فيديو شرح: شدة التيار الكهربي"
                className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">الوصف الموجز</label>
              <input
                type="text"
                value={contentDesc}
                onChange={(e) => setContentDesc(e.target.value)}
                placeholder="مثال: يغطي الأسئلة من ١ إلى ١٥"
                className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">نوع المحتوى</label>
                <select
                  value={contentType}
                  onChange={(e: any) => setContentType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs"
                >
                  <option value="video">فيديو شرح (يوتيوب آمن)</option>
                  <option value="pdf">مذكرة وملف PDF</option>
                  <option value="quiz">امتحان وواجب MCQ</option>
                  <option value="image">ملخص وصورة تفاعلية</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">المصدر / الرابط (ID)</label>
                <input
                  type="text"
                  value={contentUrl}
                  onChange={(e) => setContentUrl(e.target.value)}
                  placeholder="معرف يوتيوب أو رابط pdf"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">تحديد الأسابيع المرتبطة بالمحتوى</label>
              <select
                multiple
                value={contentWeekIds}
                onChange={(e) => {
                  const opts = Array.from((e.target as HTMLSelectElement).selectedOptions, option => option.value);
                  setContentWeekIds(opts);
                }}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:outline-none h-20"
              >
                {curGradeWeeks.map(w => (
                  <option key={w.id} value={w.id}>{w.name}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowContentModal(false)}
                className="w-1/3 py-2 bg-slate-950 border border-slate-800 text-slate-300 text-xs font-bold rounded-lg"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="w-2/3 py-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 text-xs font-black rounded-lg"
              >
                حفظ المحتوى
              </button>
            </div>
          </form>
        </div>
      )}

      {/* PROMO CODE GENERATION MODAL */}
      {showCodeModal && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleGenerateCodes} className="max-w-md w-full p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4 text-right">
            <h3 className="font-extrabold text-slate-100 text-base">توليد أكواد اشتراك مباشر جديدة</h3>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">اختر الكورس / الباقة لتفعيلها بالكود</label>
              <select
                value={codePkgId}
                onChange={(e) => setCodePkgId(e.target.value)}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:outline-none"
              >
                {curGradePackages.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.price} ج)</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">قيمة تفعيل الكود</label>
                <select
                  value={codeValue}
                  onChange={(e) => setCodeValue(parseInt(e.target.value))}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:outline-none"
                >
                  <option value={0}>مجاني بالكامل (0 ج)</option>
                </select>
                <span className="text-[9px] text-slate-400 block mt-0.5">أكواد تفعيل الكورسات مجانية دائماً.</span>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">عدد الأكواد لتوليدها</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={codeCount}
                  onChange={(e) => setCodeCount(parseInt(e.target.value) || 10)}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:outline-none font-mono text-center"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCodeModal(false)}
                className="w-1/3 py-2 bg-slate-950 border border-slate-800 text-slate-300 text-xs font-bold rounded-lg"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="w-2/3 py-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 text-xs font-black rounded-lg"
              >
                توليد الأكواد فوراً 🚀
              </button>
            </div>
          </form>
        </div>
      )}

      {/* QUIZ QUESTION MANAGER MODAL */}
      {showQuestionsModal && selectedQuizContent && (
        <div className="fixed inset-0 bg-slate-950/90 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-3xl w-full p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 text-right max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b border-slate-850 pb-3 shrink-0">
              <div>
                <span className="text-cyan-400 text-xs font-bold font-mono">معالج الأسئلة للاختبار:</span>
                <h3 className="font-extrabold text-slate-100 text-base">{selectedQuizContent.name}</h3>
              </div>
              <button
                onClick={() => {
                  setShowQuestionsModal(false);
                  setSelectedQuizContent(null);
                }}
                className="px-3 py-1.5 bg-slate-950 hover:bg-slate-850 border border-slate-850 text-slate-400 hover:text-slate-200 rounded-xl text-xs font-bold transition-all"
              >
                إغلاق
              </button>
            </div>

            {/* Content body split into list & form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto flex-1 pr-1">
              
              {/* Left Column: Form to add a new question */}
              <form onSubmit={handleSaveQuizQuestion} className="space-y-4 bg-slate-950/40 p-4 border border-slate-850 rounded-2xl h-fit">
                <h4 className="font-bold text-slate-200 text-xs border-b border-slate-850 pb-2">إضافة سؤال MCQ جديد للاختبار:</h4>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400">نص السؤال</label>
                  <textarea
                    rows={2}
                    value={newQText}
                    onChange={(e) => setNewQText(e.target.value)}
                    placeholder="اكتب صيغة السؤال هنا..."
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>

                {/* Options */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 block">الخيارات الأربعة المتوفرة:</span>
                  <div className="space-y-1.5">
                    <input
                      type="text"
                      value={newQOpt1}
                      onChange={(e) => setNewQOpt1(e.target.value)}
                      placeholder="الخيار أ"
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:outline-none"
                    />
                    <input
                      type="text"
                      value={newQOpt2}
                      onChange={(e) => setNewQOpt2(e.target.value)}
                      placeholder="الخيار ب"
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:outline-none"
                    />
                    <input
                      type="text"
                      value={newQOpt3}
                      onChange={(e) => setNewQOpt3(e.target.value)}
                      placeholder="الخيار ج"
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:outline-none"
                    />
                    <input
                      type="text"
                      value={newQOpt4}
                      onChange={(e) => setNewQOpt4(e.target.value)}
                      placeholder="الخيار د"
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400">الخيار الصحيح</label>
                    <select
                      value={newQCorrect}
                      onChange={(e) => setNewQCorrect(parseInt(e.target.value))}
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:outline-none"
                    >
                      <option value={0}>الخيار أ (الأول)</option>
                      <option value={1}>الخيار ب (الثاني)</option>
                      <option value={2}>الخيار ج (الثالث)</option>
                      <option value={3}>الخيار د (الرابع)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400">التفسير والشرح (اختياري)</label>
                    <input
                      type="text"
                      value={newQExplanation}
                      onChange={(e) => setNewQExplanation(e.target.value)}
                      placeholder="مثال: التفسير العلمي للإجابة..."
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all"
                >
                  إضافة السؤال للاختبار ➕
                </button>
              </form>

              {/* Right Column: Existing questions list */}
              <div className="space-y-4 overflow-y-auto max-h-[50vh] md:max-h-full pr-1">
                <h4 className="font-bold text-slate-200 text-xs border-b border-slate-850 pb-2 flex justify-between items-center">
                  <span>الأسئلة الحالية ({selectedQuizContent.questions?.length || 0}):</span>
                  <span className="text-[9px] text-slate-400">تنبيه: سيتم حفظ التغييرات تلقائياً</span>
                </h4>

                {(!selectedQuizContent.questions || selectedQuizContent.questions.length === 0) ? (
                  <div className="p-8 text-center text-slate-500 text-xs">
                    لا توجد أسئلة مضافة في هذا الاختبار حتى الآن. استخدم النموذج على اليمين لإضافة أسئلة!
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedQuizContent.questions.map((q, idx) => (
                      <div key={q.id} className="p-3 bg-slate-950 border border-slate-850 rounded-xl space-y-2 relative group hover:border-slate-800 transition-all">
                        <div className="flex justify-between items-start gap-4">
                          <span className="text-[10px] px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-md font-bold font-mono">
                            س {idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteQuizQuestion(q.id)}
                            className="p-1 text-rose-500 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 rounded-lg transition-all"
                            title="حذف هذا السؤال"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs font-bold text-slate-100">{q.questionText}</p>
                        
                        <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                          {q.options.map((opt, oIdx) => (
                            <div 
                              key={oIdx} 
                              className={`p-1.5 rounded border ${
                                oIdx === q.correctOptionIndex 
                                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-bold' 
                                  : 'bg-slate-900/60 border-slate-850 text-slate-400'
                              }`}
                            >
                              {oIdx === 0 && 'أ) '}
                              {oIdx === 1 && 'ب) '}
                              {oIdx === 2 && 'ج) '}
                              {oIdx === 3 && 'د) '}
                              {opt}
                            </div>
                          ))}
                        </div>

                        {q.explanation && (
                          <p className="text-[9px] text-slate-400 italic bg-slate-900/40 p-1.5 rounded border border-slate-850/50">
                            <strong>شرح الإجابة:</strong> "{q.explanation}"
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
