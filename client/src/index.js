import React, { useState }  from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Map from './containers/map/map';
import ReactTooltip from "react-tooltip";
import Paper from '@material-ui/core/Paper';
import Tabs from './containers/tabs/Tabs';
import 'bootstrap/dist/css/bootstrap.css';
require('./containers/tabs/styles.css');


function Home() {
  const [tooltip, setTooltip] = useState("");
  const [selected, setSelected] = useState("");
  return(
    <div class="Map">
      <Paper elevation={10}>
      <Map setTooltipContent={setTooltip} setSelectedContent={setSelected}/>
      <ReactTooltip>{tooltip}</ReactTooltip>
      <h1>{selected}</h1>
      </Paper>
    </div>
  );
}

function AppTabs() {
  return (
    <div>
    <p></p>
      <h2>ISM WebMap</h2>
      <p></p>
     <Tabs>
      <div label="WebMap">
        <Home />
      </div>
      <div label="Acknowledgements">
        <h3>Acknowledgements and link</h3>
        <a href="https://raw.githubusercontent.com/EESI/ISM/master/acknowledgement_table.csv" target="_blank" rel="noopener noreferrer">Click here to download csv</a>
        <p></p>
        <p align="justify">We would like to thank GISAID and Nextstrain for sharing the sequence data and metadata.
         We also gratefully acknowledge the authors, originating and submitting laboratories of the sequences from GISAID’s EpiFlu Database on which this research is based.
          The list is detailed in here. All submitters of data may be contacted directly via the <a href="https://www.gisaid.org/" target="_blank" rel="noopener noreferrer">GISAID</a> website.</p>
      </div>
      <div label="Info">
        <h3>Project Information and Source Code</h3>
      </div>
    </Tabs>
    </div>
  );

}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const container = document.createElement('div');
document.body.appendChild(container);

const rootElement = document.getElementById("root");
ReactDOM.render(<AppTabs />, rootElement);
