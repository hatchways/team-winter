import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';


const SuccessSnackbar = (props) => {
    return (
        <Snackbar open={props.open} onClose={props.onClose}
                  anchorOrigin={{vertical: 'bottom', horizontal: 'right',}}
                  ContentProps={{'aria-describedby': 'message-id'}}
                  message={ <span id="message-id">Success</span>}
                  autoHideDuration={750}
        />
    )
}

export default SuccessSnackbar;
