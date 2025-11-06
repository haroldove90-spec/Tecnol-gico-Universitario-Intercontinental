import React, { useState, useMemo } from 'react';
import { MOCK_USERS, MOCK_CAREERS, MOCK_GRADES, MOCK_SUBJECTS } from '../../constants';
import { User, StudentStatus, Role } from '../../types';
import { PlusCircleIcon, MagnifyingGlassIcon, PencilIcon, PrinterIcon } from '../../components/icons';
import Modal from '../../components/Modal';

const getStatusColor = (status: StudentStatus) => {
    switch (status) {
        case StudentStatus.ACTIVE: return 'bg-green-100 text-green-800';
        case StudentStatus.GRADUATED: return 'bg-blue-100 text-blue-800';
        case StudentStatus.TEMP_LEAVE: return 'bg-yellow-100 text-yellow-800';
        case StudentStatus.PERM_LEAVE: return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const StudentForm: React.FC<{ student?: User | null; onSave: (student: User) => void; onCancel: () => void }> = ({ student, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        id: student?.id || Date.now(),
        name: student?.name || '',
        email: student?.email || '',
        matricula: student?.matricula || `TUI${new Date().getFullYear()}${(Math.floor(Math.random() * 900) + 100)}`,
        careerId: student?.careerId || 1,
        semester: student?.semester || 1,
        status: student?.status || StudentStatus.ACTIVE,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'careerId' || name === 'semester' ? parseInt(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...formData,
            role: Role.STUDENT,
            enrolledCourseIds: student?.enrolledCourseIds || []
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                <input name="name" value={formData.name} onChange={handleChange} type="text" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input name="email" value={formData.email} onChange={handleChange} type="email" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Matrícula</label>
                <input name="matricula" value={formData.matricula} onChange={handleChange} type="text" required className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm read-only:opacity-60 text-black" readOnly/>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Carrera</label>
                    <select name="careerId" value={formData.careerId} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black">
                        {MOCK_CAREERS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Semestre</label>
                    <input name="semester" value={formData.semester} onChange={handleChange} type="number" min="1" max="12" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
                </div>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Estatus</label>
                <select name="status" value={formData.status} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black">
                    {Object.values(StudentStatus).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
            <div className="flex justify-end pt-4 space-x-2">
                <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300">Cancelar</button>
                <button type="submit" className="bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00]">Guardar Alumno</button>
            </div>
        </form>
    );
};

export const StudentsModule: React.FC = () => {
  const [students, setStudents] = useState<User[]>(MOCK_USERS.filter(u => u.role === 'STUDENT'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<User | null>(null);

  const handleOpenModal = (student: User | null = null) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingStudent(null);
    setIsModalOpen(false);
  };

  const handleSaveStudent = (studentData: User) => {
    if (editingStudent) {
        setStudents(students.map(s => s.id === studentData.id ? studentData : s));
    } else {
        setStudents([studentData, ...students]);
    }
    handleCloseModal();
  };

  return (
    <div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingStudent ? "Editar Alumno" : "Dar de Alta Alumno"}>
           <StudentForm student={editingStudent} onSave={handleSaveStudent} onCancel={handleCloseModal} />
        </Modal>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">Administración de Alumnos</h2>
             <button onClick={() => handleOpenModal()} className="flex items-center bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00] transition-colors">
                <PlusCircleIcon className="w-5 h-5 mr-2" />
                Dar de Alta Alumno
            </button>
        </div>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full whitespace-nowrap">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Matrícula</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Carrera</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Semestre</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Estatus</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {students.map(student => (
                        <tr key={student.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-mono text-sm text-gray-600">{student.matricula}</td>
                            <td className="px-6 py-4 font-medium text-black">{student.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{MOCK_CAREERS.find(c => c.id === student.careerId)?.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-700 text-center">{student.semester}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(student.status!)}`}>
                                    {student.status}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <button onClick={() => handleOpenModal(student)} className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                                    <PencilIcon className="w-4 h-4 mr-1" />
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export const KardexModule: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStudentId, setSelectedStudentId] = useState<number | null>(2); // Default to Carlos Gomez

    const student = useMemo(() => MOCK_USERS.find(u => u.id === selectedStudentId), [selectedStudentId]);
    
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const foundStudent = MOCK_USERS.find(u => u.role === Role.STUDENT && (u.name.toLowerCase().includes(query) || u.matricula?.toLowerCase().includes(query)));
        if (query && foundStudent) {
            setSelectedStudentId(foundStudent.id);
        } else if (!query) {
            setSelectedStudentId(2); // Reset to default if search is cleared
        }
    };

    const studentGrades = useMemo(() => MOCK_GRADES.filter(g => g.studentId === student?.id), [student]);
    const getSubject = (id: number) => MOCK_SUBJECTS.find(s => s.id === id);
    const studentCareer = useMemo(() => MOCK_CAREERS.find(c => c.id === student?.careerId), [student]);

    const { average, progress } = useMemo(() => {
        const graded = studentGrades.filter(g => g.finalGrade !== null);
        if (graded.length === 0) return { average: 'N/A', progress: 0 };
        
        const totalPoints = graded.reduce((sum, g) => sum + g.finalGrade!, 0);
        const average = (totalPoints / graded.length).toFixed(2);
        
        const creditsEarned = graded.reduce((sum, g) => {
            const subject = getSubject(g.subjectId);
            return sum + (subject?.credits || 0);
        }, 0);
        
        const progress = studentCareer ? Math.round((creditsEarned / studentCareer.totalCredits) * 100) : 0;
        
        return { average, progress };
    }, [studentGrades, studentCareer]);
    
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">Consulta de Kardex</h2>
                <div className="w-1/3">
                    <div className="relative">
                        <input type="search" placeholder="Buscar por matrícula o nombre..." value={searchQuery} onChange={handleSearch} className="w-full bg-white border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 text-black" />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400"/>
                        </div>
                    </div>
                </div>
            </div>

            {student ? (
                <div className="bg-white p-6 rounded-2xl shadow-lg print-container">
                    <div className="flex justify-between items-start pb-4 border-b print-header">
                        <div>
                            <h3 className="text-xl font-bold text-black">{student.name}</h3>
                            <p className="text-gray-600">Matrícula: {student.matricula}</p>
                            <p className="text-gray-600">Carrera: {studentCareer?.name}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-gray-600">Promedio General: <span className="text-black font-bold text-lg">{average}</span></p>
                            <p className="font-semibold text-gray-600">Avance: <span className="text-black font-bold text-lg">{progress}%</span></p>
                        </div>
                         <button onClick={() => window.print()} className="ml-4 bg-gray-200 p-2 rounded-lg hover:bg-gray-300 no-print">
                            <PrinterIcon className="w-5 h-5 text-gray-700" />
                        </button>
                    </div>
                    <div className="overflow-x-auto mt-4">
                        <table className="w-full whitespace-nowrap">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Materia</th>
                                    <th className="px-6 py-3 text-center text-xs font-semibold text-black uppercase tracking-wider">Créditos</th>
                                    <th className="px-6 py-3 text-center text-xs font-semibold text-black uppercase tracking-wider">Cal. Final</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {studentGrades.map(grade => {
                                const subject = getSubject(grade.subjectId);
                                return (
                                <tr key={grade.id}>
                                    <td className="px-6 py-4 font-medium">{subject?.name}</td>
                                    <td className="px-6 py-4 text-center">{subject?.credits}</td>
                                    <td className={`px-6 py-4 text-center font-bold ${grade.finalGrade && grade.finalGrade < 70 ? 'text-red-600' : 'text-black'}`}>{grade.finalGrade ?? 'N/C'}</td>
                                </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="bg-white p-6 rounded-2xl shadow-lg text-center text-gray-500">
                    <p>No se encontró al alumno. Intenta con otra búsqueda.</p>
                </div>
            )}
            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .print-container, .print-container * {
                        visibility: visible;
                    }
                    .print-container {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                    .no-print {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
};