import React, { useState, useEffect, useRef } from 'react';
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
  Menu, 
  X, 
  Sun, 
  Moon, 
  Phone, 
  Award, 
  GraduationCap, 
  Users, 
  Wallet, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Send, 
  MessageCircle,
  HelpCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { GOVERNORATES } from '../mockData';
import { EducationalStage, Grade, Subject, Teacher, Student } from '../types';

// Simple Lucide wrapper because dynamic icons can fail
export function SmartIcon({ name, className = "w-6 h-6" }: { name: string; className?: string }) {
  switch (name) {
    case 'BookOpen': return <BookOpen className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'FlaskConical': return <FlaskConical className={className} />;
    case 'Dna': return <Dna className={className} />;
    case 'Globe': return <Globe className={className} />;
    case 'Binary': return <Binary className={className} />;
    default: return <BookOpen className={className} />;
  }
}

// 1. LOADING SCREEN (PageStart)
export function PageStart({ onFinished }: { onFinished: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(old => {
        if (old >= 100) {
          clearInterval(timer);
          setTimeout(onFinished, 400);
          return 100;
        }
        return old + 4;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [onFinished]);

  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-50 transition-opacity duration-500">
      <div className="relative mb-8 flex items-center justify-center">
        {/* Spinning outer circles */}
        <div className="absolute w-36 h-36 rounded-full border-4 border-t-amber-500 border-r-cyan-500 border-b-emerald-500 border-l-transparent animate-spin"></div>
        <div className="absolute w-40 h-40 rounded-full border-4 border-b-cyan-400 border-t-transparent border-l-transparent border-r-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
        {/* Core Logo */}
        <div className="w-28 h-28 rounded-full bg-slate-900 border-2 border-slate-800 flex flex-col items-center justify-center p-3 z-10 shadow-2xl shadow-cyan-500/25">
          <GraduationCap className="w-10 h-10 text-cyan-400 mb-1" />
          <span className="font-extrabold text-2xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-400 to-emerald-400">A CLASS</span>
        </div>
      </div>
      <h3 className="text-xl font-bold text-slate-100 tracking-wide mb-3 animate-pulse">جاري تحميل منصتكم المفضلة...</h3>
      <p className="text-xs text-slate-400 mb-6">تهيئة بيئة تفاعلية فائقة السرعة</p>
      
      {/* Progress Bar Container */}
      <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50 shadow-inner">
        <div 
          className="h-full bg-gradient-to-r from-cyan-500 via-amber-500 to-emerald-500 rounded-full transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span className="mt-2 text-sm font-mono text-cyan-400">{progress}%</span>
    </div>
  );
}

// 2. NAV SPEEDOMETER / PROGRESS BAR
export function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const showOn = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (showOn > 0) {
        setWidth((document.documentElement.scrollTop / showOn) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="h-1 w-full bg-slate-200 dark:bg-slate-800 sticky top-0 z-50">
      <div className="h-full bg-gradient-to-r from-cyan-500 via-amber-400 to-emerald-500 transition-all duration-75" style={{ width: `${width}%` }}></div>
    </div>
  );
}

// 3. MAIN PUBLIC NAVBAR
interface NavbarProps {
  isDarkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onNavigate: (page: string) => void;
  currentUser: any;
  onLogout: () => void;
}

export function PublicNavbar({ isDarkMode, setDarkMode, onNavigate, currentUser, onLogout }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'الصفحة الرئيسية', action: () => { onNavigate('home'); setMobileOpen(false); } },
    { label: 'تواصل معنا', action: () => { onNavigate('contact'); setMobileOpen(false); } },
    { label: 'الدعم الفني', action: () => { onNavigate('support_tech'); setMobileOpen(false); } },
    { label: 'الدعم العلمي', action: () => { onNavigate('support_scientific'); setMobileOpen(false); } },
  ];

  const handleLogoClick = () => {
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`sticky top-0 z-40 transition-all duration-300 ${
      isDarkMode 
        ? 'bg-slate-950/80 border-b border-slate-800/80 text-white backdrop-blur-md shadow-lg shadow-slate-950/50' 
        : 'bg-white/80 border-b border-slate-200 text-slate-900 backdrop-blur-md shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={handleLogoClick}>
            <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-105 ${
              isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-slate-100 border border-slate-200'
            }`}>
              <GraduationCap className="w-6 h-6 text-cyan-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-amber-500 to-emerald-500">
                A CLASS
              </span>
              <span className="text-[10px] text-slate-400 -mt-1 font-semibold">المستقبل يبدأ هنا</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={item.action}
                className={`text-sm font-bold transition-all hover:-translate-y-0.5 ${
                  isDarkMode ? 'text-slate-300 hover:text-cyan-400' : 'text-slate-600 hover:text-cyan-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!isDarkMode)}
              className={`p-2 rounded-full border transition-all hover:rotate-12 ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-amber-400' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
              title="تبديل المظهر"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {currentUser ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (currentUser.role === 'admin') onNavigate('admin_dashboard');
                    else if (currentUser.role === 'teacher') onNavigate('teacher_dashboard');
                    else onNavigate('student_dashboard');
                  }}
                  className="px-4 h-10 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-md hover:shadow-cyan-500/20 hover:scale-[1.02] transition-all"
                >
                  لوحة التحكم
                </button>
                <button
                  onClick={onLogout}
                  className="px-4 h-10 rounded-xl font-bold text-sm border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 transition-all"
                >
                  تسجيل الخروج
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate('login')}
                  className={`px-4 h-10 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] ${
                    isDarkMode ? 'bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-400' : 'bg-slate-100 hover:bg-slate-200 text-cyan-700'
                  }`}
                >
                  تسجيل الدخول
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="px-5 h-10 rounded-xl font-bold text-sm bg-cyan-500 hover:bg-cyan-600 text-white shadow-md hover:scale-[1.02] transition-all"
                >
                  إنشاء حساب
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setDarkMode(!isDarkMode)}
              className={`p-2 rounded-full border ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-amber-400' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 rounded-xl border ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
              }`}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className={`md:hidden px-4 pt-2 pb-6 border-t ${
          isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex flex-col gap-3 mt-2">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={item.action}
                className={`py-2 text-right font-bold text-base border-b border-transparent hover:border-cyan-500 transition-all ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-slate-800/40">
              {currentUser ? (
                <>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      if (currentUser.role === 'admin') onNavigate('admin_dashboard');
                      else if (currentUser.role === 'teacher') onNavigate('teacher_dashboard');
                      else onNavigate('student_dashboard');
                    }}
                    className="w-full h-11 rounded-xl font-bold bg-cyan-500 text-white text-center flex items-center justify-center shadow"
                  >
                    لوحة التحكم الخاصة بك
                  </button>
                  <button
                    onClick={() => { setMobileOpen(false); onLogout(); }}
                    className="w-full h-11 rounded-xl font-bold border border-rose-500 text-rose-500 hover:bg-rose-500/10"
                  >
                    تسجيل الخروج
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { setMobileOpen(false); onNavigate('login'); }}
                    className={`w-full h-11 rounded-xl font-bold border ${
                      isDarkMode ? 'border-slate-800 text-slate-300 bg-slate-900' : 'border-slate-200 text-slate-700 bg-slate-50'
                    }`}
                  >
                    تسجيل الدخول
                  </button>
                  <button
                    onClick={() => { setMobileOpen(false); onNavigate('signup'); }}
                    className="w-full h-11 rounded-xl font-bold bg-cyan-500 text-white shadow"
                  >
                    إنشاء حساب طالب جديد
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// 4. MARQUEE BANNER
export function MarqueeDivider() {
  return (
    <div className="w-full bg-gradient-to-r from-cyan-600 via-amber-500 to-emerald-600 py-3.5 overflow-hidden shadow-md transform -skew-y-1 my-2">
      <div className="whitespace-nowrap flex items-center">
        <div className="animate-marquee inline-block font-extrabold text-base sm:text-lg text-white">
          <span className="mx-4">🌟 A CLASS.. اختيار الأوائل، وطريقك للقمة</span>
          <span className="mx-4">◆</span>
          <span className="mx-4">🌟 A CLASS.. اختيار الأوائل، وطريقك للقمة</span>
          <span className="mx-4">◆</span>
          <span className="mx-4">🌟 A CLASS.. اختيار الأوائل، وطريقك للقمة</span>
          <span className="mx-4">◆</span>
          <span className="mx-4">🌟 A CLASS.. اختيار الأوائل، وطريقك للقمة</span>
          <span className="mx-4">◆</span>
          <span className="mx-4">🌟 A CLASS.. اختيار الأوائل، وطريقك للقمة</span>
          <span className="mx-4">◆</span>
          <span className="mx-4">🌟 A CLASS.. اختيار الأوائل، وطريقك للقمة</span>
          <span className="mx-4">◆</span>
          <span className="mx-4">🌟 A CLASS.. اختيار الأوائل، وطريقك للقمة</span>
        </div>
      </div>
    </div>
  );
}

