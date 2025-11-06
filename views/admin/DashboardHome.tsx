import React, { useMemo, useState } from 'react';
import { MOCK_COURSES, MOCK_USERS, MOCK_GRADES, MOCK_SYSTEM_USERS } from '../../constants';
import { Role, SystemRole, StudentStatus, SystemUser } from '../../types';
import { BookOpenIcon, UsersIcon, GraduationCapIcon, PlusCircleIcon } from '../../components/icons';
import Modal from '../../components/Modal';

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

const StudentStatusPieChart: React.FC = () => {
    const statusCounts = useMemo(() => {
        const counts = {
            [StudentStatus.ACTIVE]: 0,
            [StudentStatus.GRADUATED]: 0,
            [StudentStatus.TEMP_LEAVE]: 0,
            [StudentStatus.PERM_LEAVE]: 0,
        };
        MOCK_USERS.filter(u => u.role === Role.STUDENT).forEach(student => {
            if (student.status && counts[student.status] !== undefined) {
                counts[student.status]++;
            }
        });
        return counts;
    }, []);

    const totalStudents = MOCK_USERS.filter(u => u.role === Role.STUDENT).length;
    const data = [
        { status: StudentStatus.ACTIVE, value: statusCounts[StudentStatus.ACTIVE], color: 'bg-green-500' },
        { status: StudentStatus.GRADUATED, value: statusCounts[StudentStatus.GRADUATED], color: 'bg-blue-500' },
        { status: StudentStatus.TEMP_LEAVE, value: statusCounts[StudentStatus.TEMP_LEAVE], color: 'bg-yellow-500' },
        { status: StudentStatus.PERM_LEAVE, value: statusCounts[StudentStatus.PERM_LEAVE], color: 'bg-red-500' },
    ];
    
    let cumulativePercent = 0;
    const gradients = data.map(item => {
        const percent = (item.value / totalStudents) * 100;
        const start = cumulativePercent;
        cumulativePercent += percent;
        const end = cumulativePercent;
        return `${item.color.replace('bg-', '')} ${start}% ${end}%`;
    });


    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
             <h3 className="text-lg font-bold text-black mb-4">Distribución de Alumnos por Estatus</h3>
             <div className="flex items-center gap-8">
                <div className="w-32 h-32 rounded-full" style={{background: `conic-gradient(${gradients.join(',')})`}}></div>
                <div className="space-y-2">
                    {data.map(item => (
                        <div key={item.status} className="flex items-center">
                            <div className={`w-4 h-4 rounded-sm mr-2 ${item.color}`}></div>
                            <span>{item.status}: {item.value}</span>
                        </div>
                    ))}
                </div>
             </div>
        </div>
    );
};

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
                <StatCard title="Total de Carreras" value={stats.totalCourses} icon={<BookOpenIcon className="w-6 h-6"/>} />
                <StatCard title="Total de Alumnos" value={stats.totalStudents} icon={<UsersIcon className="w-6 h-6"/>} />
                <StatCard title="Promedio General" value={stats.averageGrade} icon={<GraduationCapIcon className="w-6 h-6"/>} />
            </div>
            <StudentStatusPieChart />
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
    const [users, setUsers] = useState<SystemUser[]>(MOCK_SYSTEM_USERS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<SystemUser | null>(null);

    const handleSave = (user: SystemUser) => {
        if (editingUser) {
            setUsers(prev => prev.map(u => u.id === user.id ? user : u));
        } else {
            setUsers(prev => [user, ...prev]);
        }
        setIsModalOpen(false);
        setEditingUser(null);
    };
    
    return (
        <div>
            <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingUser(null); }} title={editingUser ? "Editar Usuario" : "Nuevo Usuario del Sistema"}>
                <UserForm user={editingUser} onSave={handleSave} onCancel={() => { setIsModalOpen(false); setEditingUser(null); }} />
            </Modal>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">Usuarios del Sistema</h2>
                 <button onClick={() => setIsModalOpen(true)} className="flex items-center bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00] transition-colors">
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
                        {users.map(user => (
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
                                    <button onClick={() => { setEditingUser(user); setIsModalOpen(true); }} className="text-blue-600 hover:underline text-sm font-medium">Editar Permisos</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
        </div>
    );
};

const UserForm: React.FC<{user: SystemUser | null, onSave: (user: SystemUser) => void, onCancel: () => void}> = ({ user, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        role: user?.role || SystemRole.TEACHER,
    });
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: user?.id || Date.now(),
            ...formData,
            lastAccess: user?.lastAccess || new Date().toISOString()
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"/>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Rol</label>
                <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value as SystemRole})} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black">
                    {Object.values(SystemRole).map(role => <option key={role} value={role}>{role}</option>)}
                </select>
            </div>
            <div className="flex justify-end pt-4 space-x-2">
                <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300">Cancelar</button>
                <button type="submit" className="bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00]">Guardar Usuario</button>
            </div>
        </form>
    );
};