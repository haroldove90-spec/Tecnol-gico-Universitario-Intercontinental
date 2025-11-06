import React, { useState } from 'react';
import { MOCK_TEACHERS, MOCK_PERIODS } from '../../constants';
import { Teacher, SchoolPeriod } from '../../types';
import { PlusCircleIcon } from '../../components/icons';
import Modal from '../../components/Modal';

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