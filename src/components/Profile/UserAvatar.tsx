import React, {FC, useState} from 'react';
import {Avatar, Box} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

import {ContainerAbove} from "../common/Containers";
import {ImageWithPreview} from "../../types";
import {FileInput} from "../common/Form";
import {getFileUrl} from "../../utils/helper";
import {userStore} from "../../store";
import {Loader} from "../common/Loader";


interface UserAvatarProps {
}

const UserAvatar: FC<UserAvatarProps> = () => {
    const {updatePicture} = userStore;
    const {user} = useAuth0();

    const [image, setImage] = useState<ImageWithPreview | null>(null);

    const px = 150;

    const handleLoad = (files: File[]) => {
        const file = files[0];
        const preview = getFileUrl(file);
        setImage([file, preview]);
    }

    const [loading, setLoading] = useState(false);
    const handleUpdatePicture = async () => {
        if (!image) {
            return;
        }

        setLoading(true);
        await updatePicture(image[0]);
        setImage(null);
        setLoading(false);
    }

    const preview = image?.[1];

    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    width: px,
                    borderRadius: '50%',
                    overflow: 'hidden',
                }}
            >
                <Avatar src={preview ? preview : user?.picture} alt={'user avatar'} sx={{width: px, height: px}}/>
                <ContainerAbove sx={{justifyContent: 'center', alignItems: 'center'}}>
                    {
                        preview ?
                            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                <DoneRoundedIcon fontSize={'large'} onClick={handleUpdatePicture}/>
                                <DeleteRoundedIcon fontSize={'large'} onClick={() => setImage(null)}/>
                            </Box> :
                            <FileInput sx={{borderRadius: '50%'}} name={'picture'} handleLoad={handleLoad}/>
                    }
                </ContainerAbove>
            </Box>
            {loading && <Loader />}
        </>
    );
};

export default UserAvatar;