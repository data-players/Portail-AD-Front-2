import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as PortalSvgIcon } from '../assets/icone.svg';
// import './Sidebar.css';

const routes = [
  { path: '/home', label: 'Accueil', section: 'middle' },
  { path: '/explore', label: 'Explorer', section: 'middle' },
  { path: '/search', label: 'Rechercher', section: 'middle' },
  { path: '/contribute', label: 'Contribuer', section: 'bottom' },
  { path: '/assistant', label: 'Assistance', section: 'bottom' },
];

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const renderLinks = (section) => {
    return routes
      .filter(route => route.section === section)
      .map(route => (
        <Link
          key={route.path}
          to={route.path}
          className={currentPath === route.path ? 'active' : ''}
        >
          {route.label}
        </Link>
      ));
  };

  return (
    <div className="sidebar">
      <div className="sidebar-icon">
        <Link to={`/home`}><PortalSvgIcon /></Link>
      </div>
      <div className="sidebar-middle">
        {renderLinks('middle')}
      </div>
      <div className="sidebar-bottom">
        {renderLinks('bottom')}
      </div>
    </div>
  );
};

export default Sidebar;
