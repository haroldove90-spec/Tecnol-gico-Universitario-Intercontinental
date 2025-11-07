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
  { id: 1, name: 'Admin User', email: 'admin@moderna.com', role: Role.ADMIN, enrolledCourseIds: [] },
  { id: 2, name: 'Carlos Gomez', email: 'carlos@test.com', role: Role.STUDENT, enrolledCourseIds: [1, 2], matricula: 'TUI2024001', careerId: 1, semester: 3, status: StudentStatus.ACTIVE },
  { id: 3, name: 'Ana Martinez', email: 'ana@test.com', role: Role.STUDENT, enrolledCourseIds: [1], matricula: 'TUI2024002', careerId: 1, semester: 1, status: StudentStatus.ACTIVE },
  { id: 4, name: 'Luisa Fernandez', email: 'luisa@test.com', role: Role.STUDENT, enrolledCourseIds: [2], matricula: 'TUI2023015', careerId: 2, semester: 5, status: StudentStatus.TEMP_LEAVE },
  { id: 5, name: 'Jorge Perez', email: 'jorge@test.com', role: Role.STUDENT, enrolledCourseIds: [3], matricula: 'TUI2022007', careerId: 3, semester: 8, status: StudentStatus.GRADUATED },
  { id: 6, name: 'Sofia Rodriguez', email: 'sofia@test.com', role: Role.STUDENT, enrolledCourseIds: [3], matricula: 'TUI2024003', careerId: 3, semester: 2, status: StudentStatus.ACTIVE },
  { id: 7, name: 'Miguel Angel Torres', email: 'miguel@test.com', role: Role.STUDENT, enrolledCourseIds: [4], matricula: 'TUI2023010', careerId: 4, semester: 4, status: StudentStatus.ACTIVE },
  { id: 8, name: 'Valeria Mendoza', email: 'valeria@test.com', role: Role.STUDENT, enrolledCourseIds: [1], matricula: 'TUI2024004', careerId: 1, semester: 1, status: StudentStatus.ACTIVE },
  { id: 9, name: 'Ricardo Sanchez', email: 'ricardo@test.com', role: Role.STUDENT, enrolledCourseIds: [2], matricula: 'TUI2023020', careerId: 2, semester: 3, status: StudentStatus.ACTIVE },
  { id: 10, name: 'Jimena Castro', email: 'jimena@test.com', role: Role.STUDENT, enrolledCourseIds: [], matricula: 'TUI2021005', careerId: 1, semester: 9, status: StudentStatus.PERM_LEAVE },
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

