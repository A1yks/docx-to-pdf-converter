import c from 'clsx';
import styles from './RateUs.module.scss';
import FilledStar from '@/images/filled-star.svg?react';
import { useState } from 'react';
import { Rating } from '../Rating';

export function RateUs() {
    const [starsVisible, setStarsVisible] = useState(false);

    return (
        <div className={styles.rateUs}>
            <div className={c(styles.rateText, { [styles.active]: starsVisible })} onClick={() => setStarsVisible((v) => !v)}>
                <span>Rate us</span>
                <FilledStar width={15} height={15} />
            </div>
            {starsVisible && (
                <div className={styles.rating}>
                    <Rating allowFraction iconClassName={styles.starIcon} iconSize={28} />
                </div>
            )}
        </div>
    );
}
