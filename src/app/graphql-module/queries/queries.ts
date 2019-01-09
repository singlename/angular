import {graphqlQueries} from './queriesInterface';
import gql from "graphql-tag";

export interface QueryParams extends Object{
  limit?: number,
  offset?: number,
  id?: number
}

export const queries: graphqlQueries = {
  queries: {
    'getArticleByRoute': {
      query: gql`
      query getArticleByRoute($path: String) {
        route(path: $path) {
          __typename
          ... on InternalUrl {
            __typename
            nodeContext {
              __typename
              entityId
              ... on NodeArticle {
                title
                body {
                  value
                  __typename
                }
              }
            }
          }
        }
      }`
    },
    'getNodeQuery': {
      query: gql`
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
      query: gql`
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
      query: gql`
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
