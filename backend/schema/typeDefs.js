const { gql } = require('graphql-tag');

const typeDefs = gql`
    type Booking {
        id: ID!
        name: String!
        email: String!
        pickupPoint: String!
        destination: String!
        date: String!
    }

    type Query {
        getBookings: [Booking]
    }

    type Mutation {
        addBooking(name: String!, email: String!, pickupPoint: String!, destination: String!, date: String!): Booking
        updateBooking(id: ID!, name: String, email: String, pickupPoint: String, destination: String, date: String): Booking
        deleteBooking(id: ID!): String
    }
`;

module.exports = typeDefs;
