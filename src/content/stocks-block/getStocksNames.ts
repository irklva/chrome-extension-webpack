import type { StockForRefList } from 'content/types/types';

export const getStocksNames = async () => {
    const stocksNamesUrl = 'https://static-basket-01.wb.ru/vol0/data/stores-data.json';

    return fetch(stocksNamesUrl)
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

            return [];
        });
};
