import { incStocksList } from '../constants/errors';
import type { StockForRefList } from '../types/types';

export const getStocksList = async (): Promise<StockForRefList[] | null> => {
    const stocksListUrl = 'https://static-basket-01.wb.ru/vol0/data/stores-data.json';

    return fetch(stocksListUrl)
        .then(response => response.json())
        .then((stocksData: StockForRefList[]) => {
            stocksData.forEach(stock => {
                stock.name = stock.name?.replace(' WB', '');
                stock.name = stock.name?.replace('склад продавца', 'FBS');
            });

            return stocksData;
        })
        .catch(err => {
            console.error(err);
            console.error(incStocksList);

            return null;
        });
};
