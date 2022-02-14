import React, {FC, useState} from 'react';
import {Menu, MenuItem} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import {eventsStore, IEvent} from "../../../store";
import {IconButton} from "../../common/Buttons";
import {ConfirmDialog, ConfirmDialogProps} from "../../common/Modals";
import {useAuth0} from "@auth0/auth0-react";
import {useRoles} from "../../../hooks";


interface EventMenuProps {
    event: IEvent;
}

const EventMenu: FC<EventMenuProps> = ({event}) => {
    const {report} = eventsStore;
    const {_id, reports, uid} = event;

    const {user} = useAuth0();
    const {isAdmin} = useRoles();

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
            onConfirm: () => user?.sub && report({
                uid: user.sub,
                eid: _id,
            }),
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
                <MenuItem disabled={!user?.sub || reports.includes(user.sub)} onClick={handleOpenReportConfirm}>Report</MenuItem>
                {(isAdmin || uid === user?.sub) && <MenuItem onClick={handleOpenDeleteConfirm}>Delete</MenuItem>}
            </Menu>
        </>
    )
};

export default EventMenu;