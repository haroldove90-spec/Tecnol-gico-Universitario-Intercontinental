
import React, { useState } from 'react';
import { User } from '../types';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

// Due to file constraints, modules are imported from repurposed files.
import { ReportsModule, SecurityModule } from './admin/DashboardHome';
import { CareersModule, GroupsModule } from './admin/CoursesList';
import { StudentsModule, KardexModule } from './admin/StudentsList';
import { GradesModule, ReportCardsModule } from './admin/SubmissionsList';
import { TeachersModule, PeriodsModule } from './admin/CourseForm';


interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [activeView, setActiveView] = useState('students');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const viewTitles: { [key: string]: string } = {
    students: 'Módulo de Alumnos',
    careers: 'Módulo de Carreras y Materias',
    teachers: 'Módulo de Docentes',
    groups: 'Módulo de Grupos',
    grades: 'Módulo de Calificaciones',
    kardex: 'Módulo de Kardex',
    'report-cards': 'Módulo de Boletas',
    periods: 'Módulo de Control de Periodos Escolares',
    reports: 'Módulo de Reportes y Estadísticas',
    security: 'Módulo de Seguridad y Usuarios'
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
      case 'students':
        return <StudentsModule />;
      case 'kardex':
        return <KardexModule />;
      case 'careers':
        return <CareersModule />;
      case 'groups':
        return <GroupsModule />;
      case 'grades':
        return <GradesModule />;
      case 'report-cards':
        return <ReportCardsModule />;
      case 'reports':
        return <ReportsModule />;
      case 'security':
        return <SecurityModule />;
      case 'teachers':
        return <TeachersModule />;
      case 'periods':
        return <PeriodsModule />;
      default:
        return <StudentsModule />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar
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
