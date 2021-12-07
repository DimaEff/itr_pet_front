import React from 'react';
import GoogleMap, {MapOptions, Maps} from 'google-map-react';

import useUserLocation from "../../hooks/useUserLocation";


const Map = () => {
    const userPosition = useUserLocation();
    const urlKey = process.env.REACT_APP_GOOGLE_API_KEY || '';

    const defaultPosition = userPosition || {lat: 0, lng: 0};

    const renderMarker = (map: any, maps: any) => {
        return new maps.Marker({
            position: userPosition,
            map,
            title: 'Your location',
        });
    }

    return (
        <div style={{width: '500px', height: '600px'}}>
            <GoogleMap
                bootstrapURLKeys={{key: urlKey}}
                defaultCenter={defaultPosition}
                center={defaultPosition}
                defaultZoom={12}
                margin={[50, 50, 50, 50]}
                options={{}}
                onChange={value => console.log(value)}
                onChildClick={hoverKey => console.log(hoverKey)}
                onGoogleApiLoaded={({map, maps}) => renderMarker(map, maps)}
            >

            </GoogleMap>
        </div>
    );
};

export default Map;