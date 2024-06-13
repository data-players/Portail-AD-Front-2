import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import { ReactComponent as ContributeIcon } from '../assets/logos/common/SVG/contribuer.svg';
import { ReactComponent as AssistantIcon } from '../assets/logos/common/SVG/assistance.svg';
import { ReactComponent as HomeIcon } from '../assets/logos/common/SVG/home.svg';
import { ReactComponent as ExploreIcon } from '../assets/logos/common/SVG/cas_dusage.svg';
import { ReactComponent as SearchIcon } from '../assets/logos/common/SVG/rechercher_selected.svg';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <header>
        <h1>Portail de l'Alimentation Durable</h1>
      </header>
      <div className="icons-container">
        <a href="https://www.portail-alimentation-durable.fr/" target="_blank" rel="noopener noreferrer">
          <HomeIcon className="inverted-icon" />
          <p>Projet</p>
        </a>
      </div>
      <div className="icons-container">
        <Link to="/explore">
          <ExploreIcon className="inverted-icon" />
          <p>Explorer</p>
        </Link>
        <Link to="/search">
          <SearchIcon className="inverted-icon" />
          <p>Rechercher</p>
        </Link>
      </div>
      <div className="icons-container">
        <a href="https://wiki.portail-alimentation-durable.fr/" target="_blank" rel="noopener noreferrer">
          <ContributeIcon className="inverted-icon" />
          <p>Contribuer</p>
        </a>
        <a href="https://wiki.portail-alimentation-durable.fr/" target="_blank" rel="noopener noreferrer">
          <AssistantIcon className="inverted-icon" />
          <p>Assistance</p>
        </a>
      </div>
    </div>
  );
};

export default HomePage;
