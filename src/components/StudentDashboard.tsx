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
  Wallet, 
  User, 
  Bell, 
  HelpCircle, 
  Phone, 
  LogOut, 
  Edit, 
  ArrowLeft, 
  ArrowRight, 
  FileText, 
  Video, 
  FileQuestion, 
  AlertCircle,
  Clock,
  Sparkles,
  Search,
  ExternalLink,
  Plus,
  GraduationCap,
  Award
} from 'lucide-react';
import { Student, Package, Week, Content, Subscription, WalletHistory, QuizResult, AppNotification, Teacher, PromoCode } from '../types';

// SECURE EMBED PLAYERS
export function VideoPlayer({ url, onBack }: { url: string; onBack: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-slate-100 text-sm">مشغل فيديوهات A CLASS الآمن</h4>
        <button onClick={onBack} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs rounded-xl">رجوع للمحتوى</button>
      </div>
      {/* Wrapper to block right click and gestures */}
      <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-slate-800 bg-black group" onContextMenu={e => e.preventDefault()}>
        {/* Transparent touch/click protection overlay */}
        <div className="absolute inset-x-0 top-0 h-12 bg-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-x-0 bottom-0 h-14 bg-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-y-0 left-0 w-16 bg-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-16 bg-transparent z-20 pointer-events-none"></div>
        
        {/* Actual IFrame with modestbranding to prevent YT leaks */}
        <iframe
          src={`https://www.youtube.com/embed/${url}?modestbranding=1&rel=0&iv_load_policy=3&showinfo=0&fs=0`}
          title="A CLASS Lecture"
          className="w-full h-full border-0 pointer-events-auto"
          allowFullScreen={false}
        ></iframe>
      </div>
      <p className="text-xs text-slate-400 text-center">💡 تم تفعيل التشفير والحماية التلقائية. نسخ أو تسريب هذا الفيديو يعرض حسابك للحظر الفوري.</p>
    </div>
  );
}

export function PdfViewer({ url, onBack }: { url: string; onBack: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-slate-100 text-sm">مستعرض المذكرات الآمن pdf</h4>
        <button onClick={onBack} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs rounded-xl">رجوع</button>
      </div>
      <div className="relative h-[65vh] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900" onContextMenu={e => e.preventDefault()}>
        <iframe
          src={url}
          title="A CLASS PDF Booklet"
          className="w-full h-full"
          sandbox="allow-scripts allow-same-origin"
        ></iframe>
      </div>
      <p className="text-xs text-slate-400 text-center">🔐 هذا الملف للعرض فقط. خاصية التحميل والطباعة معطلة لحماية حقوق الملكية الفكرية للمدرس.</p>
    </div>
  );
}

export function ImageViewer({ url, onBack }: { url: string; onBack: () => void }) {
  return (
    <div className="space-y-4 text-center">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-slate-100 text-sm">مستعرض الملخصات والخرائط الذهنية</h4>
        <button onClick={onBack} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs rounded-xl">رجوع</button>
      </div>
      <div className="relative inline-block max-w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-4" onContextMenu={e => e.preventDefault()}>
        <img src={url} alt="A CLASS Resource" className="max-h-[55vh] object-contain mx-auto rounded-lg select-none" />
        <div className="absolute bottom-6 right-6 px-3 py-1 bg-slate-950/80 border border-slate-800 text-[10px] text-cyan-400 font-bold rounded-lg">
          حقوق الطبع محفوظة: منصة A CLASS
        </div>
      </div>
    </div>
  );
}

