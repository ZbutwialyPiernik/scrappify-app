import {http} from 'common/fetcher';
import {AxiosRequestConfig} from "axios";
import {Identified, Page} from "../../common/common-models";

export interface Product extends Identified {
    id: number;
    name: string;
    code: string;
    url: string;
    fetchCron: string;
    latestPrice?: number;
    lastUpdate?: string;
}

export interface ProductFormData {
    name: string,
    url: string,
    code: string,
    fetchCron: string
}

export interface ProductSnapshot {
    id: number,
    price: string,
    name?: string,
    currency?: string,
    fetchTime: string,
    productId: number
}

export interface DailyPrice {
    day: string,
    price: number
}

export interface PriceChart {
    data: DailyPrice[]
    duration: string
}


class ProductService {
    searchProducts(name: string): Promise<Page<Product>> {
        let config: AxiosRequestConfig = {
            params: {
                name: name
            }
        }

        return http.get(`/products?`, config);
    }

    get(id: number): Promise<Product> {
        return http.get(`/products/${id}`)
            .then(result => result.data);
    }

    create(data: ProductFormData): Promise<Product> {
        return http.post("/products", JSON.stringify(data))
            .then(result => result.data);
    }

    update(id: number, data: ProductFormData): Promise<Product> {
        return http.put(`/products/${id}`, JSON.stringify(data))
            .then(result => result.data);
    }

    searchSnapshots(id: number) {
        return http.get(`/products/${id}`)
            .then(result => result.data);
    }

}

export default new ProductService()