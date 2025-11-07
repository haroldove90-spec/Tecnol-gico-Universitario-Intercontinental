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
    1: { // Licenciatura en Derecho
        1: [
            { key: 'D0101', name: 'Derecho y Filosofía', moduleTitle: 'Módulo I', fileLink: 'Derecho y Filosofía.pdf' },
            { key: 'D0102', name: 'Argumentación jurídica', moduleTitle: 'Módulo I', fileLink: 'Argumentación jurídica.pdf' },
            { key: 'D0103', name: 'El Derecho Mexicano: Orígenes', moduleTitle: 'Módulo I', fileLink: 'El Derecho Mexicano - Orígenes.pdf' },
            { key: 'D0104', name: 'Derecho Romano I', moduleTitle: 'Módulo I', fileLink: 'Derecho Romano I.pdf' },
        ],
        2: [
            { key: 'D0201', name: 'Derecho Constitucional I', moduleTitle: 'Módulo II', fileLink: 'Derecho Constitucional I.pdf' },
            { key: 'D0202', name: 'Metodología Jurídica', moduleTitle: 'Módulo II', fileLink: 'Metodología Jurídica.pdf' },
            { key: 'D0203', name: 'Bienes y derechos reales', moduleTitle: 'Módulo II', fileLink: 'Bienes y derechos reales.pdf' },
            { key: 'D0204', name: 'Derecho Romano II', moduleTitle: 'Módulo II', fileLink: 'Derecho Romano II.pdf' },
        ],
        3: [
            { key: 'D0301', name: 'Derecho Constitucional II', moduleTitle: 'Módulo III', fileLink: 'Derecho Constitucional II.pdf' },
            { key: 'D0302', name: 'Sistemas Jurídicos contemporáneos', moduleTitle: 'Módulo III', fileLink: 'Sistemas Jurídicos contemporáneos.pdf' },
            { key: 'D0303', name: 'Teoría general del Estado', moduleTitle: 'Módulo III', fileLink: 'Teoría general del Estado.pdf' },
            { key: 'D0304', name: 'Acto jurídico y personas', moduleTitle: 'Módulo III', fileLink: 'Acto jurídico y personas.pdf' },
        ],
        4: [
            { key: 'D0401', name: 'Derechos Humanos', moduleTitle: 'Módulo IV', fileLink: 'Derechos Humanos.pdf' },
            { key: 'D0402', name: 'Teoría penal y del delito', moduleTitle: 'Módulo IV', fileLink: 'Teoría penal y del delito.pdf' },
            { key: 'D0403', name: 'Teoría del Proceso', moduleTitle: 'Módulo IV', fileLink: 'Teoría del Proceso.pdf' },
            { key: 'D0404', name: 'Derecho administrativo I', moduleTitle: 'Módulo IV', fileLink: 'Derecho administrativo I.pdf' },
        ],
        5: [
            { key: 'D0501', name: 'Derecho Fiscal', moduleTitle: 'Módulo V', fileLink: 'Derecho Fiscal.pdf' },
            { key: 'D0502', name: 'Derecho procesal civil', moduleTitle: 'Módulo V', fileLink: 'Derecho procesal civil.pdf' },
            { key: 'D0503', name: 'Derecho internacional privado', moduleTitle: 'Módulo V', fileLink: 'Derecho internacional privado.pdf' },
            { key: 'D0504', name: 'Derecho Administrativo II', moduleTitle: 'Módulo V', fileLink: 'Derecho Administrativo II.pdf' },
        ],
        6: [
            { key: 'D0601', name: 'Derecho ambiental', moduleTitle: 'Módulo VI', fileLink: 'Derecho ambiental.pdf' },
            { key: 'D0602', name: 'Derecho de la Familia', moduleTitle: 'Módulo VI', fileLink: 'Derecho de la Familia.pdf' },
            { key: 'D0603', name: 'Juicio de Amparo', moduleTitle: 'Módulo VI', fileLink: 'Juicio de Amparo.pdf' },
            { key: 'D0604', name: 'Derecho civil: Contratos', moduleTitle: 'Módulo VI', fileLink: 'Derecho civil - Contratos.pdf' },
        ],
        7: [
            { key: 'D0701', name: 'Derecho Mercantil', moduleTitle: 'Módulo VII', fileLink: 'Derecho Mercantil.pdf' },
            { key: 'D0702', name: 'Régimen Jurídico de Comercio Exterior', moduleTitle: 'Módulo VII', fileLink: 'Régimen Jurídico de Comercio Exterior.pdf' },
            { key: 'D0703', name: 'Derecho Procesal Fiscal', moduleTitle: 'Módulo VII', fileLink: 'Derecho Procesal Fiscal.pdf' },
            { key: 'D0704', name: 'Derecho Internacional Público', moduleTitle: 'Módulo VII', fileLink: 'Derecho Internacional Público.pdf' },
        ],
        8: [
            { key: 'D0801', name: 'Ética del Jurista', moduleTitle: 'Módulo VIII', fileLink: 'Ética del Jurista.pdf' },
            { key: 'D0802', name: 'Juicio Oral', moduleTitle: 'Módulo VIII', fileLink: 'Juicio Oral.pdf' },
            { key: 'D0803', name: 'Derecho procesal: Laboral', moduleTitle: 'Módulo VIII', fileLink: 'Derecho procesal - Laboral.pdf' },
            { key: 'D0804', name: 'Derecho y seguridad social', moduleTitle: 'Módulo VIII', fileLink: 'Derecho y seguridad social.pdf' },
        ],
        9: [
            { key: 'D0901', name: 'Taller de titulación', moduleTitle: 'Módulo IX', fileLink: 'Taller de titulación.pdf' },
            { key: 'D0902', name: 'Derecho Procesal sucesorio', moduleTitle: 'Módulo IX', fileLink: 'Derecho Procesal sucesorio.pdf' },
            { key: 'D0903', name: 'Derecho procesal familiar', moduleTitle: 'Módulo IX', fileLink: 'Derecho procesal familiar.pdf' },
            { key: 'D0904', name: 'Derecho procesal penal', moduleTitle: 'Módulo IX', fileLink: 'Derecho procesal penal.pdf' },
        ],
    },
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
            { key: 'E0203', name: 'Estrategias de trabajo con grupos', moduleTitle: 'Módulo II', fileLink: 'Estrategias de trabajo con grupos.pdf' },
        ],
    },
    3: { // Licenciatura en Tecnologías de la Información
        1: [
            { key: 'LTIND101', name: 'Matemáticas para Negocios', moduleTitle: 'Primer Cuatrimestre', fileLink: 'MATEMÁTICAS PARA NEGOCIOS.pdf' },
            { key: 'LTIND102', name: 'Fudamentos de Contabilidad', moduleTitle: 'Primer Cuatrimestre', fileLink: 'FUNDAMENTOS DE CONTABILIDAD.pdf' },
            { key: 'LTIND103', name: 'Introducción a las Tecnologías de Información', moduleTitle: 'Primer Cuatrimestre', fileLink: 'INTRODUCCIÓN A LAS TECNOLOGÍAS DE INFORMACIÓN.pdf' },
            { key: 'LTIND104', name: 'Fundamentos de Programación', moduleTitle: 'Primer Cuatrimestre', fileLink: 'FUNDAMENTOS DE PROGRAMACIÓN.pdf' },
            { key: 'LTIND105', name: 'Introducción a la Empresa', moduleTitle: 'Primer Cuatrimestre', fileLink: 'INTRODUCCIÓN A LA EMPRESA.pdf' },
        ],
        2: [
            { key: 'LTIND201', name: 'Contabilidad Intermedia', moduleTitle: 'Segundo Cuatrimestre', fileLink: 'CONTABILIDAD INTERMEDIA.pdf' },
            { key: 'LTIND202', name: 'Matemáticas para Computación', moduleTitle: 'Segundo Cuatrimestre', fileLink: 'MATEMÁTICAS PARA COMPUTACIÓN.pdf' },
            { key: 'LTIND203', name: 'Emprendimiento e Innovación', moduleTitle: 'Segundo Cuatrimestre', fileLink: 'EMPRENDIMIENTO E INNOVACIÓN.pdf' },
            { key: 'LTIND204', name: 'Estructura de Datos y Algoritmos', moduleTitle: 'Segundo Cuatrimestre', fileLink: 'ESTRUCTURA DE DATOS Y ALGORITMOS.pdf' },
            { key: 'LTIND205', name: 'Redes de Computadoras', moduleTitle: 'Segundo Cuatrimestre', fileLink: 'REDES DE COMPUTADORAS.pdf' },
        ],
        3: [
            { key: 'LTIND301', name: 'Álgebra y Cálculo', moduleTitle: 'Tercer Cuatrimestre', fileLink: 'ALGEBRA Y CALCULO.pdf' },
            { key: 'LTIND302', name: 'Circuitos Eléctricos', moduleTitle: 'Tercer Cuatrimestre', fileLink: 'CIRCUITOS ELÉCTRICOS.pdf' },
            { key: 'LTIND303', name: 'Sistemas Operativos', moduleTitle: 'Tercer Cuatrimestre', fileLink: 'SISTEMAS OPERATIVOS.pdf' },
            { key: 'LTIND304', name: 'Base de Datos', moduleTitle: 'Tercer Cuatrimestre', fileLink: 'BASE DE DATOS.pdf' },
            { key: 'LTIND305', name: 'Métodos Númericos', moduleTitle: 'Tercer Cuatrimestre', fileLink: 'MÉTODOS NUMÉRICOS.pdf' },
        ],
        4: [
            { key: 'LTIND401', name: 'Ingeniería de Software', moduleTitle: 'Cuarto Cuatrimestre', fileLink: 'INGENIERÍA DE SOFTWARE I.pdf' },
            { key: 'LTIND402', name: 'Arquitectura de Computadoras', moduleTitle: 'Cuarto Cuatrimestre', fileLink: 'ARQUITECTURA DE COMPUTADORAS.pdf' },
            { key: 'LTIND403', name: 'Derecho y Empresa', moduleTitle: 'Cuarto Cuatrimestre', fileLink: 'DERECHO Y EMPRESA.pdf' },
            { key: 'LTIND404', name: 'Contabilidad General', moduleTitle: 'Cuarto Cuatrimestre', fileLink: 'CONTABILIDAD GENERAL.pdf' },
            { key: 'LTIND405', name: 'Electrónica Digital', moduleTitle: 'Cuarto Cuatrimestre', fileLink: 'ELECTRÓNICA DIGITAL.pdf' },
        ],
        5: [
            { key: 'LTIND501', name: 'Ingeniería de Software II', moduleTitle: 'Quinto Cuatrimestre', fileLink: 'INGENIERÍA DE SOFTWARE II.pdf' },
            { key: 'LTIND502', name: 'Programación para Internet', moduleTitle: 'Quinto Cuatrimestre', fileLink: 'PROGRAMACIÓN PARA INTERNET.pdf' },
            { key: 'LTIND503', name: 'Legislación Informática', moduleTitle: 'Quinto Cuatrimestre', fileLink: 'LEGISLACIÓN INFORMÁTICA.pdf' },
            { key: 'LTIND504', name: 'Redes Avanzadas', moduleTitle: 'Quinto Cuatrimestre', fileLink: 'REDES AVANZADAS.pdf' },
            { key: 'LTIND505', name: 'Calidad de Software', moduleTitle: 'Quinto Cuatrimestre', fileLink: 'CALIDAD DE SOFTWARE.pdf' },
        ],
        6: [
            { key: 'LTIND601', name: 'Implementación de Sistemas Integrados', moduleTitle: 'Sexto Cuatrimestre', fileLink: 'IMPLEMENTACIÓN DE SISTEMAS INTEGRADOS.pdf' },
            { key: 'LTIND602', name: 'Infraestructura y Cómputo en la Nube', moduleTitle: 'Sexto Cuatrimestre', fileLink: 'INFRAESTRUCTURA Y CÓMPUTO EN LA NUBE.pdf' },
            { key: 'LTIND603', name: 'Derecho Laboral', moduleTitle: 'Sexto Cuatrimestre', fileLink: 'DERECHO LABORAL.pdf' },
            { key: 'LTIND604', name: 'Procesamiento Inteligente de Datos', moduleTitle: 'Sexto Cuatrimestre', fileLink: 'PROCESAMIENTO INTELIGENTE DE DATOS.pdf' },
            { key: 'LTIND605', name: 'Informática Aplicada I', moduleTitle: 'Sexto Cuatrimestre', fileLink: 'INFORMÁTICA APLICADA I.pdf' },
        ],
        7: [
            { key: 'LTIND701', name: 'Seguridad Informática y Análisis Forense', moduleTitle: 'Séptimo Cuatrimestre', fileLink: 'SEGURIDAD INFORMÁTICA Y ANÁLISIS FORENSE.pdf' },
            { key: 'LTIND702', name: 'Planeación Estratégica', moduleTitle: 'Séptimo Cuatrimestre', fileLink: 'PLANEACIÓN ESTRATÉGICA.pdf' },
            { key: 'LTIND703', name: 'Derechos Fiscal para la Empresa', moduleTitle: 'Séptimo Cuatrimestre', fileLink: 'DERECHOS FISCAL PARA LA EMPRESA.pdf' },
            { key: 'LTIND704', name: 'Administración Financiera', moduleTitle: 'Séptimo Cuatrimestre', fileLink: 'ADMINISTRACIÓN FINANCIERA.pdf' },
            { key: 'LTIND705', name: 'Informática Aplicada II', moduleTitle: 'Séptimo Cuatrimestre', fileLink: 'INFORMÁTICA APLICADA II.pdf' },
        ],
        8: [
            { key: 'LTIND801', name: 'Consultoría Empresarial', moduleTitle: 'Octavo Cuatrimestre', fileLink: 'CONSULTORÍA EMPRESARIAL.pdf' },
            { key: 'LTIND802', name: 'Programación de Dispositivos Móviles', moduleTitle: 'Octavo Cuatrimestre', fileLink: 'PROGRAMACIÓN DE DISPOSITIVOS MÓVILES.pdf' },
            { key: 'LTIND803', name: 'Auditoría', moduleTitle: 'Octavo Cuatrimestre', fileLink: 'AUDITORIA.pdf' },
            { key: 'LTIND804', name: 'Realidad Virtual y Aumentada', moduleTitle: 'Octavo Cuatrimestre', fileLink: 'REALIDAD VIRTUAL Y AUMENTADA.pdf' },
            { key: 'LTIND805', name: 'Estadística', moduleTitle: 'Octavo Cuatrimestre', fileLink: 'ESTADÍSTICA.pdf' },
        ],
        9: [
            { key: 'LTIND901', name: 'Planeación Financiera', moduleTitle: 'Noveno Cuatrimestre', fileLink: 'PLANEACIÓN FINANCIERA.pdf' },
            { key: 'LTIND902', name: 'Gestión de Proyectos de TI', moduleTitle: 'Noveno Cuatrimestre', fileLink: 'GESTIÓN DE PROYECTOS DE TI.pdf' },
            { key: 'LTIND903', name: 'Comercio Electrónico', moduleTitle: 'Noveno Cuatrimestre', fileLink: 'COMERCIO ELECTRÓNICO.pdf' },
            { key: 'LTIND904', name: 'Ciberseguridad', moduleTitle: 'Noveno Cuatrimestre', fileLink: 'CIBERSEGURIDAD.pdf' },
            { key: 'LTIND905', name: 'Liderazgo y Negociación', moduleTitle: 'Noveno Cuatrimestre', fileLink: 'LIDERAZGO Y NEGOCIACIÓN.pdf' },
        ],
    },
};

