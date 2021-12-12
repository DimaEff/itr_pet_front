import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

import {EventsTypes} from '../../../store';
import {Form, Input} from "../../common/Form";
import SelectEventItem from "./SelectEventItem";


const AddEventForm = () => {
    const {register, handleSubmit} = useForm();

    const test = (data: any) => {
        console.log(data);
    }

    const [selectedType, setSelectedType] = useState<string>('');
    const handleSelect = (e: SelectChangeEvent) => {
        console.log(e.target.value)
        setSelectedType(e.target.value);
    }

    const testTypes: EventsTypes[] = [
        'music',
        "art",
        "food",
        "other",
    ];

    return (
        <Form handleSubmit={handleSubmit(test)}>
            <Box width={'100%'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}
                 p={0}>
                <Input label="Title" register={register('title')}/>
                <FormControl sx={{ml: 1, minWidth: 140}}>
                    <InputLabel id="event-type-label">Event type</InputLabel>
                    <Select
                        labelId="event-type-label"
                        id="event-type"
                        value={selectedType}
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