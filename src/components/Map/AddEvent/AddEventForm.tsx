import React, {FC, useEffect, useMemo, useState} from 'react';
import {useForm, useWatch} from "react-hook-form";
import {Box, Checkbox, FormControl, InputLabel, MenuItem} from "@mui/material";
import {observer} from "mobx-react-lite";
import {date, object, SchemaOf, string} from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import {eventTypesStore} from '../../../store';
import {CreateEventForm} from "../../../store/Events/dto/create-event.dto";
import {Form, Input, Select} from "../../common/Form";
import SelectEventItem from "./SelectEventItem";
import DatePicker from "../../common/Form/DatePicker";
import {getMuiErrorAndMessageCreator} from "../../../utils/helper";


interface AddEventFormProps {
    formId: string;
    submit: (data: any) => void;
}

const MS_PER_MINUTE = 60000;
const schema: SchemaOf<CreateEventForm> = object({
    title: string().required().min(3).max(32),
    description: string().required().min(3).max(512),
    type: string().required().min(3).max(32),
    startDate: date()
        .optional()
        .when('endDate', {
            is: (endDate: Date) =>
        }),
    endDate: date().required(),
});

const AddEventForm: FC<AddEventFormProps> = observer(({formId, submit}) => {
    const {register, handleSubmit, control, formState: {errors}} = useForm<CreateEventForm>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: CreateEventForm) => {
        console.log(data);
        // submit({...data});
    }

    const [schedule, setSchedule] = useState(false);
    const getErrorAndMessage = getMuiErrorAndMessageCreator<CreateEventForm>(errors);
    getErrorAndMessage('')

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
                <Input
                    label="Title"
                    register={register('title')}
                    {...getErrorAndMessage('title')}
                />
                <FormControl sx={{ml: 1, minWidth: 140}}>
                    <InputLabel id="event-type-label">Event type</InputLabel>
                    <Select
                        name={'type'}
                        control={control}
                        labelId="event-type-label"
                        id="event-type"
                        label="Event type"
                        {...getErrorAndMessage('description', true)}
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
                {...getErrorAndMessage('description')}
            />
            <DatePicker name={'endDate'} control={control} label={'End date'}/>
            {schedule && <DatePicker name={'startDate'} control={control} label={'Start date'}/>}
            <Box textAlign={'end'}>
                Schedule an event
                <Checkbox value={schedule} onChange={e => setSchedule(e.target.checked)}/>
            </Box>
        </Form>
    );
});

export default AddEventForm;