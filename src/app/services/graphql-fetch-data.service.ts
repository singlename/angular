import {Injectable} from '@angular/core';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloClient} from 'apollo-client';
import {queries} from '../graphql-module/queries/queries';
import {createPersistedQueryLink} from 'apollo-link-persisted-queries';
import {createHttpLink} from 'apollo-link-http';

@Injectable()
export class GraphqlFetchDataService {

  private endpoint = 'http://mylandoapp.lndo.site:32779/graphql';

  constructor() {
  }

  getGraphqlQueryResult(operationName: string) {

    let graphqlQuery = queries.queries[operationName];

    const link = createPersistedQueryLink({
      generateHash: () => graphqlQuery.hash,
      disable: () => true,
      useGETForHashedQueries: true
    })
      .concat(createHttpLink({uri: this.endpoint, useGETForQueries: true}));

    const apolloClient = new ApolloClient({
      cache: new InMemoryCache(),
      link: link,
    });

    return apolloClient.__requestRaw({
      query: graphqlQuery.query,
      operationName: operationName,
    });
  }
}
