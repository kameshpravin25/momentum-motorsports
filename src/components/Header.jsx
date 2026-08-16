import './Header.css';

export default function Header({ role, onLogout }) {
    return (
        <header className="app-header">
            <div className="header-content">
                <div className="header-brand">
                    <h1 className="header-title">Momentum Motorsports</h1>
                    <p className="header-subtitle">Race Team Spares & Issue / Return Management</p>
                </div>
                <div className="header-actions">
                    <span className="role-badge">{role}</span>
                    <button className="btn-logout" onClick={onLogout}>Switch Role</button>
                </div>
            </div>
        </header>
    );
}
