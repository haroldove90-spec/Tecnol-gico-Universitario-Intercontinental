
import React from 'react';
import { User } from '../../types';
import { MOCK_COURSES } from '../../constants';

interface ProfileProps {
    user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
    const enrolledCourses = MOCK_COURSES.filter(course => user.enrolledCourseIds.includes(course.id));

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                <img
                    className="w-32 h-32 rounded-full mr-0 md:mr-8 mb-4 md:mb-0 object-cover border-4 border-primary"
                    src={`https://i.pravatar.cc/300?u=${user.id}`}
                    alt="User avatar"
                />
                <div>
                    <h1 className="text-3xl font-bold text-black">{user.name}</h1>
                    <p className="text-accent mt-1">{user.email}</p>
                    <span className="mt-2 inline-block px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                        {user.role}
                    </span>
                </div>
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
        </div>
    );
};

export default Profile;
