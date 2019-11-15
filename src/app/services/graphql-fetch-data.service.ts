import {Injectable} from '@angular/core';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {queries, QueryParams} from '../graphql-module/queries/queries';
import {createPersistedQueryLink} from 'apollo-link-persisted-queries';
import {Apollo} from 'apollo-angular';
import {createHttpLink} from 'apollo-link-http';
import {ApolloLink, GraphQLRequest, NextLink, Operation} from 'apollo-link';
import {Observable} from 'apollo-client/util/Observable';
import {fragmentMatcher} from './fragment-macher';
import gql from 'graphql-tag';
import {environment} from '../../environments/environment';

export interface GraphQLRequestPayload {
  query: any;
  operationName: string;
  variables?: Object;
  extensions?: {
    persistedQuery?: {
      version: number,
      sha256Hash: string
    },
  };
}

@Injectable()
export class GraphqlFetchDataService {

  constructor(
    private apollo: Apollo) {
    const backend_endpoint = environment.backend_endpoint.concat('/graphql');
    const cache = new InMemoryCache({fragmentMatcher});

    const endpointHttpLink = createHttpLink({uri: backend_endpoint, useGETForQueries: true});
    const queryPersistedLink = createPersistedQueryLink({
      useGETForHashedQueries: true,
    });

    // @todo, swithc apollo to apollo client
    // const endpointHttpBatchLink = new BatchHttpLink();

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
      // connectToDevTools: true //connects to Apollo extention for browser
    });
  }

  getGraphqlQuery(operationName: string) {
    return queries.queries[operationName];
  }

  returnCachedFragment(apolloClient, cacheParameters, index, cachedResponse) {
    const originalId = cacheParameters.id;
    cacheParameters.id = cacheParameters.id.concat(index);
    const response = apolloClient.readFragment(cacheParameters);
    cacheParameters.id = originalId;
    if (response) {
      cachedResponse = (cachedResponse) ? cachedResponse : [];
      cachedResponse.push(response);
      index++;
      return this.returnCachedFragment(apolloClient, cacheParameters, index, cachedResponse);
    }
    return cachedResponse;
  }

  getGraphqlQueryResult(operationName: string, parametric: string, params: QueryParams) {

    const graphqlQuery = this.getGraphqlQuery(operationName);
    const apolloClient = this.apollo.getClient();

    let cachedResponse: any;
    if (graphqlQuery.fragment) {
      const cacheParameters = {
        fragment: gql(this.getGraphqlQuery(graphqlQuery.fragment).query),
        fragmentName: graphqlQuery.fragment,
        id: operationName.concat(parametric),
      };
      if (graphqlQuery.resultIsMultipleFragments) {
        // try read multiple fragments
        const index = 0;
        let cachedResponse: any;
        cachedResponse = this.returnCachedFragment(apolloClient, cacheParameters, index, cachedResponse);
      } else {
        cachedResponse = apolloClient.readFragment(cacheParameters);
      }
    } else {
      cachedResponse = apolloClient.cache.read({
        query: gql(graphqlQuery.query),
        optimistic: true,
        rootId: operationName + parametric,
      });
    }
    if (cachedResponse) {
      console.log('cached response', cachedResponse);
      return Observable.of({data: cachedResponse, fromCache: true});
    }

    const payload: GraphQLRequestPayload = {
      query: gql(graphqlQuery.query),
      operationName: operationName,
    };
    if (graphqlQuery.fragment) {
      payload.query = gql(graphqlQuery.query.concat(this.getGraphqlQuery(graphqlQuery.fragment).query));
    }

    payload.variables = params;
    return apolloClient.__requestRaw(payload);
  }
}
