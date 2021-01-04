import React, {useState} from 'react';
import BlogCard from './BlogCard';
import {useStateValue} from '../context-api/Provider';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// import {fetchUserBlogs} from '../config/fetch-requests';
import {deleteUserBlog} from '../context-api/actions';
import {server} from '../config/endpoints';

import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }),
);

type Props = {
    history: {
        location: {
            pathname: string
        }
    }
}

interface Blog {
  title: string,
  createdAt: string,
  image: string,
  link: string,
  tags: object,
  approved: boolean,
  _id: string,
  user: {
    name: string,
    admin: boolean,
    email: string,
    image_url: string,
  }
}

const Blogs : React.FC<Props> = ({history}) => {
    // console.log(history.location.pathname)
    
    const [{user,userBlogs}, dispatch] = useStateValue();
    const [open, setOpen] = useState(false);
    const [selectedBlogTitle, setSelectedBlogTitle] = useState("")
    const [selectedBlogId, setSelectedBlogId] = useState("");

    const classes = useStyles();

    const handleClickOpen = (id:string, title:string):void => {
      setOpen(true);
      setSelectedBlogId(id)
      setSelectedBlogTitle(title)
    };
    
    const handleClose = ():void => {
      setOpen(false);
    };

    const renderBlogs = () => {  
        return userBlogs.map((blog: Blog) => {
          const {title,createdAt,image,link,tags,approved,user, _id} = blog
          return <Grid
              item
              key={_id}
            >
            <BlogCard
              _id={_id}
              title={title}
              image={image}
              link={link}
              tags={tags}
              approved={approved}
              createdAt={createdAt}
              user={user}
              handleClose={handleClose}
              handleClickOpen={handleClickOpen}
            />
          </Grid> 
        })
    }

    return (
        <>
        <Grid container justify="center" className={classes.root} spacing={2}>
            {
                !userBlogs.length ? (user ? "No blogs" : "You're not logged in!") : renderBlogs()
            }
        </Grid>
        <Dialog
              open={open}
              onClose={handleClose}
              onExited={() => {
                // executes once the dialog has disappeared. Clears id and title of selected blog
                setSelectedBlogId("")
                setSelectedBlogTitle("")
              }}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
              <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
              <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {selectedBlogTitle} will be deleted.
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button variant="contained" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={() => {
                      // handle delete request
                      console.log('fetch')
                      fetch(`${server}/blog/delete/${selectedBlogId}`, {
                        method: "POST"
                      })
                      .then(res => res.json())
                      .then(data => {
                        if(data.error){
                          alert("Something went wrong. Try again");
                        }else{
                          dispatch(deleteUserBlog(selectedBlogId));
                          handleClose()
                        }
                      })
                    }} 
                    color="secondary"
                  >
                    Delete
                  </Button>
              </DialogActions>
          </Dialog>
        </>
    )
}

export default Blogs;