export const MOCK_CURRICULUMS: Record<number, Record<number, { key: string; name: string; moduleTitle: string; fileLink: string }[]>> = {
    2: { // Licenciatura en Educación
        1: [
            { key: 'E0101', name: 'Filosofía de la educación', moduleTitle: 'Módulo I', fileLink: 'Filosofía de la educación.pdf' },
            { key: 'E0102', name: 'Psicología del desarrollo', moduleTitle: 'Módulo I', fileLink: 'Psicología del desarrollo.pdf' },
            { key: 'E0103', name: 'Comunicación Asertiva', moduleTitle: 'Módulo I', fileLink: 'Comunicación asertiva.pdf' },
            { key: 'E0104', name: 'Historia Universal de la educación', moduleTitle: 'Módulo I', fileLink: 'Historia Universal de la educa' },
        ],
        2: [
            { key: 'E0201', name: 'Sociología de la educación', moduleTitle: 'Módulo II', fileLink: 'Sociología de la educación.po' },
            { key: 'E0202', name: 'Didáctica general', moduleTitle: 'Módulo II', fileLink: 'Didáctica general.pdf' },
            { key: 'E0203', name: 'Estrategias de trabajo con grupos', moduleTitle: 'Módulo II', fileLink: 'Estrategias de trabajo con gru' },
            { key: 'E0204', name: 'Psicología del aprendizaje', moduleTitle: 'Módulo II', fileLink: 'Psicología del aprendizaje.po' },
        ],
        3: [
            { key: 'E0301', name: 'Política y legislación educativa', moduleTitle: 'Módulo III', fileLink: 'Política y legislación educativ' },
            { key: 'E0302', name: 'Historia de la educación en México', moduleTitle: 'Módulo III', fileLink: 'Historia de la educación en M' },
            { key: 'E0303', name: 'Diseño de estrategias y materiales didácticos', moduleTitle: 'Módulo III', fileLink: 'Diseño de estrategias y mate' },
            { key: 'E0304', name: 'Programación didáctica', moduleTitle: 'Módulo III', fileLink: 'Programación didáctica.pdf' },
        ],
        4: [
            { key: 'E0401', name: 'Investigación Educativa I', moduleTitle: 'Módulo IV', fileLink: 'Investigación Educativa I.pdf' },
            { key: 'E0402', name: 'Estadística descriptiva aplicada', moduleTitle: 'Módulo IV', fileLink: 'Estadística descriptiva aplica' },
            { key: 'E0403', name: 'Planeación y evaluación educativa', moduleTitle: 'Módulo IV', fileLink: 'Planeación y evaluación edud' },
            { key: 'E0404', name: 'Inclusión educativa y diversidad en el aula', moduleTitle: 'Módulo IV', fileLink: 'Inclusión educativa y diversid' },
        ],
        5: [
            { key: 'E0501', name: 'Investigación Educativa II', moduleTitle: 'Módulo V', fileLink: 'Investigación Educativa II.pdf' },
            { key: 'E0502', name: 'Educación socioemocional', moduleTitle: 'Módulo V', fileLink: 'Educación socioemocional.po' },
            { key: 'E0503', name: 'Educación y cultura para la Paz', moduleTitle: 'Módulo V', fileLink: 'Educación y cultura para la P' },
            { key: 'E0504', name: 'Modelos de orientación e intervención educativa', moduleTitle: 'Módulo V', fileLink: 'Modelos de orientación e inte' },
        ],
        6: [
            { key: 'E0601', name: 'Cultura de género en educación', moduleTitle: 'Módulo VI', fileLink: 'Cultura de género en educac' },
            { key: 'E0602', name: 'Teoría curricular', moduleTitle: 'Módulo VI', fileLink: 'Teoría curricular.pdf' },
            { key: 'E0603', name: 'Intervención psicopedagógica', moduleTitle: 'Módulo VI', fileLink: 'Intervención psicopedagógica' },
            { key: 'E0604', name: 'Gestión y administración educativa', moduleTitle: 'Módulo VI', fileLink: 'Gestión y administración edu' },
        ],
        7: [
            { key: 'E0701', name: 'Diseño y evaluación curricular', moduleTitle: 'Módulo VII', fileLink: 'Diseño y evaluación curricula' },
            { key: 'E0702', name: 'Proyectos de innovación educativa', moduleTitle: 'Módulo VII', fileLink: 'Proyectos de innovación edu' },
            { key: 'E0703', name: 'Modelos y diseños instruccionales', moduleTitle: 'Módulo VII', fileLink: 'Modelos y diseños instruccion' },
            { key: 'E0704', name: 'Procesos de las organizaciones educativas', moduleTitle: 'Módulo VII', fileLink: 'Procesos de las organizacion' },
        ],
        8: [
            { key: 'E0801', name: 'Emprendimiento Educativo', moduleTitle: 'Módulo VIII', fileLink: 'Emprendimiento Educativo.po' },
            { key: 'E0802', name: 'Dirección y liderazgo de las instituciones educativas', moduleTitle: 'Módulo VIII', fileLink: 'Dirección y liderazgo de las in' },
            { key: 'E0803', name: 'Tecnología educativa aplicada', moduleTitle: 'Módulo VIII', fileLink: 'Tecnología educativa aplicad' },
            { key: 'E0804', name: 'Ética del profesional en educación', moduleTitle: 'Módulo VIII', fileLink: 'Ética del profesional en educa' },
        ],
        9: [
            { key: 'E0901', name: 'Modelos Pedagógicos', moduleTitle: 'Módulo IX', fileLink: 'Modelos Pedagógicos.pdf' },
            { key: 'E0902', name: 'Taller de titulación', moduleTitle: 'Módulo IX', fileLink: 'Taller de titulación.pdf' },
            { key: 'E0903', name: 'Diseño de Objetos virtuales de aprendizaje (OVA)', moduleTitle: 'Módulo IX', fileLink: 'Diseño de Objetos virtuales d' },
            { key: 'E0904', name: 'Tutoría en ambientes virtuales', moduleTitle: 'Módulo IX', fileLink: 'Tutoría en ambientes virtuale' },
        ],
    },
    4: { // Licenciatura en Ciencias Forenses
        1: [
            { key: 'LCFC101', name: 'Introducción a las Ciencias Forenses', moduleTitle: 'Primer Cuatrimestre', fileLink: 'INTRODUCCIÓN A LAS CIENCIAS FORENSES.pdf' },
            { key: 'LCFC102', name: 'Introducción a la Criminología', moduleTitle: 'Primer Cuatrimestre', fileLink: 'INTRODUCCIÓN A LA CRIMINOLOGÍA.pdf' },
            { key: 'LCFC103', name: 'Anatomía y Fisiología Humana', moduleTitle: 'Primer Cuatrimestre', fileLink: 'ANATOMÍA Y FISIOLOGÍA HUMANA.pdf' },
            { key: 'LCFC104', name: 'Psicología General', moduleTitle: 'Primer Cuatrimestre', fileLink: 'PSICOLOGÍA GENERAL.pdf' },
            { key: 'LCFC105', name: 'Técnicas de investigación y Metodología', moduleTitle: 'Primer Cuatrimestre', fileLink: 'TÉCNICAS DE INVESTIGACIÓN Y METODOLOGÍA.pdf' },
        ],
        2: [
            { key: 'LCFC201', name: 'Química Forense', moduleTitle: 'Segundo Cuatrimestre', fileLink: 'QUÍMICA FORENSE.pdf' },
            { key: 'LCFC202', name: 'Criminalística', moduleTitle: 'Segundo Cuatrimestre', fileLink: 'CRIMINALÍSTICA.pdf' },
            { key: 'LCFC203', name: 'Derecho Penal', moduleTitle: 'Segundo Cuatrimestre', fileLink: 'DERECHO PENAL.pdf' },
            { key: 'LCFC204', name: 'Estadística Aplicada a las Ciencias Forenses', moduleTitle: 'Segundo Cuatrimestre', fileLink: 'ESTADÍSTICA APLICADA A LAS CIENCIAS FORENSES.pdf' },
            { key: 'LCFC205', name: 'Victimología', moduleTitle: 'Segundo Cuatrimestre', fileLink: 'VICTIMOLOGÍA.pdf' },
        ],
        3: [
            { key: 'LCFC301', name: 'Genética Forense', moduleTitle: 'Tercer Cuatrimestre', fileLink: 'GENÉTICA FORENSE.pdf' },
            { key: 'LCFC302', name: 'Toxicología Forense', moduleTitle: 'Tercer Cuatrimestre', fileLink: 'TOXICOLOGÍA FORENSE.pdf' },
            { key: 'LCFC303', name: 'Derecho Procesal Penal', moduleTitle: 'Tercer Cuatrimestre', fileLink: 'DERECHO PROCESAL PENAL.pdf' },
            { key: 'LCFC304', name: 'Psicología Criminal', moduleTitle: 'Tercer Cuatrimestre', fileLink: 'PSICOLOGÍA CRIMINAL.pdf' },
            { key: 'LCFC305', name: 'Investigación de Campo y Recolección de Evidencia', moduleTitle: 'Tercer Cuatrimestre', fileLink: 'INVESTIGACIÓN DE CAMPO Y RECOLECCIÓN DE EVIDENCIA.pdf' },
        ],
        4: [
            { key: 'LCFC401', name: 'Balística Forense', moduleTitle: 'Cuarto Cuatrimestre', fileLink: 'BALÍSTICA FORENSE.pdf' },
            { key: 'LCFC402', name: 'Medicina Forense', moduleTitle: 'Cuarto Cuatrimestre', fileLink: 'MEDICINA FORENSE.pdf' },
            { key: 'LCFC403', name: 'Derecho Fiscal para la Empresa', moduleTitle: 'Cuarto Cuatrimestre', fileLink: 'DERECHO FISCAL PARA LA EMPRESA.pdf' },
            { key: 'LCFC404', name: 'Teorías Criminológicas', moduleTitle: 'Cuarto Cuatrimestre', fileLink: 'TEORÍAS CRIMINOLÓGICAS.pdf' },
            { key: 'LCFC405', name: 'Entomología Forense', moduleTitle: 'Cuarto Cuatrimestre', fileLink: 'ENTOMOLOGÍA FORENSE.pdf' },
        ],
        5: [
            { key: 'LCFC501', name: 'Documentoscopía y Grafoscopía', moduleTitle: 'Quinto Cuatrimestre', fileLink: 'DOCUMENTOSCOPÍA Y GRAFOSCOPIA.pdf' },
            { key: 'LCFC502', name: 'Odontología Forense', moduleTitle: 'Quinto Cuatrimestre', fileLink: 'ODONTOLOGÍA FORENSE.pdf' },
            { key: 'LCFC503', name: 'Derecho Constitucional', moduleTitle: 'Quinto Cuatrimestre', fileLink: 'DERECHO CONSTITUCIONAL.pdf' },
            { key: 'LCFC504', name: 'Criminología Aplicada', moduleTitle: 'Quinto Cuatrimestre', fileLink: 'CRIMINOLOGÍA APLICADA.pdf' },
            { key: 'LCFC505', name: 'Entrevista y Técnicas de Interrogatorio', moduleTitle: 'Quinto Cuatrimestre', fileLink: 'ENTREVISTA Y TÉCNICAS DE INTERROGATORIO.pdf' },
        ],
        6: [
            { key: 'LCFC601', name: 'Fotografía Forense', moduleTitle: 'Sexto Cuatrimestre', fileLink: 'FOTOGRAFÍA FORENSE.pdf' },
            { key: 'LCFC602', name: 'Química Analítica', moduleTitle: 'Sexto Cuatrimestre', fileLink: 'QUÍMICA ANALÍTICA.pdf' },
            { key: 'LCFC603', name: 'Derecho Laboral y Penal Laboral', moduleTitle: 'Sexto Cuatrimestre', fileLink: 'DERECHO LABORAL Y PENAL LABORAL.pdf' },
            { key: 'LCFC604', name: 'Política Criminal', moduleTitle: 'Sexto Cuatrimestre', fileLink: 'POLÍTICA CRIMINAL.pdf' },
            { key: 'LCFC605', name: 'Investigación de Incendios y Explosiones', moduleTitle: 'Sexto Cuatrimestre', fileLink: 'INVESTIGACIÓN DE INCENDIOS Y EXPLOSIONES.pdf' },
        ],
        7: [
            { key: 'LCFC701', name: 'Informática Forense', moduleTitle: 'Séptimo Cuatrimestre', fileLink: 'INFORMÁTICA FORENSE.pdf' },
            { key: 'LCFC702', name: 'Antropología Forense', moduleTitle: 'Séptimo Cuatrimestre', fileLink: '' },
            { key: 'LCFC703', name: 'Derecho Internacional Humanitario', moduleTitle: 'Séptimo Cuatrimestre', fileLink: 'DERECHO INTERNACIONAL HUMANITARIO.pdf' },
            { key: 'LCFC704', name: 'Psicología Criminal', moduleTitle: 'Séptimo Cuatrimestre', fileLink: 'PSICOLOGÍA CRIMINAL.pdf' },
            { key: 'LCFC705', name: 'Seminario de Investigación', moduleTitle: 'Séptimo Cuatrimestre', fileLink: 'SEMINARIO DE INVESTIGACIÓN.pdf' },
        ],
        8: [
            { key: 'LCFC801', name: 'Psicología Forense', moduleTitle: 'Octavo Cuatrimestre', fileLink: 'PSICOLOGÍA FORENSE.pdf' },
            { key: 'LCFC802', name: 'Derecho de la Familia y Menores', moduleTitle: 'Octavo Cuatrimestre', fileLink: 'DERECHO DE LA FAMILIA Y MENORES.pdf' },
            { key: 'LCFC803', name: 'Ética y Profesionalismo en Ciencias Forenses', moduleTitle: 'Octavo Cuatrimestre', fileLink: 'ÉTICA Y PROFESIONALISMO EN CIENCIAS FORENSES.pdf' },
            { key: 'LCFC804', name: 'Análisis de Casos Criminales', moduleTitle: 'Octavo Cuatrimestre', fileLink: 'ANÁLISIS DE CASOS CRIMINALES.pdf' },
            { key: 'LCFC805', name: 'Derecho Penal Comparativo', moduleTitle: 'Octavo Cuatrimestre', fileLink: 'DERECHO PENAL COMPARATIVO.pdf' },
        ],
        9: [
            { key: 'LCFC901', name: 'Seminario de Tesis', moduleTitle: 'Noveno Cuatrimestre', fileLink: 'SEMINARIO DE TESIS.pdf' },
            { key: 'LCFC902', name: 'Psicología Forense Avanzada', moduleTitle: 'Noveno Cuatrimestre', fileLink: 'PSICOLOGÍA FORENSE AVANZADA.pdf' },
            { key: 'LCFC903', name: 'Derecho Internacional y Crimen Transnacional', moduleTitle: 'Noveno Cuatrimestre', fileLink: 'DERECHO INTERNACIONAL Y CRIMEN TRANSNACIONAL.pdf' },
            { key: 'LCFC904', name: 'Criminología Ambiental y Delitos Contra el Medio Ambiente', moduleTitle: 'Noveno Cuatrimestre', fileLink: 'CRIMINOLOGÍA AMBIENTAL Y DELITOS CONTRA EL MEDIO AMBIENTE.pdf' },
            { key: 'LCFC905', name: 'Gestión de Casos Criminales y Consultoría Forense', moduleTitle: 'Noveno Cuatrimestre', fileLink: 'GESTIÓN DE CASOS CRIMINALES Y CONSULTORÍA FORENSE.pdf' },
        ],
    },
};

