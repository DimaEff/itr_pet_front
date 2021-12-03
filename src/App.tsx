import * as React from 'react';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {PaletteMode} from "@mui/material";

import {Button} from "./components/components/common/Buttons";
import {Container} from "./components/components/common/Containers";
import {Header} from "./components/components/Header";
import AppWrapper from "./components/components/common/Containers/AppWrapper";


export const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});

const App = () => {
    const [mode, setMode] = React.useState<PaletteMode>('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <AppWrapper>
                    <Header/>
                    <Container>
                        <Button>
                            Test
                        </Button>
                    </Container>
                </AppWrapper>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;