import React from 'react';

import {truncate} from '../helpers/helper-methods'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ClearIcon from '@material-ui/icons/Clear';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

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
        name: string
    },
    handleClickOpen: (id:string, title:string) => void,
    handleClose: () => void,
  }

const BlogCard : React.FC<Props> = ({title,image,link,user, _id, handleClickOpen, handleClose}) => {
    const classes = useStyles();

    return <Card className={classes.root}>
    <ClearIcon onClick={() => handleClickOpen(_id, title)} className={classes.icon}/>
    <CardContent>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">
            {
                truncate(title)
                // truncate("hellosdasiduhaidhaihdiandianidhaiiuhroqwhe9iqyweojqwoeijqowiejreinadlde reyrenoso ksadhoasdoajoiajodijapowj")
            }
        </Typography>
        </CardContent>
        <CardMedia
        className={classes.media}
        image={image ? image : "/images/no-image-found.jpg"}
        title={title}
    />
    <CardContent>
      <Typography gutterBottom component="h2">
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
        Button Link
      </Link>
    </CardActions>
  </Card>
}

export default BlogCard