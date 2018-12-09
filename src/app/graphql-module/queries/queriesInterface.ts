export interface graphqlQuery {
  query: string;
  hash: string;
}

export interface graphqlQueries {
  queries:{[operationName: string]: graphqlQuery}
}
