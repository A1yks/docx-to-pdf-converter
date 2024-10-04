import { FilesTable } from '../FilesTable';
import { FilesSelect } from '../FilesSelect';
import { useFiles } from '@/hooks/useFiles';

export function FilesManager() {
    const { files, loaded } = useFiles();
    const hasFiles = loaded && files.length > 0;

    return hasFiles ? <FilesTable /> : <FilesSelect />;
}
