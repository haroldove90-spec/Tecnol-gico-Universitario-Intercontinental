import React, { useState } from 'react';
import { User } from '../types';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import MyCourses from './student/MyCourses';
import BrowseCourses from './student/BrowseCourses';
import Grades from './student/Grades';
import CourseViewer from './student/CourseViewer';

interface StudentDashboardProps {
  user: User;
  onLogout: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onLogout }) => {
  const [activeView, setActiveView] = useState('my-courses');
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const viewTitles: { [key: string]: string } = {
    'my-courses': 'Mis Cursos',
    'browse': 'Explorar Cursos',
    'grades': 'Mis Calificaciones',
    'course-viewer': 'Viendo Curso',
  };

  const handleSetActiveView = (view: string) => {
    setActiveView(view);
    setSidebarOpen(false);
  };

  const handleLogoutClick = () => {
    setSidebarOpen(false);
    onLogout();
  };

  const handleViewCourse = (courseId: number) => {
    setSelectedCourseId(courseId);
    setActiveView('course-viewer');
  };
  
  const handleBackToList = () => {
      setSelectedCourseId(null);
      setActiveView('my-courses');
  }

  const renderContent = () => {
    if (activeView === 'course-viewer' && selectedCourseId) {
        return <CourseViewer courseId={selectedCourseId} onBack={handleBackToList} />;
    }

    switch (activeView) {
      case 'my-courses':
        return <MyCourses user={user} onViewCourse={handleViewCourse} />;
      case 'browse':
        return <BrowseCourses />;
      case 'grades':
        return <Grades user={user} />;
      default:
        return <MyCourses user={user} onViewCourse={handleViewCourse} />;
    }
  };
  
  const currentTitle = activeView === 'course-viewer' ? 'Viendo Curso' : viewTitles[activeView];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar
        role={user.role}
        activeView={activeView}
        setActiveView={handleSetActiveView}
        onLogout={handleLogoutClick}
        isOpen={isSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
            user={user} 
            title={currentTitle}
            onMenuToggle={() => setSidebarOpen(!isSidebarOpen)} 
            isSidebarOpen={isSidebarOpen}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;