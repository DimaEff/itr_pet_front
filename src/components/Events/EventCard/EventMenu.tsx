import React, {FC, useState} from 'react';
import {Menu, MenuItem} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import {IconButton} from "../../common/Buttons";
import {ConfirmDialog, ConfirmDialogProps} from "../../common/Modals";
import {eventsStore, IEvent} from "../../../store";
import {useAuth0} from "@auth0/auth0-react";


interface EventMenuProps {
    event: IEvent;
}

const EventMenu: FC<EventMenuProps> = ({event}) => {
    const {_id, uid} = event;

    const {user} = useAuth0();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);

    const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const [modal, setModal] = useState<ConfirmDialogProps>({open: false});

    const handleOpenReportConfirm = () => {
        setModal({
            open: true,
            onConfirm: () => console.log(`report event ${_id}`),
            title: 'Report this event?',
        });
    }

    const handleOpenDeleteConfirm = () => {
        setModal({
            open: true,
            onConfirm: () => eventsStore.deleteEvent(_id),
            title: 'Delete this event?',
        });
    }

    const handleCloseModal = () => {
        setModal({open: false});
        handleCloseMenu();
    }

    return (
        <>
            <ConfirmDialog onClose={handleCloseModal} {...modal}/>
            <IconButton
                aria-controls={openMenu ? 'demo-positioned-menu' : undefined}
                aria-haspopup={"true"}
                aria-expanded={openMenu ? 'true' : undefined}
                onClick={handleClickMenu}
            >
                <MoreVertIcon/>
            </IconButton>
            <Menu
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleOpenReportConfirm}>Report</MenuItem>
                {/*{uid === user?.sub && <MenuItem onClick={handleOpenDeleteConfirm}>Delete</MenuItem>}*/}
                <MenuItem onClick={handleOpenDeleteConfirm}>Delete</MenuItem>
            </Menu>
        </>
    )
};

export default EventMenu;