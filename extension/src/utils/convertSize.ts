const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const thresh = 1024;

export function convertSize(bytes: number, decimalPlaces = 1) {
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }

    let u = -1;
    const r = 10 ** decimalPlaces;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

    return bytes.toFixed(decimalPlaces) + ' ' + units[u];
}
