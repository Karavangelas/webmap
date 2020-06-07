import React, { useState }  from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './configureApolloClient';
import * as serviceWorker from './serviceWorker';
import Map from './containers/map/map';
import ReactTooltip from "react-tooltip";
import { getDefaultNormalizer } from '@testing-library/react';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);



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


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const rootElement = document.getElementById("root");
ReactDOM.render(<Home />, rootElement)
