import React, { useState } from 'react';
import { User } from '../types';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import CoursesList from './admin/CoursesList';
import StudentsList from './admin/StudentsList';
import SubmissionsList from './admin/SubmissionsList';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [activeView, setActiveView] = useState('courses');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const viewTitles: { [key: string]: string } = {
    courses: 'Gestión de Cursos',
    students: 'Gestión de Estudiantes',
    submissions: 'Entregas y Calificaciones',
  };

  const handleSetActiveView = (view: string) => {
    setActiveView(view);
    setSidebarOpen(false);
  };

  const handleLogoutClick = () => {
    setSidebarOpen(false);
    onLogout();
  };

  const renderContent = () => {
    switch (activeView) {
      case 'courses':
        return <CoursesList />;
      case 'students':
        return <StudentsList />;
      case 'submissions':
        return <SubmissionsList />;
      default:
        return <CoursesList />;
    }
  };

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
            title={viewTitles[activeView]} 
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

export default AdminDashboard;