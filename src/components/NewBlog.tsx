import React, {useState} from 'react';
import {useStateValue} from '../context-api/Provider';
import {addBlog} from '../context-api/actions';

import {newBlogRequest} from '../config/fetch-requests';
import acceptableTags from '../config/tags';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

type Props = {
    history: {push: (route:string) => void}
}

const useStyles = makeStyles(() => ({
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
    }
}));

const NewBlog : React.FC<Props> = ({history}) => {

    const [{user, cohorts}, dispatch] = useStateValue();
    
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

    const handleCohortChange = (e:React.ChangeEvent<{value:unknown}>) : void => {
        // console.log(e.target.value as string)
        if(errorCohort) setErrorCohort(false);
        setCohort(e.target.value as string)
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
        dispatch(addBlog(result.blog))
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
                setRequestMsg("")
        }
    } 

    return (
        <div className={classes.formContainer}>
            {
                !user ?  
                "Please login before posting a blog!" 
                :
                <>
                    <h1>New Medium Blog</h1>
                    <TextField
                        error={errorLink}
                        variant="standard"
                        label="Link URL"
                        placeholder="Medium Blog"
                        helperText={(errorLink && requestMsg) || "Please provide a friend link"}
                        onChange={handleLinkChange}
                        value={link}
                    />

                    <FormControl error={errorCohort}>
                        <InputLabel id="demo-simple-select-label">Cohort</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        value={cohort}
                        onChange={handleCohortChange}
                        >
                            {
                                cohorts.map((cohort:{name:string}) => (
                                    <MenuItem 
                                        key={cohort.name}
                                        value={cohort.name}
                                        >
                                            {cohort.name}
                                        </MenuItem>
                                ))
                            }
                        </Select>
                        <FormHelperText>{(errorCohort && requestMsg) || "If your cohort is not listed, let an instructor know!"}</FormHelperText>
                    </FormControl>
                    
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
        </div>
        
    )
}

export default NewBlog