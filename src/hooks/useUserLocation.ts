import {useEffect, useState} from "react";
import {Coords} from "google-map-react";


interface IUseUserLocation {
    coords: Coords;
    isAllowedLocation: boolean;
}

const positionError = async (): Promise<void> => {
    if (navigator.permissions) {
        const geo = await navigator.permissions.query({name: 'geolocation'});
        if (geo.state === 'denied') {
            alert('Please, enable location permission');
        } else {
            alert('Unable to access your location');
        }
    }
}

const useUserLocation = (): IUseUserLocation => {
    // coords of SPb
    const [lat, setLat] = useState(59.937500);
    const [lng, setLng] = useState(30.308611);

    const [isAllowedLocation, setIsAllowedLocation] = useState(false);

    const setPositions = (position: GeolocationPosition) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        setIsAllowedLocation(true);
    }

    useEffect(() => {
        const getPosition = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(setPositions, positionError);
            } else {
                alert('Sorry, geolocation non support in your browser');
            }
        }

        getPosition();
    }, [])

    return {coords: {lat, lng}, isAllowedLocation};
}

export default useUserLocation;