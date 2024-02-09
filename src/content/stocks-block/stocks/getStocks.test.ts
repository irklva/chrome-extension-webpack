import { failedGetDataForUnknown, failedGetDataForWh } from '../../constants/errors';
import { findStockName } from '../findStockName';
import { getStocks } from './getStocks';
import type { ProductCard, StockForRefList } from '../../types/types';

jest.mock('../findStockName');
const mockFindStockName = findStockName as jest.MockedFunction<typeof findStockName>;

const validProductCard: ProductCard = {
    sizes: [
        {
            stocks: [
                { wh: 1, qty: 10, time1: 5, time2: 3 },
                { wh: 2, qty: 5, time1: 2, time2: 4 },
                { wh: 2, qty: 3, time1: 2, time2: 4 },
            ],
        },
    ],
};
const invalidProductCard: ProductCard = {
    sizes: [
        {
            stocks: [
                { wh: 1, qty: 10, time1: 5 },
                { qty: 5, time1: 2, time2: 4 },
            ],
        },
    ],
};
const stocksList: StockForRefList[] = [
    { id: 1, name: 'Stock1' },
    { id: 2, name: 'Stock2' },
];

describe('getStocks', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    test('correct stocks if valid input', () => {
        mockFindStockName.mockReturnValueOnce('Stock1').mockReturnValueOnce('Stock2');

        const result = getStocks(validProductCard, stocksList);
        expect(result).toEqual([
            { name: 'Stock2', time: 6, qty: 8 },
            { name: 'Stock1', time: 8, qty: 10 },
        ]);
    });

    test('returns empty array if productCard or stocksList is missing', () => {
        const result = getStocks(undefined, null);
        expect(result).toEqual([]);
    });

    test('log errors if incomplete or missing stock data', () => {
        jest.spyOn(console, 'error').mockImplementation(() => {});

        const result = getStocks(invalidProductCard, null);
        expect(result).toEqual([]);
        expect(console.error).toHaveBeenCalledWith(`${failedGetDataForWh} 1`);
        expect(console.error).toHaveBeenCalledWith(failedGetDataForUnknown);
    });
});
