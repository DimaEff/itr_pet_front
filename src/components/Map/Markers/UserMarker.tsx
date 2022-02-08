import React, {FC} from 'react';
import {Coords} from 'google-map-react';
import AccessibilityNewRoundedIcon from "@mui/icons-material/AccessibilityNewRounded";

import MapIconContainer from "../MapIconContainer";
import {Box} from "@mui/material";


interface UserMarkerProps extends Coords {
    disabled: boolean;
}

const UserMarker: FC<UserMarkerProps> = ({disabled}) => {
    return (
        <Box sx={{pointerEvents: 'none'}}>
            <MapIconContainer disabled={disabled}>
                <AccessibilityNewRoundedIcon fontSize={'large'}/>
            </MapIconContainer>
        </Box>
    );
};

export default UserMarker;