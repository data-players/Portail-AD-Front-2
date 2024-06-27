import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as PortalSvgIcon } from '../assets/logos/common/SVG/logo blanc.svg';
import { ReactComponent as ExploreIcon } from '../assets/logos/common/SVG/explorer.svg';
import { ReactComponent as SearchIcon } from '../assets/logos/common/SVG/rechercher.svg';
import { ReactComponent as WikiIcon } from '../assets/logos/common/SVG/wiki.svg';
import './SideBar.css';

const routes = [
  { path: '/search', label: 'Rechercher', section: 'middle', icon: <SearchIcon />, id: 'search-link' },
  { path: '/explore', label: 'Explorer', section: 'middle', icon: <ExploreIcon />, id: 'explore-link' },
  { path: 'https://wiki.portail-alimentation-durable.fr', label: 'Wiki', section: 'bottom', icon: <WikiIcon />, id: 'wiki-link', isExternal: true },
];

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const renderLinks = (section) => {
    return routes
      .filter(route => route.section === section)
      .map(route => {
        if (route.isExternal) {
          return (
            <a
              key={route.path}
              href={route.path}
              id={route.id}
              className={`${currentPath === route.path ? 'active' : ''} external-link`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="link-content">
                <div>{route.icon}</div>
                <div>{route.label}</div>
              </div>
            </a>
          );
        } else {
          return (
            <Link
              key={route.path}
              to={route.path}
              id={route.id}
              className={`${currentPath === route.path ? 'active' : ''}`}
            >
              <div className="link-content">
                <div>{route.icon}</div>
                <div>{route.label}</div>
              </div>
            </Link>
          );
        }
      });
  };

  return (
    <div className="sidebar">
      <div className="sidebar-icon">
        <Link to={`/search`}><PortalSvgIcon style={{ width: '40px', height: '40px' }} /></Link>
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
