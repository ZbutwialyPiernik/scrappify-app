import PropTypes from 'prop-types';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import {
    Avatar,
    Badge,
    Box,
    IconButton,
    Stack,
    SvgIcon,
    Tooltip, useMediaQuery,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import React from "react";
import {Bars3Icon} from "@heroicons/react/24/solid";

export const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;


interface TopNavProps {
    onNavOpen: () => void
}
export const TopNav = ({onNavOpen}: TopNavProps) => {
    // @ts-ignore
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

    return (
        <>
            <Box
                component="header"
                sx={{
                    backdropFilter: 'blur(6px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    ///backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
                    position: 'sticky',
                    left: {
                        lg: `${SIDE_NAV_WIDTH}px`
                    },
                    top: 0,
                    width: {
                        lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
                    },
                    zIndex: (theme) => theme.zIndex.appBar
                }}
            >
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{
                        minHeight: TOP_NAV_HEIGHT,
                        px: 2
                    }}
                >
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                    >
                        {!lgUp && (
                            <IconButton onClick={onNavOpen}>
                                <SvgIcon fontSize="small">
                                    <Bars3Icon />
                                </SvgIcon>
                            </IconButton>
                        )}
                        <Tooltip title="Search">
                            <IconButton>
                                <SvgIcon fontSize="small">
                                    <MagnifyingGlassIcon />
                                </SvgIcon>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Stack>
            </Box>
        </>
    );
};
