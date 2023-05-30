import ScrappifyTable, {ColumnDefinitionType} from "../../components/ScrappifyTable";
import {Page, PageRequest} from "../../common/common-models";
import { ProductSnapshot} from "../../features/products/product-service";

const columns: ColumnDefinitionType<ProductSnapshot, keyof ProductSnapshot>[] = [
    {
        key: 'name',
        header: 'Name',
    },
    {
        key: 'price',
        header: 'Price'
    },
    {
        key: 'currency',
        header: 'Currency',
        dataTransformer: (data) => data.currency ? data.currency : "Unknown"
    },
    {
        key: 'fetchTime',
        header: 'Fetch time'
    }
]

interface ProductSnapshotsTableProps {
    data?: Page<ProductSnapshot>
    onPageChange: (pageRequest: PageRequest) => void
}

export const ProductSnapshotsTable = ({data, onPageChange}: ProductSnapshotsTableProps) =>
    <ScrappifyTable<ProductSnapshot, keyof ProductSnapshot>
        columns={columns} data={data} onPageChange={onPageChange}></ScrappifyTable>
