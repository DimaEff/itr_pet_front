import React, {FC} from 'react';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

import {IconButton} from "../../common/Buttons";
import MapBarItem from "../MapBarItem";


export interface AddEventProps {
    setOpen: (isOpen: boolean) => void;
    disabled: boolean;
}

const AddEvent: FC<AddEventProps> = ({setOpen, disabled}) => {
    return (
        <IconButton disabled={disabled} onClick={() => setOpen(true)}>
            <MapBarItem disabled={disabled}>
                <AddCircleRoundedIcon fontSize={'large'}/>
            </MapBarItem>
        </IconButton>
    );
};

export default AddEvent;