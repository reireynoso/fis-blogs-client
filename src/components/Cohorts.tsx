import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {useStateValue} from '../context-api/Provider'
import {
    selectCohort, 
    // removeUserAdmin, 
    changeCohorts,
    setNotificationOpen, 
    setNotificationClose,
    setAdminUpdate,
    setAdminUsers,
    // editCohortName
} 
from '../context-api/actions';
import {handleFetchUsers, updateCohortAdminRequest, updateCohortName} from '../config/fetch-requests';
import {handleCohortFilter, truncate, checkIfUserIsAdminOfCohort, findCohortBlogs} from '../helpers/helper-methods';

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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import Tooltip from '@material-ui/core/Tooltip';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const drawerWidth = 225;

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
      overflowY: 'scroll',
      display: "flex",
      flexDirection: "column",
      height: "100%"
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
    listItem: {
      wordBreak: "break-word",
      padding: theme.spacing(1)
    },
    listIcon: {
      minWidth: 20
    },
    privilegeButton: {
      display: "block",
      margin: "auto"
    },
    adminList: {
      // flex: "1"
      height: "calc(100% - 100px)",
      overflowY: "scroll"
    },
    selectedCohortMain: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    cohortListContainer: {
      height: "calc(100% - 136px)", 
      overflowY: "scroll"
    },
    cohortList: {
      background: "#eeeeee"
    },
    header: {
      color: "#002984",
    },
    cohortSubHeader: {
      color: "#3f51b5",
      margin: 0
    },
    emptyCohort: {
      display: "flex",
      alignItems: "center",
      fontSize: "2rem",
      padding: theme.spacing(15,0)
    }
  }),
);

enum Action {
    REMOVE = "remove"
}