export const MOCK_CAREERS: Career[] = [
    { id: 1, name: 'Licenciatura en Derecho', planCode: 'LD-2024', totalCredits: 360 },
    { id: 2, name: 'Licenciatura en Educación', planCode: 'LE-2024', totalCredits: 350 },
    { id: 3, name: 'Licenciatura en Tecnologías de la Información', planCode: 'LTI-2024', totalCredits: 380 },
    { id: 4, name: 'Licenciatura en Ciencias Forenses', planCode: 'LCF-2024', totalCredits: 370 },
];

export const MOCK_SUBJECTS: Subject[] = [
    { id: 1, key: 'D0101', name: 'Derecho y Filosofía', credits: 8, theoryHours: 4, practiceHours: 2, semester: 1, careerId: 1 },
    { id: 2, key: 'D0301', name: 'Derecho Constitucional II', credits: 8, theoryHours: 4, practiceHours: 2, semester: 3, careerId: 1 },
    { id: 3, key: 'E0102', name: 'Psicología del desarrollo', credits: 7, theoryHours: 3, practiceHours: 2, semester: 1, careerId: 2 },
    { id: 4, key: 'LTI304', name: 'Base de Datos', credits: 9, theoryHours: 4, practiceHours: 3, semester: 3, careerId: 3 },
];

