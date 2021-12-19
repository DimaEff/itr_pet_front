import React, {FC, useState} from 'react';
import {useForm} from "react-hook-form";
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

import {EventsTypes} from '../../../store';
import {Form, Input} from "../../common/Form";
import SelectEventItem from "./SelectEventItem";


interface AddEventFormProps {
    formId: string;
    onAddEvent: (data: any) => void;
}

const AddEventForm: FC<AddEventFormProps> = ({formId, onAddEvent}) => {
    const {register, handleSubmit} = useForm();

    const [eventType, setEventType] = useState<string>('');
    const handleSelect = (e: SelectChangeEvent) => {
        setEventType(e.target.value);
    }

    const onSubmit = (data: any) => {
        onAddEvent({...data, eventType});
    }

    const testTypes: EventsTypes[] = [
        'music',
        "art",
        "food",
        "other",
    ];

    return (
        <Form id={formId} handleSubmit={handleSubmit(onSubmit)}>
            <Box width={'100%'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}
                 p={0}>
                <Input label="Title" register={register('title')}/>
                <FormControl sx={{ml: 1, minWidth: 140}}>
                    <InputLabel id="event-type-label">Event type</InputLabel>
                    <Select
                        labelId="event-type-label"
                        id="event-type"
                        value={eventType}
                        label="Event type"
                        onChange={handleSelect}
                    >
                        {testTypes.map(e => <MenuItem key={e} value={e}>
                            <SelectEventItem key={e} eventType={e}/>
                        </MenuItem>)}
                    </Select>
                </FormControl>
            </Box>
            <Input
                label={'Description'}
                multiline
                minRows={2}
                maxRows={4}
                fullWidth
                register={register('description')}
            />
        </Form>
    );
};

export default AddEventForm;