import { useHistory } from "react-router";
import { useGQLQuery, useGQLMutation} from "../customHooks/useGQLQuery";
import { useState } from "react";
import { QueryClient  } from "react-query";
import User from "../components/User";
import { Spin,Result, Alert} from "antd";
import { getAll, deleteUser } from "../components/gtags";
import Breadcrumb from "../components/Breadcrumb";

function UserList() {
    const history = useHistory();
    const qC= new QueryClient()
    // Custom hook for fetching data
    const {data, status, refetch } = useGQLQuery('users',getAll);
    const [id, setId] = useState({
        id:''
    });
    // Custom hook for deleting specific user
    const {mutate, isSuccess} = useGQLMutation(deleteUser,id)

    // Function that triggers the mutation for deleting user
    // onSuccess updates the User List
    const removeUser = (id) =>{
        setId({ id: parseInt(id,10) })
        setTimeout(() => {
            mutate(null,{
                onSuccess:()=>{
                    qC.invalidateQueries('users')
                    refetch()
                }
            })
        }, 500);
    }
    return(
       <div>
           <div className="flex justify-center mt-2">
                <h1 className="text-xl text-white">
                    Users List
                </h1>
           </div>
           {isSuccess === true &&(
                <div className="flex justify-end mr-6">
                    <Alert message="User deleteded" type="success" closable showIcon />
                </div>
           )}
           <div className="flex justify-end mr-6 mt-2">
                <Breadcrumb parent="User List"/>
           </div>
           <div className="flex justify-start ml-6">
           <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={()=> {history.push("/create");}}
           >
                Add new user
            </button>
            </div>
           {/* Status control for conditional rendering */}
           {status === "loading" && (
            <div className="flex justify-center mt-12">
                <Spin tip="Loading..." size="large"/>
            </div>
           )}
           {status === "success" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6 ">
                {data.getAllUsers.map((u)=><User key={u.id} user={u} removeUser={removeUser}/>)}
            </div>
           )}
           {status === "error" &&(
               <div className="flex justify-center">
                    <Result
                    status="500"
                    title="500"
                    subTitle="Sorry, something went wrong while fetching data..."
                    />
                </div>
           )}
           </div>
    )
}

export default UserList;