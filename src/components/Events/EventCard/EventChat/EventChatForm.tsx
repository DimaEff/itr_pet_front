import React, {FC, useMemo} from 'react';
import {AccordionDetails} from "@mui/material";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {SchemaOf, object, string} from "yup";

import {Button} from "../../../common/Buttons";
import {CreateMessageForm} from "../../../../store/EventChat/dto/createMessage.dto";
import {Form, Input} from "../../../common/Form";
import {getMuiErrorAndMessageCreator} from "../../../../utils/helper";


interface EventChatFormProps {
    onMessage: (data: CreateMessageForm) => void;
}

const schema: SchemaOf<CreateMessageForm> = object({
    message: string().required().min(1).max(512),
});

const EventChatForm: FC<EventChatFormProps> = ({onMessage}) => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm<CreateMessageForm>({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    const getMuiErrorAndMessage = useMemo(
        () => getMuiErrorAndMessageCreator<CreateMessageForm>(errors),
        [errors]
    );

    const handleMessage = (data: CreateMessageForm) => {
        onMessage(data);
        reset();
    }

    return (
        <AccordionDetails>
            <Form handleSubmit={handleSubmit(handleMessage)}>
                <Input register={register('message')} {...getMuiErrorAndMessage('message')}/>
                <Button type={'submit'}>
                    message
                </Button>
            </Form>
        </AccordionDetails>
    );
};

export default EventChatForm;