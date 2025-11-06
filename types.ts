export enum Role {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
}

export enum StudentStatus {
  ACTIVE = 'Activo',
  GRADUATED = 'Egresado',
  TEMP_LEAVE = 'Baja Temporal',
  PERM_LEAVE = 'Baja Definitiva',
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  enrolledCourseIds: number[];
  // New optional fields for students
  matricula?: string;
  careerId?: number;
  semester?: number;
  status?: StudentStatus;
}

export enum LessonType {
  VIDEO = 'VIDEO',
  TEXT = 'TEXT',
  QUIZ = 'QUIZ',
}

export interface Lesson {
  id: number;
  title: string;
  type: LessonType;
  content: string; // URL for video, markdown for text, JSON for quiz
}

export interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  imageUrl: string;
  modules: Module[];
}

export interface Submission {
  id: number;
  studentId: number;
  courseId: number;
  lessonId: number;
  content: string;
  grade: number | null;
}

export interface StudentWithCourses extends User {
    enrolledCourses: Course[];
}

export interface CalendarEvent {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD
  courseId?: number;
  type?: 'course' | 'personal';
}

export interface PrivateFile {
  id: number;
  name: string;
  size: string; // e.g., "1.2 MB"
  type: 'pdf' | 'docx' | 'img' | 'zip';
  uploadedAt: string; // ISO date string
}

// --- NEW TYPES FOR ADMIN SYSTEM ---

export interface Career {
  id: number;
  name: string;
  planCode: string;
  totalCredits: number;
}

export interface Subject {
  id: number;
  key: string;
  name: string;
  credits: number;
  theoryHours: number;
  practiceHours: number;
  semester: number;
  careerId: number;
  moduleTitle?: string;
  fileLink?: string;
}

export interface Teacher {
  id: number;
  name: string;
  email: string;
  employeeId: string;
}

export interface Group {
    id: number;
    subjectId: number;
    teacherId: number;
    periodId: number;
    schedule: string;
    studentIds: number[];
}

export interface Grade {
    id: number;
    studentId: number;
    subjectId: number;
    periodId: number;
    partial1: number | null;
    partial2: number | null;
    finalExam: number | null;
    finalGrade: number | null;
}

export interface SchoolPeriod {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
}

export enum SystemRole {
    ADMIN = 'Administrador',
    TEACHER = 'Docente',
    COORDINATOR = 'Coordinación Académica',
}

export interface SystemUser {
    id: number;
    name: string;
    email: string;
    role: SystemRole;
    lastAccess: string;
}