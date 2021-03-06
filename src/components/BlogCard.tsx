import React, {useState} from 'react';
import {useStateValue} from '../context-api/Provider';

import {changeBlogs, setNotificationOpen, setNotificationClose, setTagFilter} from '../context-api/actions';
import {approveBlogRequest, deleteBlogRequest} from '../config/fetch-requests';

import {truncate} from '../helpers/helper-methods'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ClearIcon from '@material-ui/icons/Clear';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles({
  root: {
    width: 300,
    textAlign: "center",
    position: "relative"
  },
  media: {
    height: 140,
  },
  link: {
      width: "100%"
  },
  title: {
    wordWrap: "break-word",
    minHeight: "4em"
  },
  icon: {
      position: 'absolute',
      right: 3,
      borderRadius: "10px",
      cursor: "pointer",
      "&:hover": {
          background: "#9e9e9e",
          transition: "0.3s ease"
      }
  },
  author: {
      background: "#1de9b6"
  },
  button: {
    marginBottom: "1rem",
    background: "green",
    color: "white"
  },
  fabAside: {
    minHeight: "70px",
  },
  fabs: {
    margin: "1px 2px",
    height: "20px",
    padding: "5px",
    fontSize: "10px",
    fontWeight: "bold",
    boxShadow: "none"
  }
});
interface Props {
    title: string,
    createdAt: string,
    image: string,
    link: string,
    tags: object,
    approved: boolean,
    _id: string,
    user: {
        _id: string,
        name: string,
        image_url: string
    },
    cohort: {
        admins: string[],
        name: string
    },
    history: {
      location: {
          pathname: string
      }
    },
  }

const BlogCard : React.FC<Props> = ({title,image,link,user, _id, cohort, history, approved, tags}) => {
    const classes = useStyles();
    const [{blogLL, user:loggedUser}, dispatch] = useStateValue();
    const [approval, setApproval] = useState<boolean>(false);

    return <Card className={classes.root}>
    {
        loggedUser && (loggedUser.admin || loggedUser._id === user._id) && <Tooltip title="Delete blog">
          <ClearIcon onClick={() => {
            // handleClickOpen(_id, title)
            const statement = `"${title}" from cohort, ${cohort.name} will be removed.`
            const callback = () => {
              deleteBlogRequest(_id)
              .then(data => {
                if(data.error){
                  alert(`Error: ${data.error}`);
                }else{
                  dispatch(changeBlogs(blogLL.removeBlog(_id)));
                  dispatch(setNotificationClose());
                }
              })
            }
            dispatch(setNotificationOpen(statement, callback))
          }} 
          className={classes.icon}/>
        </Tooltip>
    }
    <CardContent>
        <Typography className={classes.title} variant="h5">
            {
                truncate(title, 60)
                // truncate("hellosdasiduhaidhaihdiandianidhaiiuhroqwhe9iqyweojqwoeijqowiejreinadlde reyrenoso ksadhoasdoajoiajodijapowj", 60)
            }
        </Typography>
        <Divider/>
        </CardContent>
        <CardMedia
        className={classes.media}
        image={image ? image : "/images/no-image-found.jpg"}
        title={title}
    />
    <CardContent style={{
      padding: "0 5px"
    }}>
      {
        history.location.pathname === "/blogs/me" ? <>
          <Typography
            variant="h6"
            noWrap
          >
              {cohort.name}
          </Typography>
          <Button
            disableFocusRipple
            disableRipple
            style={{cursor: "initial"}}
            variant="contained" 
            color={!approved ? "secondary":"primary"}
          >{
            approved ? "Approved" : "Pending"
          }</Button>
        </>
        :
        <>
        <List>
            <ListItem style={{
              textAlign: "center",
            }}>
              <ListItemAvatar>
                <Avatar
                    alt={user.image_url}
                    src={user.image_url}
                />
              </ListItemAvatar>
              <ListItemText className={(loggedUser && user._id === loggedUser._id) ? classes.author : ""} primary={user.name ? truncate(user.name, 25) : "No Name Provided"} />
            </ListItem>
        </List>
        {
          history.location.pathname === "/" && <aside className={classes.fabAside}>
        {
          // [...Object.keys(tags), "Frontend Development", "Web Developement", "Command Line Interface", "Backend Development"]
          Object.keys(tags)
          .map(tag => {
            return <Fab
              onClick={() => dispatch(setTagFilter(tag))}
              variant="extended"
              className={classes.fabs}
              key={tag}
            >
                {tag}
              </Fab>
            })
          }
          </aside>
        }
        </>
      }
    </CardContent>
    <CardActions>
      <Link
        component="a"
        variant="body1"
        href={link}
        target="_blank"
        rel="noopener" 
        className={classes.link}
      >
        View Article
      </Link>
    </CardActions>
    {
      history.location.pathname === "/cohort/admin" && !approved && <Button
        variant="contained"
        className={classes.button}
        disabled={approval}
        onClick={() => {
          setApproval(true)

          approveBlogRequest(_id)
          .then(res => {
            if(res.status !== 200){
              return res.json()
            }else{
              setTimeout(() => {
                dispatch(changeBlogs(blogLL.approveBlog(_id)));
              }, 500)
            }
          })
          .then(result => {
            if(result){
              // console.log(result.error)
              alert(`ERROR: ${result.error}.`);
              setApproval(false);
            }
          })
        }}
        >
          {approval ? "Updating..." : "Approve"}
      </Button>
    }
  </Card>
}

export default BlogCard