const Cohorts: React.FC = (props:any) => {
  const [filter, setFilter] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>("");

    const [{
        user: loggedUser,
        users,
        cohorts, 
        selectedCohort, 
        adminUpdateModal,
        cohortLL,
        blogs
      }, dispatch] = useStateValue();

    const classes = useStyles();

    useEffect(() => {
      if(selectedCohort !== null){
        setEditTitle(cohorts[selectedCohort].name)
      }
    }, [selectedCohort, editMode])

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
                    <Tooltip title="Create Cohort">
                      <NavLink to="/cohort/new">
                        <ListItemIcon className={classes.listIcon}> 
                            <AddIcon className={classes.icon}/>
                        </ListItemIcon>
                      </NavLink>
                    </Tooltip>
                  </ListItem>
              </List>
              <Divider />
              <TextField 
                    label="Search Cohorts" 
                    style={{margin: "5px"}}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    variant="outlined" 
                  />
              <List className={classes.cohortListContainer}>
                  {handleCohortFilter(cohorts, filter).map((cohort: {
                      _id: string,
                      name: string,
                      source: number,
                      admins: {
                          admin: boolean,
                          email: string,
                          image_url: string,
                          name: string,
                          _id: string
                      }[]
                  }) => (
                  <ListItem onClick={() => {
                    // avoid filtering to find the index of cohort if it's the same
                    if(cohort._id !== (selectedCohort !== null ? cohorts[selectedCohort]._id : "")){
                      dispatch(selectCohort(cohortLL.findCohortIndex(cohort._id)));
                    }    
                  }} 
                  className={cohorts[selectedCohort]?._id === cohort._id ? classes.cohortList : ""}
                  button 
                  key={cohort._id}>
                      {
                        checkIfUserIsAdminOfCohort(cohort.admins,loggedUser._id) && <Tooltip title="Cohort you're an admin of">
                          <ListItemIcon className={classes.listIcon}> 
                            <PersonIcon/>
                          </ListItemIcon>
                        </Tooltip>
                      }

                      {
                        findCohortBlogs(blogs,cohort).length > 0 && <Tooltip title="Blogs need approval">
                          <ListItemIcon className={classes.listIcon}> 
                            <NewReleasesIcon/>
                          </ListItemIcon>
                        </Tooltip>
                      }
                      
                      <ListItemText primary={truncate(cohort.name
                        , 16)} />
                  </ListItem>
                  ))}

              </List>
            </div>
          </Drawer>
          <main className={classes.content}>
            {
                selectedCohort !== null ? <>
                    <div className={classes.selectedCohortMain}>
                      {
                        !editMode ? <h1 className={classes.header}>
                            {cohorts[selectedCohort]?.name} 
                        </h1>
                        :
                        <TextField
                          style={{
                            flexGrow: 0.95
                          }}
                          value={editTitle}
                          variant="outlined"
                          helperText="Press Enter to submit changes. Format: CampusLocation-CohortDate (NYC-040119)"
                          onChange={(e) => setEditTitle(e.target.value.toUpperCase())}
                          onKeyPress={(e) => {
                            if(e.key === "Enter"){
                              updateCohortName(editTitle, cohorts[selectedCohort]._id)
                              .then(res => {
                                if(res.status === 200){
                                  dispatch(changeCohorts(cohortLL.editCohortName(cohorts[selectedCohort]._id,editTitle)));
                                  setEditMode(false);
                                }else{
                                  return res.json()
                                }
                              })
                              .then(data => {
                                if(data){
                                  alert(`Something went wrong. Error: ${data.error}`)
                                }
                              })
                            }
                          }}
                          autoFocus
                        />
                      }
                      <Tooltip title={editMode ? "Exit edit (changes are not saved)" : "Edit cohort name"}>
                        <IconButton
                          onClick={() => setEditMode(!editMode)}
                        >
                          <EditIcon/>
                        </IconButton>
                      </Tooltip>
                    </div>
                    <h3 className={classes.cohortSubHeader}>Reviews Blogs for Approval</h3>
                    <hr/>
                    <Blogs {...props} history={props.history}/>
                </>
                :
                <div className={classes.emptyCohort}>
                  {
                    cohorts.length ? <>
                      <ArrowBackIcon fontSize="large"/>
                      Select cohort
                    </>
                    :
                    "There are no cohorts available"
                  }
                </div>
            } 
          </main>

          {
              selectedCohort !== null && <Drawer
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
                      <Tooltip title="Add Admin">
                        <ListItemIcon className={classes.listIcon} onClick={() => {
                              if(loggedUser.admin){
                                  dispatch(setAdminUpdate(true))
                              }else{
                                  alert("You're not an admin. Not permitted to view.")
                              }
                            }}>
                            <AddIcon className={classes.icon}/>
                        </ListItemIcon>
                      </Tooltip>
                    </ListItem>
                </List>
                <Divider />
                <List className={classes.adminList}>
                  {cohorts[selectedCohort]?.admins.map((user: {
                      _id: string,
                      name: string,
                      admin: boolean,
                      image_url: string,
                      email: string
                  }, index:number) => (
                  <ListItem className={classes.listItem} key={user._id}>
                      <ListItemAvatar>
                        <Avatar
                            alt={user.image_url}
                            src={user.image_url}
                        />
                      </ListItemAvatar>
                      <ListItemText primary={truncate(user.name, 25)} />
                      <Tooltip title="Remove admin">
                        <ListItemIcon className={classes.listIcon} onClick={() => {
                            const statement = `${user.name} will be removed as an admin for cohort, ${cohorts[selectedCohort].name}.`
                            const callback = () => {
                              dispatch(setNotificationClose());
                              updateCohortAdminRequest(Action.REMOVE, user._id, cohorts[selectedCohort]._id)
                              .then(res => {
                                if(res.status !== 200){
                                    return res.json()
                                }else{
                                    // success
                                    dispatch(changeCohorts(cohortLL.removeUserAdmin(cohorts[selectedCohort]._id, index)));
                                }
                              })
                              .then(data =>{
                                  if(data){
                                      // error
                                      alert(`Something went wrong with the request. Error: ${data.error}`)
                                  }
                              })
                            }
                            dispatch(setNotificationOpen(statement, callback))
                        }}>
                          <Clear className={classes.icon}/>
                        </ListItemIcon>
                      </Tooltip>
                  </ListItem>
                  ))}
                </List>
                <Button 
                  variant="contained" 
                  color="primary"
                  className={classes.privilegeButton}
                  component={NavLink}
                  to={"/admin/users"}
                  >
                    Grant Admin Privileges
                  </Button>
              </div>
            </Drawer>
          }
          <Dialog 
            open={users && adminUpdateModal} 
            onClose={() => dispatch(setAdminUpdate(false))} 
            aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Admin</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        If you do not see the users you want to add as an admin for this cohort, please make sure the user has admin privileges. Otherwise, the user will not appear in the list.
                    </DialogContentText>
                </DialogContent>
                <AdminUsers/>

                <DialogActions>
                <Button onClick={() => dispatch(setAdminUpdate(false))}  color="primary">
                    Cancel
                </Button>
                </DialogActions>
            </Dialog>   
        </div>
      );
}

export default Cohorts
