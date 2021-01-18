import React, {useState} from 'react';
import {useStateValue} from '../context-api/Provider'

import Blogs from './Blogs';

import {selectCohort} from '../context-api/actions';

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
        </div>
      );
}

export default Cohorts
