import Logo from '@/images/logo.svg?react';
import styles from './Header.module.scss';

export type HeaderProps = {
    title: string;
};

export function Header({ title }: HeaderProps) {
    return (
        <div className={styles.header}>
            <Logo width={26} height={26} />
            <span className={styles.title}>{title}</span>
        </div>
    );
}
