import {Injectable, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GraphqlFetchDataService} from '../services/graphql-fetch-data.service';

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

  getQueryResult(operationName: string) {
    return this.apolloService.getGraphqlQueryResult(operationName);
  }

  cacheQueryResult(dataId: string, query: string, response: any) {
    this.apolloService.apollo.getClient().cache.write({dataId: dataId, query: query, result: response});
  }
}
