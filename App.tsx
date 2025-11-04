import React, { useState } from 'react';
import { User, Role } from './types';
import { MOCK_USERS } from './constants';
import AdminDashboard from './views/AdminDashboard';
import StudentDashboard from './views/StudentDashboard';
import Login from './views/Login';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (role: Role) => {
    const user = MOCK_USERS.find((u) => u.role === role);
    if (user) {
      setCurrentUser(user);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  if (currentUser.role === Role.ADMIN) {
    return <AdminDashboard user={currentUser} onLogout={handleLogout} />;
  }

  if (currentUser.role === Role.STUDENT) {
    return <StudentDashboard user={currentUser} onLogout={handleLogout} setCurrentUser={setCurrentUser} />;
  }

  return null;
};

export default App;
