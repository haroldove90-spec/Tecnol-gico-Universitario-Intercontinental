
import React from 'react';
import { MOCK_GRADES, MOCK_USERS, MOCK_SUBJECTS, MOCK_GROUPS } from '../../constants';
import { PlusCircleIcon, DocumentTextIcon } from '../../components/icons';


export const GradesModule: React.FC = () => {
    const getStudentName = (id: number) => MOCK_USERS.find(u => u.id === id)?.name || 'N/A';
    const getSubjectName = (id: number) => MOCK_SUBJECTS.find(s => s.id === id)?.name || 'N/A';
    
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">Captura de Calificaciones</h2>
                <button className="flex items-center bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00] transition-colors">
                    <PlusCircleIcon className="w-5 h-5 mr-2" />
                    Capturar por Grupo
                </button>
            </div>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Estudiante</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Materia</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">P1</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">P2</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Final</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Promedio</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {MOCK_GRADES.map(grade => (
                            <tr key={grade.id}>
                                <td className="px-6 py-4 font-medium">{getStudentName(grade.studentId)}</td>
                                <td className="px-6 py-4 text-sm">{getSubjectName(grade.subjectId)}</td>
                                <td className="px-6 py-4 text-sm">{grade.partial1 ?? '-'}</td>
                                <td className="px-6 py-4 text-sm">{grade.partial2 ?? '-'}</td>
                                <td className="px-6 py-4 text-sm">{grade.finalExam ?? '-'}</td>
                                <td className="px-6 py-4 text-sm font-bold text-black">{grade.finalGrade ?? 'N/A'}</td>
                                <td className="px-6 py-4">
                                     <button className="text-blue-600 hover:underline text-sm font-medium">
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

export const ReportCardsModule: React.FC = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">Emisión de Boletas</h2>
                 <button className="flex items-center bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00] transition-colors">
                    <DocumentTextIcon className="w-5 h-5 mr-2" />
                    Generar Boletas por Grupo
                </button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                 <h3 className="text-xl font-bold text-black">Generador de Boletas Individuales</h3>
                 <p className="text-gray-600 mt-2 mb-6">Busca un alumno por matrícula para generar su boleta del periodo actual.</p>
                <div className="max-w-md mx-auto">
                    <div className="relative">
                        <input type="search" placeholder="Buscar por matrícula..." className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                        <button className="absolute inset-y-0 right-0 px-4 flex items-center bg-primary text-white rounded-r-lg font-semibold hover:bg-opacity-90">
                            Generar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
