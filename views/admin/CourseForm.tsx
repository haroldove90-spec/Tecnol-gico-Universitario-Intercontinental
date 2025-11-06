
import React from 'react';
import { MOCK_TEACHERS, MOCK_PERIODS } from '../../constants';
import { PlusCircleIcon } from '../../components/icons';

export const TeachersModule: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Registro de Docentes</h2>
        <button className="flex items-center bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00] transition-colors">
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
                  {MOCK_TEACHERS.map(teacher => (
                      <tr key={teacher.id}>
                          <td className="px-6 py-4 font-mono text-sm">{teacher.employeeId}</td>
                          <td className="px-6 py-4 font-medium text-black">{teacher.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{teacher.email}</td>
                          <td className="px-6 py-4">
                            <button className="text-blue-600 hover:underline text-sm font-medium">Asignar Materias</button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  );
};

export const PeriodsModule: React.FC = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">Control de Periodos Escolares</h2>
                <button className="flex items-center bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00] transition-colors">
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
                        {MOCK_PERIODS.map(period => (
                            <tr key={period.id}>
                                <td className="px-6 py-4 font-medium text-black">{period.name}</td>
                                <td className="px-6 py-4 text-sm">{new Date(period.startDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-sm">{new Date(period.endDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4">
                                    <button className="text-blue-600 hover:underline text-sm font-medium">Editar Fechas</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
