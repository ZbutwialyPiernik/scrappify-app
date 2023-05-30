import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import {Card, CardContent, CardHeader, Grid, InputAdornment, OutlinedInput, SvgIcon} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import React from "react";

export const SnapshotsSearch = () => (
    <Grid container spacing={2}>
        <Grid item xs={4}>
            <OutlinedInput
                defaultValue=""
                fullWidth
                placeholder="Search snapshots"
                startAdornment={(
                    <InputAdornment position="start">
                        <SvgIcon
                            color="action"
                            fontSize="small"
                        >
                            <MagnifyingGlassIcon/>
                        </SvgIcon>
                    </InputAdornment>
                )}
                sx={{maxWidth: 500}}></OutlinedInput>
        </Grid>
        <Grid item xs={4}>
            <DatePicker/>
        </Grid>
    </Grid>
);
