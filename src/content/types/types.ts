export type AlertsType = boolean;

interface Product {
    wh?: number;
    time1?: number;
    time2?: number;
}

interface Extended {
    clientSale?: number;
    basicPriceU?: number;
}

export interface StockForProductCard extends Product {
    qty?: number;
}

interface Size {
    stocks: StockForProductCard[];
}

export interface ProductCard extends Product {
    extended?: Extended;
    sizes?: Size[];
}

export interface StockForRefList {
    id?: number;
    name?: string;
}

export interface StockForBlock {
    name: string;
    time: number;
    qty: number;
}

export interface StocksListForBlock {
    [wh: string]: StockForBlock;
}
