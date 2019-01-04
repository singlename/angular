export interface graphqlQuery {
  operationName?: string;
  query: string;
}

export interface graphqlQueries {
  queries:{[operationName: string]: graphqlQuery}
}
