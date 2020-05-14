import React, { useState }  from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';
import Map from './containers/map/map';
import ReactTooltip from "react-tooltip";



function Home() {
  const [tooltip, setTooltip] = useState("");
  const [selected, setSelected] = useState("");
  return(
    <div class="map">
      <Map setTooltipContent={setTooltip} setSelectedContent={setSelected}/>
      <ReactTooltip>{tooltip}</ReactTooltip>
      <h1>{selected}</h1>
    </div>
  );
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const rootElement = document.getElementById("root");
ReactDOM.render(<Home />, rootElement)
