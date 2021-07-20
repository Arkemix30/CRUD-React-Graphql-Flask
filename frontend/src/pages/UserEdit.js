import { useState, useEffect} from "react";
import { Alert } from "antd";
import { useLocation,useHistory } from "react-router-dom";
import { useGQLMutation } from "../customHooks/useGQLQuery";
import { updateUser } from "../components/gtags";

function UserEdit() {
  const history = useHistory();
  const location =  useLocation();
  const {id,name, email, password} = location.state
  const [userI, setuserI] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  
  useEffect(() => {
    setuserI({
      name:name,
      email: email,
      password:password
    })
  }, [])

  const OnChangeHandler = (e) => {
    const { name, value } = e.target;
    setuserI((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const pushBack = () =>{
    setuserI({
      name:"",
      email: "",
      password: ""
    })
    history.push("/")
  }
  let updatedUser={
    id:id,
    User:userI
  }
  const onSubmitHanlder = async(e)=>{
    e.preventDefault();
    await mutate();
    setuserI({
      id:"",
      name:"",
      email:"",
      password:""
    })
  }
  const {status,mutate, isLoading} = useGQLMutation(updateUser,updatedUser)
  return (
    <div className="container mx-auto">
      <div className="flex justify-center mt-6">
        <h1 className="text-xl">Editing User</h1>
      </div>
      { status === 'success' &&
        <div className="container mx-auto">
          <div className="flex justify-end mt-3 mr-6">
            <Alert message="User Updated" type="success" closable showIcon />
          </div>
        </div>
    }
      <div className="flex justify-center mt-9">
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmitHanlder}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="name"
                type="text"
                placeholder="Full Name"
                value={userI.name}
                onChange={OnChangeHandler}
                disabled={isLoading? true : false}
              ></input>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                name="email"
                type="text"
                placeholder="email@email.com"
                value={userI.email}
                onChange={OnChangeHandler}
                disabled={isLoading? true : false}
              ></input>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="pasword"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                name="password"
                type="password"
                placeholder="*********"
                value={userI.password}
                onChange={OnChangeHandler}
                disabled={isLoading? true : false}
              ></input>
            </div>
            <div className="flex justify-around">
            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={pushBack}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isLoading? true : false}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserEdit;
