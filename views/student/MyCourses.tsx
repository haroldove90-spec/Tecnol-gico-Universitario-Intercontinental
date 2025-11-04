
import React from 'react';
import { User, Course } from '../../types';
import { MOCK_COURSES } from '../../constants';

// Helper function to simulate user progress
// In a real app, this data would come from a backend or state management
const getMockProgress = (userId: number, courseId: number): number => {
    const progressData: { [key: number]: { [key: number]: number } } = {
        2: { // Carlos Gomez
            1: 60,
            2: 50,
        },
        3: { // Ana Martinez
            1: 25,
        }
    };
    return progressData[userId]?.[courseId] || 0;
};


interface CourseCardProps {
    course: Course;
    progress: number;
    onView: (id: number) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, progress, onView }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
        <img src={course.imageUrl} alt={course.title} className="w-full h-40 object-cover" />
        <div className="p-5 flex-grow flex flex-col">
            <h3 className="text-lg font-bold text-black mb-2">{course.title}</h3>
            <p className="text-gray-600 text-sm mb-3">Por {course.instructor}</p>
            
            <div className="flex-grow"></div>
            
            <div className="mt-4">
                 <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Progreso</span>
                    <span className="text-sm font-bold text-black">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-[#FF7B10] h-2 rounded-full"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

             <button 
                onClick={() => onView(course.id)}
                className="mt-4 w-full bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00] transition-colors">
                Continuar Aprendiendo
            </button>
        </div>
    </div>
);


interface MyCoursesProps {
  user: User;
  onViewCourse: (courseId: number) => void;
}

const MyCourses: React.FC<MyCoursesProps> = ({ user, onViewCourse }) => {
  const enrolledCourses = MOCK_COURSES.filter(course => user.enrolledCourseIds.includes(course.id));

  return (
    <div>
        {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map(course => {
                    const progress = getMockProgress(user.id, course.id);
                    return <CourseCard key={course.id} course={course} progress={progress} onView={onViewCourse}/>;
                })}
            </div>
        ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow">
                <h3 className="text-xl font-semibold text-black">Aún no te has inscrito a ningún curso.</h3>
                <p className="text-gray-600 mt-2">¡Explora nuestro catálogo y empieza a aprender hoy!</p>
            </div>
        )}
    </div>
  );
};

export default MyCourses;