import React, {useState} from 'react';
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

    // const testEvents: Event[] = [
    //     {
    //         createdAt: '2021',
    //         creator: 'asdas',
    //         img: '123',
    //         description: 'The best event',
    //         type: {
    //             title: 'test',
    //             value: 'test',
    //             icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Check_green_icon.svg/2048px-Check_green_icon.svg.png'
    //         },
    //         lat: 59.1,
    //         lng: 31.1,
    //     },
    //     {
    //         createdAt: '2021',
    //         creator: 'asdas',
    //         img: '123',
    //         description: 'The best event',
    //         type: {
    //             title: 'test',
    //             value: 'test',
    //             icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1200px-How_to_use_icon.svg.png',
    //         },
    //         lat: 59.2,
    //         lng: 31.0,
    //     },
    //     {
    //         createdAt: '2021',
    //         creator: 'asdas',
    //         img: '123',
    //         description: 'The best event',
    //         type: {
    //             title: 'test',
    //             value: 'test',
    //             icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1200px-How_to_use_icon.svg.png',
    //         },
    //         lat: 59.0,
    //         lng: 31.2,
    //     },
    // ];

    const testEvents: Event[] = [];

    return <Box
        sx={{
            width: '100%',
            height: '550px',
            position: 'relative',
        }}
    >
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