
import React from 'react';
import { MOCK_USERS, MOCK_CAREERS, MOCK_GRADES, MOCK_SUBJECTS } from '../../constants';
import { User, StudentStatus } from '../../types';
import { PlusCircleIcon, MagnifyingGlassIcon } from '../../components/icons';

const getStatusColor = (status: StudentStatus) => {
    switch (status) {
        case StudentStatus.ACTIVE: return 'bg-green-100 text-green-800';
        case StudentStatus.GRADUATED: return 'bg-blue-100 text-blue-800';
        case StudentStatus.TEMP_LEAVE: return 'bg-yellow-100 text-yellow-800';
        case StudentStatus.PERM_LEAVE: return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

export const StudentsModule: React.FC = () => {
  const students = MOCK_USERS.filter(u => u.role === 'STUDENT');

  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">Administración de Alumnos</h2>
             <button className="flex items-center bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00] transition-colors">
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
                            <td className="px-6 py-4 text-sm text-gray-700">{student.semester}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(student.status!)}`}>
                                    {student.status}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <button className="text-blue-600 hover:underline text-sm font-medium">Editar</button>
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
    const student = MOCK_USERS[1] as User; // Mock: show Carlos Gomez's kardex
    const studentGrades = MOCK_GRADES.filter(g => g.studentId === student.id);
    const getSubjectName = (id: number) => MOCK_SUBJECTS.find(s => s.id === id)?.name || 'N/A';
    
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">Consulta de Kardex</h2>
                <div className="w-1/3">
                    <div className="relative">
                        <input type="search" placeholder="Buscar por matrícula o nombre..." className="w-full bg-white border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex justify-between items-start pb-4 border-b">
                    <div>
                        <h3 className="text-xl font-bold text-black">{student.name}</h3>
                        <p className="text-gray-600">Matrícula: {student.matricula}</p>
                        <p className="text-gray-600">Carrera: {MOCK_CAREERS.find(c => c.id === student.careerId)?.name}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold text-gray-600">Promedio General: <span className="text-black font-bold text-lg">88.0</span></p>
                         <p className="font-semibold text-gray-600">Avance: <span className="text-black font-bold text-lg">25%</span></p>
                    </div>
                </div>
                <div className="overflow-x-auto mt-4">
                     <table className="w-full whitespace-nowrap">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Materia</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Parcial 1</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Parcial 2</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Ex. Final</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Cal. Final</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                           {studentGrades.map(grade => (
                               <tr key={grade.id}>
                                   <td className="px-6 py-4 font-medium">{getSubjectName(grade.subjectId)}</td>
                                   <td className="px-6 py-4">{grade.partial1}</td>
                                   <td className="px-6 py-4">{grade.partial2}</td>
                                   <td className="px-6 py-4">{grade.finalExam}</td>
                                   <td className="px-6 py-4 font-bold text-black">{grade.finalGrade}</td>
                               </tr>
                           ))}
                        </tbody>
                     </table>
                </div>
            </div>
        </div>
    );
};
