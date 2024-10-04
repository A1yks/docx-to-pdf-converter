import styles from './FilesSelect.module.scss';
import { Button } from '../Button';
import Upload from '@/images/upload.svg?react';
import { supportedTypes, useFilesAPI } from '@/hooks/useFilesAPI';
import { FileUploader } from 'react-drag-drop-files';

export function FilesSelect() {
    const { uploadFiles } = useFilesAPI();

    return (
        <FileUploader multiple disabled handleChange={uploadFiles} name="file" types={supportedTypes} classes={styles.main}>
            <div className={styles.content}>
                <Button className={styles.button} onClick={() => uploadFiles()}>
                    <span>Select files</span>
                    <Upload />
                </Button>
                <span className={styles.text}>or drop files here</span>
            </div>
        </FileUploader>
    );
}
