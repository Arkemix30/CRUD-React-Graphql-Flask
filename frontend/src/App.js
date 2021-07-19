import { useGQLQuery, useGQLMutation } from "./customHooks/useGQLQuery";
import gql from "graphql-tag";
import Nav from "./components/Nav";

const getAll = gql`
  query {
    getAllUsers {
      id
      name
      email
      password
    }
  }
`;
const createUser = gql`
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

function App() {
  const variables ={
    name:"Enmanuel",
    email: "silvaenmanuel@gmail.com",
    password: "123"
  }
  const { data, isLoading } = useGQLMutation(createUser, variables);
  const sendData = (e)=>{
    e.preventDefault();
    console.log
  }
  return (
      <div className="App">
        <Nav />
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={sendData}>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
  );
}

export default App;
