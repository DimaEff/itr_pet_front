import React, {useState} from 'react';
import {Box} from "@mui/material";

import EventTypesList from "./EventTypesList";
import AddNewEventType from "./AddNewEventType";


const AdminEventTypes = () => {
    const [openAddNewEventType, setOpenAddNewEventType] = useState(false);

    return (
        <Box>
            <AddNewEventType open={openAddNewEventType} onClose={() => setOpenAddNewEventType(false)}/>
            <EventTypesList onOpenAddNewEventType={() => setOpenAddNewEventType(true)}/>
        </Box>

    );
};

export default AdminEventTypes;