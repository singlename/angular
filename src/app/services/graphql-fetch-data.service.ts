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
import {Observable} from "apollo-client/util/Observable";

const backend_endpoint = 'http://d8-wa.dd:8083/graphql';

@Injectable()
export class GraphqlFetchDataService {

  // private endpoint: string;
  // private apolloClient;
  // private cache;

  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private httpBatchLink: BatchHttpLink) {

    const cache = new InMemoryCache({
        //addTypename: true,
        //fragmentMatcher: fragmentMacher
    });

    const persistedQueryLink: ApolloLink = createPersistedQueryLink({
      useGETForHashedQueries: false
    });
    const endpointHttpLink = this.httpLink.create({uri: backend_endpoint});
    const endpointHttpBatchLink = new BatchHttpLink();
    const queryBatchLink = endpointHttpLink.concat(endpointHttpBatchLink);

    const queryPostMiddleware: ApolloLink = new ApolloLink(
      (operation: Operation, forward: NextLink) => {
        const context = operation.getContext();
        if (context.http.includeQuery && context.method !== 'POST') {
          context.method = 'POST';
          operation.setContext(context);
        }
        return forward(operation);
      });

    const link = from([persistedQueryLink, queryPostMiddleware, queryBatchLink]) as any;

    this.apollo.create({
      link: link,
      cache,
      connectToDevTools: true
    });
  }

  getGraphqlQuery(operationName: string) {
    return queries.queries[operationName];
  }

  getGraphqlQueryResult(operationName: string) {

    const graphqlQuery = this.getGraphqlQuery(operationName);
    const apolloClient = this.apollo.getClient();

    const cachedResponse = apolloClient.cache.read({
      query: graphqlQuery.query,
      optimistic: true,
      rootId: operationName
    });

    if (cachedResponse) {
      return Observable.of({data: cachedResponse, fromCache: true});
    }

    return apolloClient.__requestRaw({
      query: graphqlQuery.query,
      operationName: operationName,
    });
  }
}
