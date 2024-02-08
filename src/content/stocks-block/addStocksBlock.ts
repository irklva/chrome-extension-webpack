import { BlockPosition, logo } from '../constants/constants';
import { addElement } from '../helpers/page-elements/add-elements/addElement';
import { findStockName } from './findStockName';
import type { StockForRefList, StockForBlock , StockForProductCard } from 'content/types/types';

export const addStocksBlock = async (
    productCard: StockForProductCard,
    stocks: StockForBlock[],
    stocksRefList: StockForRefList[],
) => {
    if (stocks?.length) {
        const stocksRows = stocks.reduce((rows, stock) => {
            return rows + `
                <span>${stock.name}</span>
                <span><b>${stock.time} ч.</b></span>
                <span>${stock.qty?.toLocaleString('ru-RU')} шт.</span>
            `;
        }, '');
        const targetStock: Partial<StockForBlock> = {};
        if (productCard?.wh) {
            targetStock.name = findStockName(productCard.wh, stocksRefList);
        }
        if (productCard?.time1 && productCard?.time2) {
            targetStock.time = +productCard.time1 + productCard.time2;
        }
        const stocksBlock = `
            <div class="stocks-header">
                <img class="logo" alt="Market-helper logo" src=${logo}>
                <span class="stocks-title"><b>Раскладка по складам</b></span>
            </div>
            <div class="stocks-content">
                <div class="stocks-target">
                    <span><b>${targetStock.name ?? '?'}: ${targetStock.time ?? '?'} час.</span></b>
                </div>
                <div class="stocks-table">
                    ${stocksRows}
                </div>
            </div>
            `;
        const targetClass = 'market-helper base-section stocks-block';
        await addElement('.j-price-block', targetClass, stocksBlock, BlockPosition.AFTER)
            .catch(err => {
                console.error(err);
                throw new Error('Unable to add stocks-block');
            });
    } else {
        throw new Error('No stock for stocks-block');
    }
};
