import {Button, Stack, SvgIcon, Typography} from "@mui/material";
import {Link, To} from "react-router-dom";
import {BackwardIcon, PlusIcon} from "@heroicons/react/20/solid";
import React from "react";

interface ContentHeaderProps {
    header: string,
    backText?: string,
    backLink?: To,
    actions?: JSX.Element[]
}

const ContentHeader = ({header, backText = "Back", backLink, actions}: ContentHeaderProps) => (
    <>
        <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
        >
            <Stack
                direction={"column"}
                justifyContent="space-between"
                spacing={2}
            >
                <Typography variant="h4">
                    {header}
                </Typography>
                {backLink && <Button
                    component={Link}
                    to={backLink}
                    startIcon={(
                        <SvgIcon fontSize="small">
                            <BackwardIcon />
                        </SvgIcon>
                    )}
                    variant="contained"
                >
                    {backText}
                </Button>}
            </Stack>

            <div>

            </div>
        </Stack>
    </>
);

export default ContentHeader
