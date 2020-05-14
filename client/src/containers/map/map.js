import React, { memo } from 'react';
import ReactDOM from 'react-dom';

import { 
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";
import "./styles.css";
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const Map = ({setTooltipContent, setSelectedContent}) => {
    return(
        <div>
            <ComposableMap data-tip="" width="900">
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map(geo => (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            onMouseEnter={() => {
                                const { NAME, POP_EST } = geo.properties;
                                setTooltipContent(`${NAME}`);
                            }}
                            onMouseLeave={() => {
                                setTooltipContent("");
                            }}
                            onClick={() => {
                                const { NAME } = geo.properties;
                                setSelectedContent(NAME) 
                            }}
                            style={{
                                default: {
                                    fill: "#D6D6DA",
                                    outline: "none"
                                },
                                hover: {
                                    fill: "#F53",
                                    outline: "none"
                                },
                                pressed: {
                                    fill: "#E42",
                                    outline: "none"
                                }
                            }}
                        />
                        ))
                    }
                </Geographies>
            </ComposableMap>
        </div>
    );
}


  
export default memo(Map);

