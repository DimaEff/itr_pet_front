import React, {FC, useState} from 'react';
import {CardActions} from "@mui/material";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ShareIcon from "@mui/icons-material/Share";
import LocationSearchingRoundedIcon from '@mui/icons-material/LocationSearchingRounded';

import {appStore, IEvent} from "../../../store";
import {IconButton} from "../../common/Buttons";


interface ActionsProps {
    event: IEvent;
    withMapPointer: boolean;
}

const Actions: FC<ActionsProps> = ({event, withMapPointer}) => {
    const {setMapCenter, setDrawerOpen} = appStore;

    const [like, setLike] = useState(false);

    const handleLike = () => {
        // eventsStore.like(event._id);
        setLike(l => !l);
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
                    like ?
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