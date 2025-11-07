
import React, { ReactNode } from 'react';
import { BookOpenIcon, UsersIcon, DocumentCheckIcon, ArrowLeftOnRectangleIcon, CalendarDaysIcon, ChartBarIcon, BriefcaseIcon, ViewGridIcon, IdentificationIcon, ShieldCheckIcon, DocumentTextIcon } from './icons';

interface NavLinkProps {
  icon: ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-white/10 text-white'
        : 'text-gray-300 hover:bg-white/5 hover:text-white'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  onLogout: () => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, onLogout, isOpen }) => {
  const logoUrl = "https://tecintercontinental.com.mx/wp-content/uploads/2025/10/Tecnologico-Universitaerio-Intercontinental.png";

  const adminLinks = [
    { id: 'students', label: 'Alumnos', icon: <UsersIcon className="w-5 h-5" /> },
    { id: 'teachers', label: 'Docentes', icon: <BriefcaseIcon className="w-5 h-5" /> },
    { id: 'groups', label: 'Grupos', icon: <ViewGridIcon className="w-5 h-5" /> },
    { id: 'grades', label: 'Calificaciones', icon: <DocumentCheckIcon className="w-5 h-5" /> },
    { id: 'kardex', label: 'Kardex', icon: <IdentificationIcon className="w-5 h-5" /> },
    { id: 'report-cards', label: 'Boletas', icon: <DocumentTextIcon className="w-5 h-5" /> },
    { id: 'periods', label: 'Periodos Escolares', icon: <CalendarDaysIcon className="w-5 h-5" /> },
    { id: 'reports', label: 'Reportes y Estadísticas', icon: <ChartBarIcon className="w-5 h-5" /> },
    { id: 'security', label: 'Seguridad y Usuarios', icon: <ShieldCheckIcon className="w-5 h-5" /> },
  ];

  const links = adminLinks;

  return (
    <aside className={`bg-primary text-white w-64 flex-shrink-0 border-r border-gray-700 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative absolute inset-y-0 left-0 z-30`}>
      <div className="flex items-center justify-center h-20 border-b border-gray-700 px-4">
        <img src={logoUrl} alt="Tecnológico Universitario Intercontinental Logo" className="h-12" />
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.id}
            icon={link.icon}
            label={link.label}
            isActive={activeView === link.id}
            onClick={() => setActiveView(link.id)}
          />
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-gray-700">
        <NavLink
          icon={<ArrowLeftOnRectangleIcon className="w-5 h-5" />}
          label="Cerrar Sesión"
          isActive={false}
          onClick={onLogout}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
