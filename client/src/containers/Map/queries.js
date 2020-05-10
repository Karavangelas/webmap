import { gql } from 'graphql.macro';

export const GET_COUNTRIES = gql`
  query GetCountries {
    getCountries {
      id
      name
    }
  }
`;
