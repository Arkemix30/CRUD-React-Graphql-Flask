import { gql } from "graphql-tag";

//All GraphQL queries 
export const getAll = gql`
  query {
    getAllUsers {
      id
      name
      email
      password
    }
  }
`;

export const findUser = gql`
  query findUserById($id: Int!) {
    findUserById(id: $id) {
      id
      name
      email
      password
    }
  }
`;

export const createUser = gql`
      mutation addUser($name: String!, $email: String!, $password: String!) {
        createUser(User: { name: $name, email: $email, password: $password }) {
          data {
            id
            name
            email
            password
          }
        }
      }
    `;
export const updateUser = gql`
mutation updateUser($id:Int!,$User:UserInput!){
  updateUser(id:$id,User:$User){
    ok
    message
    data{
      name
      email
      password
    }
  }
}
`

export const deleteUser = gql`
mutation deleteUser($id:Int!){
    deleteUser(id:$id){
      ok
      message
    }
  }
`;