import React, {useState} from 'react';
import {Coords} from 'google-map-react';
import {Box} from "@mui/material";

import {eventsStore} from '../../store';
import Map from './Map';
import MapBar from "./MapBar/MapBar";
import AddEventModal from "./AddEvent/AddEventModal";
import useUserLocation from "../../hooks/useUserLocation";
import {useAuth0} from "@auth0/auth0-react";
import {observer} from "mobx-react-lite";


const MapContainer = observer(() => {
    const [center, setCenter] = useState<Coords>({lat: 0, lng: 0});
    const [open, setOpen] = useState(false);

    const {isAllowedLocation} = useUserLocation();
    const {isAuthenticated} = useAuth0();

    const disabled = !isAllowedLocation || !isAuthenticated;

    return <Box
        sx={{
            width: '100%',
            height: '550px',
            position: 'relative',
        }}
    >
        <Map
            events={eventsStore.events}
            center={center}
            setCenter={setCenter}
            disabled={disabled}
        />
        <MapBar disabled={disabled} setCenter={setCenter} setOpen={setOpen}/>
        <AddEventModal open={open} setOpen={setOpen}/>
    </Box>
})

export default MapContainer;