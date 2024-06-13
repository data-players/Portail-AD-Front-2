import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as PortalSvgIcon } from '../assets/logos/common/SVG/logo blanc.svg';
import { ReactComponent as HomeIcon } from '../assets/logos/common/SVG/home.svg';
import { ReactComponent as ExploreIcon } from '../assets/logos/common/SVG/cas_dusage.svg';
import { ReactComponent as SearchIcon } from '../assets/logos/common/SVG/rechercher_selected.svg';
import { ReactComponent as ContributeIcon } from '../assets/logos/common/SVG/contribuer.svg';
import { ReactComponent as AssistantIcon } from '../assets/logos/common/SVG/assistance.svg';
import './SideBar.css';

const routes = [
  { path: '/home', label: 'Accueil', section: 'middle', icon: <HomeIcon /> },
  { path: '/explore', label: 'Explorer', section: 'middle', icon: <ExploreIcon /> },
  { path: '/search', label: 'Rechercher', section: 'middle', icon: <SearchIcon /> },
  { path: '/contribute', label: 'Contribuer', section: 'bottom', icon: <ContributeIcon /> },
  { path: '/assistant', label: 'Assistance', section: 'bottom', icon: <AssistantIcon /> },
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
          <div className="link-content">
            <div>{route.icon}</div>
            <div>{route.label}</div>
          </div>
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
