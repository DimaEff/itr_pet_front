import React, {FC, useState} from 'react';
import {Avatar, Box} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";
import {ImageWithPreview} from "../../../types";
import {getFileUrl} from "../../../utils/helper";
import {userStore} from "../../../store";
import {Loader} from "../../common/Loader";
import PictureDownload from "./PictureDownload";


interface UserAvatarProps {
    disableEdit: boolean;
}

const UserAvatar: FC<UserAvatarProps> = ({disableEdit}) => {
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
                {
                    disableEdit || <PictureDownload
                        preview={preview}
                        handleUpdatePicture={handleUpdatePicture}
                        handleLoad={handleLoad}
                        setImage={setImage}
                    />
                }
            </Box>
            {loading && <Loader/>}
        </>
    );
};

export default UserAvatar;