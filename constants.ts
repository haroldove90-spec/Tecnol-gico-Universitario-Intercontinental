import { User, Role, Course, LessonType, Submission, PrivateFile, CalendarEvent, StudentStatus, Career, Subject, Teacher, Group, Grade, SchoolPeriod, SystemUser, SystemRole } from './types';

export const MOCK_COURSES: Course[] = [
  {
    id: 1,
    title: 'Licenciatura en Derecho',
    description: 'Formación integral en el campo del derecho, preparando profesionales capaces de interpretar y aplicar las leyes en diversos contextos.',
    instructor: 'Dr. Alejandro Vargas',
    imageUrl: 'https://images.unsplash.com/photo-1589994965851-a8f8bf2c53a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4138d04d475d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    modules: [],
  },
   {
    id: 4,
    title: 'Licenciatura en Ciencias Forenses',
    description: 'Aplica el conocimiento científico en la investigación de hechos delictivos, contribuyendo a la impartición de justicia.',
    instructor: 'Dra. Laura Campos',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
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
    matricula: 'TUI2024001',
    careerId: 1,
    semester: 3,
    status: StudentStatus.ACTIVE
  },
  {
    id: 3,
    name: 'Ana Martinez',
    email: 'ana@test.com',
    role: Role.STUDENT,
    enrolledCourseIds: [1],
    matricula: 'TUI2024002',
    careerId: 1,
    semester: 1,
    status: StudentStatus.ACTIVE
  },
  {
    id: 4,
    name: 'Luisa Fernandez',
    email: 'luisa@test.com',
    role: Role.STUDENT,
    enrolledCourseIds: [2],
    matricula: 'TUI2023015',
    careerId: 2,
    semester: 5,
    status: StudentStatus.TEMP_LEAVE
  },
  {
    id: 5,
    name: 'Jorge Perez',
    email: 'jorge@test.com',
    role: Role.STUDENT,
    enrolledCourseIds: [3],
    matricula: 'TUI2022007',
    careerId: 3,
    semester: 8,
    status: StudentStatus.GRADUATED
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
];

export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
    { id: 1, title: 'Entrega Cuestionario M1', date: '2024-07-15', courseId: 1 },
    { id: 2, title: 'Examen Final - Derecho', date: '2024-07-28', courseId: 1 },
];

// --- NEW MOCK DATA FOR ADMIN SYSTEM ---

export const MOCK_CAREERS: Career[] = [
    { id: 1, name: 'Licenciatura en Derecho', planCode: 'LD-2022' },
    { id: 2, name: 'Licenciatura en Educación', planCode: 'LE-2021' },
    { id: 3, name: 'Licenciatura en Tecnologías de la Información', planCode: 'LTI-2023' },
    { id: 4, name: 'Licenciatura en Ciencias Forenses', planCode: 'LCF-2022' },
];

export const MOCK_SUBJECTS: Subject[] = [
    { id: 1, key: 'DER-101', name: 'Introducción al Derecho', credits: 8, theoryHours: 4, practiceHours: 2, semester: 1, careerId: 1 },
    { id: 2, key: 'DER-102', name: 'Derecho Romano', credits: 8, theoryHours: 4, practiceHours: 2, semester: 1, careerId: 1 },
    { id: 3, key: 'EDU-101', name: 'Psicología Educativa', credits: 6, theoryHours: 3, practiceHours: 2, semester: 1, careerId: 2 },
    { id: 4, key: 'TI-101', name: 'Fundamentos de Programación', credits: 8, theoryHours: 3, practiceHours: 4, semester: 1, careerId: 3 },
];

export const MOCK_TEACHERS: Teacher[] = [
    { id: 1, name: 'Dr. Alejandro Vargas', email: 'avargas@tecinter.edu', employeeId: 'DOC001' },
    { id: 2, name: 'Mtra. Isabel Torres', email: 'itorres@tecinter.edu', employeeId: 'DOC002' },
    { id: 3, name: 'Ing. Ricardo Morales', email: 'rmorales@tecinter.edu', employeeId: 'DOC003' },
    { id: 4, name: 'Dra. Laura Campos', email: 'lcampos@tecinter.edu', employeeId: 'DOC004' },
];

export const MOCK_PERIODS: SchoolPeriod[] = [
    { id: 1, name: 'Enero - Junio 2024', startDate: '2024-01-15', endDate: '2024-06-28' },
    { id: 2, name: 'Agosto - Diciembre 2024', startDate: '2024-08-05', endDate: '2024-12-13' },
];

export const MOCK_GROUPS: Group[] = [
    { id: 1, subjectId: 1, teacherId: 1, periodId: 1, schedule: 'L-M-V 7:00-9:00', studentIds: [2, 3] },
    { id: 2, subjectId: 3, teacherId: 2, periodId: 1, schedule: 'M-J 10:00-12:00', studentIds: [4] },
    { id: 3, subjectId: 4, teacherId: 3, periodId: 1, schedule: 'L-M-V 9:00-11:00', studentIds: [5] },
];

export const MOCK_GRADES: Grade[] = [
    { id: 1, studentId: 2, subjectId: 1, periodId: 1, partial1: 85, partial2: 90, finalExam: 88, finalGrade: 88 },
    { id: 2, studentId: 3, subjectId: 1, periodId: 1, partial1: 92, partial2: 95, finalExam: 94, finalGrade: 94 },
    { id: 3, studentId: 4, subjectId: 3, periodId: 1, partial1: 70, partial2: 75, finalExam: null, finalGrade: null },
];

export const MOCK_SYSTEM_USERS: SystemUser[] = [
    { id: 1, name: 'Admin User', email: 'admin@moderna.com', role: SystemRole.ADMIN, lastAccess: '2024-07-20T10:00:00Z' },
    { id: 2, name: 'Dr. Alejandro Vargas', email: 'avargas@tecinter.edu', role: SystemRole.TEACHER, lastAccess: '2024-07-19T15:30:00Z' },
    { id: 3, name: 'Coordinador Derecho', email: 'coord.derecho@tecinter.edu', role: SystemRole.COORDINATOR, lastAccess: '2024-07-20T09:00:00Z' },
];
