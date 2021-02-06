import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {newCohortRequest} from '../config/fetch-requests';
import {useStateValue} from '../context-api/Provider';

import {
    addNewCohort
} 
from '../context-api/actions';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

enum Status {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error"
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
        color: "#388e3c"
    }
}));

const NewCohort : React.FC = () => {
    const [name, setName] = useState("");
    const [serverMessage, setServerMessage] = useState("");
    const [statusCode, setStatusCode] = useState<Status>(Status.LOADING);

    const [{}, dispatch] = useStateValue();

    const classes = useStyles();
    const history = useHistory();

    const onNameChange = (e:React.ChangeEvent<HTMLInputElement>) : void => {
        setName(e.target.value)
        if(serverMessage || statusCode !== Status.LOADING){
            setServerMessage("");
            setStatusCode(Status.LOADING);
        }
    }

    const handleSubmit = (e:React.FormEvent) : void => {
        e.preventDefault();

        
        newCohortRequest(name)
        .then(data => {
            if(data.error){
                // addressed user somehow submitting when NOT logged in, duplicate cohort name, blank cohort name
                setStatusCode(Status.ERROR);
                setServerMessage(data.error)
            }
            else{
                setStatusCode(Status.SUCCESS);
                setServerMessage("Cohort created!");
                setName("");
                setTimeout(() => {
                    dispatch(addNewCohort(data))
                    history.push('/cohort/admin')
                }, 1500)
            }
        })
    }

    return (
        <div className={classes.formContainer}>
            <h1>Add a New Cohort</h1>
            <TextField
                error={statusCode === Status.ERROR}
                required
                variant="standard"
                label="Cohort Name"
                placeholder="Ex. NYC-040119"
                helperText={statusCode === Status.ERROR ? serverMessage : "Format: CampusLocation-CohortDate (NYC-040119)"}
                onChange={onNameChange}
                value={name}
            />
            <Button 
                onClick={handleSubmit} 
                variant="contained" 
                color="primary"
                disabled={statusCode === Status.SUCCESS}
                >
                Submit Cohort Name
            </Button>

            {
                statusCode === Status.SUCCESS && <h1 className={classes.message}>{serverMessage}</h1>
            }
        </div>
    )
}

export default NewCohort;