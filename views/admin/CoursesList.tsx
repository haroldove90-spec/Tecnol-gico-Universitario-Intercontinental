import React, { useState } from 'react';
import { MOCK_CAREERS, MOCK_SUBJECTS, MOCK_GROUPS, MOCK_TEACHERS, MOCK_USERS } from '../../constants';
import { Career, Subject, Group } from '../../types';
import { PlusCircleIcon } from '../../components/icons';
import Modal from '../../components/Modal';

export const CareersModule: React.FC = () => {
  const [careers, setCareers] = useState<Career[]>(MOCK_CAREERS);
  const [subjects, setSubjects] = useState<Subject[]>(MOCK_SUBJECTS);
  const [isCareerModalOpen, setIsCareerModalOpen] = useState(false);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);

  const handleAddCareer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newCareer: Career = {
      id: Date.now(),
      name: formData.get('name') as string,
      planCode: formData.get('planCode') as string,
      totalCredits: parseInt(formData.get('totalCredits') as string, 10),
    };
    setCareers(prev => [newCareer, ...prev]);
    setIsCareerModalOpen(false);
  };
  
  const handleAddSubject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newSubject: Subject = {
        id: Date.now(),
        key: formData.get('key') as string,
        name: formData.get('name') as string,
        credits: parseInt(formData.get('credits') as string),
        theoryHours: parseInt(formData.get('theoryHours') as string),
        practiceHours: parseInt(formData.get('practiceHours') as string),
        semester: parseInt(formData.get('semester') as string),
        careerId: parseInt(formData.get('careerId') as string),
    };
    setSubjects(prev => [newSubject, ...prev]);
    setIsSubjectModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <Modal isOpen={isCareerModalOpen} onClose={() => setIsCareerModalOpen(false)} title="Agregar Nueva Carrera">
        <form onSubmit={handleAddCareer} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Nombre de la Carrera</label>
                <input name="name" type="text" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Clave del Plan</label>
                <input name="planCode" type="text" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Créditos Totales</label>
                <input name="totalCredits" type="number" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"/>
            </div>
            <div className="flex justify-end pt-4">
                <button type="submit" className="bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00]">Guardar Carrera</button>
            </div>
        </form>
      </Modal>
      
      <Modal isOpen={isSubjectModalOpen} onClose={() => setIsSubjectModalOpen(false)} title="Agregar Nueva Materia">
        <form onSubmit={handleAddSubject} className="space-y-4">
             <div>
                <label className="block text-sm font-medium text-gray-700">Clave</label>
                <input name="key" type="text" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"/>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input name="name" type="text" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"/>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Créditos</label>
                    <input name="credits" type="number" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Semestre</label>
                    <input name="semester" type="number" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"/>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Horas Teoría</label>
                    <input name="theoryHours" type="number" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"/>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Horas Práctica</label>
                    <input name="practiceHours" type="number" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"/>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Carrera</label>
                <select name="careerId" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                    {careers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>
             <div className="flex justify-end pt-4">
                <button type="submit" className="bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00]">Guardar Materia</button>
            </div>
        </form>
      </Modal>
      
      <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">Catálogo de Carreras</h2>
            <button onClick={() => setIsCareerModalOpen(true)} className="flex items-center bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00] transition-colors">
                <PlusCircleIcon className="w-5 h-5 mr-2" />
                Nueva Carrera
            </button>
        </div>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full whitespace-nowrap">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Nombre de la Carrera</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Clave del Plan</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {careers.map(career => (
                        <tr key={career.id}>
                            <td className="px-6 py-4 font-medium text-black">{career.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{career.planCode}</td>
                            <td className="px-6 py-4"><button className="text-blue-600 hover:underline text-sm font-medium">Ver Plan de Estudios</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">Catálogo de Materias</h2>
            <button onClick={() => setIsSubjectModalOpen(true)} className="flex items-center bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00] transition-colors">
                <PlusCircleIcon className="w-5 h-5 mr-2" />
                Nueva Materia
            </button>
        </div>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full whitespace-nowrap">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Clave</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Créditos</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Semestre</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Carrera</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {subjects.map(subject => (
                        <tr key={subject.id}>
                            <td className="px-6 py-4 text-sm font-mono text-gray-700">{subject.key}</td>
                            <td className="px-6 py-4 font-medium text-black">{subject.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{subject.credits}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{subject.semester}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{careers.find(c => c.id === subject.careerId)?.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
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
                        <select name="subjectId" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                            {MOCK_SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Docente</label>
                        <select name="teacherId" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                            {MOCK_TEACHERS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Horario</label>
                        <input name="schedule" type="text" placeholder="Ej: L-M-V 7:00-9:00" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"/>
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
