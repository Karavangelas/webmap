import React, { useState }  from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Map from './containers/map/map';
import ReactTooltip from "react-tooltip";
import Paper from '@material-ui/core/Paper';
import Tabs from './containers/tabs/Tabs';
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
      <h1>Covid-19 WebMap</h1>
     <Tabs>
      <div label="Map">
        <Home />
      </div>
      <div label="Acknowledgements">
        Acknowledgements link and table
      </div>
      <div label="About">
        Project Information
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

//const rootElement = document.getElementById("root");
ReactDOM.render(<AppTabs />, container);
