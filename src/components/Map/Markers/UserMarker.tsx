import React, {FC} from 'react';
import {Coords} from 'google-map-react';
import AccessibilityNewRoundedIcon from "@mui/icons-material/AccessibilityNewRounded";

import MapBarItem from "../MapBarItem";
import {Box} from "@mui/material";


interface UserMarkerProps extends Coords {
    disabled: boolean;
}

const UserMarker: FC<UserMarkerProps> = ({disabled}) => {
    return (
        <Box sx={{pointerEvents: 'none'}}>
            <MapBarItem disabled={disabled}>
                <AccessibilityNewRoundedIcon fontSize={'large'}/>
            </MapBarItem>
        </Box>
    );
};

export default UserMarker;