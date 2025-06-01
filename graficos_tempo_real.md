# Implementação de Gráficos em Tempo Real com Alertas Visuais

## Estrutura dos Gráficos

### Gráficos Principais
- **Painel de Índices de Mercado**
  - IBOVESPA
  - CDI
  - SELIC
  - Dólar
  - Euro
  - Bitcoin

- **Gráfico de Desempenho das Aplicações**
  - Comparativo entre diferentes tipos de aplicações
  - Rentabilidade acumulada nos últimos períodos (1 mês, 3 meses, 6 meses, 1 ano)
  - Projeção futura baseada em tendências

- **Mapa de Calor de Oportunidades**
  - Visualização em grid colorido (verde ao vermelho)
  - Cruzamento entre risco e retorno
  - Tamanho dos elementos proporcional ao volume de negociação

## Sistema de Alertas Visuais

### Componentes de Alerta
- **Botão de Alerta Verde**
  - Animação pulsante suave
  - Ícone de seta para cima
  - Tooltip com detalhes da recomendação
  - Destaque visual na tabela de aplicações

- **Botão de Alerta Vermelho**
  - Animação pulsante mais intensa
  - Ícone de seta para baixo
  - Tooltip com motivos para evitar
  - Destaque visual na tabela de aplicações

### Algoritmo de Recomendação
```javascript
// Classe para gerenciamento de alertas
class AlertaManager {
  constructor(dadosMercado, aplicacoes) {
    this.dadosMercado = dadosMercado;
    this.aplicacoes = aplicacoes;
    this.historicoAlertas = [];
    this.ultimaAtualizacao = new Date();
  }
  
  // Atualiza dados de mercado
  atualizarDados(novosDados) {
    this.dadosMercado = { ...this.dadosMercado, ...novosDados };
    this.ultimaAtualizacao = new Date();
    this.processarAlertas();
  }
  
  // Processa e gera alertas baseados nos dados atuais
  processarAlertas() {
    const alertas = {
      recomendados: [],
      naoRecomendados: [],
      timestamp: this.ultimaAtualizacao
    };
    
    // Análise de tendências de curto prazo
    const tendenciaCurto = this.analisarTendenciaCurtoPrazo();
    
    // Análise de volatilidade recente
    const volatilidade = this.calcularVolatilidadeRecente();
    
    // Análise de correlação com índices principais
    const correlacoes = this.calcularCorrelacoes();
    
    // Para cada aplicação, calcular score de recomendação
    this.aplicacoes.forEach(app => {
      const score = this.calcularScoreAplicacao(app, tendenciaCurto, volatilidade, correlacoes);
      
      // Determinar se é recomendado ou não
      if (score > 75) { // Threshold para recomendação forte
        alertas.recomendados.push({
          id: app.id,
          nome: app.nome,
          tipo: app.tipo,
          score: score,
          motivos: this.gerarMotivosRecomendacao(app, score),
          tendencia: "alta"
        });
      } else if (score < 30) { // Threshold para não recomendação
        alertas.naoRecomendados.push({
          id: app.id,
          nome: app.nome,
          tipo: app.tipo,
          score: score,
          motivos: this.gerarMotivosNaoRecomendacao(app, score),
          tendencia: "baixa"
        });
      }
    });
    
    // Registrar no histórico para análise de tendências
    this.historicoAlertas.push(alertas);
    if (this.historicoAlertas.length > 100) {
      this.historicoAlertas.shift(); // Manter apenas os 100 mais recentes
    }
    
    // Disparar evento de atualização
    this.dispararEventoAtualizacao(alertas);
    
    return alertas;
  }
  
  // Calcula score de recomendação para uma aplicação
  calcularScoreAplicacao(app, tendenciaCurto, volatilidade, correlacoes) {
    let score = 50; // Começa neutro
    
    // Fator 1: Rentabilidade vs benchmark (CDI ou IBOVESPA dependendo do tipo)
    const benchmark = app.tipo === 'renda_variavel' ? 
      this.dadosMercado.ibovespa.variacao : 
      this.dadosMercado.cdi.taxa;
    
    const rentabilidadeRelativa = (app.rentabilidade / benchmark) * 100;
    
    // Ajusta score baseado na rentabilidade relativa
    if (rentabilidadeRelativa > 120) score += 20;
    else if (rentabilidadeRelativa > 110) score += 15;
    else if (rentabilidadeRelativa > 100) score += 10;
    else if (rentabilidadeRelativa < 80) score -= 20;
    else if (rentabilidadeRelativa < 90) score -= 15;
    else if (rentabilidadeRelativa < 100) score -= 5;
    
    // Fator 2: Tendência de curto prazo
    const tendenciaApp = tendenciaCurto[app.tipo] || 0;
    score += tendenciaApp * 10; // -2 a +2, impacto de -20 a +20
    
    // Fator 3: Volatilidade (inversamente proporcional para renda fixa)
    const volApp = volatilidade[app.tipo] || 1;
    if (app.tipo === 'renda_fixa') {
      score += (1 - volApp) * 15; // Menor volatilidade é melhor para renda fixa
    } else {
      // Para renda variável, volatilidade moderada pode ser boa
      if (volApp < 0.5) score += 5;
      else if (volApp > 1.5) score -= 10;
    }
    
    // Fator 4: Correlação com cenário econômico atual
    const correlacaoApp = correlacoes[app.tipo] || 0;
    score += correlacaoApp * 10; // -1 a +1, impacto de -10 a +10
    
    // Fator 5: Risco vs perfil médio do mercado
    const riscoRelativo = app.risco / this.calcularRiscoMedioMercado();
    if (riscoRelativo < 0.7) score += 10;
    else if (riscoRelativo > 1.3) score -= 10;
    
    // Garantir que o score fique entre 0 e 100
    return Math.max(0, Math.min(100, score));
  }
  
  // Gera motivos para recomendação
  gerarMotivosRecomendacao(app, score) {
    const motivos = [];
    
    if (app.rentabilidade > this.dadosMercado.cdi.taxa * 1.1) {
      motivos.push("Rentabilidade acima do CDI");
    }
    
    if (app.risco < 2) { // Escala de 1-5
      motivos.push("Baixo risco para o retorno oferecido");
    }
    
    if (this.dadosMercado.tendencias[app.tipo] > 0) {
      motivos.push("Tendência de mercado favorável");
    }
    
    if (app.liquidez === "alta") {
      motivos.push("Alta liquidez");
    }
    
    // Se não encontrou motivos específicos
    if (motivos.length === 0) {
      motivos.push("Boa relação risco/retorno no cenário atual");
    }
    
    return motivos;
  }
  
  // Gera motivos para não recomendação
  gerarMotivosNaoRecomendacao(app, score) {
    const motivos = [];
    
    if (app.rentabilidade < this.dadosMercado.inflacao) {
      motivos.push("Rentabilidade abaixo da inflação");
    }
    
    if (app.risco > 4) { // Escala de 1-5
      motivos.push("Alto risco para o retorno oferecido");
    }
    
    if (this.dadosMercado.tendencias[app.tipo] < 0) {
      motivos.push("Tendência de mercado desfavorável");
    }
    
    if (app.liquidez === "baixa" && app.rentabilidade < this.dadosMercado.cdi.taxa) {
      motivos.push("Baixa liquidez com retorno insatisfatório");
    }
    
    // Se não encontrou motivos específicos
    if (motivos.length === 0) {
      motivos.push("Relação risco/retorno desfavorável no cenário atual");
    }
    
    return motivos;
  }
  
  // Métodos auxiliares de análise
  analisarTendenciaCurtoPrazo() {
    // Implementação da análise de tendência
    // Retorna objeto com tendências por tipo de aplicação
    return {
      'renda_fixa': 1.2,
      'renda_variavel': -0.8,
      'fundos_multimercado': 0.5
      // outros tipos...
    };
  }
  
  calcularVolatilidadeRecente() {
    // Implementação do cálculo de volatilidade
    // Retorna objeto com volatilidade por tipo de aplicação
    return {
      'renda_fixa': 0.2,
      'renda_variavel': 1.8,
      'fundos_multimercado': 0.9
      // outros tipos...
    };
  }
  
  calcularCorrelacoes() {
    // Implementação do cálculo de correlações
    // Retorna objeto com correlações por tipo de aplicação
    return {
      'renda_fixa': 0.7,
      'renda_variavel': -0.3,
      'fundos_multimercado': 0.4
      // outros tipos...
    };
  }
  
  calcularRiscoMedioMercado() {
    // Calcula o risco médio do mercado atual
    return 3; // Escala de 1-5
  }
  
  dispararEventoAtualizacao(alertas) {
    // Dispara evento customizado para atualizar a UI
    const evento = new CustomEvent('alertas-atualizados', { 
      detail: alertas 
    });
    document.dispatchEvent(evento);
  }
}
```

