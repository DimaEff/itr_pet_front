import React, {ChangeEvent, FC} from 'react';
import {Stack, Toolbar, Typography} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import SearchTextField from "../Form/SearchTextField";
import {Button} from "../Buttons";


interface SimpleSearchProps {
    inputValue: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onAdd?: () => void;
}

const SimpleSearch: FC<SimpleSearchProps> = (
    {
        children,
        inputValue,
        onChange,
        onAdd,
    }) => {
    return (
        <Toolbar>
            <Typography
                variant={"h6"}
                noWrap
                component={"div"}
                sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
            >
                All event types
            </Typography>
            <Stack direction="row" spacing={1}>
                <SearchTextField
                    value={inputValue}
                    onChange={onChange}
                />
                {children || <Button onClick={onAdd}>
                    <AddRoundedIcon />
                </Button>}
            </Stack>
        </Toolbar>
    );
};

export default SimpleSearch;