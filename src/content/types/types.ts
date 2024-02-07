export type AlertsType = boolean;

interface Extended {
    clientSale?: string;
    basicPriceU?: number;
}

export interface StockForProductCard {
    wh?: number;
    qty?: number;
    time1?: number;
    time2?: number;
}

interface Size {
    stocks: StockForProductCard[];
}

export interface ProductCard {
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