## Implementação Visual dos Gráficos

### HTML Base
```html
<div class="dashboard-graficos">
  <div class="painel-controle">
    <div class="seletores">
      <select id="periodo-grafico">
        <option value="1d">1 dia</option>
        <option value="1w">1 semana</option>
        <option value="1m" selected>1 mês</option>
        <option value="3m">3 meses</option>
        <option value="6m">6 meses</option>
        <option value="1y">1 ano</option>
        <option value="5y">5 anos</option>
      </select>
      
      <select id="tipo-grafico">
        <option value="linha">Linha</option>
        <option value="candle">Candlestick</option>
        <option value="barras">Barras</option>
        <option value="area">Área</option>
      </select>
    </div>
    
    <div class="indicadores">
      <span class="indicador">
        <span class="label">Última atualização:</span>
        <span id="timestamp-atualizacao" class="valor">--:--:--</span>
      </span>
      
      <span class="indicador">
        <span class="label">IBOVESPA:</span>
        <span id="valor-ibovespa" class="valor">--</span>
        <span id="variacao-ibovespa" class="variacao">--</span>
      </span>
      
      <span class="indicador">
        <span class="label">CDI:</span>
        <span id="valor-cdi" class="valor">--</span>
      </span>
    </div>
  </div>
  
  <div class="container-grafico">
    <canvas id="grafico-principal"></canvas>
    <div id="legenda-grafico" class="legenda"></div>
  </div>
  
  <div class="alertas-container">
    <div class="alerta-secao recomendados">
      <h3>Recomendados para Investir</h3>
      <div id="lista-recomendados" class="lista-alertas">
        <!-- Alertas verdes serão inseridos aqui -->
      </div>
    </div>
    
    <div class="alerta-secao nao-recomendados">
      <h3>Não Recomendados</h3>
      <div id="lista-nao-recomendados" class="lista-alertas">
        <!-- Alertas vermelhos serão inseridos aqui -->
      </div>
    </div>
  </div>
</div>
```

