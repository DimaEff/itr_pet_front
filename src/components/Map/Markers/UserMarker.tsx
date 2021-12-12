import React, {FC} from 'react';
import {Coords} from 'google-map-react';
import AccessibilityNewRoundedIcon from "@mui/icons-material/AccessibilityNewRounded";

import MapIconContainer from "../MapIconContainer";


interface UserMarkerProps extends Coords {
    disabled: boolean;
}

const UserMarker: FC<UserMarkerProps> = ({disabled}) => {
    return (
        <>
            <MapIconContainer disabled={disabled}>
                <AccessibilityNewRoundedIcon fontSize={'large'}/>
            </MapIconContainer>
        </>
    );
};

export default UserMarker;