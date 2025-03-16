import { useEffect, useState } from 'react';
import { fetchPIBData } from '../services/ibgeApi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartScreen = () => {
  
  const [data, setData] = useState([]);
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
        }));
        
        setData(mergedData);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) return <div className="loading">Carregando...</div>;

  return (
    <div className="chart-container">
      <h1>Evolução do PIB</h1>
      <div style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="pibTotal" 
              stroke="#8884d8" 
              name="PIB Total" 
            />
            <Line 
              type="monotone" 
              dataKey="pibPerCapita" 
              stroke="#82ca9d" 
              name="PIB per capita" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartScreen;