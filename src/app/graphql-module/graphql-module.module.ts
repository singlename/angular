import {Injectable, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createPersistedQueryLink } from "apollo-link-persisted-queries";
import {ApolloClient} from 'apollo-client';
import gql from 'graphql-tag';
import {createHttpLink} from 'apollo-link-http';
import {JsonAstConstantTrue} from '@angular-devkit/core';

const getHomeNode = gql`
  query getModeQuery{
  nodeById(id: "1") {
    title
    entityPublished
    promote
    ... on NodeArticle {
      body {
        value
      }
    }
  }
}
`;
const getAboutUsNode = gql`
  query getModeQuery{
  nodeById(id: "2") {
    title
    entityPublished
    promote
    ... on NodePage {
      body {
        value
      }
    }
  }
}
`;

const endpoint = 'http://mylandoapp.lndo.site:32792/graphql';
const link = createPersistedQueryLink({
  useGETForHashedQueries: true
})
  .concat(createHttpLink({ uri: endpoint }));

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
@Injectable()
export class GraphqlModule {

  constructor() {
    client.subscribe({query: getAboutUsNode, fetchPolicy: 'no-cache'})
      .subscribe(result => {
      console.log(result);
    });
  }
}
