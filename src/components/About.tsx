import React from 'react';
import Footer from './Footer'

import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import Divider from '@material-ui/core/Divider';
import GroupIcon from '@material-ui/icons/Group';
import DoneIcon from '@material-ui/icons/Done';
import GavelIcon from '@material-ui/icons/Gavel';
import HttpIcon from '@material-ui/icons/Http';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(4,4),
      marginBottom: theme.spacing(4)
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
    header: {
      color: "#f44336"
    }
  }),
);

const About:React.FC = () => {

    const classes = useStyles();

    return <Container maxWidth="md" className={classes.root}>
        <Typography component="div">
            <Typography variant="h3">
                About
                <InfoIcon/>
            </Typography>
            <Divider/>
            <Typography>
                As a requirement of the program, students of Flatiron School wrote blogs pertaining to programming concepts. These blogs contained valuable information that could be utilized by other people learning how to code. However, these blogs were mostly shared in a cohort's(class) Slack channel. Sometimes, the blogs were circulated through referrals but it's more effective to have a hub referencing all of these blogs. Enter <em>codingBlogs</em>. With our app, users can submit a link to their blogs and can be easily accessible for other students/learners. 
            </Typography>
            <br/>
            <Typography variant="h4">
                Cohort
                <GroupIcon/>
            </Typography>
            <Divider/>
            <Typography>
                You might notice that selecting a cohort will be required when submitting a coding blog. Although this app was built with the idea of Flatiron School in mind, it is not limited to Flatiron School students. Users of all types are encouraged to share their coding blogs and contribute their knowledge. With that being said, if you are willing to share technical information, please select the <em>Awesome-Contributor</em> cohort.
            </Typography>
            <br/>
            <Typography variant="h4">
                Admin
                <GavelIcon/>
            </Typography>
            <Divider/>
            <Typography>
                You may notice that when submitting a blog, it does not immediately appear in the general public view. At Flatiron School, each cohort has assigned coaches. A responsbility of the coach involved checking a blog and making sure things were in order. These coaches will act as <em>admins</em> and approve blogs to ensure they are appropriate (the submitted blog does belong to the user, the blogs is related to tech/programming, etc.).

                <br/>
                <br/>
                Outside of Flatiron School, if you're interested in becoming an <em>admin</em>, please send an email to <a href="mailto: reireynoso@gmail.com">reireynoso@gmail.com</a> regarding your interest. 
            </Typography>
            <br/>
            <Typography variant="h4">
                Features
                <DoneIcon/>
            </Typography>
            <Divider/>
            <Typography>
            For the most part, our app is designed to be a hub containing link references to coding blogs. We do not actually create or write blogs in this platform. Here are some of the app's features:
            </Typography>
            <ul>
                <li>Ease of access to our apps' collection of submitted/approved coding blogs</li>
                <li>Filtering of blogs collection</li>
                <li>View list of your own blogs keeping track of which ones are approved</li>
                <li>Remove your blogs</li>
            </ul>
            <Typography variant="h4">
                Supported Platforms
                <HttpIcon/>
            </Typography>
            <Divider/>
            <Typography>
                Although there are many platforms, we only support blogs from the following at the moment:
            </Typography>
            <ul>
                <li>Medium</li>
                <li>Dev.to</li>
            </ul>
        </Typography>
        <Footer/>
    </Container>

}

export default About