import {Injectable, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GraphqlFetchDataService} from '../services/graphql-fetch-data.service';
import { introspectionQuery } from 'graphql';
import {QueryParams} from "./queries/queries";
import gql from "graphql-tag";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
@Injectable()
export class GraphqlModule {

  private apolloService;

  constructor(private service: GraphqlFetchDataService) {
    this.apolloService = service;
  }

  getQuery(operationName: string) {
    return this.apolloService.getGraphqlQuery(operationName);
  }

  getQueryResult(operationName: string, parametric: string, params: QueryParams) {
    return this.apolloService.getGraphqlQueryResult(operationName, parametric, params);
  }

  cacheQueryResult(OperationName: string, parametric: string, response: any, fragmentData: any) {
    const request = this.getQuery(OperationName);
    let query = request.query;
    if (request.fragment && fragmentData) {
      query = this.getQuery(request.fragment).query;
      console.log(query);
      this.apolloService.apollo.getClient().cache.writeFragment({
        fragmentName: request.fragment,
        fragment: gql(query),
        id: OperationName.concat(parametric),
        data: fragmentData
      });
      // Only one operation allowed, write fragment or query
      return;
    }

    this.apolloService.apollo.getClient().cache.write({
      dataId: OperationName + parametric,
      query: gql(query),
      result: response,
    });
  }
}
