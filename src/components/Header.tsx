import React from 'react';
import {NavLink} from 'react-router-dom';
import Cookies from 'universal-cookie';
import {useStateValue} from '../context-api/Provider'
import {setUser} from '../context-api/actions';

const cookies = new Cookies();

const Header : React.FC = () => {
    const [{user}, dispatch] = useStateValue();

    const handleLogout = () => {
        if(user){
            dispatch(setUser(null));
            cookies.remove("token");
        }
    }

    return (
        <header className="header">
            <NavLink to={!user ? "/login": ""}>
                <div onClick={handleLogout}>{!user ? "Login": "Logout"}</div>
            </NavLink>

            <NavLink to="/blogs/new">
                <div>Submit a blog</div>
            </NavLink>

            <NavLink to={!user ? "/cohort/new": ""}>
                <div>New Cohort</div>
            </NavLink>
        </header>
    )
}

export default Header