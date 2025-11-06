import React, { useState, useEffect } from 'react';
import { MOCK_GROUPS, MOCK_TEACHERS, MOCK_USERS, MOCK_SUBJECTS, MOCK_CAREERS, MOCK_EDUCACION_SUBJECTS } from '../../constants';
import { Group } from '../../types';
import { PlusCircleIcon, DocumentTextIcon } from '../../components/icons';
import Modal from '../../components/Modal';

interface CurriculumSubject {
  id: string;
  numero: string;
  materia: string;
  titulo: string;
  liga: string;
}

const semesterHeadings: { [key: string]: string } = {
    '1': 'PRIMER CUATRIMESTRE', '2': 'SEGUNDO CUATRIMESTRE', '3': 'TERCER CUATRIMESTRE',
    '4': 'CUARTO CUATRIMESTRE', '5': 'QUINTO CUATRIMESTRE', '6': 'SEXTO CUATRIMESTRE',
    '7': 'SEPTIMO CUATRIMESTRE', '8': 'OCTAVO CUATRIMESTRE', '9': 'NOVENO CUATRIMESTRE',
    '10': 'DÉCIMO CUATRIMESTRE', '11': 'ONCEAVO CUATRIMESTRE', '12': 'DOCEAVO CUATRIMESTRE'
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

    useEffect(() => {
        localStorage.setItem('educacionCurriculum', JSON.stringify(curriculum));
    }, [curriculum]);

    const handleAddSubject = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const semester = formData.get('semester') as string;
        const numero = formData.get('numero') as string;

        const newSubject: CurriculumSubject = {
            id: Date.now().toString(), // Ensure unique ID to prevent React key conflicts
            numero,
            materia: formData.get('materia') as string,
            titulo: formData.get('titulo') as string,
            liga: formData.get('liga') as string,
        };

        setCurriculum(prev => {
            const newCurriculum = { ...prev };
            const semesterSubjects = newCurriculum[semester] ? [...newCurriculum[semester]] : [];
            semesterSubjects.push(newSubject);
            newCurriculum[semester] = semesterSubjects;
            return newCurriculum;
        });
        setIsAddModalOpen(false);
    };
    
    const sortedSemesters = Object.keys(curriculum).sort((a, b) => parseInt(a) - parseInt(b));

    return (
        <div className="space-y-8">
            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Agregar Nueva Materia">
                <form onSubmit={handleAddSubject} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cuatrimestre</label>
                        <input name="semester" type="number" min="1" max="12" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Número</label>
                        <input name="numero" type="text" placeholder="E0102" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Materia</label>
                        <input name="materia" type="text" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Título</label>
                        <input name="titulo" type="text" placeholder="Módulo I" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Liga</label>
                        <input name="liga" type="text" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
                    </div>
                    <div className="flex justify-end pt-4">
                        <button type="submit" className="bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00]">Guardar Materia</button>
                    </div>
                </form>
            </Modal>
            
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">Plan de Estudios - Licenciatura en Educación</h2>
                <button onClick={() => setIsAddModalOpen(true)} className="flex items-center bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00] transition-colors">
                    <PlusCircleIcon className="w-5 h-5 mr-2" />
                    Agregar Materia
                </button>
            </div>
            
            <div className="space-y-6">
                {sortedSemesters.length > 0 ? sortedSemesters.map(semester => (
                    <div key={semester}>
                        <h3 className="text-md font-bold text-white bg-gray-600 p-2 text-center">{semesterHeadings[semester] || `CUATRIMESTRE ${semester}`}</h3>
                        <div className="overflow-x-auto bg-white rounded-b-lg shadow">
                            <table className="w-full text-sm border-collapse">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border-b border-gray-300 p-3 font-semibold text-left text-black w-1/6">NUMERO</th>
                                        <th className="border-b border-gray-300 p-3 font-semibold text-left text-black w-2/6">MATERIA</th>
                                        <th className="border-b border-gray-300 p-3 font-semibold text-left text-black w-1/6">TÍTULO</th>
                                        <th className="border-b border-gray-300 p-3 font-semibold text-left text-black w-2/6">LIGA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {curriculum[semester].map(subject => (
                                    <tr key={subject.id} className="hover:bg-gray-50">
                                        <td className="border-b border-gray-200 p-3">{subject.numero}</td>
                                        <td className="border-b border-gray-200 p-3">{subject.materia}</td>
                                        <td className="border-b border-gray-200 p-3">{subject.titulo}</td>
                                        <td className="border-b border-gray-200 p-3">
                                            <div className="flex items-center">
                                                <DocumentTextIcon className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                                                <span className="truncate text-gray-700">{subject.liga}</span>
                                            </div>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )) : (
                     <div className="text-center py-16 bg-white rounded-lg shadow">
                        <h3 className="text-xl font-semibold text-black">No hay materias en el plan de estudios.</h3>
                        <p className="text-gray-600 mt-2">Usa el botón "Agregar Materia" para empezar a construir el currículum.</p>
                    </div>
                )}
            </div>
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