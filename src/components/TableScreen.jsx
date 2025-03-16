// components/TableScreen.jsx
import { useEffect, useState } from 'react';
import { fetchPIBData } from '../services/ibgeApi';
import Pagination from './Pagination.jsx';

const TableScreen = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [total, perCapita] = await Promise.all([
          fetchPIBData(98),
          fetchPIBData(99)
        ]);
        
        const mergedData = total.map((item, index) => ({
          year: item.year,
          pibTotal: item.value,
          pibPerCapita: perCapita[index].value
        })).sort((a, b) => a.year - b.year);
        
        setData(mergedData);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const formatCurrency = (value) => 
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0 
    }).format(value);

  if (loading) return <div className="loading">Carregando...</div>;

  return (
    <div className="table-container">
      <h1>Tabela de PIB por Ano</h1>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Ano</th>
              <th>PIB Total</th>
              <th>PIB per capita</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.year}>
                <td>{item.year}</td>
                <td>{formatCurrency(item.pibTotal)}</td>
                <td>{formatCurrency(item.pibPerCapita)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
        currentPage={currentPage}
        paginate={setCurrentPage}
      />
    </div>
  );
};

export default TableScreen;