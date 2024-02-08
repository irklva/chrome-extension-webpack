import { BlockPosition } from '../../../constants/constants';
import { selectElement } from '../select-element/selectElement';
import { addElement } from './addElement';

jest.mock('../select-element/selectElement');
const mockSelectElement = selectElement as jest.MockedFunction<typeof selectElement>;

const key = '.test-element';
const divClass = 'new-element';
const innerBlocks = '<span>Hello</span>';
const mockElements = [
    document.createElement('div'),
    document.createElement('div'),
] as unknown as NodeListOf<Element>;

describe('addElement', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    it('new element after selected elements', async () => {
        const position = BlockPosition.AFTER;
        const addedElements: Element[] = [];

        const afterSpy = jest.spyOn(Element.prototype, 'after')
            .mockImplementation(function(this: Element, ...args: (string | Node)[]) {
                addedElements.push(args[0] as Element);
            });
        mockSelectElement.mockResolvedValueOnce(mockElements);

        await addElement(key, divClass, innerBlocks, position);

        expect(mockSelectElement).toHaveBeenCalledWith(key);
        expect(afterSpy).toHaveBeenCalledTimes(mockElements.length);
        addedElements.forEach(element => {
            expect(element.classList.contains(divClass)).toBe(true);
        });
    });

    it('new element as child of selected elements', async () => {
        const position = BlockPosition.CHILD;
        const addedElements: Element[] = [];

        const childSpy = jest.spyOn(Element.prototype, 'appendChild')
            .mockImplementation(function(this: Element, node: Node) {
                if (node instanceof Node) {
                    addedElements.push(node as Element);
                }

                return node;
            });
        mockSelectElement.mockResolvedValueOnce(mockElements);

        await addElement(key, divClass, innerBlocks, position);

        expect(mockSelectElement).toHaveBeenCalledWith(key);
        expect(childSpy).toHaveBeenCalledTimes(mockElements.length);
        addedElements.forEach(element => {
            expect(element.classList.contains(divClass)).toBe(true);
        });
    });

    it('error if no selected element', async () => {
        const position = BlockPosition.AFTER;

        mockSelectElement.mockRejectedValueOnce(new Error('Timeout: Unable to find the element'));

        await expect(addElement(key, divClass, innerBlocks, position))
            .rejects.toThrowError(`Unable to add "${key}"`);
    });
});
