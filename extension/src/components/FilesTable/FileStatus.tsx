import QuestionMark from '@/images/qm.svg?react';
import { Button } from '../Button';
import Download from '@/images/download.svg?react';
import { Progress } from '../Progress';
import { useFilesAPI } from '@/hooks/useFilesAPI';
import Triangle from '@/images/triangle.svg?react';
import styles from './FileStatus.module.scss';
import tableStyles from './FilesTable.module.scss';
import { FileData } from '@/types/files';

export function FileStatus({ id, status, progress, error }: Pick<FileData, 'id' | 'status' | 'progress' | 'error'>) {
    const { downloadFile } = useFilesAPI();

    function positionTooltip(tooltip: HTMLDivElement | null) {
        if (!tooltip) return;

        const element = document.querySelector<HTMLDivElement>(`.${tableStyles.simpleBar}`)!;
        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        if (rect.top > tooltipRect.height && rect.height > tooltipRect.bottom) {
            tooltip.classList.add(styles.tooltipBottom);
        } else {
            tooltip.classList.remove(styles.tooltipBottom);
        }
    }

    if (status === 'failed') {
        return (
            <div className={styles.failed}>
                <span>Failed</span>
                <QuestionMark className={styles.qm} />
                <div className={styles.tooltip} ref={positionTooltip}>
                    <Triangle className={styles.triangle} />
                    <span>{error || 'Unexpected error'}</span>
                </div>
            </div>
        );
    }

    if (status === 'uploaded') {
        return (
            <Button variant="success" className={styles.downloadBtn} onClick={() => downloadFile(id)}>
                <span>Download</span>
                <Download fill="#41ba55" width={12} height={12} />
            </Button>
        );
    }

    if (status === 'uploading') {
        return <Progress value={progress} />;
    }
}
