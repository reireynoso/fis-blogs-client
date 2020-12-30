import React, {useEffect, useState} from 'react';
import {useStateValue} from '../context-api/Provider';
import {server} from '../config/endpoints';
import Cookies from 'universal-cookie';
import {setCohorts} from '../context-api/actions';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import acceptableTags from '../config/tags';

const cookies = new Cookies();

const NewBlog : React.FC = () => {

    const [{user, cohorts}, dispatch] = useStateValue();
    const [tags, setTags] = useState<string[]>([])
    const [link, setLink] = useState<string>("");
    const [cohort, setCohort] = useState<string>("")

    useEffect(() => {
        // auto fetch cohorts 
        if(!cohorts.length){
            fetch(`${server}/cohort`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                dispatch(setCohorts(data));
            })
        }
    }, [cohorts])

    const handleLinkChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setLink(e.target.value);
    }

    const handleCohortChange = (e:React.ChangeEvent<{value:unknown}>) => {
        // console.log(e.target.value as string)
        setCohort(e.target.value as string)
    }

    const handleSubmit = ():void => {
        const blogInformation = {
            link,
            cohort,
            tags
        }
        fetch(`${server}/blog/new`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application.json",
                "Authorization": `Bearer ${cookies.get("token")}`
            },
            body: JSON.stringify(blogInformation)
        })
        .then(res => res.json())
        .then(console.log)
    }

    return (
        <div>
            {
                !user ?  
                "Please Login first before posting a blog" 
                :
                <div>
                    <TextField
                        variant="standard"
                        label="Link URL"
                        placeholder="Medium Blog"
                        error={tags.length > 5}
                        helperText="Please provide a friend link"
                        onChange={handleLinkChange}
                        value={link}
                    />

                    <FormControl>
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
                            error={tags.length > 5}
                            helperText="5 Tags Max!"
                        />
                        )}
                        // getOptionSelected={(option, value) => {
                        //     console.log(option.name)
                        //     return option.name === value.name
                        // }}
                        // onInputChange={(val) => console.log('change', val)}
                        onChange={(e, val) => {
                            // on select, the function manages adding the selected value to the array value and set the tags.
                                setTags(val);
                        }}
                        value={tags}
                    />

                    <button onClick={handleSubmit}>
                        Post blog
                    </button>
            </div>

            }
        </div>
        
    )
}

export default NewBlog