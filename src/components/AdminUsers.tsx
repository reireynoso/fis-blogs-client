import React, {useEffect, useState} from 'react';
import {useStateValue} from '../context-api/Provider';
import {useHistory} from 'react-router-dom';

import {
    handleFetchUsers, 
    updateCohortAdminRequest, 
    updateUserAdminStatus
} 
from '../config/fetch-requests';
import {
    setNotificationOpen, 
    setNotificationClose,
    setAdminUsers,
    updateUser,
    addUserAdminToCohort
} 
from '../context-api/actions';

import {handleUserFilter} from '../helpers/helper-methods';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

enum Action {
    ADD = "add"
}

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
      maxHeight: "400px",
    //   maxWidth: "500px",
      overflowY: "scroll",
    },
    userSearch: {
        display: "block",
        margin: "auto",
        maxWidth: 300,
        marginBottom: 20
    },
    noUsers: {
        textAlign: "center",
        color: 'red'
    }
  }),
);

const AdminUsers:React.FC = () => {

    const [filter, setFilter] = useState<string>("")

    const [{
        cohortLL,
        user: loggedUser,
        users,
        selectedCohort, 
        cohorts
    
    }, dispatch] = useStateValue();

    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        // if no users in global state, fetch the array and store
        // have to create fetch users route
        if(!users){
            handleFetchUsers()
            .then(res => res.json())
            .then(data => dispatch(setAdminUsers(data.users)))
        }
    }, [])

    const determineUsers = handleUserFilter(users,filter, history.location.pathname, (history.location.pathname!=="/admin/users" ? cohorts[selectedCohort].admins : null), loggedUser)

    return users && users.length ? <List dense className={classes.userList}>
            <TextField
                    disabled={determineUsers && determineUsers.length === 0 && !filter}
                    autoFocus
                    margin="dense"
                    label="Search User"
                    fullWidth
                    className={classes.userSearch}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            {
            determineUsers?.map((user: {
                    _id: string,
                    name: string,
                    admin: boolean,
                    image_url: string,
                    email: string
            }) => {
                const labelId = `checkbox-list-secondary-label-${user._id}`;
                return (
                <ListItem key={user._id} button>
                    <ListItemAvatar>
                    <Avatar
                        alt={user.image_url}
                        src={user.image_url}
                    />
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={user.name} />
                    <ListItemSecondaryAction>
                        <Button 
                            variant="contained"
                            color={history.location.pathname === "/admin/users" ? (user.admin ? "secondary" : "primary") : "primary"}
                            size="small"
                            onClick={
                                history.location.pathname === "/admin/users" 
                                ?
                                () => {
                                const statement = `${user.name} will ${user.admin ? "lose admin privilege" : "be made an admin"}.`
                                const callback = () => {
                                    updateUserAdminStatus(user._id)
                                    .then(res => {
                                        if(res.status === 200){
                                            dispatch(setNotificationClose());
                                            dispatch(updateUser(user._id))
                                        }else{
                                            return res.json()
                                        }
                                    })
                                    .then(data => {
                                        if(data){
                                            alert(`Something went wrong with the request. Error: ${data.error}`)
                                        }
                                    })
                                  
                                }
                                dispatch(setNotificationOpen(statement, callback))
                                }
                                : 
                                () => {
                                    // actual add user as admin to the cohort function
                                    updateCohortAdminRequest(Action.ADD,user._id,cohorts[selectedCohort]._id)
                                    .then(res => {
                                        if(res.status !== 200){
                                            return res.json()
                                        }
                                        else{
                                            dispatch(addUserAdminToCohort(cohortLL.addUserAdmin(cohorts[selectedCohort]._id, user)))
                                        }
                                    })
                                    .then(data => {
                                        if(data){
                                            alert(`Something went wrong with the request. Error: ${data.error}`)
                                        }
                                    })
                                    
                                }
                            }
                        >
                            {
                                history.location.pathname === "/admin/users" 
                                ? 
                                (user.admin ? "Revoke admin" : "Make admin")
                                :
                                "Add as admin"    
                            }
                        </Button>
                    </ListItemSecondaryAction>
                </ListItem>
                );
            })
            }
            {
                determineUsers && determineUsers.length === 0 && history.location.pathname!=="/admin/users" && !filter && <ListItem className={classes.noUsers}>
                    <ListItemText>All available admins are already assigned to the cohort</ListItemText>
                </ListItem>
            }
        </List>
        :
        <List>
            <ListItem className={classes.noUsers}>
                <ListItemText>There are no users</ListItemText>
            </ListItem>
        </List>
}

export default AdminUsers