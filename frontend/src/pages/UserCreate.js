import UserForm from "../components/UserForm";
import { useGQLMutation } from "../customHooks/useGQLQuery";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import { Alert } from "antd";
import { createUser } from "../components/gtags";

function UserCreate() {
    const [user, setUser] = useState({
        name:'',
        email: '',
        password: ''
    })
    const {mutate, status} = useGQLMutation(createUser,user)
    const addingUser = (userI) =>{
        setUser(userI)
        setTimeout(() => mutate(),500);
    }
    return(
    <div className="container mx-auto">
        <div className="flex justify-center mt-6">
            <h1 className="text-xl">
                Add New User
            </h1>
        </div>
    { status === 'success' &&
        <div className="flex justify-end mt-3 mr-6">
            <Alert message="User Added" type="success" closable showIcon />
        </div>
    }
    { status === 'loading' &&
        <div className="flex justify-end mt-3">
            <Alert message="Adding User..." type="info"showIcon/>
        </div>
    }
    <UserForm onSubmit={addingUser}/>
    </div>
    )
}

export default UserCreate;