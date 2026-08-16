import { useState } from 'react';
import RoleSelect from './pages/RoleSelect';
import ManagerDashboard from './pages/ManagerDashboard';
import MechanicDashboard from './pages/MechanicDashboard';

export default function App() {
  const [role, setRole] = useState(() => sessionStorage.getItem('momentum_role') || '');

  const handleSelect = (r) => {
    sessionStorage.setItem('momentum_role', r);
    setRole(r);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('momentum_role');
    setRole('');
  };

  if (!role) return <RoleSelect onSelect={handleSelect} />;
  if (role === 'Manager') return <ManagerDashboard onLogout={handleLogout} />;
  return <MechanicDashboard onLogout={handleLogout} />;
}
