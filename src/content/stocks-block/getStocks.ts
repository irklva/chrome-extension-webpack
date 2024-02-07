import { findStockName } from './findStockName';
import type { ProductCard, StockForRefList, StocksListForBlock } from 'content/types/types';

export const getStocks = (
    productCard: ProductCard,
    stocksList: StockForRefList[],
) => {
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
            } else if (stock.qty) {
                console.error(`Failed to get ${stock.qty} stock data`);
            } else {
                console.error('Failed to get data for unknown stock');
            }
        });
    });
    const stocksArray = Object.values(stocks);
    stocksArray.sort((a, b) => a.time - b.time);

    return stocksArray;
};
