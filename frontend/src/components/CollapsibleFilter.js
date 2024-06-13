import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CollapsibleFilter = ({ title, initialRouteState, attribute, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (initialRouteState.refinementList?.[attribute]?.length > 0) {
      setIsOpen(true);
    }
  }, [initialRouteState, attribute]);

  return (
    <div className="filter-container">
      <div className="filter-header" onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span>
        <span className={`chevron ${isOpen ? 'up' : 'down'}`}>▼</span>
      </div>
      {isOpen && <div className="filter-content">{children}</div>}
    </div>
  );
};

CollapsibleFilter.propTypes = {
  title: PropTypes.string.isRequired,
  initialRouteState: PropTypes.object.isRequired,
  attribute: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default CollapsibleFilter;