// --- NEW MOCK DATA FOR ADMIN SYSTEM ---

export const MOCK_CAREERS: Career[] = [
    { id: 1, name: 'Licenciatura en Derecho', planCode: 'LD-2022', totalCredits: 320 },
    { id: 2, name: 'Licenciatura en Educación', planCode: 'LE-2021', totalCredits: 300 },
    { id: 3, name: 'Licenciatura en Tecnologías de la Información', planCode: 'LTI-2023', totalCredits: 350 },
    { id: 4, name: 'Licenciatura en Ciencias Forenses', planCode: 'LCF-2022', totalCredits: 330 },
];

export const MOCK_SUBJECTS: Subject[] = [
    { id: 1, key: 'DER-101', name: 'Introducción al Derecho', credits: 8, theoryHours: 4, practiceHours: 2, semester: 1, careerId: 1 },
    { id: 2, key: 'DER-102', name: 'Derecho Romano', credits: 8, theoryHours: 4, practiceHours: 2, semester: 1, careerId: 1 },
    { id: 3, key: 'DER-301', name: 'Derecho Penal I', credits: 8, theoryHours: 4, practiceHours: 2, semester: 3, careerId: 1 },
    { id: 4, key: 'EDU-101', name: 'Psicología Educativa', credits: 6, theoryHours: 3, practiceHours: 2, semester: 1, careerId: 2 },
    { id: 5, key: 'EDU-305', name: 'Didáctica General', credits: 7, theoryHours: 3, practiceHours: 3, semester: 3, careerId: 2 },
    { id: 6, key: 'TI-101', name: 'Fundamentos de Programación', credits: 8, theoryHours: 3, practiceHours: 4, semester: 1, careerId: 3 },
    { id: 7, key: 'TI-203', name: 'Bases de Datos', credits: 8, theoryHours: 3, practiceHours: 4, semester: 2, careerId: 3 },
    { id: 8, key: 'FOR-401', name: 'Criminalística de Campo', credits: 9, theoryHours: 4, practiceHours: 5, semester: 4, careerId: 4 },
];

