import { BlockPosition, logo } from '../constants/constants';
import { addElement } from '../helpers/page-elements/add-elements/addElement';
import type { ProductCard } from 'content/types/types';

export const addSppBlock = async (productCard: ProductCard): Promise<void> => {
    const priceData = productCard?.extended;
    const spp = priceData?.clientSale;
    if (!spp) {
        console.error('Incorrect client sale');
    }
    const beforeSpp = ((priceData?.basicPriceU ?? NaN ) / 100);
    let beforeSppString;
    if (isNaN(beforeSpp)) {
        beforeSppString = '?';
        console.error('Incorrect basic price');
    } else {
        beforeSppString = beforeSpp?.toLocaleString('ru-RU');
    }
    const sppBlock = `
            <img class="logo" alt="Market-helper logo" src=${logo}>
            <div class="wrap">
                <span class="margin-text"><b>СПП: <span class="mark font-black">${spp ?? '?'}%</span></b></span> 
                <span>До СПП: <span class="mark">${beforeSppString || '?'} ₽</span></span>
            </div>
        `;
    const priceBlockKey = '.product-page__price-block';
    const targetClass = 'market-helper spp-block';
    const afterBlockPromise = addElement(
        `${priceBlockKey}--aside`,
        targetClass,
        sppBlock,
        BlockPosition.AFTER,
    );
    const childBlockPromise = addElement(
        `${priceBlockKey}--common`,
        targetClass,
        sppBlock,
        BlockPosition.CHILD,
    );
    await Promise.all([afterBlockPromise, childBlockPromise])
        .catch(err => {
            console.error(err);
            throw new Error('Unable to add spp-block');
        });
};
