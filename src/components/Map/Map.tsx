import React, {FC, useRef} from 'react';
import GoogleMap from "google-map-react";
import {useTheme} from "@mui/material";
import {observer} from "mobx-react-lite";

import {appStore, eventsStore} from '../../store';
import {MapDarkStyle, MapLightStyle} from "./mapStyles";
import EventMarker from "./Markers/EventMarker";
import UserMarker from "./Markers/UserMarker";
import useUserLocation from "../../hooks/useUserLocation";


interface MapProps {
    disabled: boolean;
}

const Map: FC<MapProps> = observer(({disabled}) => {
    const {filteredEvents} = eventsStore;
    const {mapCenter, setMapCenter} = appStore;

    const theme = useTheme();
    const urlKey = process.env.REACT_APP_GOOGLE_API_KEY || '';

    const {coords} = useUserLocation();

    const mapRef = useRef<Element | null>(null);
    const handleLoaded = ({ref}: { ref: Element | null }) => {
        mapRef.current = ref;

        if (!coords) {
            return;
        }

        setMapCenter(coords);
    }

    return (
        <>
            <GoogleMap
                bootstrapURLKeys={{key: urlKey}}
                center={mapCenter}
                defaultZoom={12}
                margin={[50, 50, 50, 50]}
                onChange={({center}) => setMapCenter(center)}
                options={{
                    styles: theme.palette.mode === 'light' ? MapLightStyle : MapDarkStyle,
                    fullscreenControl: false,
                }}
                onGoogleApiLoaded={handleLoaded}
            >
                {
                    mapRef &&
                    filteredEvents.map(e => <EventMarker
                        key={e._id}
                        event={e}
                        lat={e.lat}
                        lng={e.lng}
                    />)
                }
                {(mapRef && !disabled && coords) && <UserMarker disabled={disabled} {...coords}/>}
            </GoogleMap>
        </>
    );
})

export default Map;