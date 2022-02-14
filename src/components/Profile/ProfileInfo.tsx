import React from 'react';
import {useAuth0} from "@auth0/auth0-react";
import {Tooltip, Typography} from "@mui/material";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';


const ProfileInfo = () => {
    const {user} = useAuth0();
    const emailVerifiedTooltipTitle = user?.email_verified ?
        'Email verified':
        'Email not verified';

    return (
        <>
            <Typography variant={'h5'}>
                {user?.name}
            </Typography>
            <Typography sx={{display: 'flex', alignItems: 'center'}} variant={'body1'}>
                {user?.email}
                <Tooltip title={emailVerifiedTooltipTitle}>
                    {
                        user?.email_verified ?
                            <CheckCircleRoundedIcon color={'success'}/> :
                            <InfoRoundedIcon color={'warning'}/>
                    }
                </Tooltip>
            </Typography>
        </>
    );
};

export default ProfileInfo;