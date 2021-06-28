import React from 'react'
import './Navbar.scss'
import AuthService from '../../services/AuthService'
import { removeUserActionCreator } from "../../store/actions/actions"
import { useDispatch } from 'react-redux'
import UserService from '../../services/UserService'

const Navbar = () => {

    const [users, setUsers] = React.useState([]);

    const dispatch = useDispatch()

    const logout = () => {
        AuthService.logout()
            .then(response => console.log(response))
            .catch(err => console.log(err))
            .finally(() => {

                dispatch(removeUserActionCreator())
                localStorage.removeItem('token')
            })
    }

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response.data);
        } catch (e) {
            console.log(e.response);
        }
    }

    return (
        <div>
            <h1>Navbar</h1>
            <div></div>
            <button onClick={getUsers}>Get users</button>
            <button onClick={logout}>Log out</button>
            {users.map(user =>
                <div key={user.email}>{user.email}</div>
            )}
        </div>
    )
}

export default Navbar