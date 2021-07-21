import React, { useEffect, useState } from 'react';
import userServices from '../services/userServices';

function Users() {
    const [userList, setUserList] = useState([])

    useEffect(() => {
        userServices.getUserList()
            .then(data => {
                setUserList(data)
            })
    }, [])

    const deleteUser = id => {
        userServices.deleteUser(id);
        window.location.reload()
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
                <h3>Users</h3>
                {userList.map(user => 
                    <div key={user.id}>
                        <p>{user.email}</p>
                        <p>{user.is_admin}</p>
                        <button id="delete-user" onClick={() => deleteUser(user.id)}>Delete</button>
                        <button id="admin-user" onClick={() => grantAdmin(user.id)}>Make admin</button> 
                    </div>
                )}
            </div>
        </div>
    );
}
export default Users;