import React, { useState }  from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './configureApolloClient';
import * as serviceWorker from './serviceWorker';
import Map from './containers/map/map';
import ReactTooltip from "react-tooltip";
import Paper from '@material-ui/core/Paper';
ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

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
      <h2>WebMap</h2>
      <p></p>
     <Tabs>
      <div label="WebMap">
        <Home />
      </div>
      <div label="Acknowledgements">
        <h3>Acknowledgements list</h3>
        <a href="https://raw.githubusercontent.com/EESI/ISM/master/acknowledgement_table.csv" target="_blank" rel="noopener noreferrer">Click here to download list</a>
        <p></p>
        <p align="justify">We would like to thank GISAID and <a href="https://github.com/nextstrain" target="_blank" rel="noopener noreferrer">Nextstrain</a> for sharing the sequence data and metadata.
         We also gratefully acknowledge the authors, originating and submitting laboratories of the sequences from GISAID’s EpiFlu Database on which this research is based.
          All submitters of data may be contacted directly via the <a href="https://www.gisaid.org/" target="_blank" rel="noopener noreferrer">GISAID</a> website.</p>
      </div>
      <div label="Info">
        <h3>Project Information and Source Code</h3>
        <p></p>
        <a href="https://github.com/EESI/ISM" target="_blank" rel="noopener noreferrer">ISM GitHub link</a>
        <p></p>
        <p align="justify"><b><u>General Info</u></b></p>
        <p align="justify">The Covid-19 WebMap is a website created to display Covid-19 data in an interactive way. This is done with the use of ISMs, 
        which are described in the section below. The interactive WebMap allows users to click on a certain country on the map, and visualize important 
        Covid-19 data regarding a specific country. This data includes relative abundance graphs and ISM pie charts.
        </p>
        <p></p>
        <p align="justify"><b><u>ISM</u></b></p>
        <p align="justify">Informative Subtype Markers (ISM) is an efficient framework for genetic subtyping of a pandemic virus and is implemented for SARS-CoV-2, the novel coronavirus that causes COVID-19. 
        The use of ISMs permits subtyping individual SARS-CoV-2 virus genomes, and in essence generating a signature that can be readily used to track viral evolution through geography and time.</p>
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