export const MOCK_TEACHERS: Teacher[] = [
    { id: 1, name: 'Dr. Alejandro Vargas', email: 'avargas@universidad.edu', employeeId: 'EMP001' },
    { id: 2, name: 'Mtra. Isabel Torres', email: 'itorres@universidad.edu', employeeId: 'EMP002' },
    { id: 3, name: 'Ing. Ricardo Morales', email: 'rmorales@universidad.edu', employeeId: 'EMP003' },
    { id: 4, name: 'Dra. Laura Campos', email: 'lcampos@universidad.edu', employeeId: 'EMP004' },
];

export const MOCK_GROUPS: Group[] = [
    { id: 1, subjectId: 1, teacherId: 1, periodId: 1, schedule: 'L-M-V 7:00-9:00', studentIds: [2, 3, 8] },
    { id: 2, subjectId: 2, teacherId: 1, periodId: 1, schedule: 'M-J 10:00-12:00', studentIds: [2] },
    { id: 3, subjectId: 4, teacherId: 3, periodId: 1, schedule: 'L-M 18:00-20:00', studentIds: [5, 6] },
];

export const MOCK_GRADES: Grade[] = [
    { id: 1, studentId: 2, subjectId: 1, periodId: 1, partial1: 80, partial2: 90, finalExam: 85, finalGrade: 85 },
    { id: 2, studentId: 2, subjectId: 2, periodId: 1, partial1: 70, partial2: 75, finalExam: 80, finalGrade: 75 },
    { id: 3, studentId: 3, subjectId: 1, periodId: 1, partial1: 90, partial2: 95, finalExam: 92, finalGrade: 92 },
    { id: 4, studentId: 5, subjectId: 4, periodId: 1, partial1: 88, partial2: 92, finalExam: 90, finalGrade: 90 },
    { id: 5, studentId: 6, subjectId: 4, periodId: 1, partial1: 75, partial2: 80, finalExam: 78, finalGrade: 78 },
];

export const MOCK_PERIODS: SchoolPeriod[] = [
    { id: 1, name: 'Cuatrimestre SEP24-DIC24', startDate: '2024-09-02', endDate: '2024-12-13' },
    { id: 2, name: 'Cuatrimestre MAY24-AGO24', startDate: '2024-05-06', endDate: '2024-08-16' },
];

export const MOCK_SYSTEM_USERS: SystemUser[] = [
    { id: 1, name: 'Admin General', email: 'admin@tecinter.mx', role: SystemRole.ADMIN, lastAccess: '2024-07-29T10:00:00Z' },
    { id: 2, name: 'Coordinador Académico', email: 'coordinador@tecinter.mx', role: SystemRole.COORDINATOR, lastAccess: '2024-07-29T09:30:00Z' },
    { id: 3, name: 'Profesor de Ejemplo', email: 'profesor@tecinter.mx', role: SystemRole.TEACHER, lastAccess: '2024-07-28T15:00:00Z' },
];
