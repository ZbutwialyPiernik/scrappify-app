import ScrappifyTable, {ColumnDefinitionType} from "../../components/ScrappifyTable";
import {Page, PageRequest} from "../../common/common-models";
import {Product} from "../../features/products/product-service";

const columns: ColumnDefinitionType<Product, keyof Product>[] = [
    {
        key: 'id',
        header: 'Id',
    },
    {
        key: 'name',
        header: 'Name',
    },
    {
        key: 'url',
        header: 'Url'
    },
    {
        key: 'fetchCron',
        header: 'fetchCron'
    },
    {
        key: 'latestPrice',
        header: 'Latest Price'
    },
    {
        key: 'lastUpdate',
        header: 'Last Update'
    }
]

interface ProductsTableProps {
    data?: Page<Product>
    onPageChange: (pageRequest: PageRequest) => void
}

export const ProductsTable = ({data, onPageChange}: ProductsTableProps) => <ScrappifyTable<Product, keyof Product>
    columns={columns} data={data} onPageChange={onPageChange}
    inspectRoute={(product) => `/products/${product.id}`}
    deleteAction={() => {}}></ScrappifyTable>

