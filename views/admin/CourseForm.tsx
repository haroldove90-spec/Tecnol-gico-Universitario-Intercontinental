import React, { useState } from 'react';
import { Course, Lesson, LessonType, Module } from '../../types';
// FIX: Import missing PhotoIcon component
import { XIcon, PlusCircleIcon, TrashIcon, ArrowUpTrayIcon, PhotoIcon } from '../../components/icons';

interface CourseFormProps {
    onSave: (course: Course) => void;
    onClose: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ onSave, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [instructor, setInstructor] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [modules, setModules] = useState<Omit<Module, 'id'>[]>([]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddModule = () => {
        setModules([...modules, { title: '', lessons: [] }]);
    };

    const handleModuleChange = (index: number, value: string) => {
        const newModules = [...modules];
        newModules[index].title = value;
        setModules(newModules);
    };
    
    const handleRemoveModule = (index: number) => {
        const newModules = modules.filter((_, i) => i !== index);
        setModules(newModules);
    };

    const handleAddLesson = (modIndex: number) => {
        const newModules = [...modules];
        newModules[modIndex].lessons.push({ title: '', type: LessonType.TEXT, content: '' });
        setModules(newModules);
    };

    const handleLessonChange = (modIndex: number, lessonIndex: number, field: keyof Omit<Lesson, 'id'>, value: any) => {
        const newModules = [...modules];
        (newModules[modIndex].lessons[lessonIndex] as any)[field] = value;
        setModules(newModules);
    };

     const handleRemoveLesson = (modIndex: number, lessonIndex: number) => {
        const newModules = [...modules];
        newModules[modIndex].lessons = newModules[modIndex].lessons.filter((_, i) => i !== lessonIndex);
        setModules(newModules);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newCourse: Course = {
            id: Date.now(),
            title,
            description,
            instructor,
            imageUrl,
            modules: modules.map((mod, modIndex) => ({
                ...mod,
                id: modIndex + 1,
                lessons: mod.lessons.map((lesson, lessonIndex) => ({
                    ...lesson,
                    id: lessonIndex + 1,
                })),
            })),
        };
        onSave(newCourse);
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-black">Crear Nuevo Curso</h2>
                    <button onClick={onClose} aria-label="Cerrar modal"><XIcon className="w-6 h-6 text-gray-500 hover:text-black"/></button>
                </div>
                <form onSubmit={handleSubmit} className="overflow-y-auto flex-grow">
                    <div className="p-6 space-y-6">
                        {/* Basic Info */}
                        <div className="p-4 border rounded-md">
                            <h3 className="font-semibold text-lg mb-3">Información Básica</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título del Curso</label>
                                    <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full bg-gray-100 text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required/>
                                </div>
                                <div>
                                    <label htmlFor="instructor" className="block text-sm font-medium text-gray-700">Instructor</label>
                                    <input type="text" id="instructor" value={instructor} onChange={e => setInstructor(e.target.value)} className="mt-1 block w-full bg-gray-100 text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required/>
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                                    <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="mt-1 block w-full bg-gray-100 text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required></textarea>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Imagen del Curso</label>
                                    <div className="mt-1 flex items-center space-x-4">
                                        {imageUrl ? <img src={imageUrl} alt="Preview" className="w-24 h-16 object-cover rounded-md" /> : <div className="w-24 h-16 bg-gray-100 rounded-md flex items-center justify-center text-gray-400"><PhotoIcon/></div>}
                                        <label htmlFor="imageUpload" className="cursor-pointer flex items-center bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-md font-semibold hover:bg-gray-50 text-sm">
                                            <ArrowUpTrayIcon className="w-4 h-4 mr-2"/> Subir Imagen
                                        </label>
                                        <input id="imageUpload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modules & Lessons */}
                        <div className="p-4 border rounded-md">
                            <h3 className="font-semibold text-lg mb-3">Módulos y Lecciones</h3>
                            <div className="space-y-4">
                                {modules.map((mod, modIndex) => (
                                    <div key={modIndex} className="p-3 bg-gray-50 rounded-lg border">
                                        <div className="flex items-center justify-between mb-2">
                                            <input type="text" placeholder={`Título del Módulo ${modIndex + 1}`} value={mod.title} onChange={e => handleModuleChange(modIndex, e.target.value)} className="font-semibold w-full bg-gray-100 text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required/>
                                            <button type="button" onClick={() => handleRemoveModule(modIndex)} className="ml-2 text-red-500 hover:text-red-700"><TrashIcon className="w-5 h-5"/></button>
                                        </div>
                                        {mod.lessons.map((lesson, lessonIndex) => (
                                            <div key={lessonIndex} className="p-2 border-t mt-2 space-y-2">
                                                <div className="flex items-center justify-between">
                                                     <input type="text" placeholder={`Lección ${lessonIndex + 1}`} value={lesson.title} onChange={e => handleLessonChange(modIndex, lessonIndex, 'title', e.target.value)} className="text-sm w-1/2 bg-gray-100 text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required/>
                                                    <select value={lesson.type} onChange={e => handleLessonChange(modIndex, lessonIndex, 'type', e.target.value)} className="text-sm bg-gray-100 text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                                                        <option value={LessonType.TEXT}>Texto</option>
                                                        <option value={LessonType.VIDEO}>Video</option>
                                                        <option value={LessonType.QUIZ}>Cuestionario</option>
                                                    </select>
                                                     <button type="button" onClick={() => handleRemoveLesson(modIndex, lessonIndex)} className="text-red-500 hover:text-red-700"><TrashIcon className="w-4 h-4"/></button>
                                                </div>
                                                {lesson.type === LessonType.VIDEO && <input type="text" placeholder="URL del video (embed)" value={lesson.content} onChange={e => handleLessonChange(modIndex, lessonIndex, 'content', e.target.value)} className="text-sm w-full bg-gray-100 text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required/>}
                                                {lesson.type === LessonType.TEXT && <textarea placeholder="Contenido en Markdown" rows={2} value={lesson.content} onChange={e => handleLessonChange(modIndex, lessonIndex, 'content', e.target.value)} className="text-sm w-full bg-gray-100 text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required></textarea>}
                                                {lesson.type === LessonType.QUIZ && <textarea placeholder='Contenido del Quiz en JSON: {"question": "...", "options": [...], "answer": index}' rows={2} onChange={e => handleLessonChange(modIndex, lessonIndex, 'content', e.target.value)} className="text-sm w-full bg-gray-100 text-black border-gray-300 rounded-md shadow-sm font-mono focus:outline-none focus:ring-primary focus:border-primary" required></textarea>}
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => handleAddLesson(modIndex)} className="mt-2 flex items-center text-sm text-blue-600 font-semibold"><PlusCircleIcon className="w-4 h-4 mr-1"/> Añadir Lección</button>
                                    </div>
                                ))}
                                <button type="button" onClick={handleAddModule} className="w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg font-semibold">
                                    <PlusCircleIcon className="w-5 h-5 mr-2" /> Añadir Módulo
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="p-4 border-t bg-gray-50 flex justify-end">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 mr-2">Cancelar</button>
                    <button type="submit" onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-opacity-90">Guardar Curso</button>
                </div>
            </div>
        </div>
    );
};

export default CourseForm;