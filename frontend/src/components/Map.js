import React, { useState, useEffect, useRef } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/Store';
import { fetchGeoData } from '../actions/fetchData';

const Map = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useStore();
  const { geoData, loadingGeoData } = state;
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [hoveredDepartment, setHoveredDepartment] = useState(null);
  const mapRef = useRef();
  const containerRef = useRef();
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!geoData && !loadingGeoData) {
      fetchGeoData(dispatch, () => state);
    }
  }, [geoData, loadingGeoData, dispatch, state]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const parentElement = containerRef.current;
        const computedStyle = window.getComputedStyle(parentElement);
        const parentHeight = parseFloat(computedStyle.height);
        const parentWidth = parseFloat(computedStyle.width);
        const aspectRatio = 205 / 210; // Largeur / Hauteur du ComposableMap
        const calculatedWidth = parentHeight * aspectRatio;

        console.log('calculatedWidth', calculatedWidth);
        console.log('parentWidth', parentWidth  );

        // Utiliser la plus petite valeur entre calculatedWidth et parentWidth
        const newWidth = Math.min(calculatedWidth, parentWidth);

        // Vérifier si la différence dépasse 10%
        if (Math.abs(newWidth - containerWidth) / containerWidth > 0.01) {
          setContainerWidth(newWidth);
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    const currentContainerRef = containerRef.current;
    if (currentContainerRef) {
      resizeObserver.observe(currentContainerRef);
    }

    return () => {
      if (currentContainerRef) {
        resizeObserver.unobserve(currentContainerRef);
      }
    };
  }, [containerWidth]);

  const handleClick = (geography) => {
    navigate(`/search?refinementList[hasDepartment][0]=${encodeURIComponent(geography.properties.nom)}`);
  };

  const handleMouseEnter = (geography, evt) => {
    setTooltipContent(`${geography.properties.nom} (${geography.properties.code})`);
    setTooltipPosition({ x: evt.clientX, y: evt.clientY });
    setHoveredDepartment(geography.rsmKey);
  };

  const handleMouseLeave = () => {
    setTooltipContent("");
    setHoveredDepartment(null);
  };

  const handleMouseMove = (evt) => {
    setTooltipPosition({ x: evt.clientX, y: evt.clientY });
  };

  return (
    <div ref={containerRef} style={{flexGrow:1, flexShrink:1, flexBasis:'600px', display:'flex', flexDirection:'column', alignItems:'center'}}>
      <div ref={mapRef} style={{ width: `${containerWidth}px` }}>
        <ComposableMap
          width={205}
          height={210}
          projection="geoAzimuthalEqualArea"
          projectionConfig={{
            rotate: [-10.0, -52.0, 0],
            center: [-5.15, -5.65],
            scale: 1200,
          }}
        >
          {geoData && (
            <Geographies geography={geoData}>
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
                      default: { fill: "#E1DFDD", outline: "none" },
                      hover: { fill: "#B9FF66", outline: "none" },
                      pressed: { fill: "#E42", outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>
          )}
          {geoData && (
            <Geographies geography={geoData}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <path
                    key={geo.rsmKey + "-border"}
                    d={geo.svgPath}
                    fill="none"
                    stroke={"#000"}
                    strokeWidth={hoveredDepartment === geo.rsmKey ? 0.5 : 0.2}
                  />
                ))
              }
            </Geographies>
          )}
        </ComposableMap>
        {tooltipContent && (
          <div
            style={{
              position: 'fixed',
              top: tooltipPosition.y - 50,
              left: tooltipPosition.x - 50,
              backgroundColor: 'white',
              padding: '5px',
              border: '1px solid black',
              borderRadius: '3px',
              pointerEvents: 'none',
              whiteSpace: 'nowrap'
            }}
          >
            {tooltipContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
