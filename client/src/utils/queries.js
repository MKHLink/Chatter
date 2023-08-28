import {gql} from '@apollo/client';

export const QUERY_USER = gql`
query GetUser($username: String) {
    getUser(username: $username) {
      _id
      username
      email
      messages {
        _id
        textBody
      }
    }
  }
`;

export const QUERY_ME = gql`
query Me {
  me {
    _id
    username
    email
    friends {
      username
      email
      messages {
        _id
        textBody
        username
        createdAt
      }
      dates {
        _id
        dateName
        dateOfOccasion
      }
    }
    messages {
      _id
      textBody
      username
      createdAt
    }
    dates {
      _id
      dateName
      dateOfOccasion
    }
  }
}
`;

