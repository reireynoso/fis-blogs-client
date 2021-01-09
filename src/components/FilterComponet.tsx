import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1
    },
    formControl: {
        minWidth: 120,
    },
    text: {
        // minWidth: 150,
    }
  }));

const FilterComponent : React.FC = () => {

    const classes = useStyles();

    return <Grid container justify="center" className={classes.root} spacing={2}>
        <Grid item>
            <TextField className={classes.text} id="outlined-basic" label="Search by title" variant="outlined" />
        </Grid>
        <Grid item>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="tag-filter-select">Tag</InputLabel>
                <Select
                labelId="tag-filter-select"
                id="demo-simple-select-outlined"
                //   value={age}
                //   onChange={handleChange}
                label="Age"
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                </Select>
        </FormControl>
        </Grid>
        <Grid item>
            <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="cohort-filter-select">Cohort</InputLabel>
                    <Select
                    labelId="cohort-filter-select"
                    id="demo-simple-select-outlined"
                    //   value={age}
                    //   onChange={handleChange}
                    label="Age"
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
            </FormControl>
        </Grid>
    </Grid>
}

export default FilterComponent

