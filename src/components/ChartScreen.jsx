import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getExchangeRate } from '../services/currencyApi';

const ChartScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [exchangeRate, pibRes, populacaoRes] = await Promise.all([
          getExchangeRate(),
          fetch('https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/2002|2003|2004|2005|2006|2007|2008|2009|2010|2011|2012|2013|2014|2015|2016|2017|2018|2019|2020|2021/variaveis/37?localidades=N1[all]'),
          fetch('https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/2001|2002|2003|2004|2005|2006|2008|2009|2011|2012|2013|2014|2015|2016|2017|2018|2019|2020|2021|2024/variaveis/9324?localidades=N1[all]')

        ]);

        const pibData = await pibRes.json();
        const populacaoData = await populacaoRes.json();

        // Processar dados do PIB
        const pibSeries = pibData[0].resultados[0].series[0].serie;
        
        // Processar dados de população
        const populacaoSeries = populacaoData[0].resultados[0].series[0].serie;

        // Criar estrutura de dados combinada
        const mergedData = Object.keys(pibSeries)
          .map(year => {
            const pibTotalBRL = parseFloat(pibSeries[year]) * 1000; // Converter para Reais
            const populacao = parseFloat(populacaoSeries[year] || populacaoSeries[+year+1]); // Usar próximo ano se necessário
            
            return {
              year,
              pibTotal: (pibTotalBRL / exchangeRate) / 1e9, // Em bilhões de USD
              pibPerCapita: (pibTotalBRL / populacao) / exchangeRate // Em USD
            };
          })
          .filter(item => !isNaN(item.pibPerCapita));

        setData(mergedData);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
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
            <Tooltip 
              formatter={(value) => `$${value.toFixed(2)} ${value > 1000 ? 'bi' : ''}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="pibTotal" 
              stroke="#8884d8" 
              name="PIB Total (bi USD)" 
            />
            <Line 
              type="monotone" 
              dataKey="pibPerCapita" 
              stroke="#82ca9d" 
              name="PIB per capita (USD)" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartScreen;