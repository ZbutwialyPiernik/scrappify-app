import React, {useState} from "react";
import {Box, Button, Container, Grid, SvgIcon} from "@mui/material";
import {ProductsSearch} from "../sections/products/products-search";
import {ProductsTable} from "../sections/products/products-table";
import ContentHeader from "../components/ContentHeader";
import useSWR from 'swr'
import {Page, PageRequest} from "../common/common-models";
import {Product} from "../features/products/product-service";
import {Link} from "react-router-dom";
import {PlusIcon} from "@heroicons/react/20/solid";

function ProductsPage() {
    const [page, setPage] = useState<PageRequest>({index: 0, size: 10})

    const {data, error, isLoading} = useSWR<Page<Product>>(`/products?page=${page.index}&size=${page.size}`)

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ContentHeader header="Products" actions={[
                        <Button
                            component={Link}
                            to="/products/new"
                            startIcon={(
                                <SvgIcon fontSize="small">
                                    <PlusIcon/>
                                </SvgIcon>
                            )}
                            variant="contained"
                        >
                            Add
                        </Button>
                        ]

                    }/>
                </Grid>
                <Grid item xs={12}>
                    <ProductsSearch/>
                </Grid>
                <Grid item xs={12}>
                    <ProductsTable onPageChange={setPage} data={data}/>
                </Grid>
            </Grid>
        </>
    );
}

export default ProductsPage