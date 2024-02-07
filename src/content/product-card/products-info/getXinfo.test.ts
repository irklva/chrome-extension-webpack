import { getXinfo } from './productsInfo';

const mockXinfo = 'mock-xinfo';
const scriptsObject = { value: [{ src: 'https://www.wildberries.ru/js-templates/1.0.0/script.js' }] };
const mockResponse = { xinfo: mockXinfo };
Object.defineProperty(document, 'scripts', scriptsObject);

describe('getXinfo', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        localStorage.clear();
    });

    it('xinfo from localStorage', async () => {
        localStorage.setItem('geo-data-v1', JSON.stringify({ data: { xinfo: mockXinfo } }));

        const result = await getXinfo();
        expect(result).toBe(mockXinfo);
    });

    it('xinfo from getXinfoInScripts if no localStorage data', async () => {
        global.fetch = jest.fn().mockResolvedValue({ json: jest.fn().mockResolvedValue(mockResponse) });

        const result = await getXinfo();
        expect(result).toBe(mockXinfo);
    });

    it('xinfo from getXinfoInScripts if wrong localStorage data', async () => {
        localStorage.setItem('geo-data-v1', 'unparsable string');

        global.fetch = jest.fn().mockResolvedValue({ json: jest.fn().mockResolvedValue(mockResponse) });

        const result = await getXinfo();
        expect(result).toBe(mockXinfo);
    });

    it('throws an error if xinfo is not available', async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error('Fetch error'));

        await expect(getXinfo()).rejects.toThrow('Unable to get xinfo');
    });
});
