import React, { useState } from 'react';
import { MOCK_CALENDAR_EVENTS } from '../../constants';
import { CalendarEvent } from '../../types';
import { PlusCircleIcon, XIcon } from '../../components/icons';

const CalendarView: React.FC = () => {
    const [events, setEvents] = useState<CalendarEvent[]>(MOCK_CALENDAR_EVENTS.map(e => ({...e, type: 'course'})));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEventTitle, setNewEventTitle] = useState('');
    const [newEventDate, setNewEventDate] = useState('');

    const today = new Date('2024-07-10'); // Hardcoded for demonstration
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const daysInMonth = lastDayOfMonth.getDate();
    const startDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7; // 0 = Monday

    const calendarDays = Array.from({ length: startDayOfWeek }, () => null)
        .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

    const getEventColor = (event: CalendarEvent) => {
        if (event.type === 'personal') return 'bg-orange-500 hover:bg-orange-600';
        if (!event.courseId) return 'bg-gray-500 hover:bg-gray-600';
        const colors = ['bg-blue-500 hover:bg-blue-600', 'bg-green-500 hover:bg-green-600', 'bg-purple-500 hover:bg-purple-600'];
        return colors[(event.courseId - 1) % colors.length];
    }
    
    const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

    const handleAddEventSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newEventTitle && newEventDate) {
            const newEvent: CalendarEvent = {
                id: Date.now(),
                title: newEventTitle,
                date: newEventDate,
                type: 'personal',
            };
            setEvents(prev => [...prev, newEvent].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
            setIsModalOpen(false);
            setNewEventTitle('');
            setNewEventDate('');
        }
    };
    
    const generateICS = (event: CalendarEvent) => {
        const icsString = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//TecnologicoUniversitario//EN',
            'BEGIN:VEVENT',
            `UID:${event.id}@tecnologicouniversitario.com`,
            `DTSTAMP:${new Date().toISOString().replace(/-|:|\.\d{3}/g, '')}`,
            `DTSTART;VALUE=DATE:${event.date.replace(/-/g, '')}`,
            `SUMMARY:${event.title}`,
            'DESCRIPTION:Este evento fue exportado desde el dashboard del Tecnológico Universitario Intercontinental.',
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');
        return icsString;
    };

    const downloadICS = (event: CalendarEvent) => {
        const icsData = generateICS(event);
        const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${event.title.replace(/\s/g, '_')}.ics`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg relative">
            {isModalOpen && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-2xl" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 id="modal-title" className="text-xl font-bold text-black">Agendar Nuevo Evento</h2>
                            <button onClick={() => setIsModalOpen(false)} aria-label="Cerrar modal"><XIcon className="w-6 h-6 text-gray-500 hover:text-black"/></button>
                        </div>
                        <form onSubmit={handleAddEventSubmit}>
                            <div className="mb-4">
                                <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700">Título del Evento</label>
                                <input type="text" id="eventTitle" value={newEventTitle} onChange={e => setNewEventTitle(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required/>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">Fecha</label>
                                <input type="date" id="eventDate" value={newEventDate} onChange={e => setNewEventDate(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required/>
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="flex items-center bg-[#FF7B10] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E66A00] transition-colors">Guardar Evento</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-black">Julio 2024</h1>
                <button onClick={() => setIsModalOpen(true)} className="flex items-center bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                    <PlusCircleIcon className="w-5 h-5 mr-2"/>
                    Agendar Evento
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
                {weekDays.map(day => <div key={day} className="font-semibold text-sm text-gray-500 py-2">{day}</div>)}
                {calendarDays.map((day, index) => (
                    <div key={index} className={`border rounded-lg h-32 p-1 text-left flex flex-col ${day ? 'bg-white' : 'bg-gray-50'}`}>
                        {day && <span className="font-semibold text-xs text-black">{day}</span>}
                        <div className="mt-1 space-y-1 overflow-y-auto flex-grow">
                            {events
                                .filter(event => new Date(event.date).getUTCDate() === day && new Date(event.date).getUTCMonth() === month)
                                .map(event => (
                                    <button
                                        key={event.id} 
                                        onClick={() => downloadICS(event)}
                                        title="Añadir al calendario"
                                        className={`p-1 rounded text-xs text-white text-left w-full cursor-pointer transition-colors ${getEventColor(event)}`}
                                        >
                                        {event.title}
                                    </button>
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
