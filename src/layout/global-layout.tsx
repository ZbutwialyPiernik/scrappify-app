import {Container, CssBaseline, ThemeProvider} from "@mui/material";
import {SWRConfig} from "swr";
import fetcher from "../common/fetcher";
import {SIDE_NAV_WIDTH, TopNav} from "./top-nav";
import {SideNav} from "./side-nav";
import React, {useState} from "react";
import {createTheme} from "../theme/theme";
import {Outlet} from "react-router-dom";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {styled} from "@mui/material/styles";

const theme = createTheme();

const LayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    [theme.breakpoints.up('lg')]: {
        paddingLeft: SIDE_NAV_WIDTH
    }
}));

const LayoutContainer = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%'
});

const GlobalLayout = () => {
    const [isNavOpen, setNavOpen] = useState(false);

    return <ThemeProvider theme={theme}>
        <SWRConfig value={{
            fetcher: (resource, init) => fetcher(resource),
            onError: (error, key) => {
                console.error(`Nie udało się pobrać ${key}`, error)
            }
        }}>

            <CssBaseline/>
            <TopNav onNavOpen={() => setNavOpen(true)}/>
            <SideNav open={isNavOpen} onClose={() => setNavOpen(false)}/>
            <LayoutRoot>
                <LayoutContainer>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Container maxWidth="xl">

                            <Outlet/>
                        </Container>
                    </LocalizationProvider>
                </LayoutContainer>
            </LayoutRoot>
        </SWRConfig>
    </ThemeProvider>;
}

export default GlobalLayout

