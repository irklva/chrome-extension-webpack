import { incBasicPrice, incClientSale } from '../../constants/errors';
import { getSppData } from './getSppData';
import type { ProductCard } from '../../types/types';

describe('getSppData', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    test('correct values if correct spp and basicPriceU', () => {
        const productCard: ProductCard = {
            extended: {
                clientSale: 50,
                basicPriceU: 10000,
            },
        };

        const result = getSppData(productCard);
        expect(result.sppString).toBe('50');
        expect(result.beforeSppString).toBe('100');
    });

    test('correct spp and incorrect beforeSpp', () => {
        const productCard: ProductCard = { extended: { clientSale: 50 } };

        const result = getSppData(productCard);
        expect(result.sppString).toBe('50');
        expect(result.beforeSppString).toBe('?');
        expect(console.error).toHaveBeenCalledWith(incBasicPrice);
    });

    test('incorrect spp and correct beforeSpp', () => {
        const productCard: ProductCard = { extended: { basicPriceU: 10000 } };

        const result = getSppData(productCard);
        expect(result.sppString).toBe('?');
        expect(result.beforeSppString).toBe('100');
        expect(console.error).toHaveBeenCalledWith(incClientSale);
    });
});
