import {gql} from '@apollo/client';

export const LOGIN_USER = gql`
mutation UserLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_PARTNER = gql`
mutation AddPartner($friendId: ID!) {
    addPartner(friendId: $friendId) {
      _id
      username
      email
    }
  }
`;

export const CREATE_DATE = gql`
mutation CreateDate($name: String!, $date: String!) {
    createDate(name: $name, date: $date) {
      dateName
      dateOfOccasion
    }
  }
`;

export const CREATE_MSG = gql`
mutation CreateMessage($text: String!) {
    createMessage(text: $text) {
      _id
      textBody
      username
      createdAt
    }
  }
`;

export const DELETE_DATE = gql`
mutation DeleteDate($dateId: ID!) {
  deleteDate(dateID: $dateId) {
    _id
    dateName
  }
}
`;

export const DELETE_NOTE=gql`
mutation DeleteNote($noteId: ID!) {
  deleteNote(noteID: $noteId) {
    _id
    textBody
    username
  }
}
`;