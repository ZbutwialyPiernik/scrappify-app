import {
    Button,
    Card,
    Stack,
    SvgIcon,
    Table,
    TableBody,
    TableCell, TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import {Identified, Page, PageRequest} from "../common/common-models";
import {Maybe} from "true-myth";
import React from "react";
import {Link, To} from "react-router-dom";
import {Delete, Edit, Visibility} from "@mui/icons-material";


export type ColumnDefinitionType<T extends Identified, K extends keyof T> = {
    key: K;
    header: string;
    width?: number;
    dataTransformer?: (data: T) => string;
}

type TableHeaderProps<T extends Identified, K extends keyof T> = {
    data?: Page<T>
    columns: Array<ColumnDefinitionType<T, K>>
    onPageChange: (pageRequest: PageRequest) => void
    inspectRoute?: (t: T) => To,
    deleteAction?: (t: T) => void,
}

const ScrappifyTable = <T extends Identified, K extends keyof T>({
                                                                     data,
                                                                     columns,
                                                                     onPageChange,
                                                                     inspectRoute,
                                                                     deleteAction
                                                                 }: TableHeaderProps<T, K>) => {
        const handlePageChange = (index: number, size: number) => {
            onPageChange({index: index, size: size})
        }

        const hasAction = inspectRoute || deleteAction;

        return (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) =>
                                Maybe.of(column.header)
                                    .map(header => <TableCell key={index}>{header}</TableCell>)
                                    .unwrapOr(<TableCell key={index}/>),
                            )}
                            {hasAction && <TableCell> Actions </TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.items.map((row, index) => {
                            return (
                                <TableRow key={row.id}>
                                    {columns.map((column, index) =>
                                        Maybe.of(column.dataTransformer)
                                            .map(transformer => transformer(row))
                                            .orElse(() => Maybe.of(String(row[column.key])))
                                            .map(property => (
                                                <TableCell key={index}>{property}</TableCell>))
                                            .unwrapOr(<TableCell key={index}/>))
                                    }
                                    {hasAction &&
                                        <TableCell>
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                justifyContent="space-between"
                                                spacing={0.5}
                                            >
                                                {inspectRoute && <Button
                                                    component={Link}
                                                    to={inspectRoute(row)}
                                                    startIcon={(
                                                        <SvgIcon fontSize="small">
                                                            <Visibility/>
                                                        </SvgIcon>
                                                    )}
                                                    variant="contained"
                                                >
                                                    View
                                                </Button>}
                                                {deleteAction && <Button
                                                    onClick={() => deleteAction(row)}
                                                    startIcon={(
                                                        <SvgIcon fontSize="small">
                                                            <Delete/>
                                                        </SvgIcon>
                                                    )}
                                                    color="error"
                                                    variant="contained"
                                                >
                                                    Delete
                                                </Button>}
                                            </Stack>
                                        </TableCell>
                                    }
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                {data && <TablePagination
                    component="div"
                    count={data.totalItems}
                    onPageChange={(event, index) => handlePageChange(index, data.size)}
                    onRowsPerPageChange={(event) => handlePageChange(0, parseInt(event.target.value))}
                    page={data.index}
                    rowsPerPage={data.size}
                    rowsPerPageOptions={[5, 10, 25]}
                />}
            </TableContainer>
        );
    }
;

export default ScrappifyTable;