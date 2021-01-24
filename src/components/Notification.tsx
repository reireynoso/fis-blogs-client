import React from 'react';
import {useStateValue} from '../context-api/Provider';

import {setNotificationClose, clearNotificationFields} from '../context-api/actions';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const Notification:React.FC = () => {

    const [{
        notificationOpen,
        notificationStatement,
        notificationCallbackFunction
    }, dispatch] = useStateValue();

    return <Dialog
    open={notificationOpen}
    onClose={() => dispatch(setNotificationClose())}
    onExited={() => {
        // executes once the dialog has disappeared. Clears id and title of selected blog
        dispatch(clearNotificationFields());
    }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
    <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {notificationStatement}
        </DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button variant="contained" onClick={() => dispatch(setNotificationClose())}>
          Cancel
        </Button>
        <Button variant="contained" onClick={() => notificationCallbackFunction()} 
          color="secondary"
        >
          Delete
        </Button>
    </DialogActions>
    </Dialog>
}

export default Notification