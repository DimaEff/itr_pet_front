import React, {FC} from 'react';
import {DateTimePicker, LocalizationProvider} from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import {Controller} from "react-hook-form";
import {TextField} from "@mui/material";

import {WithControlProps} from "./types";


interface DatePickerProps {
    label?: string;
}

const DatePicker: FC<DatePickerProps & WithControlProps> = ({name, control, label}) => {
    return (
        <>
            <Controller
                name={name}
                control={control}
                defaultValue={new Date()}
                render={({field, fieldState: {error}}) => (
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DateTimePicker
                            renderInput={(params) => <TextField
                                error={!!error?.message}
                                helperText={error?.message}
                                {...params}
                            />}
                            inputFormat="dd/MM/yyyy HH:mm"
                            ampm={false}
                            label={label}
                            {...field}
                        />
                    </LocalizationProvider>
                )}
            />
        </>
    );
};

export default DatePicker;