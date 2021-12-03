import {createTheme} from "@mui/material";


export const getTheme = (mode: string) => createTheme({
    palette: {
        mode: mode === 'light' ? 'light': 'dark',
    },
});