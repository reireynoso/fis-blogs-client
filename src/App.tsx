import React, {useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {useStateValue} from './context-api/Provider'; 
import {setUser} from './context-api/actions';
import Cookies from 'universal-cookie';
import {handleAutoLogin} from './config/fetch-requests';

// components
import Login from './components/Login';
import NewBlog from './components/NewBlog';
import Header from './components/Header';
import NewCohort from './components/NewCohort';
import LockedRoute from './routes/LockedRoute';
import Blogs from './components/Blogs';
import Cohorts from './components/Cohorts';
import Notification from './components/Notification';
import AdminUsers from './components/AdminUsers';
import About from './components/About';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import {fetchInitialData} from './config/fetch-requests'; 
import {setInitialData} from './context-api/actions';

import './App.css';
const cookies = new Cookies();

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(7, 0, 0),
  }
}));

const App: React.FC = () => {
  const [{}, dispatch] = useStateValue();

  const classes = useStyles();

  useEffect(() => {
    process.env.NODE_ENV === "development" && !cookies.get('token') && cookies.set('token', process.env.REACT_APP_COOKIE, { 
      path: '/',
    }) 

    const token : String = cookies.get('token');

    if(token){
      // auto logging in a user logic
      handleAutoLogin()
      .then(data => {
        dispatch(setUser(data.user));
      })
    }

    fetchInitialData()
    .then(data => {
      dispatch(setInitialData(data.blogs, data.cohorts))
    })
  }, [])
  return (
    <div className="App">
        <Header/>
        <Notification/>
        <Container className={classes.heroContent} component="main">
          <Switch>
            <Route path="/" exact component={Blogs}/>
            <Route path="/about" exact component={About}/>
            <Route path="/blogs/me" component={Blogs}/>
            <Route path="/blogs/new" component={NewBlog}/>
            <Route path="/login" component={Login}/>
            <LockedRoute path="/admin/users" component={AdminUsers}/>
            <LockedRoute path="/cohort/admin" component={Cohorts}/>
            <LockedRoute path="/cohort/new" component={NewCohort}/>
            <Route component={Login}/>
          </Switch>
        </Container>
    </div>
  );
}

export default App;
