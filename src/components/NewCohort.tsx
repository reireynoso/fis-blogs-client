import React, {useState, useEffect} from 'react';
import {server} from '../config/endpoints';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

enum Status {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error"
}

const NewCohort : React.FC = () => {
    const [name, setName] = useState("");
    const [serverMessage, setServerMessage] = useState("");
    const [statusCode, setStatusCode] = useState<Status>(Status.LOADING);

    useEffect(() => {
        console.log(statusCode, serverMessage);
    }, [statusCode, serverMessage])

    const onNameChange = (e:React.ChangeEvent<HTMLInputElement>) : void => {
        setName(e.target.value)
    }

    const handleSubmit = (e:React.FormEvent) : void => {
        e.preventDefault();
        const token : String = cookies.get('token');
        fetch(`${server}/cohort/new`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                setStatusCode(Status.ERROR);
                setServerMessage(data.error)
            }
            else if(data.errors){
                // addresses the json web token errors i.e if a user somehow accesses this route even when they're not logged in
                setStatusCode(Status.ERROR);
                setServerMessage(data.errors[0].message)
            }
            else{
                setStatusCode(Status.SUCCESS);
                setServerMessage("Cohort created!");
                setName("");
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={name} onChange={onNameChange}/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default NewCohort;