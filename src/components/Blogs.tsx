import React, {useState} from 'react';
import BlogCard from './BlogCard';
import FilterComponent from './FilterComponet';

import {useStateValue} from '../context-api/Provider';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {deleteBlogRequest} from '../config/fetch-requests';
import {deleteBlog} from '../context-api/actions';
import {findUserBlogs, handleFilter, findCohortBlogs} from '../helpers/helper-methods'

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
    _id: string
  },
  cohort: {
    admins: string[],
    name: string
  }
}

const Blogs : React.FC<Props> = ({history}) => {
    // console.log(history.location.pathname)
    
    const [{
      user,
      blogs, 
      titleFilter, 
      tagFilter, 
      cohortFilter, 
      selectedCohort
    }, 
      dispatch
    ] = useStateValue();
    const [open, setOpen] = useState(false);
    const [selectedBlogTitle, setSelectedBlogTitle] = useState("")
    const [selectedBlogId, setSelectedBlogId] = useState("");

    const classes = useStyles();

    const handleClickOpen = (id:string, title:string):void => {
      setOpen(true);
      setSelectedBlogId(id)
      setSelectedBlogTitle(title)
    };

    const determinePath = () => {
      if(history.location.pathname === "/blogs/me"){
        return findUserBlogs(blogs, user)
      }else if(history.location.pathname === "/cohort/admin"){
        return findCohortBlogs(blogs, selectedCohort)
      }else{
        return handleFilter(blogs, titleFilter, tagFilter, cohortFilter);
      }
    }
    
    const handleClose = ():void => {
      setOpen(false);
    };

    const renderBlogs = () => {  
        return determinePath().map((blog: Blog) => {
          const {title,createdAt,image,link,tags,approved,user, _id, cohort} = blog
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
              cohort={cohort}
              user={user}
              handleClickOpen={handleClickOpen}
            />
          </Grid> 
        })
    }

    return (
        <>
        {
            history.location.pathname === "/" && <FilterComponent/>
        } 
        <Grid container justify="center" className={classes.root} spacing={2}>
            {
                !user && history.location.pathname === "/blogs/me" ? "You're not logged in!" : renderBlogs()
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
                      deleteBlogRequest(selectedBlogId)
                      .then(data => {
                        if(data.error){
                          alert("Something went wrong. Try again");
                        }else{
                          dispatch(deleteBlog(selectedBlogId));
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