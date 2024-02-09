import type { StockForRefList } from '../types/types';

export const findStockName = (
    wh: number,
    stocksNames: StockForRefList[] | null,
) => {
    return stocksNames?.find(item => item.id === wh)?.name ?? '?';
};
