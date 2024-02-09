import {
    BlockPosition,
    logo,
    wbPriceBlockKeyAside,
    wbPriceBlockKeyCommon,
    wbTargetSppClass,
} from '../constants/constants';
import { unblAddSppBlock } from '../constants/errors';
import { addElement } from '../helpers/page-elements/add-elements/addElement';
import { getSppData } from './spp-data/getSppData';
import type { ProductCard } from '../types/types';

export const addSppBlock = async (productCard: ProductCard | undefined): Promise<void> => {
    const { sppString, beforeSppString } = getSppData(productCard);
    const sppBlock = `
            <img class="logo" alt="Market-helper logo" src=${logo}>
            <div class="wrap">
                <span class="margin-text"><b>СПП: <span class="mark font-black">${sppString || '?'}%</span></b></span> 
                <span>До СПП: <span class="mark">${beforeSppString || '?'} ₽</span></span>
            </div>
        `;

    const afterBlockPromise = addElement(
        wbPriceBlockKeyAside,
        wbTargetSppClass,
        sppBlock,
        BlockPosition.AFTER,
    );
    const childBlockPromise = addElement(
        wbPriceBlockKeyCommon,
        wbTargetSppClass,
        sppBlock,
        BlockPosition.CHILD,
    );
    await Promise.all([afterBlockPromise, childBlockPromise])
        .catch(err => {
            console.error(err);
            throw new Error(unblAddSppBlock);
        });
};
