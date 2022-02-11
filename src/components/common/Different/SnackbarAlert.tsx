import React from 'react';
import {Alert, Snackbar} from "@mui/material";

import {observer} from "mobx-react-lite";
import {appStore} from "../../../store";


const SnackbarAlert = observer(() => {
    const {alertOpen, alertMessage, alertSeverity, setAlertOpen} = appStore;

    return (
        <Snackbar
            open={alertOpen}
            onClose={() => setAlertOpen(false)}
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            autoHideDuration={4000}
        >
            <Alert severity={alertSeverity}>
                {alertMessage}
            </Alert>
        </Snackbar>
    );
});

export default SnackbarAlert;