import {Box, ButtonBase,Link} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export interface SideNavItemProps {
    active?: boolean
    disabled?: boolean
    icon: JSX.Element
    path: string
    title: string
}
export const SideNavItem = ({active, disabled, icon, path, title}: SideNavItemProps) => {

    return (
        <li>
            <ButtonBase
                sx={{
                    alignItems: 'center',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    pl: '16px',
                    pr: '16px',
                    py: '6px',
                    textAlign: 'left',
                    width: '100%',
                    ...(active && {
                        backgroundColor: 'rgba(255, 255, 255, 0.04)'
                    }),
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.04)'
                    }
                }}
            >
                {icon && (
                    <Box
                        component="span"
                        sx={{
                            alignItems: 'center',
                            color: 'neutral.400',
                            display: 'inline-flex',
                            justifyContent: 'center',
                            mr: 2,
                            ...(active && {
                                color: 'primary.main'
                            })
                        }}
                    >
                        {icon}
                    </Box>
                )}
                <Link
                    component={RouterLink}
                    sx={{
                        color: 'neutral.400',
                        flexGrow: 1,
                        fontFamily: (theme) => theme.typography.fontFamily,
                        fontSize: 14,
                        fontWeight: 600,
                        lineHeight: '24px',
                        whiteSpace: 'nowrap',
                        ...(active && {
                            color: 'common.white'
                        }),
                        ...(disabled && {
                            color: 'neutral.500'
                        })
                    }}
                    to={path}
                >
                    {title}
                </Link>
            </ButtonBase>
        </li>
    );
};
