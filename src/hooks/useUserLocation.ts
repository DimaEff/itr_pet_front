import {useEffect, useState} from "react";


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

interface IUserLocation {
    lat: number;
    lng: number;
}

const useUserLocation = (): IUserLocation => {
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    const setPositions = (position: GeolocationPosition) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
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

    return {lat, lng};
}

export default useUserLocation;