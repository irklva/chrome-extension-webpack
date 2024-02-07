import { getProductId, getProducts, getXinfo } from './products-info/productsInfo';

export const getProductCard = async () => {
    try {
        const id = getProductId();
        const xinfo = await getXinfo();
        const products = await getProducts(id, xinfo);
        if (products?.length) {
            return products[0];
        } else {
            throw new Error('No products in response');
        }
    } catch (err) {
        console.error(err);
        throw new Error('Unable to get product card');
    }
};
