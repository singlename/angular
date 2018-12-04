import {Injectable, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import gql from 'graphql-tag';
import 'rxjs/add/observable/fromPromise';
import {Apollo} from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

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

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
@Injectable()
export class GraphqlModule {

    apollo: Apollo;

    constructor(apollo: Apollo,
                httpLink: HttpLink) {

        this.apollo = apollo;
        this.apollo.create({
            link: httpLink.create({ uri: endpoint }),
            cache: new InMemoryCache()
        });
    }

    public graphqlCall(specificQuery: any): Promise<any> {
        if (specificQuery === 'getHomeNode') {
            return this.apollo.query({query: getHomeNode}).toPromise();
        }
        if (specificQuery === 'getAboutUsNode') {
            return this.apollo.query({query: getAboutUsNode}).toPromise();
        }
    }

}
