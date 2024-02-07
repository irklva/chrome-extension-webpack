export const selectElement = async (
    key: string,
    time = 5000,
) => {
    return new Promise<NodeListOf<Element>>((resolve, reject) => {
        let selectedElements = document.querySelectorAll(key);
        if (selectedElements?.length) {
            resolve(selectedElements);
        } else {
            const observer = new MutationObserver((mutations, currentObserver) => {
                selectedElements = document.querySelectorAll(key);
                if (selectedElements?.length) {
                    if (timeout) {
                        clearTimeout(timeout);
                    }
                    currentObserver.disconnect();

                    resolve(selectedElements);
                }
            });
            const timeout = setTimeout(() => {
                observer.disconnect();
                reject(new Error(`Timeout: Unable to find the element "${key}" within the specified time`));
            }, time);
            observer.observe(document.body, { childList: true, subtree: true });
        }
    });
};
