import React, {useEffect, useState} from 'react';
import {useStateValue} from '../context-api/Provider';
import {setCohorts} from '../context-api/actions';

import {newBlogRequest, fetchCohorts} from '../config/fetch-requests';
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

const NewBlog : React.FC<Props> = ({history}) => {

    const [{user, cohorts}, dispatch] = useStateValue();
    
    const [tags, setTags] = useState<string[]>([]);
    const [errorTags, setErrorTags] = useState<boolean>(false);
    
    const [link, setLink] = useState<string>("");
    const [errorLink, setErrorLink] = useState<boolean>(false);
    
    const [cohort, setCohort] = useState<string>("");
    const [errorCohort, setErrorCohort] = useState<boolean>(false);

    const [requestMsg, setRequestMsg] = useState<string>("")

    const useStyles = makeStyles(() => ({
        formContainer: {
            display: "flex",
            flexDirection: "column",
            maxWidth: "300px",
            margin: "auto"
        }
    }));

    const classes = useStyles();

    useEffect(() => {
        // auto fetch cohorts 
        if(!cohorts.length){
            fetchCohorts()
            .then(data => {
                dispatch(setCohorts(data));
            })
        }
    }, [cohorts])

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
        }, 2000)
    }

    const handleSubmit = async() => {
        // error management for fields
        if(!link) {
            setErrorLink(true)
            return
        }

        if(!cohort) {
            setErrorCohort(true)
            return
        }

        if(!tags.length || tags.length > 5) {
            setErrorTags(true)
            return
        }

        const blogInformation = {
            link,
            cohort,
            tags
        }

        const result = await newBlogRequest(blogInformation);
       
        if(result.error){
            handleError(result.error)
            return;
        }

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
        <div>
            {
                !user ?  
                "Please Login first before posting a blog" 
                :
                <>
                    <div className={classes.formContainer}>
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

                        <Button onClick={handleSubmit} variant="contained" color="primary">
                            Post blog
                        </Button>
                    </div>

                    {
                        // displays success message. Message only shows if everything else has no error
                        !errorTags && !errorCohort && !errorLink && requestMsg && <h1>{requestMsg}</h1>
                    }
                </>

            }
        </div>
        
    )
}

export default NewBlog