import React, { useState } from 'react';
import { MOCK_COURSES } from '../../constants';
import { Course, Lesson, LessonType } from '../../types';
import { CheckCircleIcon } from '../../components/icons';

interface CourseViewerProps {
  courseId: number;
  onBack: () => void;
}

const LessonContent: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
    switch (lesson.type) {
        case LessonType.VIDEO:
            return (
                <div className="aspect-w-16 aspect-h-9">
                    <iframe 
                        src={lesson.content}
                        title={lesson.title} 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="w-full h-full rounded-lg"
                    ></iframe>
                </div>
            );
        case LessonType.TEXT:
            return <div className="prose max-w-none p-4 bg-gray-50 rounded-lg border text-black" dangerouslySetInnerHTML={{ __html: lesson.content.replace(/\n/g, '<br/>') }} />;
        case LessonType.QUIZ:
            const quiz = JSON.parse(lesson.content);
            return (
                <div className="p-6 bg-gray-50 rounded-lg border text-black">
                    <h3 className="text-lg font-semibold mb-4">{quiz.question}</h3>
                    <div className="space-y-3">
                        {quiz.options.map((option: string, index: number) => (
                            <label key={index} className="flex items-center p-3 border rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer text-black">
                                <input type="radio" name="quizOption" className="mr-3 accent-primary"/>
                                {option}
                            </label>
                        ))}
                    </div>
                    <button className="mt-6 bg-[#FF7B10] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#E66A00] transition-colors">
                        Enviar Respuesta
                    </button>
                </div>
            );
        default:
            return <p>Contenido no disponible.</p>;
    }
};

const CourseViewer: React.FC<CourseViewerProps> = ({ courseId, onBack }) => {
  const course = MOCK_COURSES.find(c => c.id === courseId) as Course;
  const [activeLesson, setActiveLesson] = useState<Lesson>(course.modules[0]?.lessons[0]);

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar de Navegación del Curso */}
        <aside className="w-full md:w-1/3 lg:w-1/4 border-r-0 md:border-r md:pr-6 border-gray-200">
          <button onClick={onBack} className="mb-4 text-sm font-semibold text-blue-600 hover:underline">
            &larr; Volver a Mis Cursos
          </button>
          <h2 className="text-xl font-bold text-black mb-4">{course.title}</h2>
          <div className="space-y-4">
            {course.modules.map((module, index) => (
              <div key={module.id}>
                <h3 className="font-semibold text-black mb-2">Módulo {index+1}: {module.title}</h3>
                <ul className="space-y-1">
                  {module.lessons.map(lesson => (
                    <li key={lesson.id}>
                      <button 
                        onClick={() => setActiveLesson(lesson)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center transition-colors ${activeLesson.id === lesson.id ? 'bg-gray-200 text-black font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
                      >
                         <CheckCircleIcon className={`w-4 h-4 mr-2 ${activeLesson.id === lesson.id ? 'text-green-600' : 'text-gray-400'}`} />
                         {lesson.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* Contenido Principal de la Lección */}
        <main className="w-full md:w-2/3 lg:w-3/4">
            {activeLesson ? (
                <div>
                    <h1 className="text-3xl font-bold text-black mb-2">{activeLesson.title}</h1>
                    <p className="text-gray-500 mb-6">Lección de tipo: {activeLesson.type}</p>
                    <LessonContent lesson={activeLesson} />
                </div>
            ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                    <p>Selecciona una lección para comenzar.</p>
                </div>
            )}
        </main>
      </div>
    </div>
  );
};

export default CourseViewer;