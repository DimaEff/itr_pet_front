import React, {FC} from 'react';
import useUserLocation from "../../../hooks/useUserLocation";
import {Coords} from "google-map-react";
import AccessibilityNewRoundedIcon from "@mui/icons-material/AccessibilityNewRounded";

import {IconButton} from "../../common/Buttons";
import MapIconContainer from "../MapIconContainer";


export interface ShowMeProps {
    setCenter: (coords: Coords) => void;
    disabled: boolean;
}

const ShowMe: FC<ShowMeProps> = ({setCenter, disabled}) => {
    const {coords} = useUserLocation();

    return <IconButton disabled={disabled} onClick={() => setCenter(coords)}>
        <MapIconContainer disabled={disabled}>
            <AccessibilityNewRoundedIcon fontSize={'large'}/>
        </MapIconContainer>
    </IconButton>
};

export default ShowMe;