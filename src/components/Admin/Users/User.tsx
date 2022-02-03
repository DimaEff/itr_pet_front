import React, {FC} from 'react';
import {User as A0User} from '@auth0/auth0-react'
import {Box, Button, ButtonGroup, Card, CardContent, CardMedia, Tooltip, Typography} from "@mui/material";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import {formatDistanceToNow, parseISO} from 'date-fns';
import {ImageContainer} from "../../common/Containers";


interface UserProps {
    user: A0User;
}

const User: FC<UserProps> = ({user}) => {
    const {picture, email, name, created_at} = user;

    return (
        <Card
            sx={{
                display: 'flex',
                height: 120,
                width: 430,
            }}
        >
            <CardMedia>
                {picture && <ImageContainer src={picture} w={120} h={120} fullImg/>}
            </CardMedia>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 265,
                }}
            >
                <CardContent sx={{flex: '1 0 auto'}}>
                    <Tooltip title={email || 'email'} placement={'top'}>
                        <Typography component={"div"} variant={"h6"}>
                            {
                                (email && email.length > 18) ?
                                    email?.slice(0, 17) + '…' :
                                    email
                            }
                        </Typography>
                    </Tooltip>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {formatDistanceToNow(parseISO(created_at))}
                    </Typography>
                </CardContent>
            </Box>
            <Box justifySelf={'flex-end'} alignSelf={'center'}>
                <ButtonGroup
                    orientation={"vertical"}
                    variant={"text"}
                >
                    <Button onClick={() => console.log('delete')}>
                        <DeleteRoundedIcon color={'error'}/>
                    </Button>
                    <Button onClick={() => console.log('bloc')}>
                        <BlockRoundedIcon color={'error'}/>
                    </Button>
                    <Button onClick={() => console.log('make admin')}>
                        <AdminPanelSettingsRoundedIcon/>
                    </Button>
                </ButtonGroup>
            </Box>
        </Card>
    );
};

export default User;