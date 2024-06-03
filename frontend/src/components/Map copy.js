import React, {useState} from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { useNavigate } from 'react-router-dom';

const geoUrl = "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson";

const Map = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState({ coordinates: [2.213749, 46.227638], zoom: 20 });

  const handleMoveStart = (event) => {
    // event.preventDefault();
  };

  const handleMoveEnd = (event) => {
    // event.preventDefault();
  };

  const handleClick = (geography) => {
    const departmentCode = geography.properties.code;
    navigate(`/department/${departmentCode}`);
  };

  console.log('________________MAP')

  return (
    <ComposableMap >
        <ZoomableGroup
          center={position.coordinates}
          zoom={position.zoom}
          minZoom={position.zoom}
          maxZoom={position.zoom}
          onMoveStart={handleMoveStart}
          onMoveEnd={handleMoveEnd}
        >

        <Geographies geography={geoUrl} projectionConfig={{ scale: 2000 }}>
            {({ geographies }) =>
            geographies.map((geo) => (
                <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => handleClick(geo)}
                style={{
                    default: { fill: "#D6D6DA", outline: "none" },
                    hover: { fill: "#F53", outline: "none" },
                    pressed: { fill: "#E42", outline: "none" },
                }}
                />
            ))
            }
        </Geographies>
        </ZoomableGroup>
    </ComposableMap>
  );
};

export default Map;
