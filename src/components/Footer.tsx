import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        background: "#eeeeee",
        position: "fixed",
        width: "100%",
        bottom: 0,
        left: 0,
        padding: theme.spacing(1, 0),
        fontSize: 12,
        textAlign: "center",
        font: "inherit"
    },
    options: {
        maxWidth: 300,
        margin: "auto",
        display: "flex",
        justifyContent: "space-around",
        padding: theme.spacing(1,0)
    },
    option: {
        textDecoration: "none",
        color: "inherit"
    }
  }),
);


const Footer:React.FC = () => {
    const classes = useStyles();

    return <main className={classes.root}>
        <span>&copy; codingBlogs {new Date().getFullYear()}. All rights reserved.</span>
        <div className={classes.options}>
            <Link className={classes.option} to="/about">About</Link>
            <Link className={classes.option} to="/about/terms-and-conditions">Terms and Conditions</Link>
            <Link className={classes.option} to="/about/disclaimer">Disclaimer</Link>
            <Link className={classes.option} to="/about/privacy">Privacy</Link>
        </div>
    </main>
}

export default Footer