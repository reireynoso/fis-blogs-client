import React, {useEffect} from 'react';
import Cookies from 'universal-cookie';
import {server,client} from '../config/endpoints';
const cookies = new Cookies();

type Props = {
    history: {push: (route: string) => void};
}

const Login : React.FC<Props> = ({history}) => {
    useEffect(() => {
        const token : String = cookies.get('token');
        // console.log(token)
        if(!token){
            // logging user in logic
            const code : string[] = window.location.href.split("=") //http://localhost:3000/?code=dsajdoiasjdoiajs we want the code
            if(code[1]){
                console.log(code[1]) // code
                fetch(`${server}/user/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json",
                },
                body: JSON.stringify({
                    code: code[1]
                })
                })
                .then(res => {
                return res.json()
                })
                .then(data => {
                    let date : Object = new Date(Date.now()) // current time string
                    let expirationToken = new Date(new Date(date.toString()).getTime() + 60 * 60 * 24 * 1000); // add 24 hours to current time string
                    cookies.set('token', data.token, { path: '/', expires: new Date(expirationToken) }) // for expires property, a Date object is required
                    // console.log(cookies.get('token')); // get token
                    console.log(data.user)
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
            <a href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect=${client}/`}>Login with Github</a>
        </div>
    )
}

export default Login