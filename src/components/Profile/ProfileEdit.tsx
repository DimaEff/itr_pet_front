import React, {FC, useMemo, useState} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useAuth0} from "@auth0/auth0-react";
import {object, SchemaOf, string,} from "yup";

import {Form, Input} from "../common/Form";
import {compareUsersData, getMuiErrorAndMessageCreator} from "../../utils/helper";
import {Button} from "../common/Buttons";
import {Stack} from "@mui/material";
import {userStore} from "../../store";


interface ProfileEditProps {
    onCloseEdit: () => void;
}

interface IProfileEditForm {
    name: string;
    email: string;
}

const schema: SchemaOf<IProfileEditForm> = object({
    name: string().required().min(2).max(32),
    email: string().required().email(),
});

const ProfileEdit: FC<ProfileEditProps> = ({onCloseEdit}) => {
    const {updateUser} = userStore;
    const {user} = useAuth0();

    const {register, handleSubmit, formState: {errors}, reset} = useForm<IProfileEditForm>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: {
            name: user?.name,
            email: user?.email,
        },
    });

    const [loading, setLoading] = useState(false);
    const handleUpdateUser = async (data: IProfileEditForm) => {
        if (!user) {
            return;
        }

        const userData = compareUsersData(user, data);

        if (userData) {
            setLoading(true);
            await updateUser(userData);
            setLoading(false);
        }

        onCloseEdit();
    };

    const getMuiErrorAndMessage = useMemo(
        () => getMuiErrorAndMessageCreator<IProfileEditForm>(errors),
        [errors],
    );

    const handleCloseEdit = () => {
        reset();
        onCloseEdit();
    }

    return (
        <Form handleSubmit={handleSubmit(handleUpdateUser)}>
            <Input title={'Name'} register={register('name')} {...getMuiErrorAndMessage('name')}/>
            <Input title={'Email'} register={register('email')} {...getMuiErrorAndMessage('email')}/>
            <Stack
                direction={'row'}
                spacing={1}
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%',
                }}
            >
                <Button type={'submit'} loading={loading}>
                    update
                </Button>
                <Button loading={loading} onClick={handleCloseEdit}>
                    cancel
                </Button>
            </Stack>
        </Form>
    );
};

export default ProfileEdit;