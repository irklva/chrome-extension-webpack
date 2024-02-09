import { getXinfoInScripts } from './getXinfoInScripts';


const fetchPath = 'https://www.wildberries.ru/webapi/user/get-xinfo-v2';
const fetchObject = {
    method: 'POST',
    headers: { 'X-Requested-With': 'XMLHttpRequest', 'X-Spa-Version': '1.0.0' },
};
const scriptsObject = {
    value: [
        { src: 'https://www.wildberries.ru/js-templates/1.0.0/script.js' },
        { src: 'https://www.wildberries.ru/js-templates/2.0.0/script.js' },
    ],
    writable: true,
};
Object.defineProperty(document, 'scripts', scriptsObject);

describe('getXinfoInScripts', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('xinfo from server', async () => {
        const mockResponse = { xinfo: 'mock-xinfo' };
        global.fetch = jest.fn().mockResolvedValue({ json: jest.fn().mockResolvedValue(mockResponse) });

        const result = await getXinfoInScripts();
        expect(result).toBe('mock-xinfo');
        expect(fetch).toHaveBeenCalledWith(
            fetchPath,
            fetchObject,
        );
    });

    test('empty string if no xinfo in fetch-data', async () => {
        global.fetch = jest.fn().mockResolvedValue({ json: jest.fn().mockResolvedValue({}) });

        const result = await getXinfoInScripts();
        expect(fetch).toHaveBeenCalledWith(
            fetchPath,
            fetchObject,
        );
        expect(result).toBe(null);
    });

    test('null if fetch fails', async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error('Fetch error'));

        const result = await getXinfoInScripts();
        expect(result).toBe(null);
    });
});
