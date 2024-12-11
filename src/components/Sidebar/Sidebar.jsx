import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h1 className="sidebar-title">WATCH</h1>
            <ul className="sidebar-menu">
                <li className="menu-item">Home</li>
                <li className="menu-item active">Favourites</li>
                <li className="menu-item">Trending</li>
                <li className="menu-item">Coming Soon</li>
            </ul>
            {/* <div className="sidebar-footer">
                <button className="menu-item">Settings</button>
                <button className="menu-item">Logout</button>
            </div> */}
        </div>
    );
};

export default Sidebar;
