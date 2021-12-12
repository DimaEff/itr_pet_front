import React, {FC} from 'react';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

import {IconButton} from "../../common/Buttons";
import MapIconContainer from "../MapIconContainer";


export interface AddEventProps {
    setOpen: (isOpen: boolean) => void;
    disabled: boolean;
}

const AddEvent: FC<AddEventProps> = ({setOpen, disabled}) => {
    return (
        <IconButton disabled={disabled} onClick={() => setOpen(true)}>
            <MapIconContainer disabled={disabled}>
                <AddCircleRoundedIcon fontSize={'large'}/>
            </MapIconContainer>
        </IconButton>
    );
};

export default AddEvent;