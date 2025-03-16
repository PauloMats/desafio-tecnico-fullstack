export const getExchangeRate = async () => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL');
      const data = await response.json();
      return parseFloat(data.USDBRL.ask);
    } catch (error) {
      console.error('Erro ao obter cotação:', error);
      return 5.0;
    }
  };