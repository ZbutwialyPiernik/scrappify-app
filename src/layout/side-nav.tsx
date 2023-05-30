import {
    Box,
    Divider,
    Drawer,
    Stack,
    SvgIcon,
    Typography,
    useMediaQuery
} from '@mui/material';
import {ChartBarIcon} from "@heroicons/react/20/solid";
import UsersIcon from "@heroicons/react/20/solid/UsersIcon";
import {QueueListIcon} from "@heroicons/react/20/solid";
import {SideNavItem, SideNavItemProps} from "./side-nav-item";
import {BellAlertIcon} from "@heroicons/react/20/solid";
import {useState} from "react";

export const items: SideNavItemProps[] = [

    {
        title: 'Overview',
        path: '/',
        icon: (
            <SvgIcon fontSize="small">
                <ChartBarIcon/>
            </SvgIcon>
        ),
    },
    {
        title: 'Products',
        path: '/products',
        icon: (
            <SvgIcon fontSize="small">
                <UsersIcon/>
            </SvgIcon>
        )
    },
    {
        title: 'Jobs',
        path: '/jobs',
        icon: (
            <SvgIcon fontSize="small">
                <QueueListIcon/>
            </SvgIcon>
        )
    },
    {
        title: 'Notifications',
        path: '/notifications',
        icon: (
            <SvgIcon fontSize="small">
                <BellAlertIcon/>
            </SvgIcon>
        )
    },
];


interface SideNavProps {
    open: boolean
    onClose: () => void
}

export const SideNav = ({open, onClose}: SideNavProps) => {
    // @ts-ignore
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const content = (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}
            >
                <Box sx={{p: 3}}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                            borderRadius: 1,
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'center',
                            mt: 2,
                            p: '12px'
                        }}
                    >
                        <div>
                            <Typography
                                color="inherit"
                                variant="h3"
                            >
                                Scrappify
                            </Typography>
                        </div>
                    </Box>
                </Box>
                <Divider sx={{borderColor: 'neutral.700'}}/>
                <Box
                    component="nav"
                    sx={{
                        flexGrow: 1,
                        px: 2,
                        py: 3
                    }}
                >
                    <Stack
                        component="ul"
                        spacing={0.5}
                        sx={{
                            listStyle: 'none',
                            p: 0,
                            m: 0
                        }}
                    >
                        {items.map((item) => {
                            const active = false//item.path ? //(pathname === item.path) : false;

                            return (
                                <SideNavItem
                                    active={active}
                                    disabled={item.disabled}
                                    icon={item.icon}
                                    path={item.path}
                                    title={item.title}
                                    key={item.title}
                                />
                            );
                        })}
                    </Stack>
                </Box>
            </Box>
    );

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: 'neutral.800',
                        color: 'common.white',
                        width: 280
                    }
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: 'neutral.800',
                    color: 'common.white',
                    width: 280
                }
            }}
            sx={{zIndex: (theme) => theme.zIndex.appBar + 100}}
            variant="temporary"
        >
            {content}
        </Drawer>
    );
};