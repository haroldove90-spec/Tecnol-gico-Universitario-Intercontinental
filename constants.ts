import { User, Role, Course, LessonType, Submission, PrivateFile, CalendarEvent } from './types';

export const MOCK_COURSES: Course[] = [
  {
    id: 1,
    title: 'Licenciatura en Derecho',
    description: 'Formación integral en el campo del derecho, preparando profesionales capaces de interpretar y aplicar las leyes en diversos contextos.',
    instructor: 'Dr. Alejandro Vargas',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUBX-nYg0e-tFM5xONkhQWzYHVp18vvf3bvA&s',
    modules: [
      {
        id: 1,
        title: 'Introducción al Derecho',
        lessons: [
          { id: 1, title: 'Conceptos Jurídicos Fundamentales', type: LessonType.VIDEO, content: 'https://www.youtube.com/embed/SqcY0GlETPk' },
          { id: 2, title: 'Fuentes del Derecho', type: LessonType.TEXT, content: '## Las fuentes del derecho son...\n\nSigue estos pasos para entenderlas...' },
          { id: 3, title: 'Cuestionario de Introducción', type: LessonType.QUIZ, content: '{"question": "¿Qué es una norma jurídica?", "options": ["Una regla social", "Una ley escrita", "Una costumbre"], "answer": 1}' },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Licenciatura en Educación',
    description: 'Desarrolla las competencias pedagógicas y didácticas necesarias para formar a las futuras generaciones con excelencia.',
    instructor: 'Mtra. Isabel Torres',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_w00_mXet86diQAGJug93ZoyGlT3AYnVRlA&s',
    modules: [
       {
        id: 2,
        title: 'Psicología Educativa',
        lessons: [
          { id: 4, title: 'Teorías del Aprendizaje', type: LessonType.VIDEO, content: 'https://www.youtube.com/embed/O6P86uwfdR0' },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Licenciatura en Tecnologías de la Información',
    description: 'Domina las herramientas tecnológicas que impulsan el mundo digital, desde el desarrollo de software hasta la ciberseguridad.',
    instructor: 'Ing. Ricardo Morales',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtWgh5EDipEzN0D6xINIGPLsFs4asXHzsQDA&s',
    modules: [],
  },
   {
    id: 4,
    title: 'Licenciatura en Ciencias Forenses',
    description: 'Aplica el conocimiento científico en la investigación de hechos delictivos, contribuyendo a la impartición de justicia.',
    instructor: 'Dra. Laura Campos',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjFLLoVcLMzdtlhkasSpkbV79UbliSst7PRg&s',
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
    {id: 3, studentId: 2, courseId: 2, lessonId: 4, content: "Respuesta al cuestionario...", grade: 78},
];

export const MOCK_PRIVATE_FILES: PrivateFile[] = [
  { id: 1, name: 'Apuntes_Derecho_Romano.pdf', size: '2.5 MB', type: 'pdf', uploadedAt: '2023-10-26T10:00:00Z' },
  { id: 2, name: 'Ensayo_Pedagogia.zip', size: '15.2 MB', type: 'zip', uploadedAt: '2023-10-25T14:30:00Z' },
  { id: 3, name: 'Diagrama_Redes.png', size: '800 KB', type: 'img', uploadedAt: '2023-10-22T09:15:00Z' },
  { id: 4, name: 'Reporte_Balistica.docx', size: '1.1 MB', type: 'docx', uploadedAt: '2023-10-20T18:00:00Z' },
];

// Mock data for July 2024
export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
    { id: 1, title: 'Entrega Cuestionario M1', date: '2024-07-15', courseId: 1 },
    { id: 2, title: 'Examen Final - Derecho', date: '2024-07-28', courseId: 1 },
    { id: 3, title: 'Presentación Proyecto Educación', date: '2024-07-22', courseId: 2 },
    { id: 4, title: 'Inicio Módulo 1 - TI', date: '2024-08-01', courseId: 3 },
];