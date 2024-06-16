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

  // const [dimensions, setDimensions] = useState({
  //   width: 0,
  //   height: 0,
  // });

  useEffect(() => {
    if (!geoData && !loadingGeoData) {
      fetchGeoData(dispatch, () => state);
    }
  }, [geoData, loadingGeoData, dispatch]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (mapRef.current) {
  //       console.log('mapRef.current:', mapRef.current);
  //       console.log('offsetWidth:', mapRef.current.offsetWidth);
  //       setDimensions({
  //         width: mapRef.current.offsetWidth,
  //         height: mapRef.current.offsetHeight,
  //       });
  //     }
  //   };

  //   window.addEventListener('resize', handleResize);
  //   handleResize();

  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

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
  // console.log('dimensions.width',dimensions.width);
  return (
    <div ref={mapRef}>
      <ComposableMap
        width={210}
        height={210}
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [-10.0, -52.0, 0],
          center: [-5, -5.5],
          scale:1200,
          // scale: dimensions.width * 4,
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
  );
};

export default Map;
