import { getPartFromText } from './helpers';

describe('getProductId', () => {

    it('correct part', () => {
        expect(getPartFromText(
            '/catalog/123/detail.aspx',
            '/catalog/',
            '/detail.aspx',
            'Unable to get product id',
        )).toBe('123');
    });

    it('incorrect part', () => {
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
