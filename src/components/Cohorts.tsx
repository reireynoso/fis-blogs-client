import React, {useEffect} from 'react';
import {useStateValue} from '../context-api/Provider'
import {
    selectCohort, 
    removeUserAdmin, 
    setNotificationOpen, 
    setNotificationClose,
    setAdminUpdate,
    setAdminUsers
} 
from '../context-api/actions';
import {handleFetchUsers} from '../config/fetch-requests';

import Blogs from './Blogs';
import AdminUsers from './AdminUsers';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Clear from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
    icon: {
        borderRadius: "10px",
        cursor: "pointer",
        "&:hover": {
            background: "#9e9e9e",
            transition: "0.3s ease"
        }
    },
    userList: {
      maxHeight: "200px",
      overflowY: "scroll"
    }
  }),
);

enum Action {
    ADD = "add",
    REMOVE = "remove"
}

const Cohorts: React.FC = (props:any) => {
    const [{
        user: loggedUser,
        users,
        cohorts, 
        selectedCohort, 
        adminUpdateModal}, dispatch] = useStateValue();

    const classes = useStyles();

    useEffect(() => {
        // if no users in global state, fetch the array and store
        // have to create fetch users route
        if(adminUpdateModal && !users){
            handleFetchUsers()
            .then(res => res.json())
            .then(data => dispatch(setAdminUsers(data.users)))
        }
    }, [adminUpdateModal])

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
                      <ListItemIcon onClick={() => {
                            if(loggedUser.admin){
                                dispatch(setAdminUpdate(true))
                            }else{
                                alert("You're not an admin. Not permitted to view.")
                            }
                          }}>
                          <AddIcon className={classes.icon}/>
                      </ListItemIcon>
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
                          const statement = `${user.name} will be removed as an admin for cohort, ${selectedCohort.name}.`
                          const callback = () => {
                            dispatch(setNotificationClose());
                            dispatch(removeUserAdmin(user._id));
                          }
                          dispatch(setNotificationOpen(statement, callback))
                        //   dispatch(removeUserAdmin(user._id))
                        //   fetch(`${server}/cohort/${selectedCohort._id}`, {
                        //       method: "PATCH",
                        //       headers: {
                        //           "Content-Type": "application/json",
                        //           "Accept": "application/json"
                        //       },
                        //       body: JSON.stringify({
                        //           action: Action.REMOVE,
                        //           userId: user._id
                        //       })
                        //   })
                        //   .then(res => {
                        //     if(res.status !== 200){
                        //         return res.json()
                        //     }else{
                        //         // success
                        //         // send user id and remove the user from the selectedCohort
                        //         // setTimeout(() => {
                        //             // dispatch(approveBlog(_id));
                        //             // setApproval(false)
                        //         // }, 1000)
                        //     }
                        //   })
                        //   .then(data =>{
                        //       if(data){
                        //           // error
                        //           alert("Something went wrong in the server")
                        //       }
                        //   })
                      }}>
                          <Clear className={classes.icon}/>
                      </ListItemIcon>
                  </ListItem>
                  ))}
                </List>
              </div>
            </Drawer>
          }
          <Dialog 
            open={users && adminUpdateModal} 
            onClose={() => dispatch(setAdminUpdate(false))} 
            aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText>
                </DialogContent>
                <AdminUsers/>

                <DialogActions>
                <Button onClick={() => dispatch(setAdminUpdate(false))}  color="primary">
                    Cancel
                </Button>
                <Button  color="primary">
                    Subscribe
                </Button>
                </DialogActions>
            </Dialog>   
        </div>
      );
}

export default Cohorts
