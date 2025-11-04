import React from 'react';
import { Role } from '../types';

interface LoginProps {
  onLogin: (role: Role) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const logoUrl = "https://tecintercontinental.com.mx/wp-content/uploads/2025/10/Tecnologico-Universitaerio-Intercontinental.png";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-primary rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <img src={logoUrl} alt="Tecnológico Universitario Intercontinental Logo" className="w-24 h-24" />
          <h2 className="mt-6 text-3xl font-bold text-center text-white font-serif">
            Tecnológico Universitario Intercontinental
          </h2>
          <p className="mt-2 text-sm text-center text-gray-300">
            Selecciona tu rol para continuar
          </p>
        </div>
        <div className="flex flex-col gap-4 mt-8">
          <button
            onClick={() => onLogin(Role.ADMIN)}
            className="w-full px-4 py-3 font-semibold text-white bg-[#FF7B10] rounded-lg hover:bg-[#E66A00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white transition duration-300"
          >
            Entrar como Administrador
          </button>
          <button
            onClick={() => onLogin(Role.STUDENT)}
            className="w-full px-4 py-3 font-semibold text-white bg-transparent border border-gray-400 rounded-lg hover:bg-[#FF7B10] hover:border-[#FF7B10] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-gray-400 transition duration-300"
          >
            Entrar como Estudiante
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;