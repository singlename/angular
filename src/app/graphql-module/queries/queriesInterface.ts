export interface graphqlQuery {
  operationName?: string;
  query: string;
  hash: string;
}

export interface graphqlQueries {
  queries:{[operationName: string]: graphqlQuery}
}
