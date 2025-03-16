import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ChartScreen from './components/ChartScreen';
import TableScreen from './components/TableScreen';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };
  
  return (
    <Router>
      <nav>
        <Link to="/">Gráfico</Link>
        <Link to="/tabela">Tabela</Link>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </nav>
      
      <Routes>
        <Route path="/" element={<ChartScreen />} />
        <Route path="/tabela" element={<TableScreen />} />
      </Routes>
    </Router>
  );
}

export default App;