
import React from 'react';
import { MOCK_CAREERS, MOCK_SUBJECTS, MOCK_GROUPS, MOCK_TEACHERS, MOCK_USERS } from '../../constants';
import { PlusCircleIcon } from '../../components/icons';

export const CareersModule: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">Catálogo de Carreras</h2>
            <button className="flex items-center bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00] transition-colors">
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
                    {MOCK_CAREERS.map(career => (
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
            <button className="flex items-center bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00] transition-colors">
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
                    {MOCK_SUBJECTS.map(subject => (
                        <tr key={subject.id}>
                            <td className="px-6 py-4 text-sm font-mono text-gray-700">{subject.key}</td>
                            <td className="px-6 py-4 font-medium text-black">{subject.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{subject.credits}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{subject.semester}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{MOCK_CAREERS.find(c => c.id === subject.careerId)?.name}</td>
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
    const getSubjectName = (id: number) => MOCK_SUBJECTS.find(s => s.id === id)?.name || 'N/A';
    const getTeacherName = (id: number) => MOCK_TEACHERS.find(t => t.id === id)?.name || 'N/A';

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">Gestión de Grupos</h2>
                <button className="flex items-center bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00] transition-colors">
                    <PlusCircleIcon className="w-5 h-5 mr-2" />
                    Crear Grupo
                </button>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_GROUPS.map(group => (
                    <div key={group.id} className="bg-white rounded-lg shadow-md p-5 flex flex-col">
                        <h3 className="text-lg font-bold text-black mb-2">{getSubjectName(group.subjectId)}</h3>
                        <p className="text-sm text-gray-600">Docente: {getTeacherName(group.teacherId)}</p>
                        <p className="text-sm text-gray-600">Horario: {group.schedule}</p>
                        <p className="text-sm text-gray-600 mt-2 font-semibold">{group.studentIds.length} Alumnos Inscritos</p>
                        <div className="mt-4 flex-grow flex items-end">
                             <button className="w-full bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors text-sm">
                                Ver Lista de Alumnos
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
