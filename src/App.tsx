import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Sun, 
  Moon, 
  Award, 
  BookOpen, 
  ArrowRight,
  Sparkles,
  Zap,
  HelpCircle
} from 'lucide-react';
import { seedDatabase, DEFAULT_STAGES, DEFAULT_GRADES, DEFAULT_SUBJECTS } from './mockData';
import { 
  PageStart, 
  ScrollProgress, 
  PublicNavbar, 
  HeroSection, 
  MarqueeDivider, 
  FeaturesSection, 
  StagesSection, 
  TeachersSection, 
  SubjectsSection, 
  ReviewsSection, 
  EncouragementSection, 
  StatsSection, 
  PublicFooter,
  SupportTechnicalPage,
  SupportScientificPage,
  ContactUsPage,
  LoginPage,
  SignUpPage,
  AutoSlider
} from './components/PublicPages';
import { StudentDashboard } from './components/StudentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { Teacher, Package, EducationalStage, Grade, Subject } from './types';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('aclass_theme');
    return saved ? saved === 'dark' : true; // Default to dark mode
  });

  const [page, setPage] = useState<'home' | 'login' | 'signup' | 'contact' | 'support_tech' | 'support_scientific' | 'student_dashboard' | 'teacher_dashboard' | 'admin_dashboard' | 'teacher_profile'>('home');
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  // Impersonation state (Spy mode)
  const [impersonatedTeacher, setImpersonatedTeacher] = useState<Teacher | null>(null);

  // Selected teacher for profile view
  const [selectedTeacherProfile, setSelectedTeacherProfile] = useState<Teacher | null>(null);

  // Static lists for landing
  const [stages, setStages] = useState<EducationalStage[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);

  // Selected filters for teacher package profile
  const [profileStage, setProfileStage] = useState('');
  const [profileGrade, setProfileGrade] = useState('');

  useEffect(() => {
    // Seed and initialize local database
    seedDatabase();
    
    setStages(JSON.parse(localStorage.getItem('aclass_stages') || '[]'));
    setGrades(JSON.parse(localStorage.getItem('aclass_grades') || '[]'));
    setSubjects(JSON.parse(localStorage.getItem('aclass_subjects') || '[]'));
    setTeachers(JSON.parse(localStorage.getItem('aclass_teachers') || '[]'));
    setPackages(JSON.parse(localStorage.getItem('aclass_packages') || '[]'));

    // Check saved auth session
    const savedUser = localStorage.getItem('aclass_current_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('aclass_current_user');
      }
    }
  }, []);

  // Sync theme
  useEffect(() => {
    localStorage.setItem('aclass_theme', isDarkMode ? 'dark' : 'light');
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLoginSuccess = (user: any) => {
    setCurrentUser(user);
    localStorage.setItem('aclass_current_user', JSON.stringify(user));
    
    // Auto redirection based on role
    if (user.role === 'admin') setPage('admin_dashboard');
    else if (user.role === 'teacher') setPage('teacher_dashboard');
    else setPage('student_dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setImpersonatedTeacher(null);
    localStorage.removeItem('aclass_current_user');
    setPage('home');
  };

  const handleImpersonateTeacher = (teacher: Teacher) => {
    setImpersonatedTeacher(teacher);
    setPage('teacher_dashboard');
  };

  // Helper filter for single teacher page packages
  const getTeacherProfilePackages = () => {
    if (!selectedTeacherProfile) return [];
    let list = packages.filter(p => p.teacherId === selectedTeacherProfile.id);
    if (profileStage) {
      list = list.filter(p => p.stageId === profileStage);
    }
    if (profileGrade) {
      list = list.filter(p => p.gradeId === profileGrade);
    }
    return list;
  };

  if (loading) {
    return <PageStart onFinished={() => setLoading(false)} />;
  }

  // Render Impersonated Teacher workspace
  if (impersonatedTeacher) {
    return (
      <div className="relative">
        {/* Top Control Bar for Impersonating */}
        <div className="bg-amber-600 text-slate-950 font-black text-xs py-2 px-4 flex justify-between items-center z-50 sticky top-0 shadow-lg text-right">
          <span>⚠️ أنت الآن تتصفح وتتحكم في لوحة المدرس: <strong className="underline text-slate-900">{impersonatedTeacher.name}</strong></span>
          <button 
            onClick={() => setImpersonatedTeacher(null)}
            className="px-4 py-1.5 bg-slate-950 hover:bg-slate-900 text-amber-400 font-bold text-[10px] rounded-lg shadow-inner"
          >
            إنهاء وضع التحكم والعودة للأدمن
          </button>
        </div>
        <TeacherDashboard 
          teacher={impersonatedTeacher} 
          isDarkMode={isDarkMode} 
          onLogout={() => setImpersonatedTeacher(null)} 
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'
    }`}>
      
      {/* Scroll Speedometer Bar */}
      <ScrollProgress />

      {/* Main Navbar */}
      {page !== 'student_dashboard' && page !== 'teacher_dashboard' && page !== 'admin_dashboard' && (
        <PublicNavbar 
          isDarkMode={isDarkMode} 
          setDarkMode={setDarkMode} 
          onNavigate={(p: any) => {
            if (p === 'student_dashboard' && currentUser?.role === 'student') setPage('student_dashboard');
            else if (p === 'teacher_dashboard' && currentUser?.role === 'teacher') setPage('teacher_dashboard');
            else if (p === 'admin_dashboard' && currentUser?.role === 'admin') setPage('admin_dashboard');
            else setPage(p);
          }} 
          currentUser={currentUser} 
          onLogout={handleLogout} 
        />
      )}

      {/* WORKSPACE SWITCHER */}
      {page === 'home' && (
        <>
          <HeroSection isDarkMode={isDarkMode} onStart={() => setPage(currentUser ? 'student_dashboard' : 'login')} />
          
          <MarqueeDivider />
          
          <FeaturesSection isDarkMode={isDarkMode} />
          
          <StagesSection 
            isDarkMode={isDarkMode} 
            stages={stages} 
            onSelectStage={() => setPage('login')} 
          />
          
          <TeachersSection 
            isDarkMode={isDarkMode} 
            teachers={teachers} 
            onGoToProfile={(t) => {
              setSelectedTeacherProfile(t);
              setPage('teacher_profile');
            }} 
          />
          
          <SubjectsSection 
            isDarkMode={isDarkMode} 
            stages={stages} 
            grades={grades} 
            subjects={subjects} 
            teachers={teachers}
            onBrowseSubject={(sub, gr) => {
              // Redirect to teacher list of this subject
              setPage('login');
            }} 
          />
          
          <ReviewsSection isDarkMode={isDarkMode} />
          
          <EncouragementSection isDarkMode={isDarkMode} onAction={() => setPage('login')} />
          
          <StatsSection isDarkMode={isDarkMode} />
          
          <PublicFooter isDarkMode={isDarkMode} />
        </>
      )}

      {page === 'login' && (
        <LoginPage 
          isDarkMode={isDarkMode} 
          onNavigate={(p: any) => setPage(p)} 
          onLoginSuccess={handleLoginSuccess} 
        />
      )}

      {page === 'signup' && (
        <SignUpPage 
          isDarkMode={isDarkMode} 
          onNavigate={(p: any) => setPage(p)} 
          stages={stages} 
          grades={grades} 
        />
      )}

      {page === 'support_tech' && (
        <SupportTechnicalPage 
          isDarkMode={isDarkMode} 
          onBack={() => setPage('home')} 
        />
      )}

      {page === 'support_scientific' && (
        <SupportScientificPage 
          isDarkMode={isDarkMode} 
          teachers={teachers} 
          onBack={() => setPage('home')} 
        />
      )}

      {page === 'contact' && (
        <ContactUsPage 
          isDarkMode={isDarkMode} 
          onBack={() => setPage('home')} 
        />
      )}

      {/* SINGLE TEACHER LANDING PROFILE PAGE */}
      {page === 'teacher_profile' && selectedTeacherProfile && (
        <div className={`min-h-[85vh] py-12 transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
          <div className="max-w-5xl mx-auto px-4 space-y-8 text-right">
            
            {/* Header profile banner */}
            <div className={`p-8 rounded-3xl border shadow-2xl flex flex-col md:flex-row items-center gap-6 relative overflow-hidden transition-all duration-300 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-black text-xs px-4 py-1.5 rounded-full shadow-lg">
                خبير مادة الفيزياء
              </div>
              
              <img 
                src={selectedTeacherProfile.image} 
                alt={selectedTeacherProfile.name} 
                className="w-24 h-24 rounded-full object-cover border-4 border-cyan-400 shadow-md" 
              />
              
              <div className="space-y-2 flex-1">
                <h2 className={`text-3xl font-black ${isDarkMode ? 'text-slate-100' : 'text-slate-850'}`}>{selectedTeacherProfile.name}</h2>
                <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{selectedTeacherProfile.bio}</p>
              </div>
            </div>

            {/* Specialization Section */}
            <div className={`p-6 border rounded-3xl space-y-4 transition-all duration-300 ${
              isDarkMode ? 'bg-slate-900 border-slate-850' : 'bg-white border-slate-100'
            }`}>
              <h4 className="font-extrabold text-sm text-cyan-500">مجال التخصص والمراحل التي يدرسها:</h4>
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1.5 border text-xs font-bold rounded-lg ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>المرحلة الثانوية</span>
                <span className={`px-3 py-1.5 border text-xs font-bold rounded-lg ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>الصف الثالث الثانوي</span>
                <span className={`px-3 py-1.5 border text-xs font-bold rounded-lg ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>الفيزياء والعلوم</span>
              </div>
            </div>

            {/* Teacher Packages Slider with filter bar */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className={`font-extrabold text-lg ${isDarkMode ? 'text-slate-100' : 'text-slate-850'}`}>باقات المدرس المتاحة للدراسة</h3>
                
                {/* Dynamic Filters */}
                <div className="flex gap-2">
                  <select
                    value={profileStage}
                    onChange={(e) => setProfileStage(e.target.value)}
                    className={`px-3 py-1.5 border text-xs font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                      isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  >
                    <option value="">كل المراحل</option>
                    <option value="stage_3">المرحلة الثانوية</option>
                  </select>

                  <select
                    value={profileGrade}
                    onChange={(e) => setProfileGrade(e.target.value)}
                    className={`px-3 py-1.5 border text-xs font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                      isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  >
                    <option value="">كل الصفوف</option>
                    <option value="grade_3_3">الصف الثالث الثانوي</option>
                  </select>
                </div>
              </div>

              {/* Slider for Packages */}
              {getTeacherProfilePackages().length === 0 ? (
                <p className={`text-xs py-6 text-center ${isDarkMode ? 'text-slate-400' : 'text-slate-550'}`}>لا توجد باقات مفلترة لهذا المدرس حالياً.</p>
              ) : (
                <AutoSlider 
                  items={getTeacherProfilePackages()}
                  renderItem={(pkg: any) => (
                    <div className={`p-5 rounded-2xl border shadow flex flex-col justify-between h-full space-y-4 transition-all duration-300 ${
                      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                    }`}>
                      <div className="space-y-3">
                        <div className="h-44 rounded-xl overflow-hidden relative shadow-inner">
                          <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                        </div>
                        <h4 className={`font-extrabold text-base ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>{pkg.name}</h4>
                        <p className={`text-xs line-clamp-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{pkg.description}</p>
                      </div>
                      <div className={`pt-3 border-t flex justify-between items-center text-xs ${
                        isDarkMode ? 'border-slate-800/60' : 'border-slate-100'
                      }`}>
                        <span className="font-bold text-amber-500">{pkg.price === 0 ? 'محتوى مجاني' : `سعر الاشتراك: ${pkg.price} ج`}</span>
                        <button
                          onClick={() => setPage('login')}
                          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-black rounded-xl shadow-md transition-all hover:scale-[1.03]"
                        >
                          شراء والبدء بالدراسة
                        </button>
                      </div>
                    </div>
                  )}
                />
              )}
            </div>

            <div className="text-center pt-8">
              <button
                onClick={() => setPage('home')}
                className={`px-6 py-3 border font-bold text-sm rounded-xl transition-all hover:scale-105 shadow-sm ${
                  isDarkMode ? 'bg-slate-900 border-slate-800 text-cyan-400' : 'bg-white border-slate-200 text-cyan-600'
                }`}
              >
                العودة للصفحة الرئيسية
              </button>
            </div>

          </div>
        </div>
      )}

      {/* STUDENT DASHBOARD DASH */}
      {page === 'student_dashboard' && currentUser?.role === 'student' && (
        <StudentDashboard 
          student={currentUser} 
          isDarkMode={isDarkMode} 
          onLogout={handleLogout} 
        />
      )}

      {/* TEACHER DASHBOARD DASH */}
      {page === 'teacher_dashboard' && currentUser?.role === 'teacher' && (
        <TeacherDashboard 
          teacher={currentUser} 
          isDarkMode={isDarkMode} 
          onLogout={handleLogout} 
        />
      )}

      {/* ADMIN DASHBOARD DASH */}
      {page === 'admin_dashboard' && currentUser?.role === 'admin' && (
        <AdminDashboard 
          isDarkMode={isDarkMode}
          onLogout={handleLogout} 
          onImpersonateTeacher={handleImpersonateTeacher} 
        />
      )}

    </div>
  );
}
