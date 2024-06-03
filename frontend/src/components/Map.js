import React from 'react';
import { ComposableMap, Geographies, Geography} from 'react-simple-maps';
import { useNavigate } from 'react-router-dom';

const geoUrl = "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson";

const Map = () => {
  const navigate = useNavigate();

  const handleClick = (geography) => {
    navigate(`/search?refinementList[hasDepartment][0]=${encodeURIComponent(geography.properties.nom)}`);
  };

  return (
    <ComposableMap
      projection="geoAzimuthalEqualArea"
      projectionConfig={{
        rotate: [-10.0, -52.0, 0],
        center: [-5, -6],
        scale: 2000
      }}
      height = "400"
    >

        <Geographies geography={geoUrl}>
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
    </ComposableMap>
  );
};

export default Map;
