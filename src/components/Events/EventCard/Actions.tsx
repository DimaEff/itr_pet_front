import React, {FC, useMemo} from 'react';
import {CardActions} from "@mui/material";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ShareIcon from "@mui/icons-material/Share";
import LocationSearchingRoundedIcon from '@mui/icons-material/LocationSearchingRounded';

import {appStore, eventsStore, IEvent} from "../../../store";
import {IconButton} from "../../common/Buttons";
import {useAuth0} from "@auth0/auth0-react";
import {ILikeOrReport} from "../../../store/Events/types";


interface ActionsProps {
    event: IEvent;
    withMapPointer: boolean;
}

const Actions: FC<ActionsProps> = ({event, withMapPointer}) => {
    const {like, unlike} = eventsStore;
    const {setMapCenter, setDrawerOpen} = appStore;

    const {user} = useAuth0();

    const liked = useMemo(
        () => user?.sub && event.likes.includes(user.sub),
        [event, user]
    );

    const handleLike = () => {
        if (!user?.sub) {
            return;
        }

        const dto: ILikeOrReport = {
            uid: user?.sub,
            eid: event._id,
        };

        if (liked) {
            unlike(dto);
        } else {
            like(dto);
        }
    }

    const handleSetCenter = () => {
        setMapCenter({
            lat: event.lat,
            lng: event.lng,
        });
        setDrawerOpen(false);
    }

    return (
        <CardActions disableSpacing>
            <IconButton aria-label="like" onClick={handleLike}>
                {
                    liked ?
                        <FavoriteRoundedIcon color={'error'}/> :
                        <FavoriteBorderRoundedIcon/>
                }
            </IconButton>
            <IconButton aria-label="share">
                <ShareIcon/>
            </IconButton>
            {
                withMapPointer && <IconButton onClick={handleSetCenter}>
                    <LocationSearchingRoundedIcon/>
                </IconButton>
            }
        </CardActions>
    );
};

export default Actions;