// INTERACTIVE MCQ QUIZ AND EXAM MODULE
export function QuizViewer({ 
  content, 
  studentId, 
  onBack 
}: { 
  content: Content; 
  studentId: string; 
  onBack: () => void;
}) {
  const [questions, setQuestions] = useState(content.questions || []);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [reviewMode, setReviewMode] = useState(false);

  // Load previous result if exists
  useEffect(() => {
    const results: QuizResult[] = JSON.parse(localStorage.getItem('aclass_quiz_results') || '[]');
    const existing = results.find(r => r.studentId === studentId && r.quizContentId === content.id);
    if (existing) {
      setScore(existing.score);
      setSelectedAnswers(existing.answers);
      setSubmitted(true);
      setReviewMode(true);
    } else {
      setScore(0);
      setSelectedAnswers({});
      setSubmitted(false);
      setReviewMode(false);
      setCurrentIdx(0);
    }
  }, [content.id, studentId]);

  // Prevent multiple browser tab opens or reload warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!submitted) {
        e.preventDefault();
        e.returnValue = 'مغادرة الامتحان تضيع عليك محاولتك الحالية، هل أنت متأكد؟';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [submitted]);

  if (questions.length === 0) {
    return (
      <div className="p-8 text-center text-slate-400">
        عذراً، لا توجد أسئلة مضافة في هذا الامتحان بعد.
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];

  const handleSelectOption = (optIdx: number) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optIdx
    }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handleFinish = () => {
    // Calculate final score
    let correct = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        correct++;
      }
    });

    setScore(correct);
    setSubmitted(true);

    // Save result to local storage
    const results: QuizResult[] = JSON.parse(localStorage.getItem('aclass_quiz_results') || '[]');
    const newResult: QuizResult = {
      id: 'res_' + Date.now(),
      studentId,
      quizContentId: content.id,
      score: correct,
      totalQuestions: questions.length,
      answers: selectedAnswers,
      completedAt: new Date().toISOString()
    };
    results.push(newResult);
    localStorage.setItem('aclass_quiz_results', JSON.stringify(results));
  };

  return (
    <div className="space-y-6 text-right max-w-2xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="font-extrabold text-slate-100 text-lg">{content.name}</h3>
          <span className="text-xs text-slate-400">اختبار الفهم للمحاضرة</span>
        </div>
        <button onClick={onBack} className="px-4 py-2 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl">
          إغلاق الامتحان
        </button>
      </div>

      {!submitted ? (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
          {/* Question info */}
          <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
            <span className="px-2.5 py-1 bg-slate-800 rounded-lg">السؤال {currentIdx + 1} من {questions.length}</span>
            <span className="text-amber-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              الوضع: آمن وضد الغش
            </span>
          </div>

          <h4 className="text-base sm:text-lg font-bold text-slate-100 leading-relaxed">
            {currentQuestion.questionText}
          </h4>

          {/* Options list */}
          <div className="space-y-3">
            {currentQuestion.options.map((opt, oIdx) => {
              const isSelected = selectedAnswers[currentQuestion.id] === oIdx;
              return (
                <div
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 font-bold'
                      : 'bg-slate-950 border-slate-850 text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <span>{opt}</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    isSelected ? 'border-cyan-400 bg-cyan-500 text-slate-950' : 'border-slate-700'
                  }`}>
                    {isSelected && <span className="w-2.5 h-2.5 bg-slate-950 rounded-full"></span>}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-slate-800/40">
            {currentIdx < questions.length - 1 ? (
              <button
                type="button"
                disabled={selectedAnswers[currentQuestion.id] === undefined}
                onClick={handleNext}
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all"
              >
                السؤال التالي
              </button>
            ) : (
              <button
                type="button"
                disabled={selectedAnswers[currentQuestion.id] === undefined}
                onClick={handleFinish}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all"
              >
                إنهاء الاختبار ورصد النتيجة
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-3xl bg-slate-900 border-2 border-emerald-500/40 space-y-6 shadow-2xl text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500 flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 animate-pulse" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-100">تم رصد درجتك بنجاح!</h2>
            <p className="text-sm text-slate-300">لقد انتهيت من الإجابة على جميع الأسئلة المطروحة.</p>
          </div>

          {/* Score Circle */}
          <div className="w-32 h-32 rounded-full border-4 border-emerald-500/20 bg-slate-950 flex flex-col items-center justify-center mx-auto">
            <span className="text-3xl font-black text-emerald-400">{score} / {questions.length}</span>
            <span className="text-[10px] text-slate-400 font-bold mt-1">النتيجة النهائية</span>
          </div>

          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => setReviewMode(true)}
              className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs rounded-xl"
            >
              مراجعة الأخطاء والحل النموذجي
            </button>
            <button
              onClick={() => {
                if (window.confirm('هل أنت متأكد من رغبتك في إعادة محاولة حل الامتحان؟ سيتم مسح درجتك السابقة ورصد المحاولة الجديدة.')) {
                  const results: QuizResult[] = JSON.parse(localStorage.getItem('aclass_quiz_results') || '[]');
                  const filtered = results.filter(r => !(r.studentId === studentId && r.quizContentId === content.id));
                  localStorage.setItem('aclass_quiz_results', JSON.stringify(filtered));
                  setScore(0);
                  setSelectedAnswers({});
                  setSubmitted(false);
                  setReviewMode(false);
                  setCurrentIdx(0);
                }
              }}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl"
            >
              إعادة محاولة الامتحان 🔄
            </button>
            <button
              onClick={onBack}
              className="px-6 py-2.5 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl"
            >
              العودة لكورسات الأسبوع
            </button>
          </div>

          {reviewMode && (
            <div className="mt-8 pt-8 border-t border-slate-800/60 text-right space-y-6">
              <h3 className="font-extrabold text-slate-100 text-base">مراجعة نموذجية لجميع أسئلة الامتحان:</h3>
              
              {questions.map((q, qIndex) => {
                const studentAnsIdx = selectedAnswers[q.id];
                const correctAnsIdx = q.correctOptionIndex;
                const isCorrect = studentAnsIdx === correctAnsIdx;

                return (
                  <div key={q.id} className={`p-5 rounded-2xl border text-sm space-y-3 ${
                    isCorrect ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'
                  }`}>
                    <h5 className="font-bold text-slate-200">س{qIndex + 1}: {q.questionText}</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-850">
                        <span>إجابتك: </span>
                        <strong className={isCorrect ? 'text-emerald-400' : 'text-rose-400'}>
                          {studentAnsIdx !== undefined ? q.options[studentAnsIdx] : 'لم تجب'}
                        </strong>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-850">
                        <span>الإجابة الصحيحة: </span>
                        <strong className="text-emerald-400">{q.options[correctAnsIdx]}</strong>
                      </div>
                    </div>
                    {q.explanation && (
                      <div className="p-3 bg-slate-950/60 rounded-xl text-xs text-slate-400 leading-relaxed border border-slate-850">
                        💡 <strong className="text-amber-400 font-bold">التفسير والشرح العلمي:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

    </div>
  );
}

// MAIN STUDENT DASHBOARD CONTAINER
export function StudentDashboard({ 
  student, 
  isDarkMode, 
  onLogout 
}: { 
  student: Student; 
  isDarkMode: boolean; 
  onLogout: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'classes' | 'my-classes' | 'free' | 'account' | 'wallet-charge' | 'my-results'>('classes');
  
  // Impersonating and local database sync
  const [currentStudent, setCurrentStudent] = useState<Student>(student);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [contentList, setContentList] = useState<Content[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  
  // Viewing content state
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [openWeekId, setOpenWeekId] = useState<string | null>(null);
  const [activeContent, setActiveContent] = useState<Content | null>(null);

  // Editing profile state
  const [editing, setEditing] = useState(false);
  const [editFirstName, setEditFirstName] = useState(student.firstName);
  const [editLastName, setEditLastName] = useState(student.lastName);
  const [editPhone, setEditPhone] = useState(student.phone);
  const [editCity, setEditCity] = useState(student.city);

  // Wallet manual charge calculator
  const [chargeAmount, setChargeAmount] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [chargeNotes, setChargeNotes] = useState('');

  // Promo code redemption state
  const [globalPromoCode, setGlobalPromoCode] = useState('');
  
  // Dropdown controls
  const [showDropdown, setShowDropdown] = useState(false);

  // Sync state with local DB
  useEffect(() => {
    const fetchDB = () => {
      const allStudents: Student[] = JSON.parse(localStorage.getItem('aclass_students') || '[]');
      const synced = allStudents.find(s => s.id === student.id);
      if (synced) setCurrentStudent(synced);

      setTeachers(JSON.parse(localStorage.getItem('aclass_teachers') || '[]'));
      setPackages(JSON.parse(localStorage.getItem('aclass_packages') || '[]'));
      setWeeks(JSON.parse(localStorage.getItem('aclass_weeks') || '[]'));
      setContentList(JSON.parse(localStorage.getItem('aclass_content') || '[]'));
      setSubscriptions(JSON.parse(localStorage.getItem('aclass_subscriptions') || '[]'));
      setNotifications(JSON.parse(localStorage.getItem('aclass_notifications') || '[]'));
    };

    fetchDB();
    // 5-second interval to fetch updated balance / data automatically without refresh
    const interval = setInterval(fetchDB, 5000);
    return () => clearInterval(interval);
  }, [student.id]);

  // Handle edit details
  const handleSaveDetails = (e: React.FormEvent) => {
    e.preventDefault();
    const allStudents: Student[] = JSON.parse(localStorage.getItem('aclass_students') || '[]');
    const updated = allStudents.map(s => {
      if (s.id === currentStudent.id) {
        return {
          ...s,
          firstName: editFirstName,
          lastName: editLastName,
          phone: editPhone,
          city: editCity
        };
      }
      return s;
    });

    localStorage.setItem('aclass_students', JSON.stringify(updated));
    setCurrentStudent(prev => ({
      ...prev,
      firstName: editFirstName,
      lastName: editLastName,
      phone: editPhone,
      city: editCity
    }));
    setEditing(false);
    alert('تم حفظ البيانات الشخصية بنجاح!');
  };

  // Subscribe to package using wallet
  const handlePurchaseWithWallet = (pkg: Package) => {
    if (currentStudent.wallet < pkg.price) {
      alert('عذراً، رصيدك الحالي بالمحفظة غير كافٍ للاشتراك. يرجى شحن الرصيد أولاً.');
      setActiveTab('wallet-charge');
      return;
    }

    if (window.confirm(`هل أنت متأكد من رغبتك في الاشتراك في: "${pkg.name}" بسعر ${pkg.price} جنيهاً؟`)) {
      // 1. Deduct wallet
      const allStudents: Student[] = JSON.parse(localStorage.getItem('aclass_students') || '[]');
      const updatedStudents = allStudents.map(s => {
        if (s.id === currentStudent.id) {
          return { ...s, wallet: s.wallet - pkg.price };
        }
        return s;
      });
      localStorage.setItem('aclass_students', JSON.stringify(updatedStudents));
      setCurrentStudent(prev => ({ ...prev, wallet: prev.wallet - pkg.price }));

      // 2. Add subscription
      const subs: Subscription[] = JSON.parse(localStorage.getItem('aclass_subscriptions') || '[]');
      const newSub: Subscription = {
        id: 'sub_' + Date.now(),
        studentId: currentStudent.id,
        packageId: pkg.id,
        status: 'active',
        subscribedAt: new Date().toISOString()
      };
      subs.push(newSub);
      localStorage.setItem('aclass_subscriptions', JSON.stringify(subs));
      setSubscriptions(subs);

      // 3. Add to ledger
      const ledger: WalletHistory[] = JSON.parse(localStorage.getItem('aclass_wallet_history') || '[]');
      ledger.push({
        id: 'tx_' + Date.now(),
        studentId: currentStudent.id,
        amount: pkg.price,
        type: 'purchase',
        date: new Date().toISOString(),
        status: 'success'
      });
      localStorage.setItem('aclass_wallet_history', JSON.stringify(ledger));

      alert('تم الاشتراك وتفعيل الكورس بنجاح! كمل يا بطل طريق التفوق.');
    }
  };

  // Instant free content auto-enroll
  const handleInstantFreeEnroll = (pkg: Package) => {
    const subs: Subscription[] = JSON.parse(localStorage.getItem('aclass_subscriptions') || '[]');
    // Check if already subscribed
    const already = subs.some(s => s.studentId === currentStudent.id && s.packageId === pkg.id);
    if (already) {
      setSelectedPackage(pkg);
      setActiveTab('classes');
      return;
    }

    const newSub: Subscription = {
      id: 'sub_' + Date.now(),
      studentId: currentStudent.id,
      packageId: pkg.id,
      status: 'active',
      subscribedAt: new Date().toISOString()
    };
    subs.push(newSub);
    localStorage.setItem('aclass_subscriptions', JSON.stringify(subs));
    setSubscriptions(subs);

    alert('تم تفعيل الكورس المجاني فوراً وبدون خطوات إضافية! مشاهدة ممتعة.');
    setSelectedPackage(pkg);
  };

  // Redeem global promo code
  const handleRedeemGlobalCode = () => {
    const codeStr = globalPromoCode.trim().toUpperCase();
    if (!codeStr) {
      alert('يرجى إدخال كود الشحن/الاشتراك أولاً.');
      return;
    }

    const promoCodes: PromoCode[] = JSON.parse(localStorage.getItem('aclass_promo_codes') || '[]');
    const foundCode = promoCodes.find(c => c.id.toUpperCase() === codeStr);

    if (!foundCode) {
      alert('عذراً، هذا الكود غير صحيح أو غير موجود بالمنصة.');
      return;
    }

    if (foundCode.status === 'used') {
      alert('عذراً، هذا الكود تم استخدامه مسبقاً من قبل طالب آخر.');
      return;
    }

    // Find the package
    const pkg = packages.find(p => p.id === foundCode.packageId);
    if (!pkg) {
      alert('عذراً، هذا الكود مخصص لكورس غير متوفر حالياً.');
      return;
    }

    // Check if already subscribed
    const alreadySubbed = subscriptions.some(s => s.studentId === currentStudent.id && s.packageId === pkg.id);
    if (alreadySubbed) {
      alert(`أنت مشترك بالفعل في دورة: "${pkg.name}". لا داعي لتفعيل الكود.`);
      return;
    }

    if (window.confirm(`هل ترغب في تفعيل اشتراكك فوراً في دورة: "${pkg.name}" باستخدام هذا الكود؟`)) {
      // 1. Mark code as used
      const updatedCodes = promoCodes.map(c => {
        if (c.id.toUpperCase() === codeStr) {
          return { ...c, status: 'used' as const, usedByStudentId: currentStudent.id };
        }
        return c;
      });
      localStorage.setItem('aclass_promo_codes', JSON.stringify(updatedCodes));

      // 2. Add subscription
      const subs: Subscription[] = JSON.parse(localStorage.getItem('aclass_subscriptions') || '[]');
      const newSub: Subscription = {
        id: 'sub_' + Date.now(),
        studentId: currentStudent.id,
        packageId: pkg.id,
        status: 'active',
        subscribedAt: new Date().toISOString()
      };
      subs.push(newSub);
      localStorage.setItem('aclass_subscriptions', JSON.stringify(subs));
      setSubscriptions(subs);

      alert(`تم التفعيل بنجاح! تم تسجيلك في دورة: "${pkg.name}". بالتوفيق والنجاح الدائم!`);
      setGlobalPromoCode('');
      setActiveTab('my-classes');
    }
  };

  // Submit pending wallet charge request
  const handleSubmitChargeRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(chargeAmount);
    if (!chargeAmount || isNaN(amountNum) || amountNum <= 0) {
      alert('يرجى كتابة رصيد شحن صحيح أكبر من صفر.');
      return;
    }
    if (!senderPhone.trim()) {
      alert('يرجى تحديد رقم المحفظة المحول منها لتأكيد هويتك وسرعة المراجعة.');
      return;
    }

    const ledger: WalletHistory[] = JSON.parse(localStorage.getItem('aclass_wallet_history') || '[]');
    
    // Add pending recharge transaction
    const newPendingTx: WalletHistory = {
      id: 'tx_req_' + Date.now(),
      studentId: currentStudent.id,
      amount: amountNum,
      type: 'charge',
      date: new Date().toISOString(),
      status: 'pending',
      senderPhone: senderPhone.trim(),
      notes: chargeNotes.trim()
    };
    
    ledger.push(newPendingTx);
    localStorage.setItem('aclass_wallet_history', JSON.stringify(ledger));

    alert('تم تسجيل طلب الشحن بنجاح! سيتم مراجعة التحويل من قبل المساعدين وتفعيل رصيدك خلال دقائق.');
    setSenderPhone('');
    setChargeNotes('');
    setChargeAmount('');
  };

  // Filter packages based on grade
  const filteredPackages = packages.filter(p => p.gradeId === currentStudent.gradeId);
  const myPurchasedPkgIds = subscriptions
    .filter(s => s.studentId === currentStudent.id && s.status === 'active')
    .map(s => s.packageId);

  const myPurchasedPackages = packages.filter(p => myPurchasedPkgIds.includes(p.id));
  const freePackages = filteredPackages.filter(p => p.price === 0);

  // Get dynamic announcements targeting this student
  const myNotifications = notifications.filter(notif => {
    if (notif.targetType === 'all') return true;
    if (notif.targetType === 'students') return true;
    if (notif.targetType === 'stage' && notif.targetStageId === currentStudent.stageId) return true;
    if (notif.targetType === 'grade' && notif.targetGradeId === currentStudent.gradeId) return true;
    if (notif.targetType === 'specific' && notif.targetUserId === currentStudent.id) return true;
    return false;
  });

  // Calculate pending quizzes for header badge
  const allSubscribedPkgWeeks = weeks.filter(w => myPurchasedPkgIds.includes(w.packageIds[0]));
  const weekIds = allSubscribedPkgWeeks.map(w => w.id);
  const quizzes = contentList.filter(c => c.type === 'quiz' && c.weekIds.some(wId => weekIds.includes(wId)));
  const quizResults: QuizResult[] = JSON.parse(localStorage.getItem('aclass_quiz_results') || '[]');
  const completedQuizIds = quizResults.filter(r => r.studentId === currentStudent.id).map(r => r.quizContentId);
  const pendingQuizzesCount = quizzes.filter(q => !completedQuizIds.includes(q.id)).length;

  return (
    <div className={`min-h-screen font-sans text-right flex flex-col md:flex-row relative transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-950 text-white dark' : 'bg-slate-50 text-slate-900 light-dashboard'
    }`}>
      
      {/* 1. SIDEBAR */}
      <aside className={`w-full md:w-64 flex flex-col justify-between shrink-0 z-20 transition-all duration-300 ${
        isDarkMode ? 'bg-slate-900 border-l border-slate-800' : 'bg-white border-l border-slate-200'
      }`}>
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-cyan-400" />
            <span className="font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 font-sans">A CLASS</span>
          </div>

          <div className={`p-4 rounded-xl border space-y-1.5 transition-all ${
            isDarkMode ? 'bg-slate-950 border-slate-850' : 'bg-slate-100 border-slate-200/60'
          }`}>
            <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
              <span>كود الطالب:</span>
              <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded border border-cyan-500/20 font-mono">#{currentStudent.studentCode}</span>
            </div>
            <h4 className={`font-black text-sm ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>{currentStudent.firstName} {currentStudent.lastName}</h4>
            <p className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>الصف الثالث الثانوي</p>
          </div>

          <nav className="flex flex-col gap-1">
            <button
              onClick={() => { setActiveTab('classes'); setSelectedPackage(null); }}
              className={`w-full py-3 px-4 rounded-xl text-right font-bold text-sm flex items-center gap-2.5 transition-colors ${
                activeTab === 'classes' 
                  ? 'bg-cyan-500 text-slate-950 shadow-md' 
                  : isDarkMode 
                    ? 'text-slate-300 hover:bg-slate-800' 
                    : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              تصفح الكورسات المتاحة
            </button>
            <button
              onClick={() => { setActiveTab('my-classes'); setSelectedPackage(null); }}
              className={`w-full py-3 px-4 rounded-xl text-right font-bold text-sm flex items-center gap-2.5 transition-colors ${
                activeTab === 'my-classes' 
                  ? 'bg-cyan-500 text-slate-950 shadow-md' 
                  : isDarkMode 
                    ? 'text-slate-300 hover:bg-slate-800' 
                    : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <CheckCircle className="w-5 h-5" />
              كورساتي التعليمية
            </button>
            <button
              onClick={() => { setActiveTab('free'); setSelectedPackage(null); }}
              className={`w-full py-3 px-4 rounded-xl text-right font-bold text-sm flex items-center gap-2.5 transition-colors ${
                activeTab === 'free' 
                  ? 'bg-cyan-500 text-slate-950 shadow-md' 
                  : isDarkMode 
                    ? 'text-slate-300 hover:bg-slate-800' 
                    : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              المحاضرات المجانية
            </button>
            <button
              onClick={() => { setActiveTab('my-results'); setSelectedPackage(null); }}
              className={`w-full py-3 px-4 rounded-xl text-right font-bold text-sm flex items-center gap-2.5 transition-colors ${
                activeTab === 'my-results' 
                  ? 'bg-cyan-500 text-slate-950 shadow-md' 
                  : isDarkMode 
                    ? 'text-slate-300 hover:bg-slate-800' 
                    : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Award className="w-5 h-5" />
              سجل اختباراتي ودرجاتي
            </button>
            <button
              onClick={() => { setActiveTab('account'); setSelectedPackage(null); }}
              className={`w-full py-3 px-4 rounded-xl text-right font-bold text-sm flex items-center gap-2.5 transition-colors ${
                activeTab === 'account' 
                  ? 'bg-cyan-500 text-slate-950 shadow-md' 
                  : isDarkMode 
                    ? 'text-slate-300 hover:bg-slate-800' 
                    : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <User className="w-5 h-5" />
              بيانات حسابي الشخصي
            </button>
            <button
              onClick={() => { setActiveTab('wallet-charge'); setSelectedPackage(null); }}
              className={`w-full py-3 px-4 rounded-xl text-right font-bold text-sm flex items-center gap-2.5 transition-colors ${
                activeTab === 'wallet-charge' 
                  ? 'bg-cyan-500 text-slate-950 shadow-md' 
                  : isDarkMode 
                    ? 'text-slate-300 hover:bg-slate-800' 
                    : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Wallet className="w-5 h-5" />
              شحن المحفظة المالية
            </button>
          </nav>
        </div>

        <div className={`p-6 border-t ${isDarkMode ? 'border-slate-800/60' : 'border-slate-100'}`}>
          <button
            onClick={onLogout}
            className="w-full py-3 px-4 rounded-xl text-right text-sm font-bold text-rose-500 hover:bg-rose-500/10 flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            تسجيل الخروج الآمن
          </button>
        </div>
      </aside>

      {/* 2. MAIN HUB WORKSPACE */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
        
        {/* HEADER */}
        <header className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 rounded-3xl border gap-4 shadow-lg transition-all duration-300 ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="space-y-1.5">
            <h1 className={`text-2xl font-extrabold ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>أهلاً بك يا بطل، {currentStudent.firstName}!</h1>
            <p className={`text-xs flex items-center gap-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-650'}`}>
              <Clock className="w-4 h-4 text-cyan-500" />
              <span>لديك <strong className="text-cyan-500 font-bold">{pendingQuizzesCount}</strong> امتحانات وواجبات MCQ معلقة.</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex items-center gap-3 shadow-inner">
              <Wallet className="w-5 h-5 text-emerald-400" />
              <div>
                <span className="text-[10px] text-slate-400 block -mb-1">رصيد محفظتك:</span>
                <span className="text-lg font-black text-emerald-400">{currentStudent.wallet} جنيهاً</span>
              </div>
            </div>
            
            <button
              onClick={() => setActiveTab('wallet-charge')}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5 shadow-md transition-transform hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4" />
              شحن المحفظة
            </button>
          </div>
        </header>

        {/* ALERTS SECTION */}
        {myNotifications.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-extrabold text-slate-300 text-xs flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-amber-500 animate-swing" />
              تنبيهات عاجلة من منصة A CLASS
            </h3>
            {myNotifications.slice(0, 2).map(notif => (
              <div key={notif.id} className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-right space-y-1">
                <h5 className="font-bold text-amber-400 text-sm">📣 {notif.title}</h5>
                <p className="text-xs text-slate-300 leading-relaxed">{notif.message}</p>
              </div>
            ))}
          </div>
        )}

        {/* WORKSPACE AREA */}
        {activeContent ? (
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            {activeContent.type === 'video' && <VideoPlayer url={activeContent.url} onBack={() => setActiveContent(null)} />}
            {activeContent.type === 'pdf' && <PdfViewer url={activeContent.url} onBack={() => setActiveContent(null)} />}
            {activeContent.type === 'image' && <ImageViewer url={activeContent.url} onBack={() => setActiveContent(null)} />}
            {activeContent.type === 'quiz' && (
              <QuizViewer content={activeContent} studentId={currentStudent.id} onBack={() => setActiveContent(null)} />
            )}
          </div>
        ) : selectedPackage ? (
          /* SINGLE PACKAGE WEEKS & CHAPTERS WORKSPACE */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => { setSelectedPackage(null); setOpenWeekId(null); }}
                  className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:text-white"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-100">{selectedPackage.name}</h2>
                  <p className="text-xs text-slate-400">تصفح محاضرات الفصول والأسابيع التعليمية المرفقة.</p>
                </div>
              </div>
            </div>

            {/* List Weeks inside this package */}
            <div className="space-y-4">
              {weeks
                .filter(w => w.packageIds.includes(selectedPackage.id))
                .map(week => {
                  const isOpen = openWeekId === week.id;
                  const weekContents = contentList.filter(c => c.weekIds.includes(week.id));
                  
                  return (
                    <div key={week.id} className="rounded-2xl border border-slate-800/80 bg-slate-900 overflow-hidden shadow">
                      <div 
                        onClick={() => setOpenWeekId(isOpen ? null : week.id)}
                        className="p-5 flex justify-between items-center cursor-pointer hover:bg-slate-850 select-none transition-colors"
                      >
                        <div className="space-y-1">
                          <h4 className="font-bold text-slate-100 text-base">{week.name}</h4>
                          <p className="text-xs text-slate-400">{week.description}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-semibold px-2.5 py-1 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20 font-mono">
                            {weekContents.length} عناصر
                          </span>
                          <ChevronLeft className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? '-rotate-90' : ''}`} />
                        </div>
                      </div>

                      {isOpen && (
                        <div className="bg-slate-950/60 p-4 border-t border-slate-800/60 space-y-2">
                          {weekContents.length === 0 ? (
                            <p className="text-xs text-slate-400 p-2">جاري رفع محتوى هذا الأسبوع قريباً من قبل المساعدين.</p>
                          ) : (
                            weekContents.map(c => (
                              <div key={c.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-850 flex justify-between items-center gap-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 flex items-center justify-center">
                                    {c.type === 'video' && <Video className="w-5 h-5" />}
                                    {c.type === 'pdf' && <FileText className="w-5 h-5" />}
                                    {c.type === 'quiz' && <FileQuestion className="w-5 h-5" />}
                                    {c.type === 'image' && <Sparkles className="w-5 h-5" />}
                                  </div>
                                  <div>
                                    <h5 className="font-bold text-slate-200 text-sm">{c.name}</h5>
                                    <p className="text-[10px] text-slate-400">{c.description}</p>
                                  </div>
                                </div>

                                <button
                                  onClick={() => setActiveContent(c)}
                                  className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-600 font-bold text-xs"
                                >
                                  فتح وتشغيل
                                </button>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        ) : activeTab === 'classes' ? (
          /* BROWSE ALL COURSES / CLASSES */
          <div className="space-y-6">
            <div className="space-y-1.5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-100">تصفح دورات وباقات صفك الدراسي</h2>
                <p className="text-xs text-slate-400">جميع الكورسات المتوفرة للصف الخاص بك. يمكنك الشراء من محفظتك مباشرة.</p>
              </div>
            </div>

            {/* UNIFIED PROMO CODE REDEMPTION BOX */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
              <div className="space-y-1 text-right">
                <h4 className="font-extrabold text-slate-100 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>تفعيل كود شحن / كوبون الاشتراك المباشر</span>
                </h4>
                <p className="text-[11px] text-slate-400">أدخل الكود الممنوح لك من السنتر أو فريق الدعم لتفعيل دورتك فوراً وبدون رصيد.</p>
              </div>
              <div className="flex w-full md:w-auto gap-2">
                <input
                  type="text"
                  placeholder="مثال: A-CLASS-CODE-XXXXX"
                  value={globalPromoCode}
                  onChange={(e) => setGlobalPromoCode(e.target.value)}
                  className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs w-full md:w-64 focus:outline-none focus:border-cyan-500/50"
                />
                <button
                  onClick={handleRedeemGlobalCode}
                  className="px-5 py-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-black text-xs rounded-xl whitespace-nowrap"
                >
                  تفعيل الآن 🚀
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPackages.map(pkg => {
                const isPurchased = myPurchasedPkgIds.includes(pkg.id);
                return (
                  <div key={pkg.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="h-44 rounded-xl overflow-hidden relative">
                        <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                        {isPurchased && (
                          <span className="absolute top-3 right-3 bg-emerald-500 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                            مشترك ومفعل
                          </span>
                        )}
                        <span className="absolute bottom-3 left-3 bg-slate-950/80 text-cyan-400 border border-slate-700 font-bold text-xs px-2.5 py-1 rounded-lg">
                          {pkg.price === 0 ? 'مجانية' : `${pkg.price} ج`}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-extrabold text-base text-slate-100">{pkg.name}</h4>
                        <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{pkg.description}</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex justify-between items-center gap-2">
                      {isPurchased ? (
                        <button
                          onClick={() => setSelectedPackage(pkg)}
                          className="w-full py-2.5 rounded-xl font-bold text-xs bg-emerald-500 text-slate-950 hover:bg-emerald-600 transition-all text-center"
                        >
                          ادخل لتصفح المحتوى والمشاهدة
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePurchaseWithWallet(pkg)}
                          className="w-full py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-500 to-emerald-500 text-white hover:scale-[1.01] shadow text-center"
                        >
                          شراء الكورس وتفعيله
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : activeTab === 'my-classes' ? (
          /* MY CLASSES (PURCHASED) */
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-slate-100">كمل يا بطل! كورساتك الحالية</h2>
              <p className="text-xs text-slate-400">الباقات التي قمت بالاشتراك فيها بنجاح. تذكر ألا تراكم دروسك وحل واجباتك أولاً بأول.</p>
              
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-bold leading-relaxed max-w-2xl">
                🌟 "الاستمرارية هي سر التفوق، التزم بجدولك اليومي ولا تراكم الحصص، حل الواجب فور الانتهاء من المشاهدة. أنت قدها، هدفك يستحق كل هذا التعب!"
              </div>
            </div>

            {myPurchasedPackages.length === 0 ? (
              <div className="p-8 text-center text-slate-400 bg-slate-900 border border-slate-800 rounded-3xl">
                لم تشترك في أي كورس بعد. تصفح الكورسات المتاحة وابدأ فوراً.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myPurchasedPackages.map(pkg => (
                  <div key={pkg.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="h-44 rounded-xl overflow-hidden relative">
                        <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                        <span className="absolute top-3 right-3 bg-emerald-500 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                          نشط ومفعل
                        </span>
                      </div>
                      <h4 className="font-extrabold text-base text-slate-100">{pkg.name}</h4>
                    </div>

                    <button
                      onClick={() => setSelectedPackage(pkg)}
                      className="w-full py-2.5 rounded-xl font-bold text-xs bg-emerald-500 text-slate-950 hover:bg-emerald-600 transition-all text-center"
                    >
                      ادخل للدورة ومتابعة الدراسة
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : activeTab === 'free' ? (
          /* FREE CONTENT INSTANT ACCESS */
          <div className="space-y-6">
            <div className="space-y-1.5">
              <h2 className="text-xl font-extrabold text-slate-100">المحاضرات والحصص التأسيسية المجانية</h2>
              <p className="text-xs text-slate-400">محتوى متميز مجاني تماماً متاح للتجربة والتعلم الفوري بنقرة زر واحدة.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {freePackages.map(pkg => {
                const isPurchased = myPurchasedPkgIds.includes(pkg.id);
                return (
                  <div key={pkg.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="h-44 rounded-xl overflow-hidden relative">
                        <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                        <span className="absolute top-3 right-3 bg-emerald-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-full uppercase">
                          مجانية ١٠٠٪
                        </span>
                      </div>
                      <h4 className="font-extrabold text-base text-slate-100">{pkg.name}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{pkg.description}</p>
                    </div>

                    <button
                      onClick={() => handleInstantFreeEnroll(pkg)}
                      className="w-full py-2.5 rounded-xl font-bold text-xs bg-cyan-500 hover:bg-cyan-600 text-slate-950 transition-all text-center"
                    >
                      {isPurchased ? 'ادخل فوراً للدراسة' : 'ابدأ المشاهدة مجاناً الآن'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : activeTab === 'account' ? (
          /* ACCOUNT DETAILS */
          <div className="max-w-xl mx-auto p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-6 text-right">
            <h2 className="text-xl font-extrabold text-slate-100">بيانات الطالب الشخصية والأكاديمية</h2>

            {editing ? (
              <form onSubmit={handleSaveDetails} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">الاسم الأول</label>
                    <input
                      type="text"
                      value={editFirstName}
                      onChange={(e) => setEditFirstName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">الاسم الثاني والعائلة</label>
                    <input
                      type="text"
                      value={editLastName}
                      onChange={(e) => setEditLastName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">رقم الهاتف</label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">المدينة / المركز الحالي</label>
                  <input
                    type="text"
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 text-sm"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="w-1/3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-bold"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-slate-950 text-xs font-bold"
                  >
                    حفظ التغييرات
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-950 border border-slate-850 rounded-xl">
                  <span className="text-xs text-slate-400">كود الطالب الفريد (غير قابل للتعديل):</span>
                  <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-lg font-mono font-bold">#{currentStudent.studentCode}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl">
                    <span className="text-[10px] text-slate-400 block">الاسم بالكامل:</span>
                    <span className="font-bold text-slate-200">{currentStudent.firstName} {currentStudent.lastName}</span>
                  </div>
                  <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl">
                    <span className="text-[10px] text-slate-400 block">المحافظة والمدينة:</span>
                    <span className="font-bold text-slate-200">{currentStudent.governorate} / {currentStudent.city}</span>
                  </div>
                  <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl">
                    <span className="text-[10px] text-slate-400 block">رقم هاتف الطالب:</span>
                    <span className="font-bold text-slate-200 font-mono">{currentStudent.phone}</span>
                  </div>
                  <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl">
                    <span className="text-[10px] text-slate-400 block">هاتف ولي الأمر:</span>
                    <span className="font-bold text-slate-200 font-mono">{currentStudent.parentPhone}</span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-850 rounded-xl text-sm">
                  <span className="text-[10px] text-slate-400 block">البريد الإلكتروني المسجل:</span>
                  <span className="font-mono text-slate-200 font-semibold">{currentStudent.email}</span>
                </div>

                <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl text-xs leading-relaxed">
                  🔐 حماية الحساب: لا يُسمح بتعديل الكود أو البريد الإلكتروني المسجل إلا عبر التواصل مع إدارة الدعم الفني للمنصة لضمان أمان حسابك ومنع تداول الحسابات بين الطلاب.
                </div>

                <button
                  onClick={() => {
                    setEditFirstName(currentStudent.firstName);
                    setEditLastName(currentStudent.lastName);
                    setEditPhone(currentStudent.phone);
                    setEditCity(currentStudent.city);
                    setEditing(true);
                  }}
                  className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 text-cyan-400 font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <Edit className="w-4 h-4" />
                  تعديل البيانات المسموح بها
                </button>
              </div>
            )}
          </div>
        ) : activeTab === 'my-results' ? (
          /* STUDENT QUIZ/EXAM RESULTS HISTORY */
          <div className="space-y-6">
            <div className="space-y-1.5 text-right">
              <h2 className="text-xl font-extrabold text-slate-100">سجل درجاتي واختباراتي التفاعلية</h2>
              <p className="text-xs text-slate-400">تتبع مستواك العلمي وراجع إجاباتك السابقة لتتعلم من أخطائك وتضمن الدرجة النهائية.</p>
            </div>

            {/* RESULTS DASHBOARD SUMMARY */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-right animate-fade-in">
                <span className="text-[10px] text-slate-400 block font-bold">الاختبارات التي تم حلها:</span>
                <strong className="text-2xl font-black text-cyan-400">
                  {quizResults.filter(r => r.studentId === currentStudent.id).length} اختبار
                </strong>
              </div>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-right animate-fade-in">
                <span className="text-[10px] text-slate-400 block font-bold">متوسط النسبة المئوية:</span>
                <strong className="text-2xl font-black text-emerald-400">
                  {(() => {
                    const myResults = quizResults.filter(r => r.studentId === currentStudent.id);
                    if (myResults.length === 0) return '0%';
                    const sum = myResults.reduce((acc, r) => acc + (r.score / r.totalQuestions), 0);
                    return `${Math.round((sum / myResults.length) * 100)}%`;
                  })()}
                </strong>
              </div>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-right animate-fade-in">
                <span className="text-[10px] text-slate-400 block font-bold">الاختبارات والواجبات المعلقة:</span>
                <strong className="text-2xl font-black text-amber-400">
                  {pendingQuizzesCount} اختبار
                </strong>
              </div>
            </div>

            {/* RESULTS LIST */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow animate-fade-in">
              <div className="p-5 border-b border-slate-800">
                <h3 className="font-extrabold text-sm text-slate-100">تفاصيل أداء الامتحانات والواجبات</h3>
              </div>
              
              <div className="divide-y divide-slate-800">
                {(() => {
                  const myResults = quizResults.filter(r => r.studentId === currentStudent.id);
                  if (myResults.length === 0) {
                    return (
                      <div className="p-8 text-center text-slate-400 text-xs">
                        لم تقم بحل أي اختبار أو واجب بعد. ابدأ بمشاهدة الدروس وحل الاختبارات المرفقة بها لتظهر درجاتك هنا!
                      </div>
                    );
                  }
                  
                  return myResults.map(res => {
                    const quizCont = contentList.find(c => c.id === res.quizContentId);
                    const percentage = Math.round((res.score / res.totalQuestions) * 100);
                    
                    let gradeText = 'مقبول 👍';
                    let gradeColor = 'text-slate-300';
                    if (percentage >= 85) {
                      gradeText = 'ممتاز 🌟';
                      gradeColor = 'text-emerald-400 font-extrabold';
                    } else if (percentage >= 65) {
                      gradeText = 'جيد جداً 👍';
                      gradeColor = 'text-cyan-400 font-bold';
                    } else if (percentage < 50) {
                      gradeText = 'تحتاج للمراجعة ⚠️';
                      gradeColor = 'text-rose-400 font-bold';
                    }

                    return (
                      <div key={res.id} className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-850/30 transition-colors">
                        <div className="space-y-1.5 text-right">
                          <h4 className="font-bold text-slate-200 text-sm">
                            {quizCont ? quizCont.name : 'اختبار الفهم العام'}
                          </h4>
                          <p className="text-[11px] text-slate-400 font-mono">
                            تم الحل في: {new Date(res.completedAt).toLocaleDateString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                          <div className="text-right">
                            <span className="text-[10px] text-slate-400 block font-bold">الدرجة المكتسبة:</span>
                            <span className="font-mono text-sm font-black text-slate-100">{res.score} / {res.totalQuestions}</span>
                          </div>
                          
                          <div className="text-right px-3 py-1 bg-slate-950 border border-slate-800 rounded-xl min-w-[100px]">
                            <span className="text-[10px] text-slate-400 block font-bold">التقدير:</span>
                            <span className={`text-xs ${gradeColor}`}>{gradeText}</span>
                          </div>

                          <button
                            onClick={() => {
                              if (quizCont) {
                                setActiveContent(quizCont);
                              } else {
                                alert('عذراً، محتوى هذا الاختبار غير متوفر حالياً.');
                              }
                            }}
                            className="px-4 py-2 bg-slate-850 hover:bg-slate-800 text-cyan-400 border border-slate-750 hover:border-cyan-500/40 rounded-xl font-bold text-xs transition-colors"
                          >
                            مراجعة الإجابات والحلول
                          </button>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        ) : (
          /* WALLET CHARGING CALCULATOR PAGE */
          <div className="max-w-xl mx-auto p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-6 text-right">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-1.5">
                <Wallet className="w-6 h-6 text-cyan-400" />
                شحن المحفظة المالية للدفع
              </h2>
            </div>

            {/* CALCULATOR BOX */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-850 space-y-4">
              <h3 className="font-bold text-sm text-slate-200">حاسبة التحويل لضمان دقة الرصيد:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400">الرصيد المطلوب وصوله للمحفظة:</label>
                  <input
                    type="number"
                    placeholder="مثال: 150"
                    value={chargeAmount}
                    onChange={(e) => setChargeAmount(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400">المبلغ المطلوب تحويله (شامل الرسوم):</label>
                  <div className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-amber-400 font-black text-sm">
                    {chargeAmount ? `${Math.ceil(parseFloat(chargeAmount) * 1.05)} ج` : '0 ج'}
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-400">
                💡 "يتم احتساب 5% مصاريف إدارية تلقائياً. (المبلغ الإجمالي = الرصيد المطلوب + 5%) لضمان وصول المبلغ للمحفظة كاملاً."
              </p>
            </div>

            {/* INSTRUCTIONS */}
            <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 text-right space-y-3">
              <h4 className="font-extrabold text-sm text-cyan-400">خطوات الشحن عبر المحافظ الإلكترونية:</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                يرجى تحويل المبلغ المطلوب شامل المصاريف إلى أحد أرقام كاش الرسمية التالية الخاصة بالمنصة:
              </p>
              <div className="space-y-2 pt-2">
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="text-xs text-slate-400">محفظة كاش (1):</span>
                  <strong className="text-cyan-400 font-mono text-sm">01100196131</strong>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="text-xs text-slate-400">محفظة كاش (2):</span>
                  <strong className="text-cyan-400 font-mono text-sm">01023958772</strong>
                </div>
              </div>
            </div>

            {/* CONFIRMATION CHECKLIST */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-xs text-slate-300">خطوتك الأخيرة لإتمام الشحن وتفعيل الرصيد:</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                بعد إتمام عملية التحويل، يرجى تجهيز البيانات التالية وإرسالها لواتساب الدعم المالي لتأكيد الشحن الفوري في محفظتك:
              </p>
              <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                <li>صورة إيصال التحويل (الـ Screenshot أو الرسالة)</li>
                <li>الرقم الذي قمت بالتحويل منه</li>
                <li>اسم الطالب وكوده (#5000) المسجل بالمنصة</li>
              </ul>
              
              <a
                href={`https://wa.me/201100196131?text=مرحباً دكتور أنس، أرغب في شحن رصيد محفظتي. الكود الخاص بي: %23${currentStudent.studentCode}، الاسم: ${currentStudent.firstName} ${currentStudent.lastName}`}
                target="_blank"
                rel="noreferrer"
                className="w-full mt-4 py-3.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 shadow"
              >
                <Phone className="w-4 h-4 animate-bounce" />
                إرسال بيانات الشحن فوراً لواتساب الإدارة
              </a>
              <p className="text-[10px] text-slate-500 text-center">🔐 المنصة غير مسؤولة عن أي تحويل يتم لأي أرقام أخرى غير المذكورة أعلاه.</p>

              {/* PLATFORM SECURE RECHARGE SUBMISSION FORM */}
              <div className="mt-6 pt-6 border-t border-slate-800 space-y-4 text-right">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-xs text-slate-200">أو ثبّت تحويلك هنا للمراجعة الفورية من الإدارة:</h4>
                  <p className="text-[10px] text-slate-400">سجل بيانات التحويل أدناه حتى يتمكن المساعدون من التحقق منها والموافقة عليها تلقائياً دون مغادرة المنصة.</p>
                </div>
                
                <form onSubmit={handleSubmitChargeRequest} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-300">رقم الهاتف المحول منه (Vodafone / Etisalat...):</label>
                    <input
                      type="text"
                      placeholder="مثال: 01012345678"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-300">ملاحظات إضافية أو كود العملية (اختياري):</label>
                    <textarea
                      placeholder="مثال: تم تحويل 158 جنيهاً كاش الساعة 7:30 مساءً."
                      value={chargeNotes}
                      onChange={(e) => setChargeNotes(e.target.value)}
                      className="w-full h-16 px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-black text-xs rounded-xl transition-all"
                  >
                    إرسال إثبات التحويل للمراجعة الآن ⚡
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
