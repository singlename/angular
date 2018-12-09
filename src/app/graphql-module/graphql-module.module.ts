import {Injectable, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import './queries/queriesInterface';
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

  getQueryResult(operationName: string) {
    return this.apolloService.getGraphqlQueryResult(operationName);
  }

  getGraphqlQueryResult(operationName: string) {

    // let graphqlQuery = queries.queries[operationName];
    //
    // const link = createPersistedQueryLink({
    //   generateHash: () => graphqlQuery.hash,
    //   disable: () => true,
    //   useGETForHashedQueries: true
    // })
    //   .concat(createHttpLink({uri: endpoint, useGETForQueries: true}));
    // this.apolloClient.link = link;
    //
    // this.apolloClient.__requestRaw({
    //   query: graphqlQuery.query,
    //   operationName: operationName,
    //
    // }).subscribe(result => {
    //   console.log(result);
    // });
  }
}
