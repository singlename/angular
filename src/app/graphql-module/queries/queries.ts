import {graphqlQueries} from './queriesInterface';

export interface QueryParams extends Object {
  limit?: number;
  offset?: number;
  id?: number;
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
    'getAdvertisingBlockContent': {
      query: `
      query getAdvertisingBlockContent() {
        {
          blockContentQuery(offset: 0, limit: 5, filter: {conditions: [{field: "status", value: "1"}]}) {
            count
            __typename
            entities {
              __typename
              ...AdvertisingBlockContent
            }
          }
        }
      }`,
      fragment: 'AdvertisingBlockContent'
    },
    'AdvertisingBlockContent': {
      query: `
      fragment AdvertisingBlockContent on BlockContentAdvertisingBlock {
        __typename
        body {
          value
          __typename
        }
      }`,
    },
    'BlockContentBasic': {
      query: `
      fragment BlockContentBasic on BlockContentBasic {
        __typename
        body {
          value
          __typename
        }
      }`,
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
        sort: {direction: DESC, field: "created"},
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
      }
      `,
    },
    'getBlocks': {
      // @todo: modify to use multiple fragments
      query: `
      query getBlocks($path: String, $region: String) {
      __typename
        route(path: $path) {
          __typename
          ... on InternalUrl {
            __typename
            blocksByRegion(region: $region) {
              __typename
              ...AdvertisingBlockContent
            }
          }
        }
      }`,
      fragment: 'AdvertisingBlockContent',
      resultIsMultipleFragments: true,
    }
  }
};
