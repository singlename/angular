import {graphqlQueries} from './queriesInterface';
import gql from 'graphql-tag';

export const queries: graphqlQueries = {
  queries: {
    'getModeQuery': {
      query: gql`
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
      `,
      hash: '2ee89a6dc363df671fcf0722795b51a4e4d377a2'
    },
    'getAboutUsNode': {
      query: gql`
      query getAboutUsNode{
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
      `,
      hash: ''
    }
  }
};