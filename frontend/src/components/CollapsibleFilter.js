import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './CollapsibleFilter.css';

const CollapsibleFilter = ({ title, initialRouteState, attribute, children, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (initialRouteState.refinementList?.[attribute]?.length > 0) {
      setIsOpen(true);
    }
  }, [initialRouteState, attribute]);

  return (
    <div className="filter-container">
      <div className="filter-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="filter-header-content">
          {icon && <span className="filter-icon">{icon}</span>}
          <span className='body2 filter-title'>{title}</span>
        </div>
        <span className={`chevron ${isOpen ? 'up' : 'down'}`}>▼</span>
      </div>
      {isOpen && (
        <div className="filter-content">
          {children}
        </div>
      )}
    </div>
  );
};

CollapsibleFilter.propTypes = {
  title: PropTypes.string.isRequired,
  initialRouteState: PropTypes.object.isRequired,
  attribute: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  icon: PropTypes.node
};

export default CollapsibleFilter;
