import { BlockPosition, wbJPriceBlock, wbTargetStocksClass } from '../../constants/constants';
import { noStocksForBlock, unblAddStocksBlock } from '../../constants/errors';
import { addElement } from '../../helpers/page-elements/add-elements/addElement';
import { findStockName } from '../findStockName';
import { addStocksBlock, getStocksRows, getTargetStock } from './addStocksBlock';

jest.mock('../findStockName');
const mockFindStockName = findStockName as jest.MockedFunction<typeof findStockName>;

jest.mock('../../helpers/page-elements/add-elements/addElement');
const addElementMock = addElement as jest.MockedFunction<typeof addElement>;

const validStocks = [
    { name: 'Stock1', time: 8, qty: 10 },
    { name: 'Stock2', time: 6, qty: 5 },
];
const validProductCard = {
    wh: 1,
    time1: 5,
    time2: 3,
};
const invalidProductCard = {
    wh: undefined,
    time1: undefined,
    time2: undefined,
};

const stocksRefList = [
    { id: 1, name: 'Stock1' },
    { id: 2, name: 'Stock2' },
];

const someError = 'some-error';

describe('getStocksRows', () => {
    test('correct stocks rows', () => {
        const result = getStocksRows(validStocks);
        expect(result).toContain(`
                <span>Stock1</span>
                <span><b>8 ч.</b></span>
                <span>10 шт.</span>
            `);
        expect(result).toContain(`
                <span>Stock2</span>
                <span><b>6 ч.</b></span>
                <span>5 шт.</span>
        `);
    });

    test('? in stocks rows if no data', () => {
        const result = getStocksRows([{}]);
        expect(result).toContain(`
                <span>?</span>
                <span><b>? ч.</b></span>
                <span>? шт.</span>
            `);
    });
});

describe('getTargetBlock', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    test('valid target stock', () => {
        mockFindStockName.mockReturnValue('Stock1');
        const result = getTargetStock(validProductCard, stocksRefList);
        expect(result).toEqual({ name: 'Stock1', time: 8 });
    });

    test('empty object if no data or productCard has incomplete data', () => {
        const result = getTargetStock(invalidProductCard, stocksRefList);
        expect(result).toEqual({});
    });
});

describe('addStocksBlock', () => {
    test('stocks block with valid input', async () => {
        mockFindStockName.mockReturnValueOnce('Stock1');

        await addStocksBlock(validProductCard, validStocks, stocksRefList);
        expect(addElementMock)
            .toHaveBeenCalledWith(wbJPriceBlock, wbTargetStocksClass, expect.any(String), BlockPosition.AFTER);
    });

    test('error if error in addElement function', async () => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
        addElementMock.mockRejectedValue('some-error');

        await expect(addStocksBlock(validProductCard, validStocks, stocksRefList)).rejects
            .toThrow(unblAddStocksBlock);
        expect(console.error).toHaveBeenCalledWith(someError);
    });

    test('error if stocks array is empty', async () => {
        await expect(addStocksBlock(validProductCard, [], stocksRefList)).rejects.toThrow(noStocksForBlock);
    });
});
