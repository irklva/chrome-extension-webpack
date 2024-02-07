import { selectElement } from './select-element/selectElement';

export const removeElement = async (key: string) => {
    // return new Promise<void>((resolve, reject) => {
    //     selectElement(key)
    //         .then(targetBlocks => {
    //             if (targetBlocks?.length) {
    //                 targetBlocks.forEach(b => b.remove());
    //                 resolve();
    //             } else {
    //                 reject(new Error(`Unable to remove old "${key}"`));
    //             }
    //         });
    // });

    try {
        const targetBlocks = await selectElement(key);
        if (targetBlocks?.length) {
            targetBlocks.forEach(b => b.remove());
        }
    } catch (e) {
        console.error(e);
        throw new Error(`Unable to remove old "${key}"`);
        // console.error(`Unable to remove old "${key}"`);
    }
};
