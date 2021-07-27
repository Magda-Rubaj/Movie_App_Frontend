import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import userServices from '../services/userServices';

function Users() {
    const [userList, setUserList] = useState([])
    let history = useHistory();


    useEffect(() => {
        userServices.getUserList()
            .then(data => {
                setUserList(data)
            })
    }, [])

    const deleteUser = id => {
        userServices.deleteUser(id);
        history.go(0)
    }

    const grantAdmin = id => {
        const user = JSON.stringify({
            is_admin: true
        });
        userServices.patchUser(id, user);
    }

    return (
        <div className="Users">
            <div className="Users_Container">
                <ul>
                    {userList.map(user => 
                        <li key={user.id}>
                            {console.log(user)}
                            <p>{`${user.email} (${user.is_admin ? 'admin' : 'regular'})`}</p>
                            {!user.is_admin &&
                                <div>
                                    <Button variant="primary"  id="delete-user" onClick={() => deleteUser(user.id)}>Delete</Button>
                                    <Button variant="outline-primary" id="admin-user" onClick={() => grantAdmin(user.id)}>Make admin</Button> 
                                </div>
                            }
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
export default Users;