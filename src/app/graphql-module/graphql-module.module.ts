import {Injectable, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GraphqlFetchDataService} from '../services/graphql-fetch-data.service';
import { introspectionQuery } from 'graphql';
import {QueryParams} from "./queries/queries";

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

  cacheQueryResult(OperationName: string, parametric: string, response: any) {
    const query = this.getQuery(OperationName).query;
    this.apolloService.apollo.getClient().cache.write({
      dataId: OperationName + parametric,
      query: query,
      result: response,
    });
  }
}
