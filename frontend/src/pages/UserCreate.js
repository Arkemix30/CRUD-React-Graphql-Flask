import UserForm from "../components/UserForm";
import { useGQLMutation } from "../customHooks/useGQLQuery";
import { useState } from "react";
import { useHistory } from "react-router";
import { Alert } from "antd";
import { createUser } from "../components/gtags";
import Breadcrumb from "../components/Breadcrumb"

function UserCreate() {
  const historyE = new useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { mutate, status } = useGQLMutation(createUser, user);
  const addingUser = (userI) => {
    setUser(userI);
    setTimeout(() => mutate(), 500);
  };
  return (
    <div>
      <div className="flex justify-center mt-2">
        <h1 className="text-xl text-white">Add New User</h1>
      </div>
      {status === "success" && (
        <div className="flex justify-end mt-3 mr-6">
          <Alert message="User Added" type="success" closable showIcon />
        </div>
      )}
      {status === "loading" && (
        <div className="flex justify-end mt-3">
          <Alert message="Adding User..." type="info" showIcon />
        </div>
      )}
      <div className="flex justify-end mr-6 mt-2">
        <Breadcrumb parent="Create User"/>
      </div>
      <div className="flex justify-start ml-6">
           <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={()=> {historyE.push("/");}}
           >
               Return to List
            </button>
      </div>
      <UserForm onSubmit={addingUser} />
    </div>
  );
}

export default UserCreate;
