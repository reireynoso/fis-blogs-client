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

import './App.css';
const cookies = new Cookies();

const App: React.FC = () => {
  const [{}, dispatch] = useStateValue();

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
        <div className="container">
          <Switch>
            <Route path="/" exact component={MainComponent}/>
            <Route path="/blogs/new" component={NewBlog}/>
            <Route path="/login" component={Login}/>
            <LockedRoute path="/cohort/new" component={NewCohort}/>
          </Switch>
        </div>
    </div>
  );
}

export default App;
