import {ProductForm} from "../sections/products/product-form";
import React from "react";
import ContentHeader from "../components/ContentHeader";
import {Box} from "@mui/material";

const ProductFormPage = () => {

    return (
        <>
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        maxWidth: 550,
                        px: 3,
                        py: '100px',
                        width: '100%'
                    }}
                >
                    <ContentHeader header={'Create new product'}/>
                    <ProductForm/>
                </Box>
            </Box>
        </>);
}

export default ProductFormPage