### CSS para Alertas Visuais
```css
/* Estilos para os alertas */
.alerta-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.alerta-verde {
  background-color: rgba(46, 204, 113, 0.15);
  border-left: 4px solid #2ecc71;
}

.alerta-vermelho {
  background-color: rgba(231, 76, 60, 0.15);
  border-left: 4px solid #e74c3c;
}

.indicador-alerta {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 12px;
}

.indicador-verde {
  background-color: #2ecc71;
}

.indicador-vermelho {
  background-color: #e74c3c;
}

/* Animação pulsante para alertas */
@keyframes pulsar {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.pulsando {
  animation: pulsar 1.5s infinite ease-in-out;
}

.alerta-vermelho.pulsando {
  animation-duration: 1.2s; /* Mais rápido para alertas vermelhos */
}

/* Estilos para o container de gráficos */
.dashboard-graficos {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-bottom: 30px;
}

.container-grafico {
  height: 400px;
  margin: 20px 0;
  position: relative;
}

.painel-controle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.seletores select {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  background-color: #f8f9fa;
  margin-right: 10px;
  font-size: 14px;
}

.indicadores {
  display: flex;
  gap: 20px;
}

.indicador {
  display: flex;
  align-items: center;
}

.indicador .label {
  font-size: 13px;
  color: #666;
  margin-right: 5px;
}

.indicador .valor {
  font-weight: 600;
  font-size: 14px;
}

.variacao.positiva {
  color: #2ecc71;
}

.variacao.negativa {
  color: #e74c3c;
}

/* Responsividade */
@media (max-width: 768px) {
  .painel-controle {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .indicadores {
    margin-top: 15px;
    flex-wrap: wrap;
  }
  
  .container-grafico {
    height: 300px;
  }
  
  .alertas-container {
    flex-direction: column;
  }
}
```

