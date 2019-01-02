import {Injectable} from '@angular/core';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {queries} from '../graphql-module/queries/queries';
import {createPersistedQueryLink} from 'apollo-link-persisted-queries';
import {Apollo} from 'apollo-angular';
import {HttpLink} from 'apollo-angular-link-http';
import {ApolloLink, from, NextLink, Operation} from 'apollo-link';
import {BatchHttpLink} from 'apollo-link-batch-http';
import {Observable} from "apollo-client/util/Observable";

const backend_endpoint = 'http://d8-wa.dd:8083/graphql';

export interface GraphQLRequestPayload {
  query: any,
  operationName: string,
  extensions?: {
    persistedQuery?: {
      version: number,
      sha256Hash: string
    }
  }
}

@Injectable()
export class GraphqlFetchDataService {

  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink) {

    const cache = new InMemoryCache({
    });

    const endpointHttpLink = this.httpLink.create({uri: backend_endpoint, method: 'GET'});
    const queryPersistedLink = createPersistedQueryLink({
      useGETForHashedQueries: true,
    });


    // const endpointHttpBatchLink = new BatchHttpLink();
    //
    // const queryPostMiddleware: ApolloLink = new ApolloLink(
    //   (operation: Operation, forward: NextLink) => {
    //     const context = operation.getContext();
    //     if (context.method !== 'POST') {
    //       context.method = 'POST';
    //       operation.setContext(context);
    //     }
    //     console.log('forward: ', operation);
    //     return forward(operation);
    //   });

    const logger = new ApolloLink(function (operation, forward) {
      return forward(operation).map(function (result) {
        console.log(operation.getContext());
        console.log(operation, result);
        return result;
      });
    });

    const link = from([logger, queryPersistedLink.concat(endpointHttpLink)]);
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

    const payload: GraphQLRequestPayload = {
      query: graphqlQuery.query,
      operationName: operationName,
    };
    if (graphqlQuery.hash) {
      payload.extensions = {
        persistedQuery: {
          version: 1,
          sha256Hash: graphqlQuery.hash
        }
      }
    }

    return apolloClient.__requestRaw(payload);
  }
}
