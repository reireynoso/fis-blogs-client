import React from 'react';
import {useStateValue} from '../context-api/Provider';
import acceptableTags from '../config/tags';
import {setTitleFilter, setTagFilter, setCohortFilter} from '../context-api/actions';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    formControl: {
        minWidth: 120,
    },
  }));

const FilterComponent : React.FC = () => {
    const [{cohorts, titleFilter, tagFilter, cohortFilter}, dispatch] = useStateValue();
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
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="tag-filter-select">Tag</InputLabel>
                <Select
                labelId="tag-filter-select"
                value={tagFilter}
                onChange={(e) => dispatch(setTagFilter(e.target.value))}
                label="tag"
                >
                    <MenuItem 
                    value=""
                    >
                        All
                    </MenuItem>
                {
                    acceptableTags.map((tag: string) => (
                        <MenuItem 
                            key={tag}
                            value={tag}
                            >
                                {tag}
                            </MenuItem>
                    ))
                }
                </Select>
        </FormControl>
        </Grid>
        <Grid item>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="cohort-filter-select">Cohort</InputLabel>
                <Select
                labelId="cohort-filter-select"
                value={cohortFilter}
                onChange={(e) => dispatch(setCohortFilter(e.target.value))}
                label="cohort"
                >
                    <MenuItem 
                    value=""
                    >
                        All
                    </MenuItem>
                {
                    cohorts.map((cohort:{name:string, _id:string}) => (
                        <MenuItem 
                        key={cohort.name}
                        value={cohort._id}
                        >
                            {cohort.name}
                        </MenuItem>
                    ))
                }
                </Select>
            </FormControl>
        </Grid>
    </Grid>
}

export default FilterComponent

