import React, {FC, useState} from 'react';
import {useForm} from "react-hook-form";
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

import {eventTypesStore} from '../../../store';
import {Form, Input} from "../../common/Form";
import SelectEventItem from "./SelectEventItem";


interface AddEventFormProps {
    formId: string;
    submit: (data: any) => void;
}

const AddEventForm: FC<AddEventFormProps> = ({formId, submit}) => {
    const {register, handleSubmit} = useForm();

    const [type, setType] = useState<string>('');
    const handleSelect = (e: SelectChangeEvent) => {
        setType(e.target.value);
    }

    const onSubmit = (data: any) => {
        submit({...data, type});
    }

    return (
        <Form id={formId} handleSubmit={handleSubmit(onSubmit)}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    padding: 0,
                }}
            >
                <Input label="Title" register={register('title')}/>
                <FormControl sx={{ml: 1, minWidth: 140}}>
                    <InputLabel id="event-type-label">Event type</InputLabel>
                    <Select
                        labelId="event-type-label"
                        id="event-type"
                        value={type}
                        label="Event type"
                        onChange={handleSelect}
                    >
                        {eventTypesStore.eventTypes.map(e => <MenuItem key={e.value} value={e.value}>
                            <SelectEventItem key={e.value} eventType={e}/>
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