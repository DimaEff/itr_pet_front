import {createTheme, PaletteMode} from "@mui/material";

declare module '@mui/material/Badge' {
    interface BadgePropsVariantOverrides {
        middle: true;
    }
}

declare module '@mui/material/Modal' {
    interface ModalPropsOverrides {
        center: true;
    }
}


export const getTheme = (mode: PaletteMode) => createTheme({
    palette: {
        mode,
    },
    components: {
        MuiBadge: {
            variants: [
                {
                    props: {variant: 'middle'},
                    style: {
                        '.MuiBadge-badge': {
                            right: -12,
                            top: '50%',
                        },
                    }
                }
            ]
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    wordWrap: 'break-word',
                }
            }
        }
    }
});