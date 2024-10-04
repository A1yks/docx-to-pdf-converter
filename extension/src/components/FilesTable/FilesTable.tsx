import c from 'clsx';
import styles from './FilesTable.module.scss';
import { Button } from '../Button';
import Upload from '@/images/upload.svg?react';
import Download from '@/images/download.svg?react';
import SimpleBar from 'simplebar-react';
import { useFiles } from '@/hooks/useFiles';
import { FileInfo } from './FileInfo';
import { useFilesAPI } from '@/hooks/useFilesAPI';

export function FilesTable() {
    const { files } = useFiles();
    const { uploadFiles, downloadFile } = useFilesAPI();

    function downloadAll() {
        files.forEach((file) => {
            if (file.status === 'uploaded') {
                downloadFile(file.id);
            }
        });
    }

    return (
        <div className={styles.main}>
            <div className={styles.table}>
                <SimpleBar className={styles.simpleBar}>
                    <div className={c(styles.row, styles.header)}>
                        <div className={styles.cell}>№</div>
                        <div className={styles.cell}>Name file</div>
                        <div className={styles.cell}>Size</div>
                        <div className={styles.cell}>Status</div>
                    </div>
                    {files.map((file, index) => (
                        <FileInfo key={file.id} {...file} index={index} />
                    ))}
                </SimpleBar>
            </div>
            <div className={styles.actions}>
                <Button className={styles.button} onClick={() => uploadFiles()}>
                    <span>Convert More</span>
                    <Upload className={styles.btnIcon} />
                </Button>
                <Button variant="secondary" className={styles.button} onClick={downloadAll}>
                    <span>Download all</span>
                    <Download className={styles.btnIcon} />
                </Button>
            </div>
        </div>
    );
}
