import React, {useState} from 'react';
import {useStateValue} from '../context-api/Provider'

import Blogs from './Blogs';

import {selectCohort, removeUserAdmin} from '../context-api/actions';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Clear from '@material-ui/icons/Clear';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import { server } from '../config/endpoints';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      zIndex: 5
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
  }),
);

enum Action {
    ADD = "add",
    REMOVE = "remove"
}
const Cohorts: React.FC = (props:any) => {
    const [{user, cohorts, selectedCohort}, dispatch] = useStateValue();

    const classes = useStyles();
    return  (
        <div className={classes.root}>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Toolbar />
            <div className={classes.drawerContainer}>
              <List>
                  <ListItem>
                    <ListItemText primary={"Cohorts"} />
                  </ListItem>
              </List>
              <Divider />
              <List>
                {cohorts.map((cohort: {
                    _id: string,
                    name: string,
                    admins: {
                        admin: boolean,
                        email: string,
                        image_url: string,
                        name: string,
                        _id: string,

                    }[]
                }) => (
                <ListItem onClick={() => {    
                    dispatch(selectCohort(cohort));
                }} button key={cohort._id}>
                    <ListItemText primary={cohort.name} />
                </ListItem>
                ))}
              </List>
            </div>
          </Drawer>
          <main className={classes.content}>
            {
                selectedCohort ? <>
                    <h1>{selectedCohort?.name}</h1>
                    <h3>Reviews Blogs for Approval</h3>
                    <Blogs {...props} history={props.history}/>
                </>
                :
                "Select cohort"
            } 
          </main>

          {
              selectedCohort && <Drawer
              className={classes.drawer}
              variant="permanent"
              anchor="right"
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <Toolbar />
              <div className={classes.drawerContainer}>
                <List>
                    <ListItem>
                      <ListItemText primary={"Admins"} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                  {selectedCohort?.admins.map((user: {
                      _id: string,
                      name: string,
                      admin: boolean,
                      image_url: string,
                      email: string
                  }) => (
                  <ListItem key={user._id}>
                      <ListItemAvatar>
                        <Avatar
                            alt={user.image_url}
                            src={user.image_url}
                        />
                      </ListItemAvatar>
                      <ListItemText primary={user.name} />
                      <ListItemIcon onClick={() => {
                          dispatch(removeUserAdmin(user._id))
                          fetch(`${server}/cohort/${selectedCohort._id}`, {
                              method: "PATCH",
                              headers: {
                                  "Content-Type": "application/json",
                                  "Accept": "application/json"
                              },
                              body: JSON.stringify({
                                  action: Action.REMOVE,
                                  userId: user._id
                              })
                          })
                          .then(res => {
                            if(res.status !== 200){
                                return res.json()
                            }else{
                                // success
                                // send user id and remove the user from the selectedCohort
                                // setTimeout(() => {
                                    // dispatch(approveBlog(_id));
                                    // setApproval(false)
                                // }, 1000)
                            }
                          })
                          .then(data =>{
                              if(data){
                                  // error
                                  alert("Something went wrong in the server")
                              }
                          })
                      }}>
                          <Clear />
                      </ListItemIcon>
                  </ListItem>
                  ))}
                </List>
              </div>
            </Drawer>
          }   
        </div>
      );
}

export default Cohorts
