import { getPartFromText } from '../../helpers/helpers';

export const getProductId = (): string => {
    return getPartFromText(
        window.location.pathname,
        '/catalog/',
        '/detail.aspx',
        'Unable to get product id',
    );
};

export const getXinfoInScripts = async (): Promise<string | null> => {
    const spaVersionScript = Array.prototype.find.call(document.scripts, script => {
        const templates = script.src?.match(/\/js-templates.+/g);
        if (templates) {
            return templates[0].match(/\d+\.\d+\.\d+/)[0];
        }
    });

    const spaVersion = spaVersionScript?.src?.match(/\d+\.\d+\.\d+/)?.[0] || null;
    if (spaVersion) {
        return fetch('https://www.wildberries.ru/webapi/user/get-xinfo-v2', {
            method: 'POST',
            headers: { 'X-Requested-With': 'XMLHttpRequest', 'X-Spa-Version': spaVersion },
        }).then(r => r.json())
            .then(d => d?.xinfo || '')
            .catch(err => {
                console.error(err);

                return null;
            });
    } else {
        return null;
    }
};

export const getXinfo = async (): Promise<string> => {
    const dataEntry = Object.entries(localStorage).find(([key]) => key.match(/geo-data-v1.*/g));
    const data = dataEntry?.[1] || null;
    let xinfo;
    if (data) {
        try {
            const parsedData = JSON.parse(data);
            xinfo = parsedData?.data?.xinfo;
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

        return '';
    }
};

export const getProducts = async (
    id: string,
    xinfo: string,
) => {
    const productCardUrl = `https://card.wb.ru/cards/detail?${xinfo}&nm=${id}`;

    return fetch(productCardUrl)
        .then(r => r.json())
        .then(d => d?.data?.products || null);
};
