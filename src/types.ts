export interface EducationalStage {
  id: string;
  name: string;
  image: string;
  order: number;
}

export interface Grade {
  id: string;
  stageId: string;
  name: string;
}

export interface Subject {
  id: string;
  gradeId: string;
  stageId: string;
  name: string;
  icon: string;
}

export type UserRole = 'student' | 'teacher' | 'admin';

export interface Student {
  id: string; // e.g. "5001"
  studentCode: number; // Numeric starting from 5000
  firstName: string;
  lastName: string;
  phone: string;
  parentPhone: string;
  email: string;
  governorate: string;
  city: string;
  stageId: string;
  gradeId: string;
  section?: 'scientific_math' | 'scientific_science' | 'literary' | 'none';
  birthDate: string;
  gender: 'male' | 'female';
  wallet: number;
  status: 'active' | 'suspended';
  isBanned: boolean;
  banReason?: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  subjectId: string;
  gradeIds: string[]; // List of grades this teacher teaches
  image: string;
  commissionRate: number; // e.g. 15 for 15%
  supportPhone: string; // WhatsApp
  supportTelegram: string; // Telegram link/username
  supportAssistantName: string;
  supportAssistantImage?: string;
  supportApologyMessage: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
}

export interface Package {
  id: string; // Numeric starting from 5000
  name: string;
  description: string;
  teacherId: string;
  gradeId: string;
  stageId: string;
  subjectId: string;
  image: string;
  price: number; // 0 means free
  originalPrice: number;
  type: 'monthly' | '3-months' | 'weekly' | 'offer';
  createdAt: string;
}

export interface Week {
  id: string; // Numeric starting from 1
  name: string;
  description: string;
  packageIds: string[]; // multi-package select support
  gradeId: string;
  stageId: string;
  subjectId: string;
  teacherId: string;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number; // 0-indexed
  explanation?: string;
}

export interface Content {
  id: string; // Numeric starting from 100
  name: string;
  description: string;
  type: 'video' | 'pdf' | 'image' | 'quiz';
  url: string; // YouTube ID or Drive embed URL or Image URL
  weekIds: string[]; // multi-week support
  gradeId: string;
  stageId: string;
  subjectId: string;
  teacherId: string;
  questions?: QuizQuestion[]; // if type is 'quiz'
}

export interface Subscription {
  id: string;
  studentId: string;
  packageId: string;
  status: 'active' | 'expired';
  subscribedAt: string;
}

export interface WalletHistory {
  id: string;
  studentId: string;
  amount: number;
  type: 'charge' | 'purchase';
  date: string;
  status: 'success' | 'pending' | 'failed';
  senderPhone?: string;
  notes?: string;
}

export interface QuizResult {
  id: string;
  studentId: string;
  quizContentId: string;
  score: number;
  totalQuestions: number;
  answers: Record<string, number>; // questionId -> selectedOptionIndex
  completedAt: string;
}

export interface PromoCode {
  id: string; // Code string e.g. "A-CLASS-XXXXX"
  packageId: string;
  teacherId: string;
  price: number; // full price or discount value
  status: 'active' | 'used';
  usedByStudentId?: string;
  createdAt: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  status: 'unread' | 'read';
  targetType: 'all' | 'teachers' | 'students' | 'stage' | 'grade' | 'specific';
  targetUserId?: string; // for 'specific' or 'teachers'
  targetStageId?: string; // for 'stage'
  targetGradeId?: string; // for 'grade'
}