// 5. HERO SECTION
export function HeroSection({ isDarkMode, onStart }: { isDarkMode: boolean; onStart: () => void }) {
  return (
    <div className={`relative overflow-hidden pt-12 pb-20 ${
      isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Absolute floating grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c715_1px,transparent_1px),linear-gradient(to_bottom,#0284c715_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              التعليم التفاعلي للمستقبل
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              منصة{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-400 to-emerald-400">
                A CLASS
              </span>{" "}
              التعليمية
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 font-medium max-w-2xl">
              نخبة من أفضل المدرسين للمراحل الدراسية في جميع المواد. حلم التفوق يبدأ بخطوة تفاعلية مدروسة معك لحظة بلحظة.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button
                onClick={onStart}
                className="px-8 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-cyan-500 via-emerald-500 to-emerald-600 text-white shadow-xl shadow-cyan-500/10 hover:shadow-cyan-500/25 hover:scale-[1.03] transition-all"
              >
                ابدأ رحلتك الآن مجاناً
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('subjects_section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-8 py-4 rounded-xl font-bold text-lg border transition-all ${
                  isDarkMode ? 'border-slate-800 hover:bg-slate-900 text-slate-300' : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                تصفح المواد الدراسية
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            <div className="absolute w-72 h-72 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="relative rounded-3xl overflow-hidden p-3 border-2 border-slate-800/50 shadow-2xl bg-slate-900 max-w-sm sm:max-w-md transform hover:rotate-1 transition-transform duration-300">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop" 
                alt="A CLASS Team" 
                className="rounded-2xl w-full object-cover aspect-[4/3] brightness-90 shadow-inner"
              />
              <div className="absolute top-6 left-6 px-3 py-1 bg-slate-950/80 border border-slate-700/50 rounded-full text-amber-400 text-xs font-bold flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                أقوى معلمي مصر
              </div>
              <div className="p-4 text-right">
                <h4 className="font-bold text-lg text-slate-100">فريق خبراء متميز</h4>
                <p className="text-xs text-slate-400 mt-1">حصص مسجلة، بث مباشر، وبنك أسئلة متكامل لتغطية جميع المناهج.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// 6. FEATURES SECTION
export function FeaturesSection({ isDarkMode }: { isDarkMode: boolean }) {
  const features = [
    { title: 'شرح مفصل وممتع', desc: 'لكل جزء من أجزاء المنهج في جميع المواد لكل المراحل.' },
    { title: 'متابعة أولياء الأمور', desc: 'متابعة مستمرة مع ولي الأمر من خلال نظام موحد فوري.' },
    { title: 'امتحانات دورية حصرياً', desc: 'امتحانات دورية على كل حصة لكل مدرس لضمان الفهم.' },
    { title: 'امتحان شامل شهري', desc: 'امتحان شامل كل شهر مع هدايا قيمة وجوائز عينية للمتفوقين.' },
    { title: 'حرية اختيار كاملة', desc: 'حرية اختيار المدرس المناسب لك في كل مادة على حدة.' },
    { title: 'دعم علمي متواصل', desc: 'دعم فني وعلمي متواصل على مدار الساعة للإجابة على أسئلتك.' },
  ];

  return (
    <div className={`py-16 relative ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold">لماذا منصة <span className="text-cyan-500 font-black">A CLASS</span> اختيارك الأمثل؟</h2>
          <p className="text-slate-400 mt-2">مجموعة من المميزات الذكية المصممة لمساعدة الطلاب على التفوق الدراسي</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div 
              key={idx} 
              className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 shadow-md flex gap-4 ${
                isDarkMode 
                  ? 'bg-slate-950/50 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-950' 
                  : 'bg-white border-slate-200 hover:border-cyan-500 hover:shadow-lg'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white shrink-0 shadow-md">
                <span className="font-extrabold text-xl">{idx + 1}</span>
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-lg">{feat.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// CAROUSEL COMPONENT
interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, idx: number) => React.ReactNode;
  visibleCountDesktop?: number;
}

export function AutoSlider<T>({ items, renderItem, visibleCountDesktop = 3 }: CarouselProps<T>) {
  const [startIndex, setStartIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = items.length;

  const next = () => {
    setStartIndex(prev => (prev + 1) % total);
  };

  const prev = () => {
    setStartIndex(prev => (prev - 1 + total) % total);
  };

  useEffect(() => {
    timerRef.current = setInterval(next, 2000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total]);

  if (total === 0) return null;

  // Gather current visible items (supports wrapping)
  const getVisibleItems = () => {
    const list = [];
    // We can show 1 item on mobile, visibleCountDesktop on desktop
    // But to render easily, we can render the container and use styling to show/hide, 
    // or slice them dynamically. Let's slice dynamically for maximum custom feel.
    for (let i = 0; i < visibleCountDesktop; i++) {
      list.push(items[(startIndex + i) % total]);
    }
    return list;
  };

  return (
    <div className="relative group w-full">
      {/* Mobile view (renders 1 item) */}
      <div className="md:hidden flex justify-center overflow-hidden w-full transition-all">
        <div className="w-full shrink-0 px-2">
          {renderItem(items[startIndex], startIndex)}
        </div>
      </div>

      {/* Desktop view (renders visibleCountDesktop items) */}
      <div className="hidden md:grid grid-cols-3 gap-6 overflow-hidden w-full">
        {getVisibleItems().map((item, idx) => (
          <div key={idx} className="transition-all duration-500">
            {renderItem(item, (startIndex + idx) % total)}
          </div>
        ))}
      </div>

      {/* Slider Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button 
          onClick={prev} 
          className="p-2 rounded-xl bg-slate-800 text-white hover:bg-cyan-500 border border-slate-700 transition-all shadow"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <div className="flex gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setStartIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                startIndex === i ? 'bg-cyan-500 w-6' : 'bg-slate-600 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
        <button 
          onClick={next} 
          className="p-2 rounded-xl bg-slate-800 text-white hover:bg-cyan-500 border border-slate-700 transition-all shadow"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// 7. EDUCATIONAL STAGES SECTION
export function StagesSection({ isDarkMode, stages, onSelectStage }: { isDarkMode: boolean; stages: EducationalStage[]; onSelectStage: () => void }) {
  return (
    <div className={`py-16 ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">المراحل الدراسية والتعليمية</h2>
          <p className="text-slate-400 mt-2">اختر مرحلتك التعليمية وسجل دخولك لتتمكن من تصفح الباقات والمحتوى الخاص بك.</p>
        </div>

        <AutoSlider 
          items={stages} 
          renderItem={(stage) => (
            <div 
              onClick={onSelectStage}
              className="cursor-pointer relative overflow-hidden rounded-2xl group border border-slate-800/40 shadow-xl aspect-[16/10] bg-slate-950 transition-all duration-300 hover:scale-[1.03] hover:border-cyan-500/50"
            >
              <img 
                src={stage.image} 
                alt={stage.name} 
                className="w-full h-full object-cover brightness-50 transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
              <div className="absolute bottom-6 right-6 left-6 space-y-1">
                <span className="text-xs text-cyan-400 font-bold uppercase tracking-widest font-mono">منصة A CLASS التعليمية</span>
                <h4 className="text-2xl font-black text-white">{stage.name}</h4>
                <p className="text-xs text-slate-300">اضغط للدخول وتسجيل الحساب والبدء</p>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}

// 8. ELITE TEACHERS SECTION
export function TeachersSection({ isDarkMode, teachers, onGoToProfile }: { isDarkMode: boolean; teachers: Teacher[]; onGoToProfile: (teacher: Teacher) => void }) {
  return (
    <div className={`py-16 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">تعرف على خبراء A CLASS</h2>
          <p className="text-slate-400 mt-2">مجموعة منتقاة من نخبة معلمي مصر لتقديم شرح علمي متميز بجودة فائقة.</p>
        </div>

        <AutoSlider 
          items={teachers} 
          renderItem={(teacher) => (
            <div className={`rounded-2xl border flex flex-col overflow-hidden h-full shadow-lg ${
              isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div className="h-56 relative overflow-hidden">
                <img 
                  src={teacher.image} 
                  alt={teacher.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" 
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-md">
                  خبير معتمد
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between text-right space-y-4">
                <div className="space-y-1.5">
                  <h4 className="font-extrabold text-lg">{teacher.name}</h4>
                  <p className="text-xs font-bold text-cyan-500">مدرس المادة: الفيزياء / اللغة العربية</p>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{teacher.bio}</p>
                </div>
                <button
                  onClick={() => onGoToProfile(teacher)}
                  className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-emerald-500 text-white hover:scale-[1.01] hover:shadow-lg hover:shadow-cyan-500/10 transition-all"
                >
                  عرض الصفحة التعليمية للمدرس
                </button>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}

// 9. COURSES & SUBJECTS SECTION (NESTED TABS & SLIDER FILTER)
export function SubjectsSection({ 
  isDarkMode, 
  stages, 
  grades, 
  subjects, 
  teachers, 
  onBrowseSubject 
}: { 
  isDarkMode: boolean; 
  stages: EducationalStage[]; 
  grades: Grade[]; 
  subjects: Subject[]; 
  teachers: Teacher[]; 
  onBrowseSubject: (subject: Subject, grade: Grade) => void;
}) {
  const [selectedStageId, setSelectedStageId] = useState(stages[0]?.id || 'stage_3');
  const [selectedGradeId, setSelectedGradeId] = useState('');

  const filteredGrades = grades.filter(g => g.stageId === selectedStageId);

  useEffect(() => {
    if (filteredGrades.length > 0) {
      setSelectedGradeId(filteredGrades[0].id);
    }
  }, [selectedStageId]);

  const filteredSubjects = subjects.filter(sub => sub.gradeId === selectedGradeId && sub.stageId === selectedStageId);

  const getTeacherCount = (subId: string) => {
    // Return count of teachers teaching this subject
    return teachers.filter(t => t.subjectId === subId).length || 2; // Default to 2 if none found
  };

  const activeGrade = grades.find(g => g.id === selectedGradeId);

  return (
    <div id="subjects_section" className={`py-16 ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">تصفح المواد الدراسية</h2>
          <p className="text-slate-400 mt-2">اختر مرحلتك وصفك الدراسي وابدأ رحلة التفوق مع معلمك المفضل</p>
        </div>

        {/* Nest Tab 1: Stage Selection */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {stages.map(stage => (
            <button
              key={stage.id}
              onClick={() => setSelectedStageId(stage.id)}
              className={`px-5 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all shadow-md ${
                selectedStageId === stage.id
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white scale-[1.02]'
                  : isDarkMode ? 'bg-slate-900 text-slate-300 border border-slate-800' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {stage.name}
            </button>
          ))}
        </div>

        {/* Nest Tab 2: Grade Selection */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 pb-4 border-b border-slate-800/20 max-w-4xl mx-auto">
          {filteredGrades.map(grade => (
            <button
              key={grade.id}
              onClick={() => setSelectedGradeId(grade.id)}
              className={`px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
                selectedGradeId === grade.id
                  ? 'bg-amber-500 text-white'
                  : isDarkMode ? 'bg-slate-900/60 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {grade.name}
            </button>
          ))}
        </div>

        {/* Subjects display */}
        {filteredSubjects.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-sm">
            سيتم إضافة المواد الدراسية لهذا الصف قريباً من قبل الإدارة.
          </div>
        ) : (
          <AutoSlider 
            items={filteredSubjects} 
            renderItem={(subject) => (
              <div className={`p-6 rounded-2xl border text-right shadow-md flex flex-col justify-between h-full ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                      <SmartIcon name={subject.icon} className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 rounded-lg text-[10px] font-extrabold border border-amber-500/20">
                      {activeGrade?.name || 'مؤكد'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-lg sm:text-xl">{subject.name}</h4>
                    <p className="text-xs text-slate-400 mt-1">تغطية متميزة للمنهج بالكامل لضمان العلامة الكاملة.</p>
                  </div>
                  <div className="flex items-center gap-1.5 py-2 border-t border-b border-slate-800/10 text-xs text-slate-400">
                    <Users className="w-4 h-4 text-cyan-400" />
                    <span>متاح للمادة: <strong className="text-cyan-500 font-bold">{getTeacherCount(subject.id)}</strong> مدرسين متميزين</span>
                  </div>
                </div>
                <button
                  onClick={() => onBrowseSubject(subject, activeGrade!)}
                  className="w-full mt-4 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-emerald-500 text-white hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  تصفح المادة والدراسة
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            )}
          />
        )}

      </div>
    </div>
  );
}

// 10. REVIEWS (صناع التفوق)
export function ReviewsSection({ isDarkMode }: { isDarkMode: boolean }) {
  const reviews = [
    { name: 'مريم يوسف', grade: 'أولى أوائل الجمهورية علمي علوم', review: 'المنصة ممتازة وسريعة والفيديوهات عالية الجودة والدعم العلمي يجاوب على كل تفصيل في السؤال.' },
    { name: 'عمر طه', grade: 'المركز الثالث على المحافظة', review: 'أنا مدين بالفضل للأستاذ أنس الديب في مادة الفيزياء، الامتحان الأسبوعي والواجبات الـ MCQ بتخلي المادة أسهل بكتير.' },
    { name: 'فاطمة محمد', grade: 'طالبة متفوقة', review: 'نظام النقاط والمحفظة ممتاز وسهل الاستخدام، أقدر أشترك في الباقة في ثواني بدون تعقيد والمذكرات جاهزة دايماً.' },
    { name: 'محمد عبد الله', grade: 'طالب متفوق', review: 'أفضل تجربة تعليمية في مصر بلا منافس! سرعة رهيبة في تشغيل الفيديوهات وحل الامتحانات.' }
  ];

  return (
    <div className={`py-16 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">آراء الطلاب ( صناع التفوق )</h2>
          <p className="text-slate-400 mt-2">قصص نجاح ملهمة لطلابنا الأوائل الذين عبروا طريق القمة عبر منصة A CLASS</p>
        </div>

        <AutoSlider 
          items={reviews} 
          renderItem={(rev) => (
            <div className={`p-6 rounded-2xl border text-right shadow-md h-full flex flex-col justify-between ${
              isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <p className="text-sm italic text-slate-400 leading-relaxed">"{rev.review}"</p>
              <div className="mt-4 pt-4 border-t border-slate-800/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 font-black flex items-center justify-center">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <h5 className="font-bold text-sm text-slate-100">{rev.name}</h5>
                  <span className="text-xs text-amber-500 font-bold">{rev.grade}</span>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}

// 11. ENCOURAGEMENT SECTION
export function EncouragementSection({ isDarkMode, onAction }: { isDarkMode: boolean; onAction: () => void }) {
  const Slogans = [
    'التخطيط الذكي هو مفتاح حلمك',
    'امتحانات دورية لضمان التفوق',
    'دعم علمي للإجابة على جميع تساؤلاتك',
    'أقوى مذكرات الشرح والواجبات التفاعلية'
  ];

  return (
    <div className={`py-16 text-center ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-center items-center gap-3 mb-2">
          <GraduationCap className="w-8 h-8 text-cyan-400" />
          <span className="font-extrabold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">A CLASS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black">طريقك لحلم الـ ١٠٠٪ يبدأ هنا</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {Slogans.map((slogan, idx) => (
            <div key={idx} className="flex items-center gap-2 px-4 py-3 bg-slate-900/40 rounded-xl border border-slate-800/40 text-slate-300">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
              <span className="text-sm font-semibold">{slogan}</span>
            </div>
          ))}
        </div>
        <button
          onClick={onAction}
          className="mt-6 px-10 py-4 rounded-xl font-black text-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.03] transition-all"
        >
          ابدأ الآن رحلتك نحو التفوق
        </button>
      </div>
    </div>
  );
}

// 12. STATS SECTION
export function StatsSection({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className={`py-12 border-t border-b border-slate-800/20 ${
      isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center items-center">
          
          <div className="space-y-1">
            <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400">+1,200 حصة</h3>
            <p className="text-sm text-slate-400 font-bold">في مختلف المواد والمراحل التعليمية</p>
          </div>
          
          <div className="space-y-1 border-y md:border-y-0 md:border-x border-slate-800/30 py-6 md:py-0">
            <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">+5,000 طالب نشط</h3>
            <p className="text-sm text-slate-400 font-bold">انضموا إلينا في مسيرة التفوق والدرجات النهائية</p>
          </div>

          <div className="space-y-1">
            <h4 className="text-lg font-extrabold text-slate-100">هذه ليست مجرد أرقام...</h4>
            <p className="text-xs text-slate-400">بل أدلة واضحة على أنك الآن في المكان الصحيح وبداية المسار الصحيح للقمة.</p>
          </div>

        </div>
      </div>
    </div>
  );
}

// 13. PUBLIC FOOTER
export function PublicFooter({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <footer className={`py-10 text-center ${isDarkMode ? 'bg-slate-950 text-white border-t border-slate-900' : 'bg-slate-100 text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="flex justify-center items-center gap-2">
          <GraduationCap className="w-6 h-6 text-cyan-400" />
          <span className="font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">A CLASS</span>
        </div>
        <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
          منصة تعليمية ذكية تقدم الحلول التفاعلية المتكاملة للطلاب في مصر لتوفير المادة العلمية الممتازة بأرخص التكاليف ودعم علمي متواصل.
        </p>
        <p className="text-[10px] text-slate-500">
          تم الإنشاء بكل الحب لطلابنا مابين (جميع الحقوق محفوظة لمنصة A CLASS ® متاح مدى الحياة).
        </p>
      </div>
    </footer>
  );
}

// 14. TECHNICAL SUPPORT PAGE
export function SupportTechnicalPage({ isDarkMode, onBack }: { isDarkMode: boolean; onBack: () => void }) {
  return (
    <div className={`min-h-[85vh] py-12 flex flex-col justify-center items-center ${
      isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-md w-full px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
          <HelpCircle className="w-10 h-10" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-500">مركز الدعم الفني والتقني</h2>
          <p className="text-xs text-slate-400">بوابتك لحل أي عائق يواجهك في الحسابات، الدفع، أو تشغيل الفيديوهات.</p>
        </div>

        {/* Manager visual */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/40 space-y-3">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" 
            alt="مدير الدعم الفني" 
            className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-cyan-400/50" 
          />
          <div>
            <h4 className="font-bold text-sm text-slate-100">م. نهى الخطيب</h4>
            <span className="text-[10px] text-cyan-400 font-semibold">رئيس قسم الدعم والتشغيل التقني</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            "طريقة منصة A CLASS في الدعم.. معاك لحظة بلحظة لحل أي مشكلة تقنية تواجهك ( حسابات، دفع، تشغيل الفيديوهات )."
          </p>
        </div>

        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500 text-xs font-bold leading-relaxed">
          نعتذر مسبقاً عن أي تأخير في الرد نظراً لضغط الرسائل، نعمل بأقصى جهد لحل مشكلتك في أسرع وقت.
        </div>

        <div className="space-y-3">
          <h3 className="font-extrabold text-sm text-slate-300 uppercase tracking-wider">ابعتلنا دلوقتي لحل المشكلة فورا</h3>
          <div className="grid grid-cols-2 gap-3">
            <a
              href="https://wa.me/201100196131"
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              واتساب الدعم
            </a>
            <a
              href="https://t.me/anas_eldeeb_physics"
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 rounded-xl font-bold text-xs bg-sky-600 hover:bg-sky-700 text-white flex items-center justify-center gap-1.5 shadow-md"
            >
              <Send className="w-4 h-4" />
              تليجرام الدعم
            </a>
          </div>
        </div>

        <button
          onClick={onBack}
          className="mt-6 w-full py-3 rounded-xl font-bold text-sm bg-slate-900 border border-slate-800 text-cyan-400 hover:bg-slate-850"
        >
          العودة للصفحة الرئيسية
        </button>
      </div>
    </div>
  );
}

// 15. SCIENTIFIC SUPPORT PAGE (DYNAMIC BY TEACHER)
export function SupportScientificPage({ 
  isDarkMode, 
  teachers, 
  onBack 
}: { 
  isDarkMode: boolean; 
  teachers: Teacher[]; 
  onBack: () => void;
}) {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  if (!selectedTeacher) {
    return (
      <div className={`min-h-[80vh] py-12 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">مركز الدعم العلمي والأسئلة</h2>
          <p className="text-slate-400 text-sm">اختر المدرس الذي تود سؤاله في المادة للحصول على توجيه علمي فوري من المساعدين المختصين:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {teachers.map(teacher => (
              <div 
                key={teacher.id}
                onClick={() => setSelectedTeacher(teacher)}
                className="p-6 rounded-2xl border text-center cursor-pointer transition-all hover:scale-[1.02] bg-slate-900 border-slate-800 hover:border-cyan-500/50"
              >
                <img 
                  src={teacher.image} 
                  alt={teacher.name} 
                  className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-slate-700 mb-3" 
                />
                <h4 className="font-extrabold text-lg text-slate-100">{teacher.name}</h4>
                <p className="text-xs text-slate-400 mt-1">تخصص: الفيزياء والعلوم</p>
                <button className="mt-4 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs rounded-xl w-full">
                  اختيار هذا المدرس
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={onBack}
            className="mt-12 px-6 py-3 bg-slate-900 border border-slate-800 text-cyan-400 font-bold text-sm rounded-xl"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-[85vh] py-12 flex flex-col justify-center items-center ${
      isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-md w-full px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
          <BookOpen className="w-9 h-9" />
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-100">الدعم العلمي للأستاذ: {selectedTeacher.name}</h2>
          <p className="text-xs text-slate-400">إجابة الأسئلة الدراسية وحلول المسائل الصعبة فوراً.</p>
        </div>

        {/* Assistant Details */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/40 space-y-3">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto border-2 border-emerald-400 text-white font-bold">
            {selectedTeacher.supportAssistantName.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-100">{selectedTeacher.supportAssistantName}</h4>
            <span className="text-[10px] text-emerald-400 font-semibold">المساعد والمشرف العلمي الرئيسي</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            "فريق المساعدة الخاص بـ {selectedTeacher.name} معاك لحظة بلحظة للإجابة على استفساراتك في المادة لضمان الدرجة النهائية."
          </p>
        </div>

        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500 text-xs font-bold leading-relaxed">
          {selectedTeacher.supportApologyMessage}
        </div>

        <div className="space-y-3">
          <h3 className="font-extrabold text-xs text-slate-300">ابعتلنا دلوقتي أسئلتك وإحنا معاك</h3>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`https://wa.me/${selectedTeacher.supportPhone}`}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              سؤال واتساب
            </a>
            <a
              href={`https://t.me/${selectedTeacher.supportTelegram}`}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 rounded-xl font-bold text-xs bg-sky-600 hover:bg-sky-700 text-white flex items-center justify-center gap-1.5 shadow-md"
            >
              <Send className="w-4 h-4" />
              سؤال تليجرام
            </a>
          </div>
        </div>

        <div className="flex gap-2 justify-center pt-4">
          <button
            onClick={() => setSelectedTeacher(null)}
            className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs rounded-xl"
          >
            تغيير المدرس
          </button>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-slate-900 border border-slate-800 text-cyan-400 font-bold text-xs rounded-xl"
          >
            العودة للصفحة الرئيسية
          </button>
        </div>
      </div>
    </div>
  );
}

// 16. CONTACT US PAGE
export function ContactUsPage({ isDarkMode, onBack }: { isDarkMode: boolean; onBack: () => void }) {
  const channels = [
    { name: 'صفحتنا الرسمية على فيسبوك', icon: 'Facebook', url: 'https://facebook.com', color: 'bg-blue-600 hover:bg-blue-700' },
    { name: 'قناتنا على يوتيوب للشروحات المجانية', icon: 'Youtube', url: 'https://youtube.com', color: 'bg-rose-600 hover:bg-rose-700' },
    { name: 'إنستجرام الرسمي للمنصة', icon: 'Instagram', url: 'https://instagram.com', color: 'bg-pink-600 hover:bg-pink-700' },
    { name: 'قناة التليجرام العامة للمذكرات والأخبار', icon: 'Telegram', url: 'https://telegram.org', color: 'bg-sky-500 hover:bg-sky-600' },
    { name: 'قناة الواتساب للتنبيهات العاجلة', icon: 'WhatsApp', url: 'https://whatsapp.com', color: 'bg-emerald-600 hover:bg-emerald-700' },
  ];

  return (
    <div className={`min-h-[85vh] py-12 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <div className="space-y-6 text-right">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-cyan-400" />
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">تواصل معنا</h1>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            تواصل معنا عبر منصات التواصل الاجتماعي الرئيسية لمنصة A CLASS عبر الروابط التالية لمتابعة آخر تحديثات المناهج والمذكرات والقرارات الوزارية أولاً بأول.
          </p>
          
          <div className="space-y-3">
            {channels.map((channel, idx) => (
              <a
                key={idx}
                href={channel.url}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center justify-between p-4 rounded-xl text-white font-bold text-sm transition-all hover:scale-[1.01] ${channel.color}`}
              >
                <span>{channel.name}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative p-3 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl max-w-xs sm:max-w-sm">
            <img 
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop" 
              alt="Social network" 
              className="rounded-2xl w-full object-cover aspect-[4/5] brightness-90" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 right-6 left-6 text-right">
              <span className="text-xs text-cyan-400 font-extrabold">منصة A CLASS</span>
              <h4 className="font-extrabold text-slate-100 text-base mt-1">فريق علاقات الطلاب والمجتمع في خدمتك</h4>
            </div>
          </div>
        </div>

      </div>
      
      <div className="text-center mt-12">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-slate-900 border border-slate-800 text-cyan-400 font-bold text-sm rounded-xl"
        >
          العودة للصفحة الرئيسية
        </button>
      </div>
    </div>
  );
}

// 17. LOGIN PAGE
export function LoginPage({ 
  isDarkMode, 
  onNavigate, 
  onLoginSuccess 
}: { 
  isDarkMode: boolean; 
  onNavigate: (page: string) => void; 
  onLoginSuccess: (user: any) => void;
}) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!phone.trim() || !password.trim()) {
      setError('يرجى كتابة رقم الهاتف وكلمة المرور.');
      return;
    }

    setLoading(true);

    // Mock checks
    setTimeout(() => {
      setLoading(false);
      
      // Let's check Admin first
      if (phone === '01100196131' && password === 'admin2009') {
        const adminUser = { id: 'admin_1', name: 'Anas Eldeeb', email: 'anas@eldeeb.com', role: 'admin' };
        onLoginSuccess(adminUser);
        return;
      }

      // Check teacher
      const teachers: Teacher[] = JSON.parse(localStorage.getItem('aclass_teachers') || '[]');
      const teacherPasswords = JSON.parse(localStorage.getItem('aclass_auth_passwords') || '{}');
      
      const teacher = teachers.find(t => t.phone === phone);
      if (teacher && teacherPasswords[teacher.id] === password) {
        onLoginSuccess({ ...teacher, role: 'teacher' });
        return;
      }

      // Check student
      const students: Student[] = JSON.parse(localStorage.getItem('aclass_students') || '[]');
      const student = students.find(s => s.phone === phone);
      
      if (student) {
        if (student.isBanned) {
          setError(`عذراً، هذا الحساب موقوف حالياً من قبل الإدارة. السبب: ${student.banReason || 'مخالفة الشروط'}`);
          return;
        }
        
        const authPass = teacherPasswords[student.id] || '123456';
        if (authPass === password) {
          onLoginSuccess({ ...student, role: 'student' });
          return;
        }
      }

      setError('عذراً، رقم الهاتف أو كلمة المرور غير صحيحة.');
    }, 400);
  };

  return (
    <div className={`min-h-[85vh] py-12 flex items-center justify-center transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-md w-full px-4 space-y-6 animate-fade-in">
        <div className={`p-8 rounded-3xl border shadow-2xl space-y-6 text-right transition-all duration-300 ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          
          <div className="text-center space-y-2">
            <div className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center transition-all ${
              isDarkMode ? 'bg-slate-950 text-cyan-400' : 'bg-slate-100 text-cyan-600'
            }`}>
              <GraduationCap className="w-8 h-8" />
            </div>
            <h2 className={`text-2xl font-black ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>أهلاً بك مرة ثانية في منصتك A CLASS</h2>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>سجل الدخول للمتابعة والبدء بالدراسة الفورية</p>
          </div>

          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>رقم هاتف الطالب / المعلم</label>
              <input
                type="text"
                placeholder="مثال: 01100196131"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                  isDarkMode 
                    ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-700' 
                    : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
                }`}
              />
            </div>

            <div className="space-y-1.5">
              <label className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>كلمة المرور</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                  isDarkMode 
                    ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-700' 
                    : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
                }`}
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className={`w-4 h-4 rounded focus:ring-0 focus:ring-offset-0 ${
                    isDarkMode ? 'border-slate-850 bg-slate-950 text-cyan-500' : 'border-slate-200 bg-slate-50 text-cyan-600'
                  }`}
                />
                <span className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>تذكرني على هذا الجهاز</span>
              </label>
              <button
                type="button"
                onClick={() => onNavigate('support_tech')}
                className={`text-xs font-bold hover:underline ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}
              >
                هل تواجه مشكلة بالدخول؟
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white shadow-lg hover:scale-[1.01] transition-all disabled:opacity-50"
            >
              {loading ? 'جاري التحقق...' : 'تسجيل الدخول الآمن'}
            </button>
          </form>

          <div className={`text-center pt-4 border-t text-xs ${isDarkMode ? 'border-slate-800/50 text-slate-400' : 'border-slate-100 text-slate-500'}`}>
            ليس لديك حساب طالب بالفعل؟{' '}
            <button
              onClick={() => onNavigate('signup')}
              className={`font-black hover:underline ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}
            >
              أنشئ الآن حساب جديد (Sign Up)
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

// 18. TWO-PHASE SIGNUP PAGE
export function SignUpPage({ 
  isDarkMode, 
  onNavigate, 
  stages, 
  grades 
}: { 
  isDarkMode: boolean; 
  onNavigate: (page: string) => void;
  stages: EducationalStage[];
  grades: Grade[];
}) {
  const [phase, setPhase] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [governorate, setGovernorate] = useState(GOVERNORATES[0]);
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [parentPhone, setParentPhone] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedStageId, setSelectedStageId] = useState(stages[0]?.id || 'stage_3');
  const [selectedGradeId, setSelectedGradeId] = useState('');
  const [section, setSection] = useState<'scientific_math' | 'scientific_science' | 'literary' | 'none'>('none');
  const [birthYear, setBirthYear] = useState('2008');
  const [birthMonth, setBirthMonth] = useState('01');
  const [birthDay, setBirthDay] = useState('01');
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const filteredGrades = grades.filter(g => g.stageId === selectedStageId);

  useEffect(() => {
    if (filteredGrades.length > 0) {
      setSelectedGradeId(filteredGrades[0].id);
    }
  }, [selectedStageId]);

  // Handle phase transitions
  const handleNextPhase = () => {
    setError('');
    if (!firstName.trim() || !lastName.trim() || !city.trim() || !phone.trim() || !parentPhone.trim()) {
      setError('يرجى ملء جميع الحقول المطلوبة للمرحلة الأولى.');
      return;
    }
    if (phone === parentPhone) {
      setError('عذراً، يجب أن يكون رقم هاتف ولي الأمر مختلفاً تماماً عن رقم هاتف الطالب.');
      return;
    }

    // Verify phone uniqueness
    const students: Student[] = JSON.parse(localStorage.getItem('aclass_students') || '[]');
    if (students.some(s => s.phone === phone)) {
      setError('عذراً، رقم هاتف الطالب مسجل مسبقاً في النظام.');
      return;
    }

    setPhase(2);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('يرجى ملء جميع حقول الأمان وكلمة المرور.');
      return;
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('يرجى إدخال بريد إلكتروني صحيح وصالح.');
      return;
    }

    if (password !== confirmPassword) {
      setError('كلمتا السر غير متطابقتين.');
      return;
    }

    if (password.length < 6) {
      setError('كلمة السر يجب أن لا تقل عن 6 أحرف أو أرقام.');
      return;
    }

    // Create student record
    const students: Student[] = JSON.parse(localStorage.getItem('aclass_students') || '[]');
    
    // Find next student code
    const maxCode = students.reduce((max, s) => s.studentCode > max ? s.studentCode : max, 4999);
    const nextCode = maxCode + 1;
    const nextId = 'student_' + Date.now();

    const newStudent: Student = {
      id: nextId,
      studentCode: nextCode,
      firstName,
      lastName,
      phone,
      parentPhone,
      email,
      governorate,
      city,
      stageId: selectedStageId,
      gradeId: selectedGradeId,
      section: selectedStageId === 'stage_3' ? section : 'none',
      birthDate: `${birthYear}-${birthMonth}-${birthDay}`,
      gender,
      wallet: 0, // Wallet starting with 0
      status: 'active',
      isBanned: false
    };

    // Save student
    students.push(newStudent);
    localStorage.setItem('aclass_students', JSON.stringify(students));

    // Save auth password mapping
    const authPass = JSON.parse(localStorage.getItem('aclass_auth_passwords') || '{}');
    authPass[nextId] = password;
    localStorage.setItem('aclass_auth_passwords', JSON.stringify(authPass));

    setSuccess(true);
    setTimeout(() => {
      onNavigate('login');
    }, 5000);
  };

  return (
    <div className={`min-h-[85vh] py-12 flex items-center justify-center transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-xl w-full px-4 space-y-6 animate-fade-in">
        
        {success ? (
          <div className={`p-8 rounded-3xl border shadow-2xl text-center space-y-4 transition-all duration-300 ${
            isDarkMode ? 'bg-slate-900 border-emerald-500/50' : 'bg-white border-emerald-500'
          }`}>
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className={`text-2xl font-black ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>تهانينا! تم تسجيل حسابك بنجاح</h2>
            <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>مرحباً بك في طريق التفوق والقمة مع منصة A CLASS.</p>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>سيتم توجيهك تلقائياً لصفحة تسجيل الدخول خلال 5 ثوانٍ...</p>
            <button
              onClick={() => onNavigate('login')}
              className="mt-4 px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              تسجيل الدخول الآن فوراً
            </button>
          </div>
        ) : (
          <div className={`p-8 rounded-3xl border shadow-2xl space-y-6 text-right transition-all duration-300 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            
            <div className="text-center space-y-2">
              <div className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center transition-all ${
                isDarkMode ? 'bg-slate-950 text-cyan-400' : 'bg-slate-100 text-cyan-600'
              }`}>
                <GraduationCap className="w-8 h-8" />
              </div>
              <h2 className={`text-2xl font-black ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>بداية رحلتك نحو التفوق</h2>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-550'}`}>قم بإنشاء حساب طالب ذكي جديد مجاناً وبكل بساطة</p>
              
              {/* Step indicator */}
              <div className="flex justify-center items-center gap-2 pt-2">
                <span className={`w-8 h-2 rounded-full transition-all ${phase === 1 ? 'bg-cyan-500' : isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}></span>
                <span className={`w-8 h-2 rounded-full transition-all ${phase === 2 ? 'bg-cyan-500' : isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}></span>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold rounded-xl animate-shake">
                {error}
              </div>
            )}

            {phase === 1 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>الاسم الأول</label>
                    <input
                      type="text"
                      placeholder="أحمد"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                        isDarkMode 
                          ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-700' 
                          : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
                      }`}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>الاسم الثاني والعائلة</label>
                    <input
                      type="text"
                      placeholder="محمود الديب"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                        isDarkMode 
                          ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-700' 
                          : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>المحافظة</label>
                    <select
                      value={governorate}
                      onChange={(e) => setGovernorate(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                        isDarkMode 
                          ? 'bg-slate-950 border-slate-800 text-slate-100' 
                          : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      {GOVERNORATES.map((gov, idx) => (
                        <option key={idx} value={gov} className={isDarkMode ? 'bg-slate-950' : 'bg-white'}>{gov}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>المدينة / المركز</label>
                    <input
                      type="text"
                      placeholder="مثال: مدينة نصر"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                        isDarkMode 
                          ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-700' 
                          : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>رقم هاتف الطالب</label>
                    <input
                      type="text"
                      placeholder="01112223344"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                        isDarkMode 
                          ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-700' 
                          : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
                      }`}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>رقم هاتف ولي الأمر</label>
                    <input
                      type="text"
                      placeholder="01112223355"
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                        isDarkMode 
                          ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-700' 
                          : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
                      }`}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextPhase}
                  className="w-full py-3.5 mt-4 rounded-xl font-bold text-sm bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  الخطوة التالية (الأمان والدراسة)
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4 animate-fade-in">
                <div className="space-y-1.5">
                  <label className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>البريد الإلكتروني (Gmail/Outlook)</label>
                  <input
                    type="email"
                    placeholder="student@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                      isDarkMode 
                        ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-700' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>كلمة المرور</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                        isDarkMode 
                          ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-700' 
                          : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
                      }`}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>تأكيد كلمة المرور</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                        isDarkMode 
                          ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-700' 
                          : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
                      }`}
                    />
                  </div>
                </div>

                {/* Educational selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>المرحلة الدراسية</label>
                    <select
                      value={selectedStageId}
                      onChange={(e) => setSelectedStageId(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                        isDarkMode 
                          ? 'bg-slate-950 border-slate-800 text-slate-100' 
                          : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      {stages.map(st => (
                        <option key={st.id} value={st.id} className={isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-800'}>{st.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>الصف الدراسي</label>
                    <select
                      value={selectedGradeId}
                      onChange={(e) => setSelectedGradeId(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                        isDarkMode 
                          ? 'bg-slate-950 border-slate-800 text-slate-100' 
                          : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      {filteredGrades.map(g => (
                        <option key={g.id} value={g.id} className={isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-800'}>{g.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Section selection if high school */}
                {selectedStageId === 'stage_3' && (
                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>الشعبة الدراسية</label>
                    <select
                      value={section}
                      onChange={(e: any) => setSection(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                        isDarkMode 
                          ? 'bg-slate-950 border-slate-800 text-slate-100' 
                          : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <option value="none" className={isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-800'}>الصف الأول/الثاني (عام)</option>
                      <option value="scientific_math" className={isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-800'}>علمي رياضة</option>
                      <option value="scientific_science" className={isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-800'}>علمي علوم</option>
                      <option value="literary" className={isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-800'}>أدبي</option>
                    </select>
                  </div>
                )}

                {/* DOB & Gender */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>تاريخ الميلاد (سنة)</label>
                    <select
                      value={birthYear}
                      onChange={(e) => setBirthYear(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                        isDarkMode 
                          ? 'bg-slate-950 border-slate-800 text-slate-100' 
                          : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      {Array.from({ length: 15 }, (_, i) => 2003 + i).map(year => (
                        <option key={year} value={year} className={isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-800'}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>النوع</label>
                    <div className="flex gap-6 pt-3.5">
                      <label className="flex items-center gap-1.5 cursor-pointer text-sm font-semibold select-none">
                        <input
                          type="radio"
                          name="gender"
                          checked={gender === 'male'}
                          onChange={() => setGender('male')}
                          className="text-cyan-500"
                        />
                        <span className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>ذكر</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-sm font-semibold select-none">
                        <input
                          type="radio"
                          name="gender"
                          checked={gender === 'female'}
                          onChange={() => setGender('female')}
                          className="text-cyan-500"
                        />
                        <span className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>أنثى</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setPhase(1)}
                    className={`w-1/3 py-3 rounded-xl font-bold text-sm border transition-all ${
                      isDarkMode 
                        ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' 
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    رجوع للخطوة 1
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white shadow-lg transition-all hover:scale-[1.01]"
                  >
                    إنشاء واعتماد الحساب مجاناً
                  </button>
                </div>
              </form>
            )}

            <div className={`text-center pt-2 text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-550'}`}>
              لديك حساب بالفعل؟{' '}
              <button
                onClick={() => onNavigate('login')}
                className={`font-black hover:underline ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}
              >
                تسجيل الدخول هنا
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
