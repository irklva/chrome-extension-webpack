import { unblGetXinfo } from '../../constants/errors';
import { getXinfo } from './getXinfo';
import { getXinfoInScripts } from './xinfo-in-scripts/getXinfoInScripts';

jest.mock('./xinfo-in-scripts/getXinfoInScripts');
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
        mockXinfoInScripts.mockResolvedValueOnce('');

        const result = await getXinfo();
        expect(result).toBe('');
    });

    test('error if no xinfo in getXinfoInScripts and localStorage', async () => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
        mockXinfoInScripts.mockResolvedValueOnce(null);

        const result = await getXinfo();
        expect(result).toBe('');
        expect(console.error).toHaveBeenCalledWith(unblGetXinfo);
    });
});
