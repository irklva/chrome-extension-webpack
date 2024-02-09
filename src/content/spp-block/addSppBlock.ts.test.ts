import { BlockPosition, wbPriceBlockKeyAside, wbPriceBlockKeyCommon, wbTargetSppClass } from '../constants/constants';
import { unblAddSppBlock } from '../constants/errors';
import { addElement } from '../helpers/page-elements/add-elements/addElement';
import { addSppBlock } from './addSppBlock';
import { getSppData } from './spp-data/getSppData';

jest.mock('./spp-data/getSppData');
const mockGetSppData = getSppData as jest.MockedFunction<typeof getSppData>;

jest.mock('../helpers/page-elements/add-elements/addElement');
const addElementMock = addElement as jest.MockedFunction<typeof addElement>;

const productCard = {
    extended: {
        clientSale: 50,
        basicPriceU: 10000,
    },
};
const sppData = {
    sppString: '50',
    beforeSppString: '100',
};

const someError = 'some-error';

describe('addSppBlock', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    test('spp block with correct data', async () => {
        mockGetSppData.mockReturnValueOnce(sppData);

        await addSppBlock(productCard);
        expect(getSppData).toHaveBeenCalledWith(productCard);
        expect(addElementMock).toHaveBeenCalledWith(
            wbPriceBlockKeyAside,
            wbTargetSppClass,
            expect.any(String),
            BlockPosition.AFTER,
        );
        expect(addElementMock).toHaveBeenCalledWith(
            wbPriceBlockKeyCommon,
            wbTargetSppClass,
            expect.any(String),
            BlockPosition.CHILD,
        );
    });

    test('error if error in addElement', async () => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
        mockGetSppData.mockReturnValueOnce(sppData);
        addElementMock.mockRejectedValue(someError);

        await expect(addSppBlock(productCard)).rejects.toThrow(unblAddSppBlock);
        expect(console.error).toHaveBeenCalledWith(someError);
        expect(getSppData).toHaveBeenCalledWith(productCard);
        expect(addElementMock).toHaveBeenCalledTimes(2);
    });
});
