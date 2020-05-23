import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {Line, Pie} from 'react-chartjs-2';



import { 
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  ZoomableGroup
} from "react-simple-maps";
import "./styles.css";

// ALL OF THIS DATA IS JUST PLACE HOLDER
const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: 'My second dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(15,192,192,0.4)',
        borderColor: 'rgba(0,100,0,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [75, 69, 90, 91, 66, 65, 50]
      }
    ]
    
};

const data2 = {
	labels: [
		'Red',
		'Blue',
		'Yellow'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

// END OF PLACE HOLDER DATA

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const Map = ({setTooltipContent, setSelectedContent}) => {
    const [open, setOpen] = React.useState(false);
    const [clickedCountry, setClickedCountry] = React.useState("");
    const scroll = 'paper';

    const handleClose = () => {
        setOpen(false);
      };

    return(
        <div>
            <ComposableMap data-tip="" width="1500" height="600">
                <ZoomableGroup>
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
                                    setSelectedContent(NAME);
                                    setOpen(true);
                                    setClickedCountry(NAME)

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
                </ZoomableGroup>
            </ComposableMap>
            <Dialog
                open={open}
                fullWidth={true}
                maxWidth={'lg'}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description" 
            >
                <DialogTitle id="scroll-dialog-title">{clickedCountry}</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText>
                        <div>
                            <h2>Relative Abundance</h2>
                            <Line data={data} />
                        </div>
                        <div>
                            <h2>ISM Data</h2>
                            <Pie data={data2} />
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


  
export default memo(Map);

