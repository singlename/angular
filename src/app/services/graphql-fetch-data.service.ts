import {Injectable} from '@angular/core';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {queries} from '../graphql-module/queries/queries';
import {createPersistedQueryLink} from 'apollo-link-persisted-queries';
import {Apollo} from 'apollo-angular';
import {createHttpLink} from 'apollo-link-http';
import {ApolloLink, from, NextLink, Operation} from 'apollo-link';
import {BatchHttpLink} from 'apollo-link-batch-http';
import {Observable} from "apollo-client/util/Observable";
import {fragmentMatcher} from "./fragment-macher";

const backend_endpoint = 'http://d8-wa.dd:8083/graphql';

export interface GraphQLRequestPayload {
  query: any,
  operationName: string,
  variables?: Object,
  extensions?: {
    persistedQuery?: {
      version: number,
      sha256Hash: string
    },
  },
}

@Injectable()
export class GraphqlFetchDataService {

  constructor(
    private apollo: Apollo) {

    const cache = new InMemoryCache({fragmentMatcher});

    const endpointHttpLink = createHttpLink({uri: backend_endpoint, useGETForQueries: true});
    const queryPersistedLink = createPersistedQueryLink({
      useGETForHashedQueries: true,
    });

    // @todo, swithc apollo to apollo client
    //const endpointHttpBatchLink = new BatchHttpLink();

    const queryPostMiddleware: ApolloLink = new ApolloLink(
      (operation: Operation, forward: NextLink) => {
        const context = operation.getContext();
        if (context.method !== 'GET') {
          context.method = 'GET';
          operation.setContext(context);
        }
        return forward(operation);
      });

    const logger = new ApolloLink(function (operation, forward) {
      return forward(operation).map(function (result) {
        const context = operation.getContext();
        if (context.method !== 'GET') {
          context.method = 'GET';
          operation.setContext(context);
        }
        console.log(operation, result);
        return result;
      });
    });

    const link = queryPersistedLink.concat(endpointHttpLink);
    this.apollo.create({
      link: link,
      cache,
      //connectToDevTools: true //connects to Apollo extention for browser
    });
  }

  getGraphqlQuery(operationName: string) {
    return queries.queries[operationName];
  }

  getGraphqlQueryResult(operationName: string, params: Object) {

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

    let payload: GraphQLRequestPayload = {
      query: graphqlQuery.query,
      operationName: operationName,
    };
    payload.variables = params;

    return apolloClient.__requestRaw(payload);
  }
}
