import {useMemo, useState} from "react";
import {PaletteMode, Theme} from "@mui/material";
import {createTheme} from "@mui/material/styles";


interface IColorMode {
    toggleColorMode: () => void,
}

interface IUseTheme {
    colorMode: IColorMode,
    theme: Theme,
}

const useTheme = (): IUseTheme => {
    const [mode, setMode] = useState<PaletteMode>('light');
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );

    return {colorMode, theme};
}

export default useTheme;