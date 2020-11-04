import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Listing {
    id: ID!
    title: String!
    image: String!
    address: String!
    price: Int!
    numOfGuests: Int!
    numOfBeds: Int!
    numOfBaths: Int!
    rating: Int!
  }

  type Review {
    id: ID!
    title: String!
    image: String!
    body: String!
    rating: Int!
  }

  type Query {
    listings: [Listing!]!
    reviews: [Review!]!
  }

  type Mutation {
    deleteListing(id: ID!): Listing!
    deleteReview(id: ID!): Review!
  }
`;
