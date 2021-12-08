import React, {FC} from 'react';
import {Position} from 'google-map-react';
import {Icon} from '@mui/material';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';


interface UserMarkerProps extends Position {
}

const UserMarker: FC<UserMarkerProps> = () => {
    return (
        <>
            <ExploreRoundedIcon
                fontSize={'large'}
                sx={theme => ({color: theme.palette.mode === 'dark' ? '#f39a1c' : '#4d722f'})}
            />
        </>
    );
};

export default UserMarker;