import React, {useEffect} from 'react';
import {useStateValue} from '../context-api/Provider';
import {useHistory} from 'react-router-dom';

import {handleFetchUsers} from '../config/fetch-requests';
import {
    selectCohort, 
    removeUserAdmin, 
    setNotificationOpen, 
    setNotificationClose,
    setAdminUpdate,
    setAdminUsers,
    updateUser
} 
from '../context-api/actions';

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
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';


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
    //   maxWidth: "500px",
      overflowY: "scroll",
    }
  }),
);

const AdminUsers:React.FC = () => {

    const [{
        user: loggedUser,
        users,
        cohorts, 
        selectedCohort, 
        adminUpdateModal}, dispatch] = useStateValue();

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

    return <List dense className={classes.userList}>
            {
            users?.map((user: {
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
                            color={user.admin ? "secondary" : "primary"}
                            size="small"
                            onClick={() => {
                                const statement = `${user.name} will ${user.admin ? "lose admin privilege" : "be made an admin"}.`
                                const callback = () => {
                                  dispatch(setNotificationClose());
                                  dispatch(updateUser(user._id))
                                }
                                dispatch(setNotificationOpen(statement, callback))
                            }}
                        >
                            {user.admin ? "Revoke admin" : "Make admin"}
                        </Button>
                    </ListItemSecondaryAction>
                </ListItem>
                );
            })
            }
        </List>
}

export default AdminUsers