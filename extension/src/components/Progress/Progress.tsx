import styles from './Progress.module.scss';
import c from 'clsx';

export type ProgressProps = {
    value: number;
};

export function Progress({ value }: ProgressProps) {
    const roundedValue = Math.floor(value);

    return (
        <div className={styles.progress}>
            <div className={c(styles.label, styles.labelBack)}>{roundedValue}%</div>
            <div className={c(styles.label, styles.labelFront)} style={{ clipPath: `inset(0 0 0 ${roundedValue}%)` }}>
                {roundedValue}%
            </div>
        </div>
    );
}
