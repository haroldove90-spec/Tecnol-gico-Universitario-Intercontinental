import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_GROUPS, MOCK_TEACHERS, MOCK_USERS, MOCK_SUBJECTS, MOCK_CAREERS, MOCK_EDUCACION_SUBJECTS } from '../../constants';
import { Group } from '../../types';
import { PlusCircleIcon, DocumentTextIcon, PencilIcon, TrashIcon } from '../../components/icons';
import Modal from '../../components/Modal';

interface CurriculumSubject {
  id: string;
  numero: string;
  materia: string;
  titulo: string;
  liga: string;
}

type CurriculumSubjectWithSemester = CurriculumSubject & { semester: string };

const INITIAL_FORM_STATE = {
    semester: '1',
    numero: '',
    materia: '',
    titulo: '',
    liga: '',
};

export const CareersModule: React.FC = () => {
    const [curriculum, setCurriculum] = useState<Record<string, CurriculumSubject[]>>(() => {
        try {
            const savedData = localStorage.getItem('educacionCurriculum');
            return savedData ? JSON.parse(savedData) : {};
        } catch (error) {
            console.error("Failed to parse curriculum from localStorage", error);
            return {};
        }
    });
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingSubject, setEditingSubject] = useState<CurriculumSubjectWithSemester | null>(null);
    const [newSubjectData, setNewSubjectData] = useState(INITIAL_FORM_STATE);

    useEffect(() => {
        localStorage.setItem('educacionCurriculum', JSON.stringify(curriculum));
    }, [curriculum]);

    const handleOpenEditModal = (subject: CurriculumSubjectWithSemester) => {
        setEditingSubject(subject);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setEditingSubject(null);
    };
    
    const handleNewSubjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewSubjectData(prev => ({...prev, [name]: value}));
    };

    const handleAddSubject = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const { semester, ...subjectDetails } = newSubjectData;

        const newSubject: CurriculumSubject = {
            id: crypto.randomUUID(),
            ...subjectDetails,
        };

        setCurriculum(prev => {
            const semesterSubjects = prev[semester] ? [...prev[semester], newSubject] : [newSubject];
            return { ...prev, [semester]: semesterSubjects };
        });
        
        setNewSubjectData(INITIAL_FORM_STATE);
        setIsAddModalOpen(false);
    };

    const handleUpdateSubject = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!editingSubject) return;

        const formData = new FormData(event.currentTarget);
        const newSemester = formData.get('semester') as string;
        const originalSemester = editingSubject.semester;

        const updatedSubject: CurriculumSubject = {
            id: editingSubject.id,
            numero: formData.get('numero') as string,
            materia: formData.get('materia') as string,
            titulo: formData.get('titulo') as string,
            liga: formData.get('liga') as string,
        };
        
        setCurriculum(prev => {
            const newCurriculum = { ...prev };
            // Remove from the old semester
            const oldSemesterSubjects = (newCurriculum[originalSemester] || []).filter(s => s.id !== editingSubject.id);

            if (oldSemesterSubjects.length === 0) {
                delete newCurriculum[originalSemester];
            } else {
                newCurriculum[originalSemester] = oldSemesterSubjects;
            }
            // Add to the new semester
            const newSemesterSubjects = newCurriculum[newSemester] ? [...newCurriculum[newSemester], updatedSubject] : [updatedSubject];
            newCurriculum[newSemester] = newSemesterSubjects;
            
            return newCurriculum;
        });
        handleCloseEditModal();
    };

    const handleDeleteSubject = (subjectId: string, semester: string) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta materia?')) {
            setCurriculum(prev => {
                const newCurriculum = { ...prev };
                const semesterSubjects = (newCurriculum[semester] || []).filter(s => s.id !== subjectId);
                if (semesterSubjects.length > 0) {
                    newCurriculum[semester] = semesterSubjects;
                } else {
                    delete newCurriculum[semester];
                }
                return newCurriculum;
            });
        }
    };
    
    const allSubjects = useMemo(() => {
        // FIX: The curriculum data from localStorage might be malformed (e.g., null, or not an object, or its values are not arrays).
        // Added checks to prevent runtime errors and fix the TypeScript error "Property 'map' does not exist on type 'unknown'".
        return Object.entries(curriculum || {})
            .flatMap(([semester, subjects]) =>
                Array.isArray(subjects) ? subjects.map(subject => ({ ...subject, semester })) : []
            )
            .sort((a, b) => {
                const semesterDiff = parseInt(a.semester) - parseInt(b.semester);
                if (semesterDiff !== 0) return semesterDiff;
                return a.numero.localeCompare(b.numero);
            });
    }, [curriculum]);


    return (
        <div className="space-y-8">
            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Agregar Nueva Materia">
                <form onSubmit={handleAddSubject} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cuatrimestre</label>
                        <input name="semester" type="number" min="1" max="12" required value={newSubjectData.semester} onChange={handleNewSubjectChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Número</label>
                        <input name="numero" type="text" placeholder="E0102" required value={newSubjectData.numero} onChange={handleNewSubjectChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Materia</label>
                        <input name="materia" type="text" required value={newSubjectData.materia} onChange={handleNewSubjectChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Título</label>
                        <input name="titulo" type="text" placeholder="Módulo I" required value={newSubjectData.titulo} onChange={handleNewSubjectChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Liga</label>
                        <input name="liga" type="text" required value={newSubjectData.liga} onChange={handleNewSubjectChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
                    </div>
                    <div className="flex justify-end pt-4">
                        <button type="submit" className="bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00]">Guardar Materia</button>
                    </div>
                </form>
            </Modal>
             <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal} title="Editar Materia">
                {editingSubject && (
                    <form onSubmit={handleUpdateSubject} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Cuatrimestre</label>
                            <input name="semester" type="number" min="1" max="12" required defaultValue={editingSubject.semester} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Número</label>
                            <input name="numero" type="text" placeholder="E0102" required defaultValue={editingSubject.numero} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Materia</label>
                            <input name="materia" type="text" required defaultValue={editingSubject.materia} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Título</label>
                            <input name="titulo" type="text" placeholder="Módulo I" required defaultValue={editingSubject.titulo} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Liga</label>
                            <input name="liga" type="text" required defaultValue={editingSubject.liga} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
                        </div>
                        <div className="flex justify-end pt-4">
                            <button type="submit" className="bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00]">Guardar Cambios</button>
                        </div>
                    </form>
                )}
            </Modal>
            
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">Plan de Estudios - Licenciatura en Educación</h2>
            </div>
            
            {allSubjects.length > 0 ? (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="w-full text-sm border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border-b border-gray-300 p-3 font-semibold text-left text-black w-[10%]">CUATRIMESTRE</th>
                                <th className="border-b border-gray-300 p-3 font-semibold text-left text-black w-[15%]">NUMERO</th>
                                <th className="border-b border-gray-300 p-3 font-semibold text-left text-black w-[30%]">MATERIA</th>
                                <th className="border-b border-gray-300 p-3 font-semibold text-left text-black w-[15%]">TÍTULO</th>
                                <th className="border-b border-gray-300 p-3 font-semibold text-left text-black w-[20%]">LIGA</th>
                                <th className="border-b border-gray-300 p-3 font-semibold text-left text-black w-[10%]">ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allSubjects.map(subject => (
                            <tr key={subject.id} className="hover:bg-gray-50">
                                <td className="border-b border-gray-200 p-3 text-center font-medium">{subject.semester}</td>
                                <td className="border-b border-gray-200 p-3">{subject.numero}</td>
                                <td className="border-b border-gray-200 p-3">{subject.materia}</td>
                                <td className="border-b border-gray-200 p-3">{subject.titulo}</td>
                                <td className="border-b border-gray-200 p-3">
                                    <div className="flex items-center">
                                        <DocumentTextIcon className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                                        <span className="truncate text-gray-700">{subject.liga}</span>
                                    </div>
                                </td>
                                <td className="border-b border-gray-200 p-3">
                                    <div className="flex items-center space-x-2">
                                        <button onClick={() => handleOpenEditModal(subject)} className="text-gray-500 hover:text-blue-600 p-1" aria-label="Editar materia">
                                            <PencilIcon className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDeleteSubject(subject.id, subject.semester)} className="text-gray-500 hover:text-red-600 p-1" aria-label="Eliminar materia">
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-16 bg-white rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-black">No hay materias en el plan de estudios.</h3>
                    <p className="text-gray-600 mt-2">Usa el botón "Agregar Materia" para empezar a construir el currículum.</p>
                </div>
            )}
        </div>
    );
};

export const GroupsModule: React.FC = () => {
    const [groups, setGroups] = useState<Group[]>(MOCK_GROUPS);
    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
    const [isStudentListModalOpen, setIsStudentListModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

    const getSubjectName = (id: number) => MOCK_SUBJECTS.find(s => s.id === id)?.name || 'N/A';
    const getTeacherName = (id: number) => MOCK_TEACHERS.find(t => t.id === id)?.name || 'N/A';
    
    const handleAddGroup = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newGroup: Group = {
            id: Date.now(),
            subjectId: parseInt(formData.get('subjectId') as string),
            teacherId: parseInt(formData.get('teacherId') as string),
            periodId: 1, // Mock period
            schedule: formData.get('schedule') as string,
            studentIds: [],
        };
        setGroups(prev => [newGroup, ...prev]);
        setIsGroupModalOpen(false);
    };

    const handleViewStudents = (group: Group) => {
        setSelectedGroup(group);
        setIsStudentListModalOpen(true);
    };

    const studentsInGroup = selectedGroup ? MOCK_USERS.filter(u => selectedGroup.studentIds.includes(u.id)) : [];

    return (
        <div>
            <Modal isOpen={isGroupModalOpen} onClose={() => setIsGroupModalOpen(false)} title="Crear Nuevo Grupo">
                <form onSubmit={handleAddGroup} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Materia</label>
                        <select name="subjectId" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black">
                            {MOCK_SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Docente</label>
                        <select name="teacherId" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black">
                            {MOCK_TEACHERS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Horario</label>
                        <input name="schedule" type="text" placeholder="Ej: L-M-V 7:00-9:00" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
                    </div>
                    <div className="flex justify-end pt-4">
                        <button type="submit" className="bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00]">Crear Grupo</button>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={isStudentListModalOpen} onClose={() => setIsStudentListModalOpen(false)} title={`Alumnos en ${getSubjectName(selectedGroup?.subjectId || 0)}`}>
                 {studentsInGroup.length > 0 ? (
                    <ul className="space-y-2">
                        {studentsInGroup.map(student => (
                            <li key={student.id} className="p-2 bg-gray-100 rounded-md">{student.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center">No hay alumnos inscritos en este grupo.</p>
                )}
            </Modal>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">Gestión de Grupos</h2>
                <button onClick={() => setIsGroupModalOpen(true)} className="flex items-center bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00] transition-colors">
                    <PlusCircleIcon className="w-5 h-5 mr-2" />
                    Crear Grupo
                </button>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map(group => (
                    <div key={group.id} className="bg-white rounded-lg shadow-md p-5 flex flex-col">
                        <h3 className="text-lg font-bold text-black mb-2">{getSubjectName(group.subjectId)}</h3>
                        <p className="text-sm text-gray-600">Docente: {getTeacherName(group.teacherId)}</p>
                        <p className="text-sm text-gray-600">Horario: {group.schedule}</p>
                        <p className="text-sm text-gray-600 mt-2 font-semibold">{group.studentIds.length} Alumnos Inscritos</p>
                        <div className="mt-4 flex-grow flex items-end">
                             <button onClick={() => handleViewStudents(group)} className="w-full bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors text-sm">
                                Ver Lista de Alumnos
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};