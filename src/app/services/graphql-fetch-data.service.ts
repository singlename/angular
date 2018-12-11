import {Injectable} from '@angular/core';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloClient} from 'apollo-client';
import {queries} from '../graphql-module/queries/queries';
import {createPersistedQueryLink} from 'apollo-link-persisted-queries';
import {createHttpLink} from 'apollo-link-http';
import {fragmentMacher} from './fragment-macher';

@Injectable()
export class GraphqlFetchDataService {

  private endpoint:string;
  private apolloClient;
  private cache;

  constructor() {
    this.endpoint = 'http://mylandoapp.lndo.site:32779/graphql';
    this.cache = new InMemoryCache({
      addTypename: true,
      fragmentMatcher: fragmentMacher
    });
  }

  getGraphqlQueryResult(operationName: string) {

    let graphqlQuery = queries.queries[operationName];
    let link = createPersistedQueryLink({
      generateHash: () => graphqlQuery.hash,
      disable: () => true,
      useGETForHashedQueries: true
    })
      .concat(createHttpLink({uri: this.endpoint, useGETForQueries: true}));
    if (this.apolloClient) {
      this.apolloClient.link = link;
    } else {
      this.apolloClient = new ApolloClient({
        cache: this.cache,
        link: link,
      });
    }

    return this.apolloClient.__requestRaw({
      query: graphqlQuery.query,
      operationName: operationName,
    });
  }
}
