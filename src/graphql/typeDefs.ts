import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Review {
        id: ID!
        title: String!
        image: String!
        body: String!
        rating: Int!
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
    }

    type Mutation {
        logIn(input: LogInInput): Viewer!
        logOut: Viewer!
        deleteReview(id: ID!): Review!
    }
`;
