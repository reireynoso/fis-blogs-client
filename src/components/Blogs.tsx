import React from 'react';
import BlogCard from './BlogCard';
import FilterComponent from './FilterComponet';

import {useStateValue} from '../context-api/Provider';
import {findUserBlogs, handleFilter, findCohortBlogs} from '../helpers/helper-methods'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


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
    header: {
      color: "#f44336"
    }
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
    ] = useStateValue();

    const classes = useStyles();

    const determinePath = () => {
      if(history.location.pathname === "/blogs/me"){
        return findUserBlogs(blogs, user)
      }else if(history.location.pathname === "/cohort/admin"){
        return findCohortBlogs(blogs, selectedCohort)
      }else{
        return handleFilter(blogs, titleFilter, tagFilter, cohortFilter);
      }
    }


    const renderBlogs = () => {  
        const matchingBlogs = determinePath();
        if(!matchingBlogs.length){
          return <h3 className={classes.header}>No blogs</h3>
        }
        return matchingBlogs.map((blog: Blog) => {
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
              history={history}
              // handleClickOpen={handleClickOpen}
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
        </>
    )
}

export default Blogs;