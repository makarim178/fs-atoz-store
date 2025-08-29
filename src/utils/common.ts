import { DEFAULT_THROTTLE_DELAY } from '@/constants/globalConstants'

export function throttle<T extends (...args: any) => any>(callback: T, delay = DEFAULT_THROTTLE_DELAY): (...args: Parameters<T>) => void {
    let lastExecution = 0;

    return function (...args: Parameters<T>) {
        const now = Date.now();
        if (now - lastExecution < delay) return;

        lastExecution = now;
        callback(...args);
    };
}