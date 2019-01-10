export interface graphqlQuery {
  query: string;
  fragment?: string;
}

export interface graphqlQueries {
  queries:{[operationName: string]: graphqlQuery}
}
