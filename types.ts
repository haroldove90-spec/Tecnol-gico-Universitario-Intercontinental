
export enum Role {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  enrolledCourseIds: number[];
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
}

export interface PrivateFile {
  id: number;
  name: string;
  size: string; // e.g., "1.2 MB"
  type: 'pdf' | 'docx' | 'img' | 'zip';
  uploadedAt: string; // ISO date string
}
