import React, {FC, useRef, useState} from 'react';
import GoogleMap, {Position} from 'google-map-react';
import {MarkerClusterer} from '@googlemaps/markerclusterer';

import {Event} from '../../store';
import {MapLightStyle, MapDarkStyle} from './mapStyles';
import useUserLocation from "../../hooks/useUserLocation";
import EventMarker from "./EventMarker";
import {useTheme} from "@mui/material";
import UserMarker from "./UserMarker";
import {Button} from "../common/Buttons";


const getEventKey = (e: Event) => {
    return `${e.createdAt}${e.position.lat}${e.position.lng}`;
}

const TestControl: FC<any> = () => {
    return <div style={{width: '50px', height: '50px', border: '3px solid red'}}>
        test
    </div>
}

const Map = () => {
    const theme = useTheme();

    const userPosition = useUserLocation();
    const defaultCenter = userPosition || {lat: 59.937500, lng: 30.308611};

    const urlKey = process.env.REACT_APP_GOOGLE_API_KEY || '';

    const [isLoaded, setIsLoaded] = useState<boolean>(false);

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

    return <div style={{width: '500px', height: '550px'}}>
        <GoogleMap
            bootstrapURLKeys={{key: urlKey}}
            defaultCenter={defaultCenter}
            center={defaultCenter}
            defaultZoom={12}
            margin={[50, 50, 50, 50]}
            options={{
                styles: theme.palette.mode === 'light' ? MapLightStyle : MapDarkStyle,
                fullscreenControl: false,
            }}
            onGoogleApiLoaded={() => setIsLoaded(true)}
        >
            {isLoaded &&
                testEvents.map(e => <EventMarker
                    key={getEventKey(e)}
                    event={e}
                    {...e.position}
                />)
            }
            {isLoaded && <UserMarker {...userPosition}/>}
        </GoogleMap> :
    </div>
}

export default Map;