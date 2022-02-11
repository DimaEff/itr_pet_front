import React, {ChangeEvent, FC, useMemo, useState} from 'react';
import {useForm} from "react-hook-form";
import {Box, Checkbox, FormControl, InputLabel, MenuItem} from "@mui/material";
import {observer} from "mobx-react-lite";
import {date, object, SchemaOf, string} from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {add, isDate} from 'date-fns';

import {eventTypesStore} from '../../../store';
import {CreateEventForm} from "../../../store/Events/dto/create-event.dto";
import {Form, Input, Select, DatePicker} from "../../common/Form";
import SelectEventItem from "./SelectEventItem";
import {getMuiErrorAndMessageCreator} from "../../../utils/helper";


interface AddEventFormProps {
    formId: string;
    submit: (data: any) => void;
}

const checkStartDate = (endDate: Date, schema: any) => {
    const errorMessage = 'The start date must be at least 30 minutes earlier than the end date';

    if (!isDate(endDate)) {
        return schema;
    }

    return date()
        .max(add(endDate, {minutes: -30}), errorMessage);
}

const schema: SchemaOf<CreateEventForm> = object({
    title: string().required().min(3).max(32),
    description: string().required().min(32).max(1024),
    type: string().required(),
    startDate: date().required()
        .min(new Date(), 'Min start date is now')
        .when('endDate', checkStartDate)
        ,
    endDate: date().required()
        .min(
            add(new Date(), {minutes: 30}),
            'The minimum duration is 30 minutes',
        ),
});

const AddEventForm: FC<AddEventFormProps> = observer(({formId, submit}) => {
    const {eventTypes} = eventTypesStore;

    const {register, handleSubmit, control, formState: {errors}, setValue} = useForm<CreateEventForm>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const getErrorAndMessage = useMemo(
        () => getMuiErrorAndMessageCreator<CreateEventForm>(errors),
        [errors],
    );

    const onSubmit = (data: CreateEventForm) => {
        console.log(data);
        submit({...data});
    }

    const [schedule, setSchedule] = useState(false);
    const handleSchedule = (e: ChangeEvent<HTMLInputElement>) => {
        setSchedule(e.target.checked);
        setValue('startDate', new Date());
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
                <Input
                    label="Title"
                    register={register('title')}
                    {...getErrorAndMessage('title')}
                />
                <FormControl sx={{ml: 1, minWidth: 140}}>
                    <InputLabel id="event-type-label">Type</InputLabel>
                    <Select
                        name={'type'}
                        control={control}
                        labelId={"event-type-label"}
                        id={"event-type"}
                        label={"Type"}
                        {...getErrorAndMessage('type', true)}
                    >
                        {eventTypes.map(e => <MenuItem key={e.value} value={e.value}>
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
            <DatePicker
                name={'endDate'}
                control={control}
                label={'End date'}
                defaultValue={add(new Date(), {hours: 1})}
            />
            <DatePicker
                sx={{
                    display: schedule ? 'flex': 'none'
                }}
                name={'startDate'}
                control={control}
                label={'Start date'}
            />
            <Box textAlign={'end'}>
                Schedule the event
                <Checkbox value={schedule} onChange={handleSchedule}/>
            </Box>
        </Form>
    );
});

export default AddEventForm;