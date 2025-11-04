

import React, { useMemo } from 'react';
import { MOCK_COURSES, MOCK_SUBMISSIONS, MOCK_USERS } from '../../constants';
import { Role } from '../../types';
// FIX: Import missing icon components
import { BookOpenIcon, UsersIcon, GraduationCapIcon } from '../../components/icons';

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

const DoughnutChart: React.FC<{ data: { label: string, value: number, color: string }[] }> = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    if (total === 0) {
        return <div className="flex items-center justify-center h-full text-gray-500">No hay datos de calificaciones.</div>;
    }
    
    let cumulative = 0;
    const segments = data.map(item => {
        const percentage = item.value / total;
        const dashArray = 2 * Math.PI * 40;
        const dashOffset = dashArray * (1 - cumulative - percentage / 2);
        const strokeDasharray = `${percentage * dashArray} ${dashArray * (1 - percentage)}`;
        cumulative += percentage;
        return { ...item, strokeDasharray, dashOffset };
    });

    return (
        <div className="flex items-center justify-center space-x-8">
            <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="-rotate-90">
                    {segments.map((segment, index) => (
                        <circle
                            key={index}
                            cx="50" cy="50" r="40"
                            fill="transparent"
                            stroke={segment.color}
                            strokeWidth="20"
                            strokeDasharray={segment.strokeDasharray}
                            strokeDashoffset={segment.dashOffset}
                        />
                    ))}
                </svg>
            </div>
            <ul className="space-y-2">
                {data.map(item => (
                    <li key={item.label} className="flex items-center text-sm">
                        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                        <span className="font-semibold text-gray-700">{item.label}:</span>
                        <span className="ml-1 text-gray-500">{item.value}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};


const DashboardHome: React.FC = () => {
    const stats = useMemo(() => {
        const students = MOCK_USERS.filter(u => u.role === Role.STUDENT);
        const gradedSubmissions = MOCK_SUBMISSIONS.filter(s => s.grade !== null);
        const totalGrades = gradedSubmissions.reduce((sum, s) => sum + s.grade!, 0);
        
        const enrollmentsPerCourse = MOCK_COURSES.map(course => ({
            id: course.id,
            title: course.title,
            studentCount: students.filter(s => s.enrolledCourseIds.includes(course.id)).length
        }));

        const gradeDistribution = {
            excellent: gradedSubmissions.filter(s => s.grade! >= 90).length,
            good: gradedSubmissions.filter(s => s.grade! >= 70 && s.grade! < 90).length,
            regular: gradedSubmissions.filter(s => s.grade! >= 50 && s.grade! < 70).length,
            improvement: gradedSubmissions.filter(s => s.grade! < 50).length,
        };

        return {
            totalCourses: MOCK_COURSES.length,
            totalStudents: students.length,
            averageGrade: gradedSubmissions.length > 0 ? (totalGrades / gradedSubmissions.length).toFixed(1) : 'N/A',
            enrollmentsPerCourse,
            gradeDistribution
        };
    }, []);

    const doughnutData = [
        { label: 'Excelente (90+)', value: stats.gradeDistribution.excellent, color: '#10B981' },
        { label: 'Bueno (70-89)', value: stats.gradeDistribution.good, color: '#3B82F6' },
        { label: 'Regular (50-69)', value: stats.gradeDistribution.regular, color: '#F59E0B' },
        { label: 'Mejora (<50)', value: stats.gradeDistribution.improvement, color: '#EF4444' },
    ];

    const maxEnrollment = Math.max(...stats.enrollmentsPerCourse.map(c => c.studentCount), 0);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total de Cursos" value={stats.totalCourses} icon={<BookOpenIcon className="w-6 h-6"/>} />
                <StatCard title="Total de Estudiantes" value={stats.totalStudents} icon={<UsersIcon className="w-6 h-6"/>} />
                <StatCard title="Promedio General" value={stats.averageGrade} icon={<GraduationCapIcon className="w-6 h-6"/>} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-lg font-bold text-black mb-4">Estudiantes por Curso</h3>
                    <div className="space-y-4">
                        {stats.enrollmentsPerCourse.map(course => (
                            <div key={course.id} className="flex items-center">
                                <p className="w-1/3 text-sm font-medium text-gray-600 truncate">{course.title}</p>
                                <div className="w-2/3 bg-gray-200 rounded-full h-4">
                                    <div 
                                        className="bg-[#FF7B10] h-4 rounded-full flex items-center justify-end pr-2 text-white text-xs font-bold"
                                        style={{ width: maxEnrollment > 0 ? `${(course.studentCount / maxEnrollment) * 100}%` : '0%' }}
                                    >
                                        {course.studentCount}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-lg font-bold text-black mb-4">Distribución de Calificaciones</h3>
                    <DoughnutChart data={doughnutData} />
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;