import {Injectable, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GraphqlFetchDataService} from '../services/graphql-fetch-data.service';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
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

  getQueryResult(operationName: string) {
    return this.apolloService.getGraphqlQueryResult(operationName);
  }
}
