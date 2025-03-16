// export const fetchPIBData = async (variableId) => {
//   const periodos = '2011|2012|2013|2014|2015|2016|2017|2018|2019|2020|2021';
//   const response = await fetch(
//     `https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/${periodos}/variaveis/${variableId}?localidades=N1[all]`
//   );
//   const data = await response.json();

//   return Object.entries(data[0].resultados[0].series['0'].serie)
//     .map(([year, value]) => ({
//       year: parseInt(year),
//       value: parseFloat(value.replace(',', '.'))
//     }))
//     .filter(item => !isNaN(item.value));
// };
