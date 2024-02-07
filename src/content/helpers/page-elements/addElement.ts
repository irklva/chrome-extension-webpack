import { BlockPosition } from '../../constants/constants';
import { selectElement } from './select-element/selectElement';

export const addElement = async (
    key: string,
    divClass: string,
    innerBlocks: string,
    position: BlockPosition,
) => {
    const exhaustiveCheck = (param: never) => {
        console.log(`Handle the value ${param}`);
    };

    try {
        const markBlocks = await selectElement(key);
        if (markBlocks?.length) {
            const targetBlock = document.createElement('div');
            targetBlock.setAttribute('class', divClass);
            targetBlock.innerHTML = innerBlocks;
            switch (position) {
                    case BlockPosition.AFTER:
                        markBlocks.forEach(b => b.after(targetBlock));
                        break;
                    case BlockPosition.CHILD:
                        markBlocks.forEach(b => b.appendChild(targetBlock));
                        break;
                    default:
                        exhaustiveCheck(position);
            }
        }
    } catch (err) {
        console.error(err);
        throw new Error(`Unable to add "${key}"`);
    }
};
