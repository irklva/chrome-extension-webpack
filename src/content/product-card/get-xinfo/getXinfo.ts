import { getXinfoInScripts } from '../get-xinfo-in-scripts/getXinfoInScripts';

export const getXinfo = async (): Promise<string> => {
    const dataEntry = Object.entries(localStorage)
        .find(([key]) => key.match(/geo-data-v1.*/g));
    const data = dataEntry?.[1] || null;
    let xinfo;
    if (data) {
        try {
            const parsedData = JSON.parse(data);
            xinfo = parsedData?.data?.xinfo;
            if (!xinfo) {
                throw new Error('No xinfo in localStorage JSON');
            }
        } catch (err) {
            console.error(err);
            xinfo = await getXinfoInScripts();
        }
    } else {
        xinfo = await getXinfoInScripts();
    }
    if (xinfo) {
        return xinfo;
    } else {
        throw new Error('Unable to get xinfo');
    }
};
