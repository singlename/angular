import {Injectable} from '@angular/core';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloClient} from 'apollo-client';
import {queries} from '../graphql-module/queries/queries';
import {createPersistedQueryLink} from 'apollo-link-persisted-queries';
import {createHttpLink} from 'apollo-link-http';
import {fragmentMacher} from './fragment-macher';
import {Apollo, APOLLO_OPTIONS} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable()
export class GraphqlFetchDataService {

  // private endpoint: string;
  // private apolloClient;
  // private cache;

  constructor(APOLLO_OPTIONS, private apollo: Apollo) {
    //this.endpoint = 'http://mylandoapp.lndo.site:32779/graphql';
    // this.cache = new InMemoryCache({
    //   addTypename: true,
    //   fragmentMatcher: fragmentMacher
    // });
    // this.apolloClient = new ApolloClient({
    //   cache: this.cache,
    //   link: createHttpLink({uri: this.endpoint, useGETForQueries: true}),
    // });
    console.log(APOLLO_OPTIONS);
  }

  getGraphqlQueryResult(operationName: string) {

    let graphqlQuery = queries.queries[operationName];
    let apolloClient = this.apollo.getClient();
    let link = createPersistedQueryLink({
      generateHash: () => graphqlQuery.hash,
      disable: () => true,
      useGETForHashedQueries: true
    })
      .concat(this.apollo.getClient().link);
    apolloClient.link = link;

    return apolloClient.__requestRaw({
      query: graphqlQuery.query,
      operationName: operationName,
    });
  }
}
