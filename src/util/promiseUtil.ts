export function delay(duration: number = 100) {
    return new Promise((res) => {
        setTimeout(() => {
            res();
        }, duration);
    });
}