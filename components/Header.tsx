
import React from 'react';
import { User } from '../types';
import { MenuIcon, XIcon } from './icons';

interface HeaderProps {
  user: User;
  title: string;
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ user, title, onMenuToggle, isSidebarOpen }) => {
  const logoUrl = "https://tecintercontinental.com.mx/wp-content/uploads/2025/10/Tecnologico-Universitaerio-Intercontinental.png";

  return (
    <header className="bg-primary text-white sticky top-0 z-20">
      <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="md:hidden mr-4 text-gray-300 hover:text-white"
              aria-label={isSidebarOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isSidebarOpen}
            >
              {isSidebarOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
            <div className="hidden md:flex items-center">
                <h1 className="text-2xl font-bold text-white">{title}</h1>
            </div>
             <div className="md:hidden flex items-center">
                <img src={logoUrl} alt="Logo" className="h-10" />
            </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="font-semibold text-white">{user.name}</div>
            <div className="text-sm text-gray-300">{user.role}</div>
          </div>
          <img
            className="w-10 h-10 rounded-full"
            src={`https://i.pravatar.cc/150?u=${user.id}`}
            alt="User avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;