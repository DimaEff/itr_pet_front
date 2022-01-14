import React, {FC, forwardRef, useRef} from 'react';
import GoogleMap, {Coords} from "google-map-react";

import {Event} from '../../store';
import {MapDarkStyle, MapLightStyle} from "./mapStyles";
import EventMarker from "./Markers/EventMarker";
import UserMarker from "./Markers/UserMarker";
import {useTheme} from "@mui/material";
import useUserLocation from "../../hooks/useUserLocation";


interface MapProps {
    events: Event[];
    center: Coords,
    setCenter: (coords: Coords) => void;
    disabled: boolean;
}

const getEventKey = (e: Event) => {
    return `${e.createdAt}${e.lat}${e.lng}`;
}

const Map: FC<MapProps> = forwardRef(({events, center, setCenter, disabled}, ref) => {
    const theme = useTheme();

    const urlKey = process.env.REACT_APP_GOOGLE_API_KEY || '';

    const {coords} = useUserLocation();
    const defaultCenter: Coords = coords || {lat: 59.937500, lng: 30.308611};

    const mapRef = useRef<Element | null>(null);
    const handleLoaded = ({ref}: { ref: Element | null }) => {
        mapRef.current = ref;
        setCenter(defaultCenter);
    }

    return (
        <GoogleMap
            bootstrapURLKeys={{key: urlKey}}
            defaultCenter={defaultCenter}
            center={center}
            defaultZoom={12}
            margin={[50, 50, 50, 50]}
            onChange={({center}) => setCenter(center)}
            options={{
                styles: theme.palette.mode === 'light' ? MapLightStyle : MapDarkStyle,
                fullscreenControl: false,
            }}
            onGoogleApiLoaded={handleLoaded}
        >
            {mapRef &&
            events.map(e => <EventMarker
                key={getEventKey(e)}
                event={e}
                lat={e.lat}
                lng={e.lng}
            />)
            }
            {(mapRef && !disabled) && <UserMarker disabled={disabled} {...coords}/>}
        </GoogleMap>
    );
});

export default Map;