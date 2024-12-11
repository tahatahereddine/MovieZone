import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <nav className="header-nav">
                <ul className="nav-menu">
                    <li className="nav-item">Movies</li>
                    <li className="nav-item">Series</li>
                    <li className="nav-item">Documentaries</li>
                </ul>
            </nav>
            <div className="header-actions">
                <button className="icon-button">🔔</button>
                <button className="icon-button">👤</button>
            </div>
        </header>
    );
};

export default Header;
