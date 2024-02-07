import { alertError } from './helpers/helpers';
import { removeElement } from './helpers/page-elements/removeElement';
import { getProductCard } from './product-card/getProductCard';
import { addSppBlock } from './spp-block/addSppBlock';
import { addStocksBlock } from './stocks-block/addStocksBlock';
import { getStocks } from './stocks-block/getStocks';
import { getStocksNames } from './stocks-block/getStocksNames';
import './content.scss';

(async () => {

    let newAlert = false;
    let stopAlert = false;
    const alertText = 'Блоки Market-helper могут отображаться некорректно. Попробуйте перезагрузить страницу.';

    const stocksList = await getStocksNames();

    const urlPattern = /\/catalog\/\d+\/detail/;
    let lastUrl = '';
    let deleting = false;
    const observer = new MutationObserver(async () => {
        const currentUrl = window.location.pathname;
        if (urlPattern.test(currentUrl) && currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            if (deleting) {
                await Promise.all([
                    removeElement('.market-helper.spp-block'),
                    removeElement('.market-helper.base-section.stocks-block'),
                ]).catch(err => {
                    console.error(err);
                    newAlert = true;
                });
                deleting = false;
            }
            try {
                const productCard = await getProductCard();
                const stocks = getStocks(productCard, stocksList);
                const sppBlockPromise = addSppBlock(productCard);
                if (stocks?.length) {
                    const stocksBlockPromise = addStocksBlock(productCard, stocks, stocksList);
                    await Promise.all([sppBlockPromise, stocksBlockPromise]);
                } else {
                    await sppBlockPromise;
                }
            } catch (err) {
                console.error(err);
                newAlert = true;
            }
            deleting = true;
            stopAlert = alertError(alertText, newAlert, stopAlert);
            newAlert = false;
        }
    });
    observer.observe(document, { childList: true, subtree: true });
})();
