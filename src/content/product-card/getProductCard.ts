import { unblGetProdCard } from '../constants/errors';
import { getPartFromText } from '../helpers/helpers';
import { getXinfo } from './xinfo/getXinfo';

export const getProductId = (): string => {
    return getPartFromText(
        window.location.pathname,
        '/catalog/',
        '/detail.aspx',
        'Unable to get product id',
    );
};

const getProducts = async (
    id: string,
    xinfo: string,
) => {
    const productCardUrl = `https://card.wb.ru/cards/detail?${xinfo}&nm=${id}`;

    return fetch(productCardUrl)
        .then(r => r.json())
        .then(d => d?.data?.products || null);
};

export const getProductCard = async () => {
    try {
        const id = getProductId();
        const xinfo = await getXinfo();
        const products = await getProducts(id, xinfo);
        if (products?.length) {
            return products[0];
        } else {
            throw new Error();
        }
    } catch (err) {
        console.error(err);
        throw new Error(unblGetProdCard);
    }
};
