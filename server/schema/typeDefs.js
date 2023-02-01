const {gql} = require('apollo-server-express');

const typeDefs = gql`

    type User{
        _id: ID
        username: String
        email: String
        messages: [Message]
        friends: [User]
    }

    type Message{
        _id: ID
        textBody: String
        username: String
        createdAt: String
    }

    type Auth{
        token: ID!,
        user: User
    }

    type Query{
        print: String
        getUsers: [User]
        getUser(username:String): User
    }

    type Mutation{
        addUser(username: String!, email:String!, password: String!): Auth
        userLogin(email: String!, password: String!): Auth
        deleteOneUser(_id: ID!) : User
    }
    
`;

module.exports = typeDefs;