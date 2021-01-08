import React, {useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {useStateValue} from './context-api/Provider'; 
import {setUser} from './context-api/actions';
import Cookies from 'universal-cookie';
import {handleAutoLogin} from './config/fetch-requests';

// components
import Login from './components/Login';
import MainComponent from './components/MainComponent';
import NewBlog from './components/NewBlog';
import Header from './components/Header';
import NewCohort from './components/NewCohort';
import LockedRoute from './routes/LockedRoute';
import Blogs from './components/Blogs';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import {fetchBlogs} from './config/fetch-requests'; 
import {setBlogs} from './context-api/actions';

import './App.css';
const cookies = new Cookies();

const useStyles = makeStyles((theme) => ({
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
      handleAutoLogin()
      .then(data => {
        dispatch(setUser(data.user));
      })
    }

    fetchBlogs()
    .then(data => {
      dispatch(setBlogs(data.blogs))
    })
  }, [])
  return (
    <div className="App">
        <Header/>
        <Container className={classes.heroContent} component="main">
          <Switch>
            <Route path="/" exact component={Blogs}/>
            <Route path="/blogs/me" component={Blogs}/>
            <Route path="/blogs/new" component={NewBlog}/>
            <Route path="/login" component={Login}/>
            <LockedRoute path="/cohort/new" component={NewCohort}/>
          </Switch>
        </Container>
    </div>
  );
}

export default App;
