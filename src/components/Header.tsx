import React from 'react';
import {Link} from 'react-router-dom';
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
            Header
            <Link to={!user ? "/login": ""}>
                <button onClick={handleLogout}>{!user ? "Login": "Logout"}</button>
            </Link>
        </header>
    )
}

export default Header