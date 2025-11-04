
import { User, Role, Course, LessonType, Submission, PrivateFile, CalendarEvent } from './types';

export const MOCK_COURSES: Course[] = [
  {
    id: 1,
    title: 'React de Cero a Experto',
    description: 'Aprende a construir aplicaciones web modernas con React, la librería de UI más popular.',
    instructor: 'Dr. Evelyn Reed',
    imageUrl: 'https://picsum.photos/seed/react/600/400',
    modules: [
      {
        id: 1,
        title: 'Introducción a React',
        lessons: [
          { id: 1, title: '¿Qué es React?', type: LessonType.VIDEO, content: 'https://www.youtube.com/embed/SqcY0GlETPk' },
          { id: 2, title: 'Instalación y Configuración', type: LessonType.TEXT, content: '## Guía de Instalación\n\nSigue estos pasos para configurar tu entorno de desarrollo...' },
          { id: 3, title: 'Cuestionario Módulo 1', type: LessonType.QUIZ, content: '{"question": "What is JSX?", "options": ["A JavaScript syntax extension", "A styling language", "A database query language"], "answer": 0}' },
        ],
      },
      {
        id: 2,
        title: 'Hooks y State Management',
        lessons: [
          { id: 4, title: 'El Hook useState', type: LessonType.VIDEO, content: 'https://www.youtube.com/embed/O6P86uwfdR0' },
          { id: 5, title: 'El Hook useEffect', type: LessonType.VIDEO, content: 'https://www.youtube.com/embed/0ZJgNak4Abw' },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Diseño UI/UX Moderno con Figma',
    description: 'Domina Figma para crear prototipos y diseños de interfaces atractivos y funcionales.',
    instructor: 'Leo Rivera',
    imageUrl: 'https://picsum.photos/seed/figma/600/400',
    modules: [
      {
        id: 3,
        title: 'Fundamentos de Figma',
        lessons: [
          { id: 6, title: 'Interfaz y Herramientas', type: LessonType.VIDEO, content: 'https://www.youtube.com/embed/jk1T0s_wbBE' },
          { id: 7, title: 'Auto Layout y Componentes', type: LessonType.TEXT, content: '## Auto Layout es poderoso\n\nExplora cómo...' },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Node.js: Backend para Aplicaciones Web',
    description: 'Construye APIs RESTful robustas y escalables con Node.js, Express y MongoDB.',
    instructor: 'Sofia Chen',
    imageUrl: 'https://picsum.photos/seed/nodejs/600/400',
    modules: [],
  },
];

export const MOCK_USERS: User[] = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@moderna.com',
    role: Role.ADMIN,
    enrolledCourseIds: [],
  },
  {
    id: 2,
    name: 'Carlos Gomez',
    email: 'carlos@test.com',
    role: Role.STUDENT,
    enrolledCourseIds: [1, 2],
  },
    {
    id: 3,
    name: 'Ana Martinez',
    email: 'ana@test.com',
    role: Role.STUDENT,
    enrolledCourseIds: [1],
  },
];

export const MOCK_SUBMISSIONS: Submission[] = [
    {id: 1, studentId: 2, courseId: 1, lessonId: 3, content: "Respuesta al cuestionario...", grade: 85},
    {id: 2, studentId: 3, courseId: 1, lessonId: 3, content: "Intento de cuestionario...", grade: 92},
    {id: 3, studentId: 2, courseId: 2, lessonId: 6, content: "Respuesta al cuestionario...", grade: 78},
];

export const MOCK_PRIVATE_FILES: PrivateFile[] = [
  { id: 1, name: 'Apuntes_React_Hooks.pdf', size: '2.5 MB', type: 'pdf', uploadedAt: '2023-10-26T10:00:00Z' },
  { id: 2, name: 'Proyecto_Figma_Entrega1.zip', size: '15.2 MB', type: 'zip', uploadedAt: '2023-10-25T14:30:00Z' },
  { id: 3, name: 'Esquema_Base_de_Datos.png', size: '800 KB', type: 'img', uploadedAt: '2023-10-22T09:15:00Z' },
  { id: 4, name: 'Ensayo_NodeJS.docx', size: '1.1 MB', type: 'docx', uploadedAt: '2023-10-20T18:00:00Z' },
];

// Mock data for July 2024
export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
    { id: 1, title: 'Entrega Cuestionario M1', date: '2024-07-15', courseId: 1 },
    { id: 2, title: 'Examen Final - React', date: '2024-07-28', courseId: 1 },
    { id: 3, title: 'Presentación Proyecto Figma', date: '2024-07-22', courseId: 2 },
    { id: 4, title: 'Inicio Módulo 2 - Node.js', date: '2024-08-01', courseId: 3 },
];
