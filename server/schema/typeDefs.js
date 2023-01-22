const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Query{
        print: String
    }
`;

module.exports = typeDefs;