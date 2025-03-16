export const fetchPIBData = async (variableId) => {
  const response = await fetch(
    `https://servicodados.ibge.gov.br/api/v3/agregados/1846/variaveis/${variableId}?localidades=BR`
  );
  const data = await response.json();

  return Object.entries(data[0].resultados[0].series['0'].serie)
    .map(([year, value]) => ({
      year: parseInt(year),
      value: parseFloat(value)
    }))
    .filter(item => !isNaN(item.value));
};