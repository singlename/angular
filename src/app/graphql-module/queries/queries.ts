import {graphqlQueries} from './queriesInterface';
import gql from "graphql-tag";

export const queries: graphqlQueries = {
  queries: {
    'getHomeNodeQuery': {
      query: gql`
      query getHomeNodeQuery{
        nodeById(id: "1") {
          title
          entityPublished
          promote
          __typename
        ... on NodeArticle {
            body {
              value
              __typename
            }
          }
        }
      }
      `,
      hash: '901ce207b61b5e401bf57a9fdb2fae36f4a62568d0573707b55545258777b436'
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
      hash: '',
    }
  }
};
