import { useGQLQuery, useGQLMutation} from "../customHooks/useGQLQuery";
import { useState } from "react";
import { QueryClient  } from "react-query";
import User from "../components/User";
import { Spin,Result, Button, Space} from "antd";
import { getAll, deleteUser } from "../components/gtags";;

function UserList() {
    const qC= new QueryClient()
    const {data, status, refetch } = useGQLQuery('users',getAll);
    const [id, setId] = useState({
        id:''
    });
    const {mutate, isSuccess} = useGQLMutation(deleteUser,id)

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
       <div className="container mx-auto">
           <div className="flex justify-center mt-6">
                <h1 className="text-xl">
                    Users List
                </h1>
           </div>
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