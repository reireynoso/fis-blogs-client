import React, {useState} from 'react';
import {useStateValue} from '../context-api/Provider';
import acceptableTags from '../config/tags';
import {setTitleFilter, setTagFilter, setCohortFilter} from '../context-api/actions';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        position: "sticky",
        top: "68px",
        zIndex: 10,
        background: "#eeeeee",
        marginBottom: "10px",
        padding: "0.4rem"
    },
    formControl: {
        minWidth: 120,
    },
  }));

const FilterComponent : React.FC = () => {
    const [open,setOpen] = useState(false)
    const [{cohorts, cohortLL, titleFilter, cohortFilter, tagFilter}, dispatch] = useStateValue();
    const classes = useStyles();

    return <main className={classes.root}>
        <Collapse in={open} timeout="auto">
            <Grid container justify="center" spacing={2}>
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
                        value={tagFilter}
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
                        value={cohorts[cohortLL?.cohortObj[cohortFilter]] || null}
                    />
                </Grid>
            </Grid>
        </Collapse>
        
        <aside 
        onClick={() => setOpen(!open)} 
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: open ? "1rem": 0,
            cursor: "pointer"
        }}
        >
            {open ? "Shrink": "Expand"} filter {open ? <ExpandLess/>: <ExpandMore/>}
        </aside>
        
    </main>
}

export default FilterComponent

