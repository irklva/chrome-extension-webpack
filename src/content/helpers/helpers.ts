import type { AlertsType } from '../types/types';

export const getPartFromText = (
    path: string,
    start: string,
    end: string,
    errorMessage: string,
): string => {
    const startIndex = path.indexOf(start);
    const endIndex = path.lastIndexOf(end);
    if (path.includes(start) &&
        path.includes(end) &&
        startIndex + start.length < endIndex
    ) {
        return (path.substring(path.indexOf(start) + start.length, path.lastIndexOf(end)));
    } else {
        throw new Error(errorMessage);
    }
};

export const alertError = (
    text: string,
    newAlert: AlertsType,
    stopAlert: AlertsType,
): AlertsType => {
    if (!stopAlert && newAlert) {
        alert(text);

        return true;
    }

    return false;
};
