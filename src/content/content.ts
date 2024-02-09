import { alertError } from './helpers/helpers';
import { removeElement } from './helpers/page-elements/removeElement';
import { getProductCard } from './product-card/getProductCard';
import { addSppBlock } from './spp-block/addSppBlock';
import { addStocksBlock } from './stocks-block/add-block/addStocksBlock';
import { getStocksList } from './stocks-block/getStocksList';
import { getStocks } from './stocks-block/stocks/getStocks';
import './content.scss';

(async () => {

    let newAlert = false;
    let stopAlert = false;
    const alertText = 'Блоки Market-helper могут отображаться некорректно. Попробуйте перезагрузить страницу.';

    const stocksList = await getStocksList();

    const catchError = (err: string) => {
        console.error(err);
        newAlert = true;
    };

    const urlPattern = /\/catalog\/\d+\/detail/;
    let lastUrl = '';
    let deleting = false;
    const observer = new MutationObserver(async () => {
        const currentUrl = window.location.pathname;
        if (urlPattern.test(currentUrl) && currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            if (deleting) {
                await removeElement('.market-helper.spp-block').catch(err => catchError(err));
                await removeElement('.market-helper.base-section.stocks-block').catch(err => catchError(err));
                deleting = false;
            }
            const productCard = await getProductCard().catch(err => catchError(err));
            const stocks = getStocks(productCard, stocksList);
            if (stocks?.length) {
                await addStocksBlock(productCard, stocks, stocksList).catch(err => catchError(err));
            }
            await addSppBlock(productCard).catch(err => catchError(err));
            deleting = true;
            stopAlert = alertError(alertText, newAlert, stopAlert);
            newAlert = false;
        }
    });
    observer.observe(document, { childList: true, subtree: true });
})();
