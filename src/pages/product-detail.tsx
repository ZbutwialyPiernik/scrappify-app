import React, {useState} from "react";
import {
    Box,
    Card, CardContent,
    CardHeader,
    CircularProgress,
    Container,
    Grid, Tab, Tabs,
    Typography
} from "@mui/material";
import {useParams} from "react-router-dom";
import useSWR from "swr";
import {ProductForm} from "../sections/products/product-form";
import {PriceChart, Product, ProductSnapshot} from "../features/products/product-service";
import {ProductSnapshotsTable} from "../sections/snapshots/snapshots-table";
import {Page, PageRequest} from "../common/common-models";
import {SnapshotsSearch} from "../sections/snapshots/snapshots-search";
import SnapshotPriceChart from "../sections/snapshots/snapshot-chart";
import {BackwardIcon, ChartBarIcon, QueueListIcon} from "@heroicons/react/24/solid";
import ContentHeader from "../components/ContentHeader";

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const ProductDetailPage = () => {
    const {id} = useParams();

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [snapshotsPage, setSnapshotsPage] = useState<PageRequest>({index: 0, size: 10})

    const productResponse = useSWR<Product>(`/products/${id}`);
    const snapshotsResponse = useSWR<Page<ProductSnapshot>>(`/products/${id}/snapshots?page=${snapshotsPage.index}&size=${snapshotsPage.size}`);
    const chartsResponse = useSWR<PriceChart>(`/products/${id}/price-chart`);

    return (
        <>
            {productResponse.data &&
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ContentHeader header={"Product"}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardHeader title={`Update details`}></CardHeader>
                            <CardContent>
                                <ProductForm id={id ? parseInt(id) : undefined} initialData={productResponse.data}/>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardHeader title="Price Data" subheader="XD" />
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="h6">
                                            Latest price
                                        </Typography>
                                        {productResponse.data.latestPrice ? productResponse.data.latestPrice : 'No data'}
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="h6">
                                            Latest update
                                        </Typography>
                                        {productResponse.data.latestPrice ? productResponse.data.lastUpdate : 'No data'}
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="h6">
                                            Next execution prediction
                                        </Typography>
                                        {productResponse.data.latestPrice ? productResponse.data.latestPrice : 'No data'}
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Card>
                            <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example" centered>
                                <Tab icon={<ChartBarIcon/>} aria-label="test1" />
                                <Tab icon={<QueueListIcon />} aria-label="test2" />
                                <Tab icon={<BackwardIcon/>} aria-label="test3"/>
                            </Tabs>
                        </Card>

                        {chartsResponse.data &&
                            <Card sx={{p: 2, pb: 0}}>
                                <SnapshotPriceChart chartData={chartsResponse.data}/>
                            </Card>
                        }
                    </Grid>
                    <TabPanel value="1">Item One</TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>

                    <Grid item xs={12}>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <Grid container spacing={2}>
                                <Grid item padding={2} xs={12}>
                                    <SnapshotsSearch/>
                                </Grid>
                                <Grid item xs={12}>
                                    {snapshotsResponse.data &&
                                        <ProductSnapshotsTable data={snapshotsResponse.data} onPageChange={setSnapshotsPage}/>}
                                </Grid>
                            </Grid>
                        </Card>

                    </Grid>
                </Grid>
            }
            {productResponse.isLoading && <CircularProgress/>}
            {productResponse.error && <Typography variant="h4"> Product not found </Typography>}
        </>)
}


export default ProductDetailPage