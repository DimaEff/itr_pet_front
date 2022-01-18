import React, {FC, useEffect, useRef} from 'react';
import GoogleMap, {Coords} from "google-map-react";
import {useTheme} from "@mui/material";
import {observer} from "mobx-react-lite";

import {eventsStore} from '../../store';
import {MapDarkStyle, MapLightStyle} from "./mapStyles";
import EventMarker from "./Markers/EventMarker";
import UserMarker from "./Markers/UserMarker";
import useUserLocation from "../../hooks/useUserLocation";


interface MapProps {
    center: Coords;
    setCenter: (coords: Coords) => void;
    disabled: boolean;
}

// forwardRef and observer error
const Map: FC<MapProps> = observer(({center, setCenter, disabled}) => {
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
        <>
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
                {
                    mapRef &&
                    eventsStore.events.map(e => <EventMarker
                        key={e._id}
                        event={e}
                        lat={e.lat}
                        lng={e.lng}
                    />)
                }
                {(mapRef && !disabled) && <UserMarker disabled={disabled} {...coords}/>}
            </GoogleMap>
            <button onClick={() => console.log(eventsStore.events)}>show events</button>
        </>
    );
})

export default Map;