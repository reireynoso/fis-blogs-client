import React, {useState} from 'react';
import {useStateValue} from '../context-api/Provider';
import {changeBlogs} from '../context-api/actions';

import {newBlogRequest} from '../config/fetch-requests';
import acceptableTags from '../config/tags';

import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Footer from './Footer';

type Props = {
    history: {push: (route:string) => void}
}

const useStyles = makeStyles((theme:Theme) => ({
    grid: {
        padding: theme.spacing(2, 0)
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        maxWidth: "300px",
        margin: "auto",
        textAlign: "center"
    },
    message: {
        textAlign: "center",
        color: "#388e3c"
    },
    header: {
        color: "#f44336"
    }
}));

const NewBlog : React.FC<Props> = ({history}) => {

    const [{blogLL, user, cohorts}, dispatch] = useStateValue();
    
    const [tags, setTags] = useState<string[]>([]);
    const [errorTags, setErrorTags] = useState<boolean>(false);
    
    const [link, setLink] = useState<string>("");
    const [errorLink, setErrorLink] = useState<boolean>(false);
    
    const [cohort, setCohort] = useState<string>("");
    const [errorCohort, setErrorCohort] = useState<boolean>(false);

    const [requestMsg, setRequestMsg] = useState<string>("");
    const [submitting, handleSubmitted] = useState<boolean>(false);

    const classes = useStyles();

    const handleLinkChange = (e:React.ChangeEvent<HTMLInputElement>) :void => {
        if(errorLink) setErrorLink(false);
        setLink(e.target.value);
        setRequestMsg("")
    }

    const handleCohortChange = (e:object,val:any) : void => {
        if(errorCohort) setErrorCohort(false);
        setCohort(val?.name || "")
        setRequestMsg("")
    }

    const handleSuccess = () => {
        setRequestMsg("Success!");
        setTimeout(() => {
            history.push("/")
        }, 1500)
    }

    const handleSubmit = async() => {
        // error management for fields
        handleSubmitted(true);

        if(!link) {
            setErrorLink(true);
            handleSubmitted(false);
            return
        }

        if(!cohort) {
            setErrorCohort(true);
            handleSubmitted(false);
            return
        }

        if(!tags.length || tags.length > 5) {
            setErrorTags(true);
            handleSubmitted(false);
            return
        }

        const blogInformation = {
            link,
            cohort,
            tags
        }

        const result = await newBlogRequest(blogInformation);
        // console.log(result)
        if(result.error){
            handleError(result.error);
            handleSubmitted(false);
            return;
        }
        // console.log(result)
        dispatch(changeBlogs(blogLL.addItem(result.blog)))
        handleSuccess()
    }

    const handleError = (error:{type: string, message: string}) : void => {
        switch(error.type){
            case "link": 
                setErrorLink(true);
                setRequestMsg(error.message);
                break;
            case "cohort": 
                setErrorCohort(true);
                setRequestMsg(error.message);
                break;
            case "tags": 
                setErrorTags(true);
                setRequestMsg(error.message);
                break;
            default :
                alert(error.message)
        }
    } 

    return (
        <div className={classes.formContainer}>
            {
                !user ?  
                <Grid className={classes.grid} container>
                    <Typography variant="h4" className={classes.header}>
                        Please login to submit a blog!
                    </Typography>
                </Grid> 
                :
                <>
                    <h1>Submit Blog</h1>
                    <Typography variant="body2" color="textSecondary" >
                        Note: When submitting a new blog, it must be approved before it's displayed for the public. Let an admin know!
                    </Typography>
                    <TextField
                        error={errorLink}
                        variant="standard"
                        label="Link URL"
                        placeholder="Medium Blog"
                        helperText={(errorLink && requestMsg) || "Only Medium and Dev.to articles are supported"}
                        onChange={handleLinkChange}
                        value={link}
                    />

                    <Autocomplete
                        options={cohorts}
                        getOptionLabel={(option: {
                            name:string,
                        }) => option.name}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Cohort"
                            error={errorCohort}
                            helperText={(errorCohort && requestMsg) || "If your cohort is not listed, let an admin know!"}
                        />
                        )}
                        onChange={handleCohortChange}
                    />
                    
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        limitTags={3}
                        options={acceptableTags}
                        // getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Tags"
                            placeholder="Select tags"
                            error={tags.length > 5 || errorTags}
                            helperText={(errorTags && requestMsg) || "At least 1 tag! 5 tags max!"}
                        />
                        )}
                        // getOptionSelected={(option, value) => {
                        //     console.log(option.name)
                        //     return option.name === value.name
                        // }}
                        // onInputChange={(val) => console.log('change', val)}
                        onChange={(_, val) => {
                                if(errorTags){
                                    setErrorTags(false)
                                }
                            // on select, the function manages adding the selected value to the array value and set the tags.
                                setTags(val);
                        }}
                        value={tags}
                    />

                    <Button disabled={errorTags || errorLink || errorCohort || submitting} onClick={handleSubmit} variant="contained" color="primary">
                        Post blog
                    </Button>
                    {
                        // displays success message. Message only shows if everything else has no error
                        !errorTags && !errorCohort && !errorLink && requestMsg && <h1 className={classes.message}>{requestMsg}</h1>
                    }
                </>

            }
            <Footer/>
        </div>
        
    )
}

export default NewBlog