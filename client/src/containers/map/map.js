import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {compute_time_series_ISM} from '../../time_series_analysis';
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
const color_list = ['rgba(75,192,192,1)', 'rgba(0,100,0,1)', 'rgba(100,0,0,1)', 'rgba(0,0,100,1)', 'rgba(255,127,80,1)', 'rgba(139,69,19,1)'];
const color_list_pie = ['#FF6384', '#36A2EB', '#FFCE56', '#FFCB56'];
var dataset_template = {
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
    data: []
  };

var data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
    ]
};
var pie_dataset_template = {
    
    data: [],
    backgroundColor: [],
    hoverBackgroundColor: []
	
};
var data_pie = {
	labels: [],
	datasets: []
};

const country_name_mapping = {
    "United States of America" : "USA",
    "China" : "Mainland China",
    "Czechia" : "Czech Republic",
    "Dem. Rep. Congo" : "Democratic Republic of the Congo",
};

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const Map = ({setTooltipContent, setSelectedContent}) => {
    const [open, setOpen] = React.useState(false);
    const [clickedCountry, setClickedCountry] = React.useState("");
    const scroll = 'paper';

    const handleClose = () => {
        setOpen(false);
        data["labels"] = [];
        data["datasets"] = []; 
        data_pie["labels"] = [];
        data_pie["datasets"] = []; 
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
                                    var { NAME } = geo.properties;
                                    if (NAME in country_name_mapping){
                                        NAME = country_name_mapping[NAME];
                                    }
                                    var ism_data = compute_time_series_ISM(NAME);
                                    var num_to_display = Math.min(5, ism_data['num_ism']);
                                    data["labels"] = ism_data["labels"];
                                    for (var i = 0; i < num_to_display; i++){
                                        var new_dataset = JSON.parse(JSON.stringify(dataset_template));
                                        data["datasets"].push(new_dataset);
                                        data["datasets"][i]["data"] = ism_data["data"][ism_data["isms"][i]];
                                        data["datasets"][i]["borderColor"] = color_list[i];
                                        data["datasets"][i]["label"] =  ism_data["isms"][i];
                                    }
                                    num_to_display = Math.min(4, ism_data['num_ism']);
                                    var new_dataset = JSON.parse(JSON.stringify(pie_dataset_template));
                                    data_pie["datasets"].push(new_dataset);
                                    var ism_pie_keys = Object.keys(ism_data["pie"]);
                                    for (i = 0; i < num_to_display; i++){
                                        data_pie["datasets"][0]["data"].push(ism_data["pie"][ism_pie_keys[i]][1]);
                                        data_pie["labels"].push(ism_pie_keys[i]);
                                        data_pie["datasets"][0]["backgroundColor"].push(color_list_pie[i]);
                                        data_pie["datasets"][0]["hoverBackgroundColor"].push(color_list_pie[i]);
                                    }
                                    setSelectedContent(NAME);
                                    setOpen(true);
                                    setClickedCountry(NAME)
                                    console.log(data_pie);
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
                            <Pie data={data_pie} />
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

