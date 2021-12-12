import React, {useRef, useState} from 'react';
import {Coords} from 'google-map-react';
import {Box} from "@mui/material";

import {Event} from '../../store';
import Map from './Map';
import MapBar from "./MapBar/MapBar";
import AddEventModal from "./AddEvent/AddEventModal";
import useUserLocation from "../../hooks/useUserLocation";
import {useAuth0} from "@auth0/auth0-react";


const MapContainer = () => {
    const [center, setCenter] = useState<Coords>({lat: 0, lng: 0});
    const [open, setOpen] = useState(false);

    const {isAllowedLocation} = useUserLocation();
    const {isAuthenticated} = useAuth0();

    const disabled = !isAllowedLocation || !isAuthenticated;

    const testEvents: Event[] = [
        {
            position: {lat: 59, lng: 31},
            createdAt: '2021',
            creatorEmail: 'asdas',
            img: '123123',
            description: 'The best event',
            type: 'music',
        },
        {
            position: {lat: 59.1, lng: 31.1},
            createdAt: '2021',
            creatorEmail: 'asdas',
            img: '123123',
            description: 'The best event',
            type: 'art',
        },
        {
            position: {lat: 58.9, lng: 30.9},
            createdAt: '2021',
            creatorEmail: 'asdas',
            img: '123123',
            description: 'The best event',
            type: 'food',
        },
        {
            position: {lat: 58.9, lng: 31.1},
            createdAt: '2021',
            creatorEmail: 'asdas',
            img: '123123',
            description: 'The best event',
            type: 'other',
        }
    ];

    return <Box sx={{width: '100%', height: '550px', position: 'relative'}}>
        <Map
            events={testEvents}
            center={center}
            setCenter={setCenter}
            disabled={disabled}
        />
        <MapBar disabled={disabled} setCenter={setCenter} setOpen={setOpen}/>
        <AddEventModal open={open} setOpen={setOpen}/>
    </Box>
}

export default MapContainer;