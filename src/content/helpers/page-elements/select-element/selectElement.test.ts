import { unblFindEl } from '../../../constants/errors';
import { selectElement } from './selectElement';

const mockElements = [
    document.createElement('div'),
    document.createElement('div'),
] as unknown as NodeListOf<Element>;
const key = '.test-element';

const mutationObserverMock = jest.fn(function MutationObserver() {
    this.observe = jest.fn();
    this.disconnect = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;

describe('selectElement function', () => {
    global.MutationObserver = mutationObserverMock;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    test('correct selected elements immediately on page', async () => {
        jest.spyOn(document, 'querySelectorAll').mockImplementation(() => {
            return mockElements;
        });

        const result = await selectElement(key);
        expect(document.querySelectorAll).toBeCalledTimes(1);
        expect(document.querySelectorAll).toBeCalledWith(key);
        expect(result).toEqual(mockElements);
        expect(mutationObserverMock).not.toHaveBeenCalled();
    });

    test('no selected elements within the specified time', async () => {
        const result = selectElement(key, 3000);
        await expect(result).rejects
            .toThrow(`${unblFindEl} ".test-element"`);
        expect(mutationObserverMock).toHaveBeenCalled();
        const [observerInstance] = mutationObserverMock.mock.instances;
        expect(observerInstance.observe).toHaveBeenCalledTimes(1);
    }, 6000);
});
