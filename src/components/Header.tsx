import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
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
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    // '@global': {
    //   ul: {
    //     margin: 0,
    //     padding: 0,
    //     listStyle: 'none',
    //   },
    // },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      zIndex: 10,
      minHeight: 64
    },
    toolbar: {
      flexWrap: 'wrap',
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
    //   margin: theme.spacing(1, 1.5),
      textDecoration: "none",
    //   color: "inherit",
    margin: "2px"
    },
    activeLink: {
        borderTop: "1px solid #bbb6b6",
        borderBottom: "1px solid #bbb6b6",
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
    const matches = useMediaQuery('(min-width:724px)');

    useEffect(() => {
        if(matches && drawer){
            setDrawer(false)
        }
    }, [matches])
    
    const handleLogout = ():void => {
        if(user){
            cookies.remove("token", {
                path: "/"
            });
            dispatch(setUser(null));
        }
        handleCloseDrawer();
    }

    const handleCloseDrawer = ():void => {
        setDrawer(false);
    }


    const navLinks = () => {
        return <>

        <Button
            className={classes.link}
            activeClassName={classes.activeLink}
            component={NavLink}
            to="/about"
            onClick={handleCloseDrawer}
        >
            About
        </Button>

        <Button
            className={classes.link}
            activeClassName={classes.activeLink}
            component={NavLink}
            to="/blogs/me"
            onClick={handleCloseDrawer}
        >
            My Blogs
        </Button>

        <Button
            component={NavLink}
            onClick={handleCloseDrawer}
            activeClassName={classes.activeLink} 
            className={classes.link} 
            to="/blogs/new"
        >
            Submit Blog
        </Button>

        {
            user?.admin && <>
            {/* <Button
            component={NavLink}
            onClick={handleCloseDrawer} 
            className={classes.link}
            activeClassName={classes.activeLink} 
            to={user && user.admin ? "/cohort/new": ""}
            >
                Create Cohort
            </Button> */}

            <Button
            component={NavLink}
            onClick={handleCloseDrawer} 
            className={classes.link}
            activeClassName={classes.activeLink} 
            to={user && user.admin ? "/cohort/admin": ""}
            >
                Admin View
            </Button>
            </>
        }

        <Button
            component={NavLink}
            onClick={handleLogout} 
            className={classes.link}
            to={!user ? "/login": ""}
            color={!user ? "primary" : "secondary"}
            variant="contained"
        >
            {!user ? "Login": "Logout"}
        </Button>

        </>
    }

    return (
        <AppBar color="default" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                    <Button
                        component={NavLink}
                        size="large"
                        className={classes.link} 
                        to="/"
                    >
                        coding|Blogs
                    </Button>
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