import { getXinfoInScripts } from '../get-xinfo-in-scripts/getXinfoInScripts';
import { getXinfo } from './getXinfo';

jest.mock('../get-xinfo-in-scripts/getXinfoInScripts');
const mockXinfoInScripts = getXinfoInScripts as jest.MockedFunction<typeof getXinfoInScripts>;

const mockXinfo = 'mock-xinfo';

describe('getXinfo', () => {

    beforeEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
        localStorage.clear();
    });

    test('xinfo from localStorage', async () => {
        localStorage.setItem('geo-data-v1', JSON.stringify({ data: { xinfo: mockXinfo } }));

        const result = await getXinfo();
        expect(result).toBe(mockXinfo);
    });

    test('xinfo from getXinfoInScripts if localStorage data is invalid', async () => {
        mockXinfoInScripts.mockResolvedValueOnce(mockXinfo);
        localStorage.setItem('geo-data-v1', 'invalid JSON');

        const result = await getXinfo();
        expect(result).toBe(mockXinfo);
    });

    test('xinfo from getXinfoInScripts if no xinfo in localStorage JSON', async () => {
        mockXinfoInScripts.mockResolvedValueOnce(mockXinfo);
        localStorage.setItem('geo-data-v1', JSON.stringify({}));

        const result = await getXinfo();
        expect(result).toBe(mockXinfo);
    });

    test('xinfo from getXinfoInScripts if no localStorage data', async () => {
        mockXinfoInScripts.mockResolvedValueOnce(mockXinfo);

        const result = await getXinfo();
        expect(result).toBe(mockXinfo);
    });

    test('error if no xinfo in getXinfoInScripts and ', async () => {
        mockXinfoInScripts.mockResolvedValueOnce(null);

        await expect(getXinfo()).rejects.toThrowError('Unable to get xinfo');
    });
});
