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
        _id
        username
      }
      messages {
        _id
        textBody
      }
      dates {
        dateName
        dateOfOccasion
      }
    }
  }
`;

