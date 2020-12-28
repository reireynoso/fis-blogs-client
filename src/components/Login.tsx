import React, {useEffect, useState} from 'react';
import Cookies from 'universal-cookie';
import {useLocation} from 'react-router-dom';
import {server,client} from '../config/endpoints';
import {useStateValue} from '../context-api/Provider'
import {setUser} from '../context-api/actions';

const cookies = new Cookies();

type Props = {
    history: {push: (route: string) => void}
}

const Login : React.FC<Props> = ({history}) => {
    const [{}, dispatch] = useStateValue();

    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }
    
    let query = useQuery();
    // console.log('match',method)
    useEffect(() => {
        const token : String = cookies.get('token');
        // console.log(token)
        if(!token){
            // logging user in logic
            // const code : string[] = window.location.href.split("=") //http://localhost:3000/?code=dsajdoiasjdoiajs we want the code
            const code = query.get("code")
            if(code){
                // console.log(code[1]) // code
                // fetch(`${server}/user/login`, {
                fetch(`${server}/user/login`, {
                method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': "application/json",
                    },
                    body: JSON.stringify({
                        code: code
                    })
                })
                .then(res => {
                return res.json()
                })
                .then(data => {
                    let date : Object = new Date(Date.now()) // current time string
                    let expirationToken = new Date(new Date(date.toString()).getTime() + 60 * 60 * 24 * 1000); // add 24 hours to current time string
                    cookies.set('token', data.token, { 
                        path: '/', 
                        expires: new Date(expirationToken),
                        // httponly: true, // only the server can access token 
                    }) // for expires property, a Date object is required
                    // console.log(cookies.get('token')); // get token
                    console.log(data.user)
                    dispatch(setUser(data.user));
                    // once token is set, redirect to main page
                    history.push('/')
                })
            }
        }else{
            // redirect to main page if there's already a token
            history.push('/')
        }
    }, [])
    return (
        <div>
            <a href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${client}/login/`}>Login with Github</a>
        </div>
    )
}

export default Login