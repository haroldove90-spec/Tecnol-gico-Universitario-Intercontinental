
import React, { useState } from 'react';
import { MOCK_GROUPS, MOCK_TEACHERS, MOCK_USERS, MOCK_SUBJECTS } from '../../constants';
import { Group } from '../../types';
import { PlusCircleIcon } from '../../components/icons';
import Modal from '../../components/Modal';

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
