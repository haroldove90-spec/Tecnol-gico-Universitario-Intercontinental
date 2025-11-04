
import React, { useState } from 'react';
import { MOCK_SUBMISSIONS, MOCK_USERS, MOCK_COURSES } from '../../constants';
import { Submission } from '../../types';

const SubmissionsList: React.FC = () => {
    const [submissions, setSubmissions] = useState<Submission[]>(MOCK_SUBMISSIONS);

    const getStudentName = (id: number) => MOCK_USERS.find(u => u.id === id)?.name || 'Desconocido';
    const getCourseTitle = (id: number) => MOCK_COURSES.find(c => c.id === id)?.title || 'Desconocido';
    
    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Entregas de Estudiantes</h2>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Estudiante</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Curso</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Calificación</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {submissions.map(submission => (
                            <tr key={submission.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-black">{getStudentName(submission.studentId)}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{getCourseTitle(submission.courseId)}</td>
                                <td className="px-6 py-4">
                                    {submission.grade !== null ? (
                                        <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                                            {submission.grade}/100
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                            Pendiente
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-blue-600 hover:underline text-sm font-medium">
                                        {submission.grade !== null ? 'Ver/Editar' : 'Calificar'}
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

export default SubmissionsList;
