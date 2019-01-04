import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {queries} from '../graphql-module/queries/queries';
import { print } from 'graphql/language/printer';
import gql from "graphql-tag";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class GraphqlDevModule {

  constructor() {
    // @todo export queries to d8 though HTTP
    this.exportQueriesToJson();
  }

  // Generate queries for D8 query map import
  private exportQueriesToJson() {
    Object.entries(queries.queries).forEach(
      ([key, value]) => {
        console.log('{' + JSON.stringify(print(value.query)) + ': ' + 0 + '}');
      }
    );
  }
}
