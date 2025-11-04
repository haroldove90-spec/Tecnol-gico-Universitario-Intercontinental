
import React from 'react';
import { MOCK_CALENDAR_EVENTS, MOCK_COURSES } from '../../constants';

const CalendarView: React.FC = () => {
    const today = new Date('2024-07-10'); // Hardcoded for demonstration
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const daysInMonth = lastDayOfMonth.getDate();
    const startDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7; // 0 = Monday

    const calendarDays = Array.from({ length: startDayOfWeek }, () => null)
        .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

    const getCourseColor = (courseId: number | undefined) => {
        if (!courseId) return 'bg-gray-400';
        const colors = ['bg-blue-400', 'bg-green-400', 'bg-purple-400'];
        return colors[(courseId - 1) % colors.length];
    }
    
    const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-black">Julio 2024</h1>
                <div className="flex space-x-2">
                    <button className="px-3 py-1 rounded-md bg-[#FF7B10] text-sm font-semibold text-white hover:bg-[#E66A00]">&lt;</button>
                    <button className="px-3 py-1 rounded-md bg-[#FF7B10] text-sm font-semibold text-white hover:bg-[#E66A00]">&gt;</button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
                {weekDays.map(day => <div key={day} className="font-semibold text-sm text-gray-500 py-2">{day}</div>)}
                {calendarDays.map((day, index) => (
                    <div key={index} className={`border rounded-lg h-28 p-2 text-left ${day ? 'bg-white' : 'bg-gray-50'}`}>
                        {day && <span className="font-semibold text-sm text-black">{day}</span>}
                        <div className="mt-1 space-y-1 overflow-y-auto max-h-20">
                            {MOCK_CALENDAR_EVENTS
                                .filter(event => new Date(event.date).getDate() === day && new Date(event.date).getMonth() === month)
                                .map(event => (
                                    <div key={event.id} className={`p-1 rounded text-xs text-white ${getCourseColor(event.courseId)}`}>
                                        {event.title}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarView;