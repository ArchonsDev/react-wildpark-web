import styles from './styles/App.module.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './common/Navbar';

const App = () => {
  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;
