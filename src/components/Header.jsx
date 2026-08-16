import './Header.css';

export default function Header({ role, onLogout }) {
    return (
        <header className="app-header">
            <div className="header-content">
                <div className="header-brand">
                    <img src="/logo.jpg" alt="Momentum Motorsports" className="header-logo" />
                </div>
                <div className="header-actions">
                    <span className="role-badge">{role}</span>
                    <button className="btn-logout" onClick={onLogout}>Switch Role</button>
                </div>
            </div>
        </header>
    );
}
