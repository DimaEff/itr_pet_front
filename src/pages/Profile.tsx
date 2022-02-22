import React, {useState} from 'react';
import {Box, Stack, Tooltip} from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import {useAuth0} from "@auth0/auth0-react";

import {ProfileEdit, ProfileInfo, UserAvatar} from "../components/Profile";
import {IconButton} from "../components/common/Buttons";


const Profile = () => {
    const {user} = useAuth0();
    const [edit, setEdit] = useState(false);

    // auth0 shows that the user has registered using email and password
    const disableEdit = user?.sub?.split('|')[0] !== 'auth0';

    const editButton = <IconButton
        disabled={disableEdit}
        onClick={() => setEdit(e => !e)}
    >
        <EditRoundedIcon/>
    </IconButton>;

    return (
        <Stack spacing={1} p={1} width={250}>
            <UserAvatar disableEdit={disableEdit}/>
            <Box width={'100%'} display={'flex'} justifyContent={'flex-end'}>
                {
                    disableEdit ?
                        <Tooltip title={'You can`t edit your profile'}>
                            <Box>
                                {editButton}
                            </Box>
                        </Tooltip> :
                        <>
                            {editButton}
                        </>
                }
            </Box>
            {
                edit ?
                    <ProfileEdit onCloseEdit={() => setEdit(false)}/> :
                    <ProfileInfo/>
            }
        </Stack>
    );
};

export default Profile;