import React, { useState, useEffect, useRef } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { useNavigate } from 'react-router-dom';

const geoUrl = "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson";

const Map = () => {
  const navigate = useNavigate();
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const mapRef = useRef();

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        setDimensions({
          width: mapRef.current.offsetWidth,
          height: mapRef.current.offsetWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = (geography) => {
    navigate(`/search?refinementList[hasDepartment][0]=${encodeURIComponent(geography.properties.nom)}`);
  };

  const handleMouseEnter = (geography, evt) => {
    setTooltipContent(`${geography.properties.nom} (${geography.properties.code})`);
    setTooltipPosition({ x: evt.clientX, y: evt.clientY });
  };

  const handleMouseLeave = () => {
    setTooltipContent("");
  };

  const handleMouseMove = (evt) => {
    setTooltipPosition({ x: evt.clientX, y: evt.clientY });
  };

  return (
    <div ref={mapRef}>
      <ComposableMap
        width={dimensions.width}
        height={dimensions.height}
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [-10.0, -52.0, 0],
          center: [-5, -6],
          scale: dimensions.width*5,
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => handleClick(geo)}
                onMouseEnter={(evt) => handleMouseEnter(geo, evt)}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                style={{
                  default: { fill: "#D6D6DA", outline: "none" },
                  hover: { fill: "#88BDED", outline: "none" },
                  pressed: { fill: "#E42", outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
      {tooltipContent && (
        <div
          style={{
            position: 'fixed', // Utilisez 'fixed' pour que l'infobulle suive la souris indépendamment du défilement
            top: tooltipPosition.y-50, // Ajustez cette valeur pour positionner l'infobulle juste en dessous de la souris
            left: tooltipPosition.x-50, // Ajustez cette valeur pour positionner l'infobulle juste à droite de la souris
            backgroundColor: 'white',
            padding: '5px',
            border: '1px solid black',
            borderRadius: '3px',
            pointerEvents: 'none',
            whiteSpace: 'nowrap' // Empêcher le texte de se casser
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default Map;
