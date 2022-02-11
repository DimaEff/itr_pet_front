import React, {useMemo, useState} from 'react';
import {Box} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";

import Map from './Map';
import MapBar from "./MapBar/MapBar";
import {AddEventModal} from "../Events";
import {useUserLocation} from "../../hooks";


const MapContainer = () => {
    const [open, setOpen] = useState(false);

    const {isAllowedLocation} = useUserLocation();
    const {isAuthenticated} = useAuth0();

    const disabled = useMemo(
        () => !isAllowedLocation || !isAuthenticated,
        [isAllowedLocation, isAuthenticated]
    );

    return <Box
        sx={{
            width: '100%',
            height: '550px',
            position: 'relative',
            margin: '12px 0',
        }}
    >
        <Map disabled={disabled}/>
        <MapBar disabled={disabled} setOpen={setOpen}/>
        <AddEventModal open={open} setOpen={setOpen}/>
    </Box>
}

export default MapContainer;