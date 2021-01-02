import React, {useEffect} from 'react';
import {useStateValue} from '../context-api/Provider';
import {fetchUserBlogs} from '../config/fetch-requests';
import {setUserBlogs} from '../context-api/actions';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
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

    const [{userBlogs}, dispatch] = useStateValue();
    console.log(userBlogs);
    useEffect(() => {
        // userblogs is initially set to null. If null, request hasn't been made. 
        if(!userBlogs){
            const userBlogs = fetchUserBlogs();
            userBlogs.then((data) => {
                dispatch(setUserBlogs(data))
            })
        }
    }, [])

    const renderBlogs = () => {

        return <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={userBlogs[0].image}
            title={userBlogs[0].title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {
                  userBlogs[0].title
              }
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>

    }

    return (
        <div>
            {
                !userBlogs ? "Loading" : renderBlogs()
            }
            
        </div>
    )
}

export default Blogs;