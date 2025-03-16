import { useEffect, useState } from 'react';
import Pagination from './Pagination.jsx';
import { getExchangeRate } from '../services/currencyApi';

const TableScreen = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
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

        const pibSeries = pibData[0].resultados[0].series[0].serie;
        const populacaoSeries = populacaoData[0].resultados[0].series[0].serie;

        const mergedData = Object.keys(pibSeries)
          .map(year => {
            const pibTotalBRL = parseFloat(pibSeries[year]) * 1000;
            const populacao = parseFloat(populacaoSeries[year] || populacaoSeries[+year+1]);
            
            return {
              year,
              pibTotal: (pibTotalBRL / exchangeRate),
              pibPerCapita: (pibTotalBRL / populacao) / exchangeRate
            };
          })
          .filter(item => !isNaN(item.pibPerCapita))
          .sort((a, b) => a.year - b.year);

        setData(mergedData);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const formatCurrency = (value, isPerCapita = false) => {
    const options = {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: isPerCapita ? 0 : 0,
      notation: 'compact',
      compactDisplay: 'short'
    };

    return new Intl.NumberFormat('en-US', options).format(value);
  };

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
                <td>{formatCurrency(item.pibPerCapita, true)}</td>
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