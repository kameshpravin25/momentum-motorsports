import { useState } from 'react';
import RoleSelect from './pages/RoleSelect';
import ManagerLogin from './pages/ManagerLogin';
import ManagerDashboard from './pages/ManagerDashboard';
import MechanicDashboard from './pages/MechanicDashboard';

export default function App() {
  const [role, setRole] = useState(() => sessionStorage.getItem('momentum_role') || '');
  const [managerAuth, setManagerAuth] = useState(() => sessionStorage.getItem('momentum_manager_auth') === 'true');

  const handleSelect = (r) => {
    if (r === 'Manager') {
      setRole('Manager_Login');
    } else {
      sessionStorage.setItem('momentum_role', r);
      setRole(r);
    }
  };

  const handleManagerAuth = () => {
    sessionStorage.setItem('momentum_role', 'Manager');
    sessionStorage.setItem('momentum_manager_auth', 'true');
    setRole('Manager');
    setManagerAuth(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('momentum_role');
    sessionStorage.removeItem('momentum_manager_auth');
    setRole('');
    setManagerAuth(false);
  };

  const handleBack = () => {
    setRole('');
  };

  if (!role) return <RoleSelect onSelect={handleSelect} />;
  if (role === 'Manager_Login') return <ManagerLogin onSuccess={handleManagerAuth} onBack={handleBack} />;
  if (role === 'Manager' && managerAuth) return <ManagerDashboard onLogout={handleLogout} />;
  return <MechanicDashboard onLogout={handleLogout} />;
}
