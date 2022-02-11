import React, {FC, useMemo, useState} from 'react';
import {Card, CardActions, CardContent, Stack} from "@mui/material";
import {useForm} from "react-hook-form";
import {object, SchemaOf, string} from "yup";

import {Button} from "../../common/Buttons";
import {eventTypesStore} from "../../../store";
import {CreateEventTypeDto} from "../../../store/EventTypes/dto/create-event-type.dto";
import {FileInput, Form, Input} from "../../common/Form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ImageWithPreview} from "../../../types";
import {getFileUrl, getMuiErrorAndMessageCreator} from "../../../utils/helper";
import CenteredModal from "../../common/Modals/CenteredModal";


interface AddNewEventTypeProps {
    open: boolean;
    onClose: () => void;
}

const schema: SchemaOf<CreateEventTypeDto> = object({
    title: string().required().min(3).max(20),
    value: string().required().min(3).max(20),
});

const AddNewEventType: FC<AddNewEventTypeProps> = ({open, onClose}) => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<CreateEventTypeDto>({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    const [icon, setIcon] = useState<ImageWithPreview>(null);

    const handleLoad = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const previewUrl = getFileUrl(file);
        setIcon([file, previewUrl]);
    }

    const handleReset = () => {
        reset();
        setIcon(null);
    }

    const [loading, setLoading] = useState(false);
    const handleAdd = async (data: CreateEventTypeDto) => {
        if (!icon) {
            return;
        }

        setLoading(true);
        await eventTypesStore.createEventType(data, icon[0]);
        setLoading(false);
        handleReset();
        onClose();
    }

    const handleClose = () => {
        onClose();
        handleReset();
    }

    const getMuiErrorAndMessage = useMemo(() => getMuiErrorAndMessageCreator<CreateEventTypeDto>(errors), [errors]);

    const formId = 'add-new-event-type';

    return (
        <CenteredModal
            open={open}
            onClose={handleClose}
        >
            <Card>
                <CardContent>
                    <Form id={formId} handleSubmit={handleSubmit(handleAdd)}>
                        <Stack spacing={1}>
                            <Input placeholder={'Title'}
                                   register={register('title')}
                                   {...getMuiErrorAndMessage('title')}
                            />
                            <Input placeholder={'Value'}
                                   register={register('value')}
                                   {...getMuiErrorAndMessage('value')}
                            />
                            <FileInput name={'icon'} handleLoad={handleLoad} preview={icon?.[1]}/>
                        </Stack>
                    </Form>
                </CardContent>
                <CardActions>
                    <Button loading={loading} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button loading={loading} type={'submit'} form={formId}>
                        Add
                    </Button>
                </CardActions>
            </Card>
        </CenteredModal>
    );
};

export default AddNewEventType;