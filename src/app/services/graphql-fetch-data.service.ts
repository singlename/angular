import {Inject, Injectable} from '@angular/core';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloClient} from 'apollo-client';
import {queries} from '../graphql-module/queries/queries';
import {createPersistedQueryLink} from 'apollo-link-persisted-queries';
import {fragmentMacher} from './fragment-macher';
import {Apollo, APOLLO_OPTIONS} from 'apollo-angular';
import gql from 'graphql-tag';
import {HttpLink} from 'apollo-angular-link-http';
import {ApolloLink, from, NextLink, Operation} from 'apollo-link';
import {BatchHttpLink} from 'apollo-link-batch-http';

const backend_endpoint = 'http://mylandoapp.lndo.site/graphql';

@Injectable()
export class GraphqlFetchDataService {

  // private endpoint: string;
  // private apolloClient;
  // private cache;

  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private httpBatchLink: BatchHttpLink) {
    // this.endpoint = 'http://mylandoapp.lndo.site:32779/graphql';
    // this.cache = new InMemoryCache({
    //   addTypename: true,
    //   fragmentMatcher: fragmentMacher
    // });
    // this.apolloClient = new ApolloClient({
    //   cache: this.cache,
    //   link: createHttpLink({uri: this.endpoint, useGETForQueries: true}),
    // });

    const cache = new InMemoryCache({
      addTypename: true,
      fragmentMatcher: fragmentMacher
    });

    const persistedQueryLink: ApolloLink = createPersistedQueryLink({
      useGETForHashedQueries: true
    });
    const endpointHttpLink = this.httpLink.create({uri: backend_endpoint});
    const endpointHttpBatchLink = this.httpBatchLink.concat(endpointHttpLink);

    const queryPostMiddleware: ApolloLink = new ApolloLink(
      (operation: Operation, forward: NextLink) => {
        const context = operation.getContext();
        if (context.http.includeQuery && context.method !== 'GET') {
          context.method = 'GET';
          operation.setContext(context);
        }
        return forward(operation);
      });

    const link = from([persistedQueryLink, queryPostMiddleware, endpointHttpBatchLink]) as any;

    this.apollo.create({
      link: link,
      cache
    });
  }

  getGraphqlQueryResult(operationName: string) {

    const graphqlQuery = queries.queries[operationName];
    const apolloClient = this.apollo.getClient();
    const link = createPersistedQueryLink({
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
