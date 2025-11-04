
import React, { useState, useMemo } from 'react';
import { MOCK_USERS, MOCK_COURSES } from '../../constants';
import { Role, StudentWithCourses } from '../../types';

const StudentsList: React.FC = () => {
  const [students] = useState<StudentWithCourses[]>(() => {
    const studentUsers = MOCK_USERS.filter(u => u.role === Role.STUDENT);
    return studentUsers.map(student => ({
      ...student,
      enrolledCourses: MOCK_COURSES.filter(c => student.enrolledCourseIds.includes(c.id))
    }));
  });

  return (
    <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Lista de Estudiantes</h2>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full whitespace-nowrap">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Cursos Inscritos</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {students.map(student => (
                        <tr key={student.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <img className="w-10 h-10 rounded-full mr-4" src={`https://i.pravatar.cc/150?u=${student.id}`} alt={student.name}/>
                                    <span className="font-medium text-black">{student.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">{student.email}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                                {student.enrolledCourses.length > 0 ? student.enrolledCourses.map(c => c.title).join(', ') : 'Ninguno'}
                            </td>
                            <td className="px-6 py-4">
                                <button className="text-blue-600 hover:underline text-sm font-medium">Ver Detalles</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default StudentsList;
