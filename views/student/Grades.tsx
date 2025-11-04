
import React, { useState } from 'react';
import { MOCK_SUBMISSIONS, MOCK_COURSES } from '../../constants';
import { Submission, User } from '../../types';

const Grades: React.FC<{user: User}> = ({user}) => {
    const [submissions] = useState<Submission[]>(MOCK_SUBMISSIONS.filter(s => s.studentId === user.id));
    
    const getCourseTitle = (id: number) => MOCK_COURSES.find(c => c.id === id)?.title || 'Desconocido';
    
    return (
        <div>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Curso</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Calificación</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {submissions.length > 0 ? submissions.map(submission => (
                            <tr key={submission.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-black">{getCourseTitle(submission.courseId)}</td>
                                <td className="px-6 py-4">
                                     {submission.grade !== null ? (
                                        <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                                            Calificado
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                            Pendiente
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm font-semibold text-black">
                                    {submission.grade !== null ? `${submission.grade}/100` : 'N/A'}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={3} className="text-center py-10 text-gray-500">
                                    No tienes entregas realizadas.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Grades;