### JavaScript para Atualização em Tempo Real
```javascript
// Inicialização dos gráficos usando Chart.js
function inicializarGraficos() {
  const ctx = document.getElementById('grafico-principal').getContext('2d');
  
  // Configuração do gráfico
  const config = {
    type: 'line',
    data: {
      labels: [], // Serão preenchidos com datas/horas
      datasets: [
        {
          label: 'IBOVESPA',
          data: [],
          borderColor: '#3498db',
          backgroundColor: 'rgba(52, 152, 219, 0.1)',
          borderWidth: 2,
          tension: 0.1
        },
        {
          label: 'CDI (Acumulado)',
          data: [],
          borderColor: '#2ecc71',
          backgroundColor: 'rgba(46, 204, 113, 0.1)',
          borderWidth: 2,
          tension: 0.1
        }
        // Outros datasets podem ser adicionados
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat('pt-BR', {
                  style: 'decimal',
                  minimumFractionDigits: 2
                }).format(context.parsed.y);
              }
              return label;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        }
      }
    }
  };
  
  // Criar o gráfico
  const grafico = new Chart(ctx, config);
  
  return grafico;
}

// Função para atualizar dados em tempo real
function iniciarAtualizacaoTempoReal() {
  const grafico = inicializarGraficos();
  const alertaManager = new AlertaManager(dadosMercadoInicial, aplicacoesDisponiveis);
  
  // Função para atualizar os dados
  async function atualizarDados() {
    try {
      // Simular chamada à API para dados em tempo real
      const resposta = await fetch('/api/dados-mercado');
      const dados = await resposta.json();
      
      // Atualizar dados do gráfico
      atualizarGrafico(grafico, dados);
      
      // Atualizar indicadores
      atualizarIndicadores(dados);
      
      // Processar alertas
      alertaManager.atualizarDados(dados);
      
      // Atualizar timestamp
      document.getElementById('timestamp-atualizacao').textContent = 
        new Date().toLocaleTimeString('pt-BR');
        
    } catch (erro) {
      console.error('Erro ao atualizar dados:', erro);
    }
  }
  
  // Atualizar imediatamente na primeira vez
  atualizarDados();
  
  // Configurar atualização periódica
  const intervaloAtualizacao = setInterval(atualizarDados, 300000); // 5 minutos
  
  // Listener para eventos de alertas
  document.addEventListener('alertas-atualizados', function(evento) {
    renderizarAlertas(evento.detail);
  });
  
  // Listener para mudança de período
  document.getElementById('periodo-grafico').addEventListener('change', function(e) {
    mudarPeriodoGrafico(grafico, e.target.value);
  });
  
  // Listener para mudança de tipo de gráfico
  document.getElementById('tipo-grafico').addEventListener('change', function(e) {
    mudarTipoGrafico(grafico, e.target.value);
  });
  
  return {
    grafico,
    alertaManager,
    intervaloAtualizacao
  };
}

// Função para renderizar alertas na interface
function renderizarAlertas(alertas) {
  const containerRecomendados = document.getElementById('lista-recomendados');
  const containerNaoRecomendados = document.getElementById('lista-nao-recomendados');
  
  // Limpar containers
  containerRecomendados.innerHTML = '';
  containerNaoRecomendados.innerHTML = '';
  
  // Renderizar recomendados
  alertas.recomendados.forEach(alerta => {
    const elemento = document.createElement('div');
    elemento.className = 'alerta-item alerta-verde pulsando';
    elemento.id = `alerta-${alerta.id}`;
    
    elemento.innerHTML = `
      <span class="indicador-alerta indicador-verde"></span>
      <div class="alerta-conteudo">
        <div class="alerta-titulo">${alerta.nome}</div>
        <div class="alerta-descricao">${alerta.motivos[0]}</div>
      </div>
    `;
    
    // Adicionar tooltip com todos os motivos
    if (alerta.motivos.length > 1) {
      elemento.setAttribute('title', alerta.motivos.join('\n'));
    }
    
    containerRecomendados.appendChild(elemento);
  });
  
  // Renderizar não recomendados
  alertas.naoRecomendados.forEach(alerta => {
    const elemento = document.createElement('div');
    elemento.className = 'alerta-item alerta-vermelho pulsando';
    elemento.id = `alerta-${alerta.id}`;
    
    elemento.innerHTML = `
      <span class="indicador-alerta indicador-vermelho"></span>
      <div class="alerta-conteudo">
        <div class="alerta-titulo">${alerta.nome}</div>
        <div class="alerta-descricao">${alerta.motivos[0]}</div>
      </div>
    `;
    
    // Adicionar tooltip com todos os motivos
    if (alerta.motivos.length > 1) {
      elemento.setAttribute('title', alerta.motivos.join('\n'));
    }
    
    containerNaoRecomendados.appendChild(elemento);
  });
}

// Iniciar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  const { grafico, alertaManager } = iniciarAtualizacaoTempoReal();
  
  // Expor para debugging
  window.financeApp = {
    grafico,
    alertaManager
  };
});
```

## Integração com Dados em Tempo Real

### Simulação de API para Desenvolvimento
```javascript
// Arquivo: api-simulada.js
// Simula respostas de API para desenvolvimento

// Dados iniciais
const dadosIniciais = {
  ibovespa: {
    valor: 125000,
    variacao: 0.75
  },
  cdi: {
    taxa: 0.03, // Taxa diária
    acumuladoMes: 0.92
  },
  selic: 10.75,
  dolar: 5.12,
  euro: 5.58,
  bitcoin: 48500,
  inflacao: 4.5,
  tendencias: {
    'renda_fixa': 0.8,
    'renda_variavel': -0.3,
    'fundos_multimercado': 0.5,
    'tesouro_direto': 0.7,
    'poupanca': -0.2
  },
  timestamp: new Date().getTime()
};

// Função para gerar variação aleatória
function variacaoAleatoria(valor, percentualMaximo) {
  const variacao = (Math.random() * 2 - 1) * percentualMaximo / 100;
  return valor * (1 + variacao);
}

// Endpoint simulado
app.get('/api/dados-mercado', (req, res) => {
  // Gerar variações aleatórias para simular mercado
  const dados = {
    ibovespa: {
      valor: variacaoAleatoria(dadosIniciais.ibovespa.valor, 0.5),
      variacao: (Math.random() * 2 - 1) * 1.2
    },
    cdi: {
      taxa: dadosIniciais.cdi.taxa,
      acumuladoMes: dadosIniciais.cdi.acumuladoMes + (Math.random() * 0.02)
    },
    selic: dadosIniciais.selic,
    dolar: variacaoAleatoria(dadosIniciais.dolar, 0.3),
    euro: variacaoAleatoria(dadosIniciais.euro, 0.3),
    bitcoin: variacaoAleatoria(dadosIniciais.bitcoin, 2),
    inflacao: dadosIniciais.inflacao,
    tendencias: {
      'renda_fixa': dadosIniciais.tendencias['renda_fixa'] + (Math.random() * 0.2 - 0.1),
      'renda_variavel': dadosIniciais.tendencias['renda_variavel'] + (Math.random() * 0.4 - 0.2),
      'fundos_multimercado': dadosIniciais.tendencias['fundos_multimercado'] + (Math.random() * 0.3 - 0.15),
      'tesouro_direto': dadosIniciais.tendencias['tesouro_direto'] + (Math.random() * 0.1 - 0.05),
      'poupanca': dadosIniciais.tendencias['poupanca'] + (Math.random() * 0.1 - 0.05)
    },
    timestamp: new Date().getTime()
  };
  
  res.json(dados);
});
```

### Integração com Yahoo Finance API
```javascript
// Arquivo: yahoo-finance-api.js
// Integração com a API do Yahoo Finance

const axios = require('axios');

// Função para buscar dados de ações
async function buscarDadosAcao(simbolo, intervalo = '1d', periodo = '1mo') {
  try {
    const resposta = await axios.get('/api/yahoo-finance', {
      params: {
        endpoint: 'get_stock_chart',
        symbol: simbolo,
        interval: intervalo,
        range: periodo
      }
    });
    
    return processarDadosAcao(resposta.data);
  } catch (erro) {
    console.error(`Erro ao buscar dados da ação ${simbolo}:`, erro);
    throw erro;
  }
}

// Função para processar dados brutos da API
function processarDadosAcao(dadosBrutos) {
  if (!dadosBrutos.chart || !dadosBrutos.chart.result || dadosBrutos.chart.result.length === 0) {
    throw new Error('Dados inválidos recebidos da API');
  }
  
  const resultado = dadosBrutos.chart.result[0];
  const timestamps = resultado.timestamp;
  const cotacoes = resultado.indicators.quote[0];
  const meta = resultado.meta;
  
  // Formatar dados para uso nos gráficos
  const dadosFormatados = {
    simbolo: meta.symbol,
    nome: meta.shortName || meta.symbol,
    moeda: meta.currency,
    dados: timestamps.map((timestamp, index) => ({
      data: new Date(timestamp * 1000),
      abertura: cotacoes.open[index],
      fechamento: cotacoes.close[index],
      maxima: cotacoes.high[index],
      minima: cotacoes.low[index],
      volume: cotacoes.volume[index]
    })).filter(item => item.fechamento !== null) // Remover dados nulos
  };
  
  // Adicionar métricas calculadas
  dadosFormatados.ultimoFechamento = dadosFormatados.dados[dadosFormatados.dados.length - 1].fechamento;
  dadosFormatados.variacaoDia = calcularVariacao(
    dadosFormatados.dados[dadosFormatados.dados.length - 2].fechamento,
    dadosFormatados.ultimoFechamento
  );
  
  return dadosFormatados;
}

// Função auxiliar para calcular variação percentual
function calcularVariacao(valorInicial, valorFinal) {
  if (!valorInicial || !valorFinal) return 0;
  return ((valorFinal - valorInicial) / valorInicial) * 100;
}

// Exportar funções
module.exports = {
  buscarDadosAcao
};
```

## Testes e Validação

### Teste de Performance
- Verificar tempo de resposta para atualizações
- Garantir que animações não afetem desempenho
- Testar com diferentes volumes de dados

### Teste de Usabilidade
- Verificar clareza dos alertas visuais
- Confirmar que as cores são acessíveis (contraste)
- Validar que os tooltips são informativos

### Teste de Responsividade
- Garantir que os gráficos se adaptam a diferentes tamanhos de tela
- Verificar que os alertas são visíveis em dispositivos móveis
- Testar interações touch para dispositivos móveis
