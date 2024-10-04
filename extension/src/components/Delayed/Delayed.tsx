import { useEffect, useState } from 'react';

export type DelayedProps = {
    children: React.ReactNode;
    placeholder?: React.ReactNode;
    delay: number;
};

export function Delayed({ children, delay, placeholder = null }: DelayedProps) {
    const [isShown, setIsShown] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsShown(true);
        }, delay);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [delay]);

    return isShown ? <>{children}</> : placeholder;
}
