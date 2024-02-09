import { BlockPosition, logo, wbJPriceBlock, wbTargetStocksClass } from '../../constants/constants';
import { noStocksForBlock, unblAddStocksBlock } from '../../constants/errors';
import { addElement } from '../../helpers/page-elements/add-elements/addElement';
import { findStockName } from '../findStockName';
import type { StockForRefList, StockForBlock, ProductCard } from '../../types/types';

export const getStocksRows = (stocks: Partial<StockForBlock>[]) => {
    return stocks.reduce((rows, stock) => {
        return rows + `
                <span>${stock?.name || '?'}</span>
                <span><b>${stock?.time ?? '?'} ч.</b></span>
                <span>${stock?.qty?.toLocaleString('ru-RU') ?? '?'} шт.</span>
            `;
    }, '');
};

export const getTargetStock = (
    productCard: ProductCard,
    stocksRefList: StockForRefList[],
) => {
    const targetStock: Partial<StockForBlock> = {};
    if (productCard?.wh) {
        targetStock.name = findStockName(productCard.wh, stocksRefList);
    }
    if (productCard?.time1 && productCard?.time2) {
        targetStock.time = +productCard.time1 + productCard.time2;
    }

    return targetStock;
};

export const addStocksBlock = async (
    productCard: ProductCard | undefined,
    stocks: StockForBlock[],
    stocksRefList: StockForRefList[] | null,
) => {
    if (stocks?.length) {
        const stocksRows = getStocksRows(stocks);
        const targetStock = productCard && stocksRefList ? getTargetStock(productCard, stocksRefList) : null;
        const stocksBlock = `
            <div class="stocks-header">
                <img class="logo" alt="Market-helper logo" src=${logo}>
                <span class="stocks-title"><b>Раскладка по складам</b></span>
            </div>
            <div class="stocks-content">
                <div class="stocks-target">
                    <span><b>${targetStock?.name ?? '?'}: ${targetStock?.time ?? '?'} час.</b></span>
                </div>
                <div class="stocks-table">
                    ${stocksRows}
                </div>
            </div>
            `;
        try {
            await addElement(wbJPriceBlock, wbTargetStocksClass, stocksBlock, BlockPosition.AFTER);
        } catch (err) {
            console.error(err);
            throw new Error(unblAddStocksBlock);
        }
    } else {
        throw new Error(noStocksForBlock);
    }
};
