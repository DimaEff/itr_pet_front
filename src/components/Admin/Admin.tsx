import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {observer} from "mobx-react-lite";

import {eventTypesStore} from '../../store';
import {FileInput, Form, Input} from "../common/Form";
import {Button} from "../common/Buttons";
import EventIcon from "../Map/Markers/EventIcon";
import AdminEvents from "./AdminEvents";


const Admin = observer(() => {
    const {handleSubmit, register} = useForm({
        mode: "onBlur",
    });

    const [icon, setIcon] = useState<File | undefined>();

    const handleCreateEventType = async (data: { title: string, value: string }) => {
        if (icon) {
            await eventTypesStore.createEventType(data, icon);
        }
    }

    useEffect(() => {
        eventTypesStore.fetchEventTypes();
    }, [])

    const handleLoad = (files: File[]) => {
        setIcon(files[0]);
    }

    return (
        <Box>
            <Typography>
                Event types
            </Typography>
            <Form handleSubmit={handleSubmit(handleCreateEventType)}>
                <Input placeholder={'Title'} register={register('title')}/>
                <Input placeholder={'Value'} register={register('value')}/>
                <FileInput name={'file'} handleLoad={handleLoad} maxFiles={1}/>
                <Button type={'submit'}>
                    Create event type
                </Button>
            </Form>
            {
                eventTypesStore.eventTypes.map(et => <Box key={et.value} sx={{border: '1px solid red'}}>
                    {et.title}: {et.value}
                    <Button onClick={() => eventTypesStore.deleteEventType(et._id)}>
                        delete event type
                    </Button>
                    <Box sx={{width: 48, height: 48}}>
                        <EventIcon eventType={et}/>
                    </Box>
                </Box>)
            }
            <AdminEvents />
        </Box>
    );
});

export default Admin;