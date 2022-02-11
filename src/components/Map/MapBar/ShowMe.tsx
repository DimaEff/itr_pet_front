import React, {FC} from 'react';
import useUserLocation from "../../../hooks/useUserLocation";
import AccessibilityNewRoundedIcon from "@mui/icons-material/AccessibilityNewRounded";

import {IconButton} from "../../common/Buttons";
import MapBarItem from "../MapBarItem";
import {observer} from "mobx-react-lite";
import {appStore} from "../../../store";


export interface ShowMeProps {
    disabled: boolean;
}

const ShowMe: FC<ShowMeProps> = observer(({disabled}) => {
    const {setMapCenter} = appStore;
    const {coords} = useUserLocation();

    const handleShowMe = () => {
        if (!coords) {
            return;
        }

        setMapCenter(coords);
    }

    return <IconButton disabled={disabled} onClick={handleShowMe}>
        <MapBarItem disabled={disabled}>
            <AccessibilityNewRoundedIcon fontSize={'large'}/>
        </MapBarItem>
    </IconButton>
});

export default ShowMe;