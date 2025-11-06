import React, { useState } from 'react';
import { MOCK_GRADES, MOCK_USERS, MOCK_SUBJECTS, MOCK_GROUPS, MOCK_PERIODS, MOCK_CAREERS } from '../../constants';
import { Grade, Group } from '../../types';
import { PlusCircleIcon, DocumentTextIcon, PrinterIcon, MagnifyingGlassIcon } from '../../components/icons';
import Modal from '../../components/Modal';

const CaptureGradesModal: React.FC<{ group: Group | null; onClose: () => void; onSave: (grades: Grade[]) => void; }> = ({ group, onClose, onSave }) => {
    const studentsInGroup = MOCK_USERS.filter(u => group?.studentIds.includes(u.id));
    const [grades, setGrades] = useState<{[key: number]: {p1: string, p2: string, final: string}}>({});

    if (!group) return null;
    
    const handleGradeChange = (studentId: number, partial: 'p1'|'p2'|'final', value: string) => {
        setGrades(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                [partial]: value,
            }
        }));
    };
    
    const handleSubmit = () => {
        // Here you would implement the logic to save the grades
        console.log("Saving grades:", grades);
        onClose();
    }

    return (
        <Modal isOpen={!!group} onClose={onClose} title={`Capturar Calificaciones - ${MOCK_SUBJECTS.find(s=>s.id === group.subjectId)?.name}`} size="xl">
            <div className="overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left">Alumno</th>
                            <th className="px-4 py-2 text-center">Parcial 1</th>
                            <th className="px-4 py-2 text-center">Parcial 2</th>
                            <th className="px-4 py-2 text-center">Ex. Final</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentsInGroup.map(student => (
                            <tr key={student.id}>
                                <td className="px-4 py-2 font-medium">{student.name}</td>
                                <td className="px-4 py-2"><input type="number" min="0" max="100" className="w-20 text-center border rounded" onChange={(e) => handleGradeChange(student.id, 'p1', e.target.value)} /></td>
                                <td className="px-4 py-2"><input type="number" min="0" max="100" className="w-20 text-center border rounded" onChange={(e) => handleGradeChange(student.id, 'p2', e.target.value)} /></td>
                                <td className="px-4 py-2"><input type="number" min="0" max="100" className="w-20 text-center border rounded" onChange={(e) => handleGradeChange(student.id, 'final', e.target.value)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end mt-6">
                <button onClick={handleSubmit} className="bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00]">Guardar Calificaciones</button>
            </div>
        </Modal>
    );
};


export const GradesModule: React.FC = () => {
    const [gradesData, setGradesData] = useState<Grade[]>(MOCK_GRADES);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [isCaptureModalOpen, setCaptureModalOpen] = useState(false);

    const getStudentName = (id: number) => MOCK_USERS.find(u => u.id === id)?.name || 'N/A';
    const getSubjectName = (id: number) => MOCK_SUBJECTS.find(s => s.id === id)?.name || 'N/A';
    
    const handleOpenCaptureModal = () => {
        // In a real app, a group would be selected first.
        // For this demo, we'll just pick the first group.
        setSelectedGroup(MOCK_GROUPS[0]);
        setCaptureModalOpen(true);
    };

    return (
        <div>
            <CaptureGradesModal group={selectedGroup} onClose={() => setCaptureModalOpen(false)} onSave={() => {}}/>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">Captura de Calificaciones</h2>
                <button onClick={handleOpenCaptureModal} className="flex items-center bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00] transition-colors">
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
                            <th className="px-6 py-3 text-center text-xs font-semibold text-black uppercase tracking-wider">P1</th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-black uppercase tracking-wider">P2</th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-black uppercase tracking-wider">Final</th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-black uppercase tracking-wider">Promedio</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {gradesData.map(grade => (
                            <tr key={grade.id}>
                                <td className="px-6 py-4 font-medium">{getStudentName(grade.studentId)}</td>
                                <td className="px-6 py-4 text-sm">{getSubjectName(grade.subjectId)}</td>
                                <td className="px-6 py-4 text-sm text-center">{grade.partial1 ?? '-'}</td>
                                <td className="px-6 py-4 text-sm text-center">{grade.partial2 ?? '-'}</td>
                                <td className="px-6 py-4 text-sm text-center">{grade.finalExam ?? '-'}</td>
                                <td className={`px-6 py-4 text-sm text-center font-bold ${grade.finalGrade && grade.finalGrade < 70 ? 'text-red-500' : 'text-black'}`}>{grade.finalGrade ?? 'N/A'}</td>
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
    const [searchQuery, setSearchQuery] = useState('');
    const [student, setStudent] = useState<any>(null);
    const [isBoletaVisible, setIsBoletaVisible] = useState(false);

    const handleSearch = () => {
        const foundStudent = MOCK_USERS.find(u => u.matricula === searchQuery);
        if (foundStudent) {
            const studentGrades = MOCK_GRADES.filter(g => g.studentId === foundStudent.id && g.periodId === 1);
            const studentCareer = MOCK_CAREERS.find(c => c.id === foundStudent.careerId);
            setStudent({ ...foundStudent, grades: studentGrades, career: studentCareer });
            setIsBoletaVisible(true);
        } else {
            alert('Matrícula no encontrada');
        }
    };
    
    return (
        <div>
             <Modal isOpen={isBoletaVisible} onClose={() => setIsBoletaVisible(false)} title="Boleta de Calificaciones" size="xl">
                {student && (
                    <div id="boleta-print">
                        <div className="text-center mb-6">
                             <img src="https://tecintercontinental.com.mx/wp-content/uploads/2025/10/Tecnologico-Universitaerio-Intercontinental.png" alt="Logo" className="w-24 mx-auto mb-2"/>
                            <h3 className="text-2xl font-bold text-black">Tecnológico Universitario Intercontinental</h3>
                            <p className="text-gray-600">Boleta de Calificaciones - {MOCK_PERIODS.find(p=>p.id===1)?.name}</p>
                        </div>
                        <div className="flex justify-between text-sm mb-4">
                            <div>
                                <p><strong>Alumno:</strong> {student.name}</p>
                                <p><strong>Matrícula:</strong> {student.matricula}</p>
                            </div>
                             <div>
                                <p><strong>Carrera:</strong> {student.career.name}</p>
                                <p><strong>Semestre:</strong> {student.semester}</p>
                            </div>
                        </div>
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2 text-left">Materia</th>
                                    <th className="p-2 text-center">Cal. Final</th>
                                </tr>
                            </thead>
                            <tbody>
                                {student.grades.map((g: Grade) => (
                                    <tr key={g.id} className="border-b">
                                        <td className="p-2">{MOCK_SUBJECTS.find(s=>s.id === g.subjectId)?.name}</td>
                                        <td className="p-2 text-center font-semibold">{g.finalGrade}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-end mt-4">
                            <button onClick={() => window.print()} className="flex items-center bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90">
                                <PrinterIcon className="w-5 h-5 mr-2" />
                                Imprimir
                            </button>
                        </div>
                    </div>
                )}
                 <style>{`
                    @media print {
                        body * { visibility: hidden; }
                        #boleta-print, #boleta-print * { visibility: visible; }
                        #boleta-print { position: absolute; left: 0; top: 0; width: 100%; }
                    }
                `}</style>
            </Modal>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">Emisión de Boletas</h2>
                 <button className="flex items-center bg-gray-300 text-gray-600 px-4 py-2 rounded-lg font-semibold cursor-not-allowed">
                    <DocumentTextIcon className="w-5 h-5 mr-2" />
                    Generar Boletas por Grupo
                </button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                 <h3 className="text-xl font-bold text-black">Generador de Boletas Individuales</h3>
                 <p className="text-gray-600 mt-2 mb-6">Busca un alumno por matrícula para generar su boleta del periodo actual.</p>
                <div className="max-w-md mx-auto">
                    <div className="relative">
                        <input type="search" placeholder="Buscar por matrícula..." onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                        <button onClick={handleSearch} className="absolute inset-y-0 right-0 px-4 flex items-center bg-primary text-white rounded-r-lg font-semibold hover:bg-opacity-90">
                            Generar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
