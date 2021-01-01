import React, {useState, useEffect} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import Cookies from 'universal-cookie';
import {useStateValue} from '../context-api/Provider'
import {setUser} from '../context-api/actions';

import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

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
      textDecoration: "none",
      color: "inherit"
    },
    list: {
        display: "flex",
        flexDirection: "column"
    }
  }));

const cookies = new Cookies();

const Header : React.FC = () => {
    const [{user}, dispatch] = useStateValue();
    const [drawer, setDrawer] = useState(false);
    
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:450px)');

    useEffect(() => {
        if(matches && drawer){
            setDrawer(false)
        }
    }, [matches])
    
    const handleLogout = ():void => {
        if(user){
            dispatch(setUser(null));
            cookies.remove("token");
        }
        handleCloseDrawer();
    }

    const handleCloseDrawer = ():void => {
        setDrawer(false);
    }


    const navLinks = () => {
        return <>
        <NavLink onClick={handleCloseDrawer} className={classes.link} to="/blogs/new">
            Submit a blog
        </NavLink>

        {
            user?.admin && <NavLink onClick={handleCloseDrawer} className={classes.link} to={user && user.admin ? "/cohort/new": ""}>
                New Cohort
            </NavLink>
        }

        <NavLink onClick={handleLogout} className={classes.link} to={!user ? "/login": ""}>
            {!user ? "Login": "Logout"}
        </NavLink>
        </>
    }

    return (
        <AppBar color="default" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                    <NavLink className={classes.link} to="/">
                        FIS Blogs
                    </NavLink>
                </Typography>
                {
                    matches ? <nav>
                        {navLinks()}
                    </nav> 
                :
                <MenuIcon onClick={() => setDrawer(true)}/>
                }
            </Toolbar>
            <Drawer anchor={"right"} open={drawer} onClose={() => setDrawer(false)}>
                <List className={classes.list}>
                    {navLinks()}
                </List>
            </Drawer>
        </AppBar>
    )
}

export default Header