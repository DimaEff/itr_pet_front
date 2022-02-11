import {makeAutoObservable} from "mobx";
import {Coords} from "google-map-react";


class App {
    // Map
    // coords of SPb
    mapCenter: Coords = {lat: 59.937500, lng: 30.308611};

    // EventsListDrawer
    drawerOpen: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setMapCenter = (coords: Coords) => {
        this.mapCenter = coords;
    }

    setDrawerOpen = (isOpen: boolean) => {
        this.drawerOpen = isOpen;
    }
}

export default new App();