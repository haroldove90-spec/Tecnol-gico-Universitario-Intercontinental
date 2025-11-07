import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_TEACHERS, MOCK_PERIODS, MOCK_CURRICULUMS, MOCK_CAREERS } from '../../constants';
import { Teacher, SchoolPeriod } from '../../types';
import { PlusCircleIcon, PencilIcon } from '../../components/icons';
import Modal from '../../components/Modal';

// --- CURRICULUM SUBJECT TYPE ---
interface CurriculumSubject {
    id: string;
    semester: number;
    key: string;
    name: string;
    moduleTitle: string;
    fileLink: string;
}

// --- SUBJECT FORM COMPONENT ---
const SubjectForm: React.FC<{ subject?: CurriculumSubject | null, onSave: (subject: Omit<CurriculumSubject, 'id'>) => void, onCancel: () => void }> = ({ subject, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        semester: subject?.semester || 1,
        key: subject?.key || '',
        name: subject?.name || '',
        moduleTitle: subject?.moduleTitle || '',
        fileLink: subject?.fileLink || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'semester' ? parseInt(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Cuatrimestre</label>
                    <input name="semester" value={formData.semester} onChange={handleChange} type="number" min="1" max="12" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Número / Clave</label>
                    <input name="key" value={formData.key} onChange={handleChange} type="text" placeholder="Ej: E0101" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Materia</label>
                <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Ej: Filosofía de la educación" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Título / Módulo</label>
                <input name="moduleTitle" value={formData.moduleTitle} onChange={handleChange} type="text" placeholder="Ej: Módulo I" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Liga / Archivo</label>
                <input name="fileLink" value={formData.fileLink} onChange={handleChange} type="text" placeholder="Ej: filosofia_educacion.pdf" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
            </div>
            <div className="flex justify-end pt-4 space-x-2">
                <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300">Cancelar</button>
                <button type="submit" className="bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00]">Guardar Materia</button>
            </div>
        </form>
    );
}

// --- CURRICULUM MANAGER MODULE ---
export const CurriculumManager: React.FC = () => {
    const [selectedCareerId, setSelectedCareerId] = useState<number>(4); // Default to Lic. en Ciencias Forenses
    const [subjects, setSubjects] = useState<CurriculumSubject[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSubject, setEditingSubject] = useState<CurriculumSubject | null>(null);

    useEffect(() => {
        const careerCurriculum = MOCK_CURRICULUMS[selectedCareerId] || {};
        const initialSubjects = Object.entries(careerCurriculum).flatMap(([semester, subjectList]) => 
            subjectList.map(s => ({
              ...s,
              id: `${semester}-${s.key}`,
              semester: parseInt(semester),
            }))
        );
        setSubjects(initialSubjects);
    }, [selectedCareerId]);

    const groupedSubjects = useMemo(() => {
        return subjects.reduce((acc, subject) => {
            (acc[subject.semester] = acc[subject.semester] || []).push(subject);
            return acc;
        }, {} as Record<number, CurriculumSubject[]>);
    }, [subjects]);

    const handleOpenModal = (subject: CurriculumSubject | null = null) => {
        setEditingSubject(subject);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingSubject(null);
        setIsModalOpen(false);
    };

    const handleSaveSubject = (subjectData: Omit<CurriculumSubject, 'id'>) => {
        if (editingSubject) {
            setSubjects(subjects.map(s => s.id === editingSubject.id ? { ...subjectData, id: editingSubject.id } : s));
        } else {
            const newSubject: CurriculumSubject = {
                ...subjectData,
                id: `${subjectData.semester}-${subjectData.key}`,
            };
            setSubjects([...subjects, newSubject]);
        }
        handleCloseModal();
    };
    
    const career = MOCK_CAREERS.find(c => c.id === selectedCareerId);

    return (
        <div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingSubject ? "Editar Materia" : "Registrar Nueva Materia"} size="lg">
                <SubjectForm subject={editingSubject} onSave={handleSaveSubject} onCancel={handleCloseModal} />
            </Modal>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                 <div className="flex-grow">
                    <label htmlFor="career-select" className="block text-sm font-medium text-gray-700 mb-1">Seleccionar Carrera</label>
                     <select 
                        id="career-select"
                        value={selectedCareerId}
                        onChange={(e) => setSelectedCareerId(Number(e.target.value))}
                        className="w-full md:w-auto block px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black text-xl font-semibold"
                    >
                        {MOCK_CAREERS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <button onClick={() => handleOpenModal()} className="flex items-center self-end bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00] transition-colors">
                    <PlusCircleIcon className="w-5 h-5 mr-2" />
                    Registrar Materia
                </button>
            </div>

            <div className="space-y-6">
                {Object.keys(groupedSubjects).length > 0 ? (
                    Object.keys(groupedSubjects).sort((a, b) => Number(a) - Number(b)).map(semester => {
                        const subjectsInSemester = groupedSubjects[Number(semester)];
                        return (
                        <div key={semester} className="bg-white p-5 rounded-xl shadow-md">
                            <h3 className="text-lg font-bold text-black border-b border-gray-200 pb-3 mb-3">
                               Cuatrimestre {semester}
                            </h3>
                             <div className="overflow-x-auto">
                                <table className="w-full whitespace-nowrap">
                                    <thead className="text-xs text-gray-500 uppercase">
                                        <tr>
                                            <th className="px-4 py-2 text-left">Número</th>
                                            <th className="px-4 py-2 text-left">Materia</th>
                                            <th className="px-4 py-2 text-left">Título</th>
                                            <th className="px-4 py-2 text-left">Liga</th>
                                            <th className="px-4 py-2 text-left">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {subjectsInSemester.map(subject => (
                                            <tr key={subject.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 font-mono text-sm text-gray-600">{subject.key}</td>
                                                <td className="px-4 py-3 font-medium text-black">{subject.name}</td>
                                                <td className="px-4 py-3 text-sm text-gray-700">{subject.moduleTitle}</td>
                                                <td className="px-4 py-3 text-sm text-blue-600 hover:underline cursor-pointer">{subject.fileLink}</td>
                                                <td className="px-4 py-3">
                                                    <button onClick={() => handleOpenModal(subject)} className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                                                        <PencilIcon className="w-4 h-4 mr-1" />
                                                        Editar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                             </div>
                        </div>
                        )
                    })
                ) : (
                    <div className="bg-white p-8 rounded-xl shadow-md text-center">
                        <h3 className="text-lg font-semibold text-gray-600">Sin Plan de Estudios</h3>
                        <p className="text-gray-500 mt-2">No se han registrado materias para esta carrera. ¡Comienza agregando una!</p>
                    </div>
                )}
            </div>
        </div>
    );
};


const TeacherForm: React.FC<{ onSave: (teacher: Teacher) => void; onCancel: () => void }> = ({ onSave, onCancel }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        onSave({
            id: Date.now(),
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            employeeId: formData.get('employeeId') as string,
        });
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
             <div>
                <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                <input name="name" type="text" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input name="email" type="email" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">ID de Empleado</label>
                <input name="employeeId" type="text" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
            </div>
            <div className="flex justify-end pt-4 space-x-2">
                <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300">Cancelar</button>
                <button type="submit" className="bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00]">Guardar Docente</button>
            </div>
        </form>
    );
};

export const TeachersModule: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>(MOCK_TEACHERS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveTeacher = (teacher: Teacher) => {
    setTeachers(prev => [teacher, ...prev]);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Registrar Nuevo Docente">
        <TeacherForm onSave={handleSaveTeacher} onCancel={() => setIsModalOpen(false)} />
      </Modal>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Registro de Docentes</h2>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00] transition-colors">
            <PlusCircleIcon className="w-5 h-5 mr-2" />
            Registrar Docente
        </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full whitespace-nowrap">
              <thead className="bg-gray-50">
                  <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">ID Empleado</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Acciones</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                  {teachers.map(teacher => (
                      <tr key={teacher.id}>
                          <td className="px-6 py-4 font-mono text-sm">{teacher.employeeId}</td>
                          <td className="px-6 py-4 font-medium text-black">{teacher.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{teacher.email}</td>
                          <td className="px-6 py-4">
                            <button onClick={() => alert(`Funcionalidad para asignar materias a ${teacher.name} pendiente.`)} className="text-blue-600 hover:underline text-sm font-medium">Asignar Materias</button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  );
};

const PeriodForm: React.FC<{ period?: SchoolPeriod | null, onSave: (period: SchoolPeriod) => void; onCancel: () => void }> = ({ period, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: period?.name || '',
        startDate: period?.startDate || '',
        endDate: period?.endDate || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ id: period?.id || Date.now(), ...formData });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
             <div>
                <label className="block text-sm font-medium text-gray-700">Nombre del Periodo</label>
                <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-black"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
                <input value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} type="date" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-black"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Fecha de Fin</label>
                <input value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} type="date" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-black"/>
            </div>
            <div className="flex justify-end pt-4 space-x-2">
                <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300">Cancelar</button>
                <button type="submit" className="bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00]">Guardar</button>
            </div>
        </form>
    );
}

export const PeriodsModule: React.FC = () => {
    const [periods, setPeriods] = useState<SchoolPeriod[]>(MOCK_PERIODS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPeriod, setEditingPeriod] = useState<SchoolPeriod | null>(null);

    const handleSave = (period: SchoolPeriod) => {
        if(editingPeriod) {
            setPeriods(prev => prev.map(p => p.id === period.id ? period : p));
        } else {
            setPeriods(prev => [period, ...prev]);
        }
        setIsModalOpen(false);
        setEditingPeriod(null);
    }

    const openModal = (period: SchoolPeriod | null = null) => {
        setEditingPeriod(period);
        setIsModalOpen(true);
    }
    
    return (
        <div>
            <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingPeriod(null); }} title={editingPeriod ? "Editar Periodo Escolar" : "Nuevo Periodo Escolar"}>
                <PeriodForm period={editingPeriod} onSave={handleSave} onCancel={() => { setIsModalOpen(false); setEditingPeriod(null); }} />
            </Modal>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">Control de Periodos Escolares</h2>
                <button onClick={() => openModal()} className="flex items-center bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00] transition-colors">
                    <PlusCircleIcon className="w-5 h-5 mr-2" />
                    Nuevo Periodo
                </button>
            </div>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Nombre del Periodo</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Fecha de Inicio</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Fecha de Fin</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {periods.map(period => (
                            <tr key={period.id}>
                                <td className="px-6 py-4 font-medium text-black">{period.name}</td>
                                <td className="px-6 py-4 text-sm">{new Date(period.startDate + 'T00:00:00').toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-sm">{new Date(period.endDate + 'T00:00:00').toLocaleDateString()}</td>
                                <td className="px-6 py-4">
                                    <button onClick={() => openModal(period)} className="text-blue-600 hover:underline text-sm font-medium">Editar Fechas</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};