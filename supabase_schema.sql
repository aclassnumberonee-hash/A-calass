
-- Clean up existing tables if they exist
DROP TABLE IF EXISTS quiz_results CASCADE;
DROP TABLE IF EXISTS wallet_history CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS promo_codes CASCADE;
DROP TABLE IF EXISTS app_notifications CASCADE;
DROP TABLE IF EXISTS content CASCADE;
DROP TABLE IF EXISTS weeks CASCADE;
DROP TABLE IF EXISTS packages CASCADE;
DROP TABLE IF EXISTS teachers CASCADE;
DROP TABLE IF EXISTS subjects CASCADE;
DROP TABLE IF EXISTS grades CASCADE;
DROP TABLE IF EXISTS stages CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS auth_passwords CASCADE;

-- 1. Educational Stages Table
CREATE TABLE stages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT,
    "order" INTEGER DEFAULT 1
);

-- 2. Grades Table
CREATE TABLE grades (
    id TEXT PRIMARY KEY,
    stage_id TEXT REFERENCES stages(id) ON DELETE CASCADE,
    name TEXT NOT NULL
);

-- 3. Subjects Table
CREATE TABLE subjects (
    id TEXT PRIMARY KEY,
    grade_id TEXT REFERENCES grades(id) ON DELETE CASCADE,
    stage_id TEXT REFERENCES stages(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    icon TEXT DEFAULT 'BookOpen'
);

-- 4. Teachers Table
CREATE TABLE teachers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    bio TEXT,
    subject_id TEXT REFERENCES subjects(id) ON DELETE SET NULL,
    grade_ids TEXT, -- Stringified JSON array of grade IDs: '["grade_3_1","grade_3_2"]'
    image TEXT,
    commission_rate INTEGER DEFAULT 10,
    support_phone TEXT,
    support_telegram TEXT,
    support_assistant_name TEXT,
    support_apology_message TEXT
);

-- 5. Packages (Courses / Semesters) Table
CREATE TABLE packages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    teacher_id TEXT REFERENCES teachers(id) ON DELETE CASCADE,
    grade_id TEXT REFERENCES grades(id) ON DELETE CASCADE,
    stage_id TEXT REFERENCES stages(id) ON DELETE CASCADE,
    subject_id TEXT REFERENCES subjects(id) ON DELETE CASCADE,
    image TEXT,
    price INTEGER DEFAULT 0,
    original_price INTEGER DEFAULT 0,
    type TEXT DEFAULT 'monthly', -- 'monthly' or 'offer'
    created_at TEXT NOT NULL
);

-- 6. Weeks / Sections Table
CREATE TABLE weeks (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    package_ids TEXT, -- Stringified JSON array of package IDs
    grade_id TEXT REFERENCES grades(id) ON DELETE CASCADE,
    stage_id TEXT REFERENCES stages(id) ON DELETE CASCADE,
    subject_id TEXT REFERENCES subjects(id) ON DELETE CASCADE,
    teacher_id TEXT REFERENCES teachers(id) ON DELETE CASCADE
);

-- 7. Content (Videos, PDFs, Quizzes) Table
CREATE TABLE content (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL, -- 'video', 'pdf', 'quiz'
    url TEXT NOT NULL, -- URL or youtube ID or quiz ID
    week_ids TEXT, -- Stringified JSON array of week IDs
    grade_id TEXT REFERENCES grades(id) ON DELETE CASCADE,
    stage_id TEXT REFERENCES stages(id) ON DELETE CASCADE,
    subject_id TEXT REFERENCES subjects(id) ON DELETE CASCADE,
    teacher_id TEXT REFERENCES teachers(id) ON DELETE CASCADE,
    questions TEXT -- JSON string array containing quiz questions
);

-- 8. Promo Codes Table
CREATE TABLE promo_codes (
    id TEXT PRIMARY KEY,
    package_id TEXT REFERENCES packages(id) ON DELETE CASCADE,
    teacher_id TEXT REFERENCES teachers(id) ON DELETE CASCADE,
    price INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active', -- 'active' or 'used'
    created_at TEXT NOT NULL
);

-- 9. App Notifications Table
CREATE TABLE app_notifications (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    date TEXT NOT NULL,
    status TEXT DEFAULT 'unread', -- 'unread' or 'read'
    target_type TEXT DEFAULT 'all', -- 'all', 'grade'
    target_grade_id TEXT REFERENCES grades(id) ON DELETE SET NULL
);

-- 10. Students Table
CREATE TABLE students (
    id TEXT PRIMARY KEY,
    student_code INTEGER NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    parent_phone TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    governorate TEXT NOT NULL,
    city TEXT NOT NULL,
    stage_id TEXT REFERENCES stages(id) ON DELETE SET NULL,
    grade_id TEXT REFERENCES grades(id) ON DELETE SET NULL,
    section TEXT, -- 'scientific_math', 'scientific_science', 'literary', etc.
    birth_date TEXT,
    gender TEXT,
    wallet INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active',
    is_banned BOOLEAN DEFAULT FALSE
);

-- 11. Course Subscriptions Table
CREATE TABLE subscriptions (
    id TEXT PRIMARY KEY,
    student_id TEXT REFERENCES students(id) ON DELETE CASCADE,
    package_id TEXT REFERENCES packages(id) ON DELETE CASCADE,
    teacher_id TEXT REFERENCES teachers(id) ON DELETE CASCADE,
    price INTEGER DEFAULT 0,
    activated_at TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    status TEXT DEFAULT 'active', -- 'active', 'expired'
    payment_method TEXT DEFAULT 'wallet'
);

-- 12. Wallet Transaction History Table
CREATE TABLE wallet_history (
    id TEXT PRIMARY KEY,
    student_id TEXT REFERENCES students(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    type TEXT NOT NULL, -- 'charge', 'purchase'
    date TEXT NOT NULL,
    status TEXT DEFAULT 'success', -- 'pending', 'success', 'rejected'
    transfer_from TEXT, -- Vodaphone Cash number etc.
    admin_id TEXT
);

-- 13. Quiz Results Table
CREATE TABLE quiz_results (
    id TEXT PRIMARY KEY,
    student_id TEXT REFERENCES students(id) ON DELETE CASCADE,
    quiz_id TEXT NOT NULL,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    answers TEXT, -- JSON string containing student's answers
    passed BOOLEAN NOT NULL,
    date TEXT NOT NULL
);

-- 14. Authorization Password Mapping Table
CREATE TABLE auth_passwords (
    user_id TEXT PRIMARY KEY,
    password TEXT NOT NULL
);


-- =====================================================================
-- INDICES FOR OPTIMAL QUERY SPEED
-- =====================================================================
CREATE INDEX idx_grades_stage ON grades(stage_id);
CREATE INDEX idx_subjects_grade ON subjects(grade_id);
CREATE INDEX idx_teachers_subject ON teachers(subject_id);
CREATE INDEX idx_packages_teacher ON packages(teacher_id);
CREATE INDEX idx_packages_grade ON packages(grade_id);
CREATE INDEX idx_subscriptions_student ON subscriptions(student_id);
CREATE INDEX idx_wallet_history_student ON wallet_history(student_id);
CREATE INDEX idx_quiz_results_student ON quiz_results(student_id);

 ALTER TABLE students ENABLE ROW LEVEL SECURITY;
 CREATE POLICY "Allow read for all authenticated users" ON students FOR SELECT USING (true);
CREATE POLICY "Allow update for owners" ON students FOR UPDATE USING (auth.uid()::text = id);
