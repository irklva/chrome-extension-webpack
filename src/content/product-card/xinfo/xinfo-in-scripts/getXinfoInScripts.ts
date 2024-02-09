import { noSpaVersion } from '../../../constants/errors';

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
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-Spa-Version': spaVersion,
            },
        })
            .then(r => r.json())
            .then(d => d?.xinfo || null)
            .catch(err => {
                console.error(err);

                return null;
            });
    } else {
        console.error(noSpaVersion);

        return null;
    }
};
