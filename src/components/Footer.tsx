import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        background: "#eeeeee",
        position: "fixed",
        width: "100%",
        bottom: 0,
        left: 0,
        padding: theme.spacing(2, 0),
        fontSize: 12,
        textAlign: "center"
    },
  }),
);


const Footer:React.FC = () => {
    const classes = useStyles();

    return <main className={classes.root}>
        <span>&copy; codingBlogs {new Date().getFullYear()}. All rights reserved.</span>
    </main>
}

export default Footer