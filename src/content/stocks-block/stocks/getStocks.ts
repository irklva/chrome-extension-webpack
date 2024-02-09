import { failedGetDataForUnknown, failedGetDataForWh } from '../../constants/errors';
import { findStockName } from '../findStockName';
import type { ProductCard, StockForBlock, StockForRefList, StocksListForBlock } from '../../types/types';

export const getStocks = (
    productCard: ProductCard | undefined,
    stocksList: StockForRefList[] | null,
): StockForBlock[] => {
    const stocks: StocksListForBlock = {};
    productCard?.sizes?.forEach(size => {
        size.stocks?.forEach(stock => {
            if (stock.wh && stock.qty && Number.isFinite(stock.time1) && Number.isFinite(stock.time2)) {
                if (!stocks[stock.wh]) {
                    stocks[stock.wh] = {
                        name: findStockName(stock.wh, stocksList) ?? '?',
                        time: (stock.time1 ?? 0) + (stock.time2 ?? 0),
                        qty: stock.qty,
                    };
                } else {
                    if (stocks[stock.wh].qty){
                        stocks[stock.wh].qty += stock.qty;
                    }
                }
            } else if (stock.wh) {
                console.error(`${failedGetDataForWh} ${stock.wh}`);
            } else {
                console.error(failedGetDataForUnknown);
            }
        });
    });
    const stocksArray = Object.values(stocks);
    stocksArray.sort((a, b) => a.time - b.time);

    return stocksArray;
};
