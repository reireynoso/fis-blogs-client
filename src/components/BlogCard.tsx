import React, {useState} from 'react';
import {useStateValue} from '../context-api/Provider';

import {approveBlog, deleteBlog, setNotificationOpen, setNotificationClose} from '../context-api/actions';
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
        name: string
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
    // handleClickOpen: (id:string, title:string) => void
  }

const BlogCard : React.FC<Props> = ({title, tags,image,link,user, _id, cohort, history, approved}) => {
    const classes = useStyles();
    const [{user:loggedUser}, dispatch] = useStateValue();
    const [approval, setApproval] = useState(false);

    return <Card className={classes.root}>
    {
        loggedUser && (loggedUser.admin || loggedUser._id === user._id) && <ClearIcon onClick={() => {
          // handleClickOpen(_id, title)
          const statement = `"${title}" from cohort, ${cohort.name} will be removed.`
          const callback = () => {
            deleteBlogRequest(_id)
            .then(data => {
              if(data.error){
                alert("Something went wrong. Try again");
              }else{
                dispatch(setNotificationClose());
                dispatch(deleteBlog(_id));
              }
            })
          }
          dispatch(setNotificationOpen(statement, callback))
        }} 
        className={classes.icon}/>
    }
    <CardContent>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">
            {
                truncate(title)
                // truncate("hellosdasiduhaidhaihdiandianidhaiiuhroqwhe9iqyweojqwoeijqowiejreinadlde reyrenoso ksadhoasdoajoiajodijapowj")
            }
        </Typography>
        <Divider/>
        </CardContent>
        <CardMedia
        className={classes.media}
        image={image ? image : "/images/no-image-found.jpg"}
        title={title}
    />
    <CardContent>
      <Typography className={(loggedUser && user._id === loggedUser._id) ? classes.author : ""} gutterBottom component="h2">
          {
              "By: " + user.name
          }
      </Typography>
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
        View in Medium
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
                dispatch(approveBlog(_id));
                setApproval(false)
              }, 1000)
            }
          })
          .then(result => {
            if(result){
              // console.log(result.error)
              alert(`ERROR: ${result.error}. Try again.`);
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