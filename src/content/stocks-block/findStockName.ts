import type { StockForRefList } from 'content/types/types';

export const findStockName = (
    wh: number,
    stocksNames: StockForRefList[],
) => {
    return stocksNames?.find(item => item.id === wh)?.name;
};
