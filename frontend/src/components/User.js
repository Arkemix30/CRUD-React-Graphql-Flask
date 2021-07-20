import { Card } from "antd";
import { EditOutlined,DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";


function User({user, removeUser}) {
    const {id,name, email, password} = user;

    return(
    <div className="site-card-border-less-wrapper mt-2 mb-2">
        <Card title={name} bordered={true} style={{ width: 300 }} actions={[<Link to={`/edit/${id}`}><EditOutlined style={{color:"blue"}}/></Link>,<button onClick={() => removeUser(id)} ><DeleteOutlined style={{color:"red"}}/></button>]}>
            <div className="overflow-hidden">
                <div>
                    <strong>Email:</strong>
                </div>
                <div>
                    <p> {email}</p>
                </div>
                <div>
                    <strong>Password:</strong>
                </div>
                <div>
                    <p>{password.replace(/./g, '*')}</p>
                </div>
            </div>
        </Card>
    </div>
    )
}

export default User;