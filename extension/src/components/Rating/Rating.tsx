import { Rating as StarsRating } from 'react-simple-star-rating';
import Star from '@/images/star.svg?react';
import FilledStar from '@/images/filled-star.svg?react';
import styles from './Rating.module.scss';
import c from 'clsx';

export type RatingProps = {
    allowFraction?: boolean;
    iconSize?: number;
    className?: string;
    iconClassName?: string;
    filledIconClassName?: string;
    defaultIconClassName?: string;
    iconsContainerClassName?: string;
    onRateClick?: (value: number) => void;
};

export function Rating({
    allowFraction,
    iconSize = 24,
    className,
    iconClassName,
    filledIconClassName,
    defaultIconClassName,
    iconsContainerClassName,
    onRateClick,
}: RatingProps) {
    return (
        <StarsRating
            allowFraction={allowFraction}
            fillIcon={<FilledStar width={iconSize} height={iconSize} className={c(styles.starIcon, iconClassName, filledIconClassName)} />}
            emptyIcon={
                <Star width={iconSize} height={iconSize} className={c(styles.starIcon, iconClassName, styles.defaultIcon, defaultIconClassName)} />
            }
            onClick={(value) => {
                if (value > 3) {
                    chrome.tabs.create({ url: import.meta.env.VITE_EXTENSION_URL });
                } else {
                    chrome.tabs.create({ url: import.meta.env.VITE_SURVEY_URL });
                }

                onRateClick?.(value);
            }}
            className={className}
            emptyClassName={iconsContainerClassName}
            fillClassName={iconsContainerClassName}
            size={iconSize}
        />
    );
}
