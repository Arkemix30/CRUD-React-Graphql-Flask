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
    await mutate(null,{
      onSuccess: ()=>{
        setuserI({
          id:"",
          name:"",
          email:"",
          password:""
        })
      }
    });
    
  }
  const {status,mutate, isLoading} = useGQLMutation(updateUser,updatedUser)
  return (
    <div>
      <div className="flex justify-center mt-2">
        <h1 className="text-xl text-white">Editing User</h1>
      </div>
      { status === 'success' &&
        <div className="container mx-auto">
          <div className="flex justify-end mt-3 mr-6">
            <Alert message="User Updated" type="success" closable showIcon />
          </div>
        </div>
      }
      <div className="flex justify-end mr-6 mt-2">
           <ul className="flex  text-sm lg:text-base">
                    <li className="inline-flex items-center">
                      <a href="/" className="text-gray-500">Home</a>
                      <svg
                        className="h-5 w-auto text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </li>
                    <li className="inline-flex items-center">
                      <a href="/" className="text-blue-500">Edit User</a>
                      <svg
                        className="h-5 w-auto text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </li>
                    <li className="inline-flex items-center">
                      <a href="/" className="text-blue-500">{id}</a>
                    </li>
                  </ul> 
           </div>
           <div className="flex justify-start ml-6">
           <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={()=> {history.push("/");}}
           >
               Return to List
            </button>
      </div>
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
