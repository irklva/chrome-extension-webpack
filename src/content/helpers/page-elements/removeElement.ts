import { selectElement } from './select-element/selectElement';

export const removeElement = async (key: string) => {
    try {
        const targetBlocks = await selectElement(key);
        if (targetBlocks?.length) {
            targetBlocks.forEach(b => b.remove());
        }
    } catch (e) {
        console.error(e);
        throw new Error(`Unable to remove old "${key}"`);
    }
};
