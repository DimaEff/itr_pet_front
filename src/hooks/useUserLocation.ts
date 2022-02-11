import {useEffect, useState} from "react";
import {Coords} from "google-map-react";


interface IUseUserLocation {
    coords: Coords | undefined;
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
    const [coords, setCoords] = useState<Coords | undefined>()

    const [isAllowedLocation, setIsAllowedLocation] = useState(false);

    const setPositions = (position?: GeolocationPosition, isAllowed = true) => {
        if (position) {
            setCoords({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        }

        setIsAllowedLocation(isAllowed);
    }

    useEffect(() => {
        const getPosition = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(setPositions, positionError);
            } else {
                setPositions();
            }
        }

        getPosition();
    }, [])

    return {coords, isAllowedLocation};
}

export default useUserLocation;