import { useGQLQuery, useGQLMutation} from "../customHooks/useGQLQuery";
import { useState } from "react";
import { QueryClient  } from "react-query";
import User from "../components/User";
import { Spin } from "antd";
import { getAll, deleteUser } from "../components/gtags";;

function UserList() {
    const qC= new QueryClient()
    const {data, isLoading, isError, refetch } = useGQLQuery('users',getAll);
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
    if (isLoading) return(
        <div className="container mx-auto">
            <div className="flex justify-center">
                <Spin tip="Loading..." size="large"/>
            </div>
        </div>
    )
    return(
       <div className="container mx-auto">
           <div className="flex justify-center mt-6">
                <h1 className="text-xl">
                    Users List
                </h1>
           </div>
           <div className="grid grid-cols-4 gap-2 mt-6">
                {data.getAllUsers.map((u)=><User key={u.id} user={u} removeUser={removeUser}/>)}
            </div>
           </div>
    )
}

export default UserList;