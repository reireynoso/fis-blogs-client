import React, {useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {server} from './config/endpoints';
import {useStateValue} from './context-api/Provider'; 
import {setUser} from './context-api/actions';
import Cookies from 'universal-cookie';

// components
import Login from './components/Login';
import MainComponent from './components/MainComponent';
import NewBlog from './components/NewBlog';
import Header from './components/Header';
import NewCohort from './components/NewCohort';
import LockedRoute from './routes/LockedRoute';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import './App.css';
const cookies = new Cookies();

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(10, 0, 6),
  }
}));

const App: React.FC = () => {
  const [{}, dispatch] = useStateValue();

  const classes = useStyles();

  useEffect(() => {
    const token : String = cookies.get('token');
    // console.log(token)
    if(token){
      // auto logging in a user logic
      fetch(`${server}/auto_login`, {
        // method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': "application/json",
          'Authorization': `Bearer ${token}`
        },
      })
      .then(res => {
        // if the res status is 401, user with token doesn't exist in DB. Address to avoid possible errors
        if(res.status === 401){
          cookies.remove('token')
        }
        return res.json()
      })
      .then(data => {
        // console.log(data.user)
        dispatch(setUser(data.user));
      })
    }
  }, [])
  return (
    <div className="App">
        <Header/>
        <Container className={classes.heroContent} component="main">
          <Switch>
            <Route path="/" exact component={MainComponent}/>
            <Route path="/blogs/new" component={NewBlog}/>
            <Route path="/login" component={Login}/>
            <LockedRoute path="/cohort/new" component={NewCohort}/>
          </Switch>
        </Container>
    </div>
  );
}

export default App;
