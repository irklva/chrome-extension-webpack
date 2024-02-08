import { getPartFromText } from './helpers';

describe('getProductId', () => {

    test('correct part', () => {
        expect(getPartFromText(
            '/catalog/123/detail.aspx',
            '/catalog/',
            '/detail.aspx',
            'Unable to get product id',
        )).toBe('123');
    });

    test('incorrect part', () => {
        expect(() => {
            getPartFromText(
                '/detail.aspx/qwe/catalog',
                '/catalog/',
                '/detail.aspx',
                'Unable to get product id',
            );
        }).toThrowError('Unable to get product id');
    });
});
