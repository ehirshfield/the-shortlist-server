import { gql } from "apollo-server-express";

export const typeDefs = gql`

  type Review {
    id: ID!
    title: String!
    image: String!
    body: String!
    rating: Int!
  }

  type Query {
    authUrl: String!
    reviews: [Review!]!
  }

  type Mutation {
    logIn: String!
    logOut: String!
    deleteReview(id: ID!): Review!
  }
`;
