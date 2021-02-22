import React from 'react';
import {useStateValue} from '../context-api/Provider';
import acceptableTags from '../config/tags';
import {setTitleFilter, setTagFilter, setCohortFilter} from '../context-api/actions';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    formControl: {
        minWidth: 120,
    },
  }));

const FilterComponent : React.FC = () => {
    const [{cohorts, titleFilter}, dispatch] = useStateValue();
    const classes = useStyles();

    return <Grid container justify="center" className={classes.root} spacing={2}>
        <Grid item>
            <TextField 
                label="Search by title" 
                variant="outlined"
                value={titleFilter} 
                onChange={(e) => dispatch(setTitleFilter(e.target.value))}
            />
        </Grid>
        <Grid item>
            <Autocomplete
                style={{width: "195px"}}
                options={acceptableTags}
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    label="Tags"
                />
                )}
                onChange={(_, val) => dispatch(setTagFilter(val || ""))}
            />
        </Grid>
        <Grid item>
            <Autocomplete
                style={{width: "195px"}}
                options={cohorts}
                getOptionLabel={(option: {
                    name:string,
                    _id: string
                }) => option.name}
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    label="Cohort"
                />
                )}
                onChange={(_, val) => {
                    dispatch(setCohortFilter(val?._id || ""))
                }}
            />
        </Grid>
    </Grid>
}

export default FilterComponent

