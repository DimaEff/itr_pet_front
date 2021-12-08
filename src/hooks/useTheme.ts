import {useMemo, useState} from "react";
import {PaletteMode, Theme} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {Palette} from "@mui/icons-material";


interface IColorMode {
    toggleColorMode: () => void,
}

interface IUseTheme {
    colorMode: IColorMode,
    theme: Theme,
}

const useTheme = (): IUseTheme => {
    const defaultThemeMode: PaletteMode = localStorage.getItem('theme-mode') === 'dark' ? 'dark': 'light';
    const [mode, setMode] = useState<PaletteMode>(defaultThemeMode);
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    const mode = prevMode === 'light' ? 'dark' : 'light';
                    localStorage.setItem('theme-mode', mode);
                    return mode;
                });
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