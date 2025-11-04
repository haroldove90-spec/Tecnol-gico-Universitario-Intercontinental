import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { MOCK_COURSES } from '../../constants';

interface ProfileProps {
    user: User;
    onUpdateUser: (user: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser }) => {
    const enrolledCourses = MOCK_COURSES.filter(course => user.enrolledCourseIds.includes(course.id));
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: user.name, email: user.email });

    useEffect(() => {
        setFormData({ name: user.name, email: user.email });
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdateUser({ ...user, ...formData });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({ name: user.name, email: user.email });
        setIsEditing(false);
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
            {isEditing ? (
                <form onSubmit={handleSave}>
                    <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                         <img
                            className="w-32 h-32 rounded-full mr-0 md:mr-8 mb-4 md:mb-0 object-cover border-4 border-primary"
                            src={`https://i.pravatar.cc/300?u=${user.id}`}
                            alt="User avatar"
                        />
                        <div className="w-full">
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-lg"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-4">
                        <button type="button" onClick={handleCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                            Cancelar
                        </button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-opacity-90">
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                        <img
                            className="w-32 h-32 rounded-full mr-0 md:mr-8 mb-4 md:mb-0 object-cover border-4 border-primary"
                            src={`https://i.pravatar.cc/300?u=${user.id}`}
                            alt="User avatar"
                        />
                        <div className="flex-grow">
                            <h1 className="text-3xl font-bold text-black">{user.name}</h1>
                            <p className="text-accent mt-1">{user.email}</p>
                            <span className="mt-2 inline-block px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                                {user.role}
                            </span>
                        </div>
                        <button onClick={() => setIsEditing(true)} className="mt-4 md:mt-0 px-4 py-2 text-sm font-medium text-white bg-[#FF7B10] rounded-md hover:bg-[#E66A00]">
                            Editar Perfil
                        </button>
                    </div>

                    <div className="mt-10 border-t border-gray-200 pt-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cursos Inscritos</h2>
                        {enrolledCourses.length > 0 ? (
                            <ul className="space-y-3">
                                {enrolledCourses.map(course => (
                                    <li key={course.id} className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-black">{course.title}</p>
                                            <p className="text-sm text-gray-600">Por {course.instructor}</p>
                                        </div>
                                        <button className="text-sm font-semibold text-blue-600 hover:underline">Ir al Curso</button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No estás inscrito en ningún curso.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Profile;
