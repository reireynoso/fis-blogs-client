import React, {useEffect} from 'react';
import Cookies from 'universal-cookie';
import {useLocation} from 'react-router-dom';
import {client} from '../config/endpoints';
import {useStateValue} from '../context-api/Provider'
import {setUser} from '../context-api/actions';
import {handleLogin} from '../config/fetch-requests';

import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Footer from './Footer';

const cookies = new Cookies();

const useStyles = makeStyles((theme:Theme) => ({
    root: {
      width: 250,
      height: 200,
      margin: "auto",
      marginTop: theme.spacing(2),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      padding: "1rem",
      textAlign: "center"
    },
  }));

type Props = {
    history: {push: (route: string) => void}
}

const Login : React.FC<Props> = ({history}) => {
    const [{}, dispatch] = useStateValue();
    const classes = useStyles();

    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }
    
    let query = useQuery();

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
                handleLogin(code)
                .then(data => {
                    let date : Object = new Date(Date.now()) // current time string
                    let expirationToken = new Date(new Date(date.toString()).getTime() + 60 * 60 * 24 * 1000); // add 24 hours to current time string
                    cookies.set('token', data.token, { 
                        path: '/', 
                        expires: new Date(expirationToken),
                        // httponly: true, // only the server can access token 
                    }) // for expires property, a Date object is required
                    // console.log(cookies.get('token')); // get token
                    // console.log(data.user)
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
        <>
        <Card className={classes.root}>
            <Button
                href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${client}/login/`}
                
                variant="contained"
                color="primary"
            >
                Login with Github
            </Button>
            <CardContent>
                <Typography variant="body2" color="textSecondary" >
                    Note: On your Github account, make sure your name is filled out. Otherwise, the blogs you submit will not include your name.
                </Typography>
            </CardContent>
        </Card>
        <Footer/>
        </>
    )
}

export default Login