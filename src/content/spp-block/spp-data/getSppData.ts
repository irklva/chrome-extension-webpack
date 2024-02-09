import { incBasicPrice, incClientSale } from '../../constants/errors';
import type { ProductCard } from '../../types/types';

export const getSppData = (productCard: ProductCard | undefined) => {
    const priceData = productCard?.extended;
    const spp = priceData?.clientSale;
    let sppString;
    if (!spp) {
        sppString = '?';
        console.error(incClientSale);
    } else {
        sppString = String(spp);
    }
    const beforeSpp = ((priceData?.basicPriceU ?? NaN) / 100);
    let beforeSppString;
    if (isNaN(beforeSpp)) {
        beforeSppString = '?';
        console.error(incBasicPrice);
    } else {
        beforeSppString = beforeSpp?.toLocaleString('ru-RU');
    }

    return {
        sppString,
        beforeSppString,
    };
};
