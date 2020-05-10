import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_COUNTRIES } from './queries';

const Countries = () => {
  const [countries, setCountries] = useState([]);

  useQuery(GET_COUNTRIES, { onCompleted: data => setCountries(data.getCountries) });

  return <>Hello World</>;
};

export default Countries;
