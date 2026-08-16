import './RoleSelect.css';

export default function RoleSelect({ onSelect }) {
    return (
        <div className="role-page">
            <div className="role-container">
                <div className="role-header">
                    <img src="/logo.jpg" alt="Momentum Motorsports" className="role-logo" />
                    <p className="role-app-subtitle">Inventory Management System</p>
                </div>
                <p className="role-prompt">Select your role to continue</p>
                <div className="role-cards">
                    <button className="role-card" onClick={() => onSelect('Manager')}>
                        <div className="role-icon-wrap">
                            <svg className="role-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                        </div>
                        <span className="role-name">Manager</span>
                        <span className="role-desc">Full access to add, edit, issue, and manage inventory</span>
                    </button>
                    <button className="role-card" onClick={() => onSelect('Mechanic')}>
                        <div className="role-icon-wrap">
                            <svg className="role-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
                        </div>
                        <span className="role-name">Mechanic</span>
                        <span className="role-desc">View-only access to inventory and transaction history</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
