# Análise do PIB Brasileiro - Dashboard em React 📊

Aplicação web para visualização da evolução do Produto Interno Bruto (PIB) do Brasil em dólares americanos (USD), utilizando dados oficiais do IBGE com conversão monetária em tempo real.

# Demonstração em Vídeo
<video controls src="public/Vídeo demonstrativo IBGE PIB.mp4" title="Video Demonstrativo"></video>

# 🛠 Tecnologias Utilizadas
## Tecnologia	Finalidade
React - 	Framework principal
Recharts - 	Visualização de gráficos
React Router - 	Navegação entre telas
AwesomeAPI - 	Cotação dólar em tempo real
IBGE API -	Dados econômicos oficiais

# ✨ Funcionalidades Principais

## 📈 Tela de Gráfico
- Visualização temporal do PIB Total e per capita
- Gráfico interativo com tooltips detalhados
- Eixos dinâmicos com auto-ajuste
- Dados em bilhões de USD (PIB Total) e USD (per capita)

## 📊 Tela de Tabela
- Listagem histórica com paginação
- Ordenação por ano
- Formatação monetária inteligente
- Design responsivo para mobile

## 🌓 Tema Dark/Light
- Troca dinâmica de temas
- Persistência no localStorage
- Cores adaptativas para gráficos e tabelas
- Transições suaves entre temas

## 💱 Conversão em Tempo Real
- Atualização diária da cotação do dólar
- Fallback para última cotação conhecida
- Cache de 1 hora para otimização

# 🧮 Cálculos Implementados
## PIB per capita

PIB_{per\ capita} = \frac{PIB_{Total\ BRL}}{População} \div Taxa_{Câmbio}
Conversão para USD

PIB_{USD} = \frac{PIB_{BRL}}{Taxa_{Câmbio}}

- Onde:

PIB Total BRL: Valores obtidos da API do IBGE (em mil reais × 1000)
População: Dados demográficos do IBGE (série 9324)
Taxa Câmbio: Cotação USD-BRL da AwesomeAPI (atualizada diariamente)

# 📡 Documentação das APIs
## IBGE - Dados Econômicos

GET /api/v3/agregados/5938/periodos/{anos}/variaveis/37
5938: Agregado do Sistema de Contas Nacionais

37: Variável do PIB a preços correntes

## AwesomeAPI - Câmbio

GET https://economia.awesomeapi.com.br/json/last/USD-BRL
Retorna a cotação atual com atualizações em tempo real

Limite: 100 requisições/dia (free tier)

## 🎨 Sistema de Temas
- Variáveis CSS
```css
:root {
  --primary-color: #2c3e50;
  --background-color: #ffffff;
  --text-color: #333333;
}

[data-theme="dark"] {
  --primary-color: #3498db;
  --background-color: #1a1a1a;
  --text-color: #ffffff;
}
```

# Funcionalidades
- Toggle com ícone dinâmico (☀️/🌙)
- Armazenamento local das preferências
- Aplicação imediata sem refresh
- Compatível com todos componentes

---

## 📥 Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/pib-analysis.git
cd pib-analysis
```

# Instale as dependências

```bash
Copy
npm install
```

# Inicie a aplicação
 
```bash
Copy
npm start
```
---

## 🚀 Roadmap

- [ ] Implementar cache local para dados da API
- [ ] Adicionar comparação histórica
- [ ] Criar modo de exportação de dados (CSV/Excel)
- [ ] Implementar testes E2E com Cypress
- [ ] Adicionar visualização por regiões do Brasil

## ⚠️ Limitações Conhecidas

- Dados populacionais com lacunas temporais
- Atualização do PIB com delay de 2 anos
- Precisão limitada pela taxa de câmbio diária
- Limitação de requisições na API free tier

---
