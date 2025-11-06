
import React, { useMemo } from 'react';
import { MOCK_COURSES, MOCK_USERS, MOCK_GRADES, MOCK_SYSTEM_USERS } from '../../constants';
import { Role, SystemRole } from '../../types';
import { BookOpenIcon, UsersIcon, GraduationCapIcon, PlusCircleIcon } from '../../components/icons';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center space-x-4">
        <div className="bg-orange-100 text-[#FF7B10] p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-black">{value}</p>
        </div>
    </div>
);

export const ReportsModule: React.FC = () => {
    const stats = useMemo(() => {
        const students = MOCK_USERS.filter(u => u.role === Role.STUDENT);
        const graded = MOCK_GRADES.filter(s => s.finalGrade !== null);
        const totalGrades = graded.reduce((sum, s) => sum + s.finalGrade!, 0);
        return {
            totalCourses: MOCK_COURSES.length,
            totalStudents: students.length,
            averageGrade: graded.length > 0 ? (totalGrades / graded.length).toFixed(1) : 'N/A',
        };
    }, []);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total de Cursos" value={stats.totalCourses} icon={<BookOpenIcon className="w-6 h-6"/>} />
                <StatCard title="Total de Estudiantes" value={stats.totalStudents} icon={<UsersIcon className="w-6 h-6"/>} />
                <StatCard title="Promedio General" value={stats.averageGrade} icon={<GraduationCapIcon className="w-6 h-6"/>} />
            </div>
             <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-bold text-black mb-4">Estadísticas Adicionales</h3>
                <p className="text-gray-600">En esta sección se mostrarían reportes de tasas de reprobación, egreso, eficiencia terminal, y promedios por grupo, carrera o periodo. Los reportes serían exportables a Excel, PDF o CSV.</p>
            </div>
        </div>
    );
};

const getRoleColor = (role: SystemRole) => {
    switch(role) {
        case SystemRole.ADMIN: return 'bg-red-100 text-red-800';
        case SystemRole.COORDINATOR: return 'bg-purple-100 text-purple-800';
        case SystemRole.TEACHER: return 'bg-blue-100 text-blue-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

export const SecurityModule: React.FC = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">Usuarios del Sistema</h2>
                 <button className="flex items-center bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00] transition-colors">
                    <PlusCircleIcon className="w-5 h-5 mr-2" />
                    Nuevo Usuario
                </button>
            </div>
             <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Rol</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Último Acceso</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {MOCK_SYSTEM_USERS.map(user => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 font-medium text-black">{user.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                                <td className="px-6 py-4">
                                     <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">{new Date(user.lastAccess).toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <button className="text-blue-600 hover:underline text-sm font-medium">Editar Permisos</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
        </div>
    );
};
