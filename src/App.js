import styles from './styles/App.module.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './common/Navbar';
import Home from './pages/Home';

const App = () => {
    return (
        <div className={`${styles.App}`}>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;
