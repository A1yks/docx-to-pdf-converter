import { Header } from './components/Header';
import styles from './App.module.scss';
import { RateUs } from './components/RateUs';
import { FilesManager } from './components/FilesManager';

function App() {
    return (
        <div className={styles.content}>
            <Header title="DOCX to PDF Сonverter" />
            <div className={styles.filesManager}>
                <FilesManager />
            </div>
            <div className="divider" />
            <RateUs />
        </div>
    );
}

export default App;
