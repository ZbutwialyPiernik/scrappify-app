import {joiResolver} from "@hookform/resolvers/joi";
import {FormContainer, TextFieldElement} from 'react-hook-form-mui'

import Joi from "joi";
import {
    Button,
    FormHelperText,
    Link,
    Stack,
    Typography
} from '@mui/material';
import React, {useState} from "react";
import productService, {Product, ProductFormData} from "../../features/products/product-service";
import {Loadable, loadingIdle} from "../../common/common-models";
import {useNavigate, useParams} from "react-router-dom";
import useSWR from "swr";


const defaultValues = {
    name: '',
    url: '',
    code: '',
    fetchCron: '0 0 0 ? * *'
}

const validationSchema = Joi.object({
    name: Joi
        .string()
        .max(255)
        .messages({'any.only': 'name is required'})
        .required(),
    url: Joi
        .string()
        .uri()
        .max(255)
        .messages({'any.only': 'url is required'})
        .required(),
    code: Joi
        .string()
        .max(255)
        .messages({'any.only': 'product code is required'})
        .required(),
    fetchCron: Joi
        .string()
        .max(255)
        .messages({'cron': 'fetch cron is required'})
        .required(),
});

interface ProductFormProps {
    id?: number,
    initialData?: ProductFormData
}


export const ProductForm = ({id, initialData = defaultValues}: ProductFormProps) => {

    const [formState, setFormState] = useState<Loadable<Product>>(loadingIdle())
    const navigator = useNavigate()

    const onSuccess = (data: ProductFormData) => {
        const promise = id
            ? productService.update(id, data)
            : productService.create(data)

        promise
            .then(result => {
                console.log(result)
                return result
            })
            .then(result => navigator(`/products/${result.id}`))
            .catch(reason => console.error(reason))
    };

    return (
        <>

                <FormContainer
                    defaultValues={initialData}
                    resolver={joiResolver(validationSchema)}
                    onSuccess={onSuccess}
                >
                    <Stack spacing={3}>
                        <TextFieldElement name="name" label="Name"/>
                        <TextFieldElement name="url" label="Url"/>
                        <TextFieldElement name="code" label="Code"/>
                        <TextFieldElement name="fetchCron" label="Cron"/>
                        <FormHelperText sx={{mt: 1}}>
                            Cron builder: <Link target="none" href="https://crontab.cronhub.io">Crontab</Link>
                        </FormHelperText>
                        <Button
                            disabled={formState.isLoading() || formState.isLoaded()}
                            fullWidth
                            size="large"
                            sx={{mt: 3}}
                            type="submit"
                            variant="contained"
                        >
                            {id ? 'Update' : 'Create'}
                        </Button>
                    </Stack>
                </FormContainer>
        </>
    )
};