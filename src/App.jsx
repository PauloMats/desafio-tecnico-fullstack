import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ChartScreen from './components/ChartScreen';
import TableScreen from './components/TableScreen';
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Gráfico</Link>
        <Link to="/tabela">Tabela</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<ChartScreen />} />
        <Route path="/tabela" element={<TableScreen />} />
      </Routes>
    </Router>
  );
}

export default App;