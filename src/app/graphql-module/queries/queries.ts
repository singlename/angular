import {graphqlQueries} from './queriesInterface';

export interface QueryParams extends Object{
  limit?: number,
  offset?: number,
  id?: number
}

export const queries: graphqlQueries = {
  queries: {
    'getArticleByRoute': {
      query: `
      query getArticleByRoute($path: String) {
        route(path: $path) {
          __typename
          ... on InternalUrl {
            __typename
            nodeContext {
              __typename
              ...NodeBasicData
            }
          }
        }
      }`,
      fragment: 'NodeBasicData'
    },
    'NodeBasicData': {
      query: `
      fragment NodeBasicData on NodeArticle {
        __typename
        title
        body {
          value
          __typename
        }
      }`
    },
    'getNodeQuery': {
      query: `
      query getNodeQuery($id: Int){
        nodeById(id: $id) {
          title
          entityPublished
          promote
          __typename
        ... on NodeArticle {
            body {
              value
              __typename
            }
            entityUrl {
							__typename
              path
            }
            created
          }
        }
      }
      `,
    },
    'getAboutUsNode': {
      query: `
      query getAboutUsNode{
        nodeById(id: "2") {
          title
          entityPublished
          promote
          __typename
          ... on NodePage {
            body {
              value
              __typename
            }
          }
        }
      }
      `,
    },
    'getArticlesSummary': {
      query: `
      query getArticlesSummary($limit: Int, $offset: Int){
        collection: nodeQuery(
        limit: $limit,
        offset: $offset,
        sort: {direction: ASC, field: "created"},
        filter: {conditions: [{field: "type", value: "article"}, {field: "status", value: "1"}]}) {
        __typename
          entities {
            entityId
            __typename
            ... on NodeArticle {
              __typename
              title
              fieldImage {
                __typename
                url
              }
              entityUrl {
							  __typename
                path
              }
              created
            }
          }
        }
      }`
    },
  }
};
