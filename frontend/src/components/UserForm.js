import { useState } from "react";
import { useHistory } from "react-router";


//UseForm for Creating Users
function UserForm(props) {
  const history = useHistory();
    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        password: ""
    });

    const OnChangeHandler = (e) => {
        const {name,value} = e.target
        setUserInput(prevState=> ({
            ...prevState,
            [name]:value,    
        }));
    };

    const pushBack = () =>{
      setUserInput({
        name:"",
        email: "",
        password: ""
      });
      history.push("/");
    }
    const submitHandler = (e) => {
        e.preventDefault();
        props.onSubmit({
            name:userInput.name,
            email: userInput.email,
            password: userInput.password
        })
        setUserInput({
            name:"",
            email:"",
            password: ""
        });
    }
  return (
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
              value={userInput.name}
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
              value={userInput.email}
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
              value={userInput.password}
              onChange={OnChangeHandler}
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
              type="button"
              onClick={submitHandler}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
