const {gql} = require('apollo-server-express');

const typeDefs = gql`

    type User{
        _id: ID
        username: String
        email: String
        friends: User
        messages: [Message]
        dates: [Dates]
    }

    type Message{
        _id: ID
        textBody: String
        username: String
        createdAt: String
    }

    type Dates{
        _id: ID
        dateName: String
        dateOfOccasion: String
    }

    type Auth{
        token: ID!,
        user: User
    }

    type Query{
        print: String
        getUsers: [User]
        getUser(username:String): User
        me: User
        getMessages : Message
        
    }

    type Mutation{
        addUser(username: String!, email:String!, password: String!): Auth
        userLogin(email: String!, password: String!): Auth
        deleteOneUser(_id: ID!) : User
        addPartner(friendId: ID!): User
        createMessage(text: String!): Message
        createDate(name: String!, date: String!): Dates
        deleteDate(dateID: ID!): Dates
        deleteNote(noteID: ID!): Message
    }
    
`;

module.exports = typeDefs;