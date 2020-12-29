import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    enum ReviewType {
        RECIPE
        RESTAURANT
    }

    type Review {
        id: ID!
        title: String!
        author: String!
        image: String!
        body: String!
        rating: Int!
        type: ReviewType!
        city: String!
        address: String!
        url: String!
    }

    type Reviews {
        total: Int!
        result: [Review!]!
    }

    type User {
        id: ID!
        name: String!
        avatar: String!
        contact: String!
        reviews(limit: Int!, page: Int!): Reviews!
    }

    type Viewer {
        id: ID
        token: String
        avatar: String
        didRequest: Boolean!
    }

    input LogInInput {
        code: String!
    }

    type Query {
        authUrl: String!
        reviews: [Review!]!
        user(id: ID!): User!
    }

    type Mutation {
        logIn(input: LogInInput): Viewer!
        logOut: Viewer!
        deleteReview(id: ID!): Review!
    }
`;
