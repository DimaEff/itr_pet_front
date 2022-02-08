import React, {FC, useState} from 'react';
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ShareIcon from "@mui/icons-material/Share";
import {CardActions} from "@mui/material";

import {IEvent, eventsStore} from "../../../store";
import {IconButton} from "../../common/Buttons";


interface ActionsProps {
    event: IEvent;
}

const Actions: FC<ActionsProps> = ({event}) => {
    const [like, setLike] = useState(false);

    const handleLike = () => {
        // eventsStore.like(event._id);
        setLike(l => !l);
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
        </CardActions>
    );
};

export default Actions;