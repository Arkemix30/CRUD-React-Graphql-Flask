import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useGQLFind, useGQLMutation } from "../customHooks/useGQLQuery";
import { findUser } from "../components/gtags";

function UserEdit() {
  const { id } = useParams();
  const { data, isLoading, status } = useGQLFind("user", findUser, {
    id: id,
  });
  useEffect(() => {
    setuserI({
        name: data.findUserById.name,
        email: data.findUserById.email,
        password: data.findUserById.password,
    });
  }, [])
  const [userI, setuserI] = useState({
    name: "",
    email: "",
    password: "",
  });
  const OnChangeHandler = (e) => {
    const { name, value } = e.target;
    setuserI((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center mt-6">
        <h1 className="text-xl">Editing User</h1>
      </div>
      <div className="flex justify-center mt-9">
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
              ></input>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
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
