import { memo } from 'react';
import styles from './FilesTable.module.scss';
import { convertSize } from '@/utils/convertSize';
import c from 'clsx';
import { FileData } from '@/types/files';
import { FileStatus } from './FileStatus';
import Cross from '@/images/cross.svg?react';
import { useFilesAPI } from '@/hooks/useFilesAPI';

export type FileInfoProps = { index: number } & FileData;

function FileInfoComponent({ id, index, name, size, status, progress, error }: FileInfoProps) {
    const { removeFile } = useFilesAPI();

    return (
        <div key={id} className={c(styles.row, styles.body)}>
            <div className={styles.cell}>{index + 1}</div>
            <div className={styles.cell} title={name}>
                {name}
            </div>
            <div className={styles.cell}>{convertSize(size)}</div>
            <div className={styles.cell}>
                <FileStatus id={id} status={status} progress={progress} error={error} />
            </div>
            {status !== 'uploading' && (
                <div className={c(styles.cell, styles.removeFileCell)} title="Remove file">
                    <Cross className={styles.cross} onClick={() => removeFile(id)} />
                </div>
            )}
        </div>
    );
}

export const FileInfo = memo(FileInfoComponent);
