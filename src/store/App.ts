import {makeAutoObservable} from "mobx";
import {Coords} from "google-map-react";
import {AlertColor} from "@mui/material/Alert/Alert";


class App {
    constructor() {
        makeAutoObservable(this);
    }

    // Map
    // coords of SPb
    mapCenter: Coords = {lat: 59.937500, lng: 30.308611};

    setMapCenter = (coords: Coords) => {
        this.mapCenter = coords;
    }

    // EventsListDrawer
    drawerOpen: boolean = false;

    setDrawerOpen = (isOpen: boolean) => {
        this.drawerOpen = isOpen;
    }

    // SnackbarAlert
    alertOpen: boolean = false;
    alertMessage: string = '';
    alertSeverity: AlertColor = 'info';

    setAlertOpen = (isOpen: boolean) => {
        this.alertOpen = isOpen;
    }

    setSnackbarAlertValues = (message: string, severity: AlertColor = 'info', isOpen: boolean = true) => {
        this.alertMessage = message;
        this.alertSeverity = severity;
        this.setAlertOpen(isOpen);
    }
}

export default new App();