
import React from 'react';
import { User } from '../../types';
import { MOCK_SUBMISSIONS, MOCK_COURSES } from '../../constants';

interface ReportsProps {
    user: User;
}

const Reports: React.FC<ReportsProps> = ({ user }) => {
    const userSubmissions = MOCK_SUBMISSIONS.filter(s => s.studentId === user.id && s.grade !== null);
    
    const completedCourses = user.enrolledCourseIds.length;
    const totalGrades = userSubmissions.reduce((acc, s) => acc + (s.grade || 0), 0);
    const averageGrade = userSubmissions.length > 0 ? (totalGrades / userSubmissions.length).toFixed(1) : 'N/A';
    
    const gradesByCourse = user.enrolledCourseIds.map(courseId => {
        const course = MOCK_COURSES.find(c => c.id === courseId);
        const submissionsForCourse = userSubmissions.filter(s => s.courseId === courseId);
        const avgGrade = submissionsForCourse.length > 0
            ? submissionsForCourse.reduce((acc, s) => acc + (s.grade || 0), 0) / submissionsForCourse.length
            : 0;
        return {
            title: course?.title.split(' ')[0] || 'Curso', // Short title
            grade: avgGrade,
        };
    });

    const getBarColor = (grade: number) => {
        if (grade >= 90) return 'fill-green-500';
        if (grade >= 70) return 'fill-blue-500';
        if (grade >= 50) return 'fill-yellow-500';
        return 'fill-red-500';
    };

    return (
        <div className="space-y-8">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                    <h3 className="text-lg font-semibold text-gray-500">Cursos Inscritos</h3>
                    <p className="text-4xl font-bold text-black mt-2">{completedCourses}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                    <h3 className="text-lg font-semibold text-gray-500">Promedio General</h3>
                    <p className="text-4xl font-bold text-black mt-2">{averageGrade}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                    <h3 className="text-lg font-semibold text-gray-500">Entregas Calificadas</h3>
                    <p className="text-4xl font-bold text-black mt-2">{userSubmissions.length}</p>
                </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-black mb-6">Rendimiento por Curso</h3>
                <div className="h-64 flex items-end justify-around space-x-4">
                   {gradesByCourse.length > 0 ? (
                        gradesByCourse.map(course => (
                           <div key={course.title} className="flex-1 flex flex-col items-center h-full">
                               <div className="w-full h-full flex items-end">
                                    <div 
                                        className={`w-full rounded-t-lg transition-all duration-500 ${getBarColor(course.grade)}`}
                                        style={{ height: `${course.grade}%` }}
                                        title={`Promedio: ${course.grade.toFixed(1)}`}
                                    ></div>
                               </div>
                               <p className="text-sm font-semibold text-gray-600 mt-2">{course.title}</p>
                           </div>
                       ))
                   ) : (
                       <div className="w-full text-center text-gray-500">No hay datos de calificaciones para mostrar.</div>
                   )}
                </div>
                 <div className="w-full border-t border-gray-200 mt-2"></div>
            </div>
        </div>
    );
};

export default Reports;
