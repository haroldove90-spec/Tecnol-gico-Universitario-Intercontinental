
import React, { useState } from 'react';
import { MOCK_COURSES } from '../../constants';
import { Course } from '../../types';
import { PlusCircleIcon, PencilIcon, TrashIcon } from '../../components/icons';
import CourseForm from './CourseForm';

const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
        <img src={course.imageUrl} alt={course.title} className="w-full h-40 object-cover" />
        <div className="p-5">
            <h3 className="text-lg font-bold text-black mb-2">{course.title}</h3>
            <p className="text-gray-600 text-sm mb-3">Por {course.instructor}</p>
            <p className="text-gray-700 text-sm mb-4 line-clamp-2">{course.description}</p>
            <div className="flex justify-end space-x-2">
                <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                    <PencilIcon className="w-5 h-5"/>
                </button>
                <button className="p-2 text-gray-500 hover:text-red-600 transition-colors">
                    <TrashIcon className="w-5 h-5"/>
                </button>
            </div>
        </div>
    </div>
);


const CoursesList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCourse = (newCourse: Course) => {
    setCourses(prevCourses => [newCourse, ...prevCourses]);
    setIsModalOpen(false);
  };

  return (
    <div>
        {isModalOpen && (
            <CourseForm 
                onSave={handleAddCourse}
                onClose={() => setIsModalOpen(false)}
            />
        )}
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">Cursos Disponibles</h2>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00] transition-colors">
                <PlusCircleIcon className="w-5 h-5 mr-2" />
                Crear Curso
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    </div>
  );
};

export default CoursesList;
