
import React, { useState } from 'react';
import { MOCK_COURSES } from '../../constants';
import { Course } from '../../types';

const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
        <img src={course.imageUrl} alt={course.title} className="w-full h-40 object-cover" />
        <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-lg font-bold text-black mb-2">{course.title}</h3>
            <p className="text-gray-600 text-sm mb-3">Por {course.instructor}</p>
            <p className="text-gray-700 text-sm mb-4 line-clamp-2 flex-grow">{course.description}</p>
            <button className="mt-4 w-full bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Ver Detalles
            </button>
        </div>
    </div>
);


const BrowseCourses: React.FC = () => {
  const [courses] = useState<Course[]>(MOCK_COURSES);
  
  return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    </div>
  );
};

export default BrowseCourses;
