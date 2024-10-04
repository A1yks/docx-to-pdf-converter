import c from 'clsx';
import styles from './Button.module.scss';
import { ReactNode, useState } from 'react';

export type ButtonProps = {
    variant?: 'primary' | 'secondary' | 'success';
    tooltip?: ReactNode;
    tooltipTimeout?: number;
    wrapperClassName?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant = 'primary', tooltip, tooltipTimeout = 1000, wrapperClassName, className, onClick, ...buttonProps }: ButtonProps) {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        if (tooltip !== undefined) {
            setIsTooltipVisible(true);

            setTimeout(() => {
                setIsTooltipVisible(false);
            }, tooltipTimeout);
        }

        onClick?.(e);
    }

    return (
        <div className={c(styles.buttonWrapper, wrapperClassName)}>
            <button className={c(styles.button, styles[variant], className)} onClick={handleClick} {...buttonProps} />
            {tooltip && isTooltipVisible && <div className={styles.tooltip}>{tooltip}</div>}
        </div>
    );
}