export const MOCK_TEACHERS: Teacher[] = [
    { id: 1, name: 'Dr. Alejandro Vargas', email: 'avargas@tecinter.edu', employeeId: 'DOC001' },
    { id: 2, name: 'Mtra. Isabel Torres', email: 'itorres@tecinter.edu', employeeId: 'DOC002' },
    { id: 3, name: 'Ing. Ricardo Morales', email: 'rmorales@tecinter.edu', employeeId: 'DOC003' },
    { id: 4, name: 'Dra. Laura Campos', email: 'lcampos@tecinter.edu', employeeId: 'DOC004' },
    { id: 5, name: 'Dr. Fernando Herrera', email: 'fherrera@tecinter.edu', employeeId: 'DOC005' },
];

export const MOCK_PERIODS: SchoolPeriod[] = [
    { id: 1, name: 'Enero - Junio 2024', startDate: '2024-01-15', endDate: '2024-06-28' },
    { id: 2, name: 'Agosto - Diciembre 2024', startDate: '2024-08-05', endDate: '2024-12-13' },
    { id: 3, name: 'Verano 2024', startDate: '2024-07-01', endDate: '2024-07-31' },
];

export const MOCK_GROUPS: Group[] = [
    { id: 1, subjectId: 1, teacherId: 1, periodId: 1, schedule: 'L-M-V 7:00-9:00', studentIds: [3, 8] },
    { id: 2, subjectId: 3, teacherId: 1, periodId: 1, schedule: 'M-J 11:00-13:00', studentIds: [2] },
    { id: 3, subjectId: 4, teacherId: 2, periodId: 1, schedule: 'M-J 10:00-12:00', studentIds: [4] },
    { id: 4, subjectId: 5, teacherId: 2, periodId: 1, schedule: 'L-V 8:00-10:00', studentIds: [9] },
    { id: 5, subjectId: 7, teacherId: 3, periodId: 1, schedule: 'L-M-V 9:00-11:00', studentIds: [5, 6] },
    { id: 6, subjectId: 8, teacherId: 4, periodId: 1, schedule: 'S 9:00-14:00', studentIds: [7] },
];

export const MOCK_GRADES: Grade[] = [
    { id: 1, studentId: 2, subjectId: 3, periodId: 1, partial1: 85, partial2: 90, finalExam: 88, finalGrade: 88 },
    { id: 2, studentId: 3, subjectId: 1, periodId: 1, partial1: 92, partial2: 95, finalExam: 94, finalGrade: 94 },
    { id: 3, studentId: 4, subjectId: 4, periodId: 1, partial1: 70, partial2: 75, finalExam: null, finalGrade: null },
    { id: 4, studentId: 8, subjectId: 1, periodId: 1, partial1: 88, partial2: 85, finalExam: 90, finalGrade: 88 },
    { id: 5, studentId: 9, subjectId: 5, periodId: 1, partial1: 78, partial2: 82, finalExam: 80, finalGrade: 80 },
    { id: 6, studentId: 6, subjectId: 7, periodId: 1, partial1: 95, partial2: 98, finalExam: 96, finalGrade: 96 },
    { id: 7, studentId: 7, subjectId: 8, periodId: 1, partial1: 65, partial2: 70, finalExam: 68, finalGrade: 68 },
    { id: 8, studentId: 5, subjectId: 7, periodId: 1, partial1: 100, partial2: 100, finalExam: 100, finalGrade: 100 },
];

export const MOCK_SYSTEM_USERS: SystemUser[] = [
    { id: 1, name: 'Admin User', email: 'admin@moderna.com', role: SystemRole.ADMIN, lastAccess: '2024-07-20T10:00:00Z' },
    { id: 2, name: 'Dr. Alejandro Vargas', email: 'avargas@tecinter.edu', role: SystemRole.TEACHER, lastAccess: '2024-07-19T15:30:00Z' },
    { id: 3, name: 'Coordinador Derecho', email: 'coord.derecho@tecinter.edu', role: SystemRole.COORDINATOR, lastAccess: '2024-07-20T09:00:00Z' },
    { id: 4, name: 'Mtra. Isabel Torres', email: 'itorres@tecinter.edu', role: SystemRole.TEACHER, lastAccess: '2024-07-20T11:00:00Z' },
    { id: 5, name: 'Coordinador Académico General', email: 'coord.general@tecinter.edu', role: SystemRole.COORDINATOR, lastAccess: '2024-07-18T12:00:00Z' },
];