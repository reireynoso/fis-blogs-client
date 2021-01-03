import React from 'react';
import {useStateValue} from '../context-api/Provider';
// import {fetchUserBlogs} from '../config/fetch-requests';
// import {setUserBlogs} from '../context-api/actions';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 140,
  },
});

type Props = {
    history: {
        location: {
            pathname: string
        }
    }
}

const Blogs : React.FC<Props> = ({history}) => {
    // console.log(history.location.pathname)
    const classes = useStyles();
    const [{user,userBlogs}] = useStateValue();

    const renderBlogs = () => {

        return <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {
                  userBlogs[0].title
              }
            </Typography>
          </CardContent>
          <CardMedia
            className={classes.media}
            image={userBlogs[0].image}
            title={userBlogs[0].title}
          />
        </CardActionArea>
        <CardContent>
          <Typography gutterBottom component="h2">
              {
                  "By: " + userBlogs[0].user.name
              }
          </Typography>
        </CardContent>
        <CardActions>
          <Link
            component="a"
            variant="body1"
            href={userBlogs[0].link}
            target="_blank"
            rel="noopener" 
          >
            Button Link
          </Link>
        </CardActions>
      </Card>

    }

    return (
        <div>
            {
                !userBlogs.length ? (user ? "No blogs" : "You're not logged in!") : renderBlogs()
            }
            
        </div>
    )
}

export default Blogs;