import { ApolloClient } from 'apollo-client';

import { InMemoryCache } from 'apollo-cache-inmemory';

export const client = new ApolloClient({ link: [], cache: new InMemoryCache() });
