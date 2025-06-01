# Funcionalidades de Filtros e Calculadoras

## Sistema de Filtros para Aplicações

### Estrutura de Filtros
- **Filtro por Tipo de Aplicação**
  - CDB
  - LCA
  - LCI
  - Fundos de Investimento (com subcategorias)
  - Poupança
  
- **Filtro por Valor de Investimento**
  - Slider interativo: R$0,01 até R$1.000.000,00
  - Opções predefinidas: R$100, R$1.000, R$10.000, R$100.000
  
- **Filtro por Prazo**
  - Curto prazo (até 1 ano)
  - Médio prazo (1 a 3 anos)
  - Longo prazo (mais de 3 anos)
  - Slider personalizado (dias/meses/anos)
  
- **Filtro por Nível de Risco**
  - Muito baixo
  - Baixo
  - Moderado
  - Alto
  - Muito alto
  
- **Filtro por Rentabilidade**
  - Fixa
  - Pós-fixada
  - Híbrida
  - Variável
  
- **Filtro por Liquidez**
  - Diária
  - D+1
  - D+30
  - Acima de 30 dias
  - No vencimento

### Implementação Técnica
```javascript
// Estrutura de dados para filtros
const filtros = {
  tipoAplicacao: [],
  valorMinimo: 0,
  valorMaximo: 1000000,
  prazoMinimo: 0,
  prazoMaximo: 3650, // 10 anos em dias
  nivelRisco: [],
  tipoRentabilidade: [],
  liquidez: []
};

// Função para aplicar filtros
function aplicarFiltros(aplicacoes, filtros) {
  return aplicacoes.filter(app => {
    // Verificar tipo de aplicação
    if (filtros.tipoAplicacao.length > 0 && !filtros.tipoAplicacao.includes(app.tipo)) {
      return false;
    }
    
    // Verificar valor
    if (app.valorMinimo < filtros.valorMinimo || app.valorMinimo > filtros.valorMaximo) {
      return false;
    }
    
    // Verificar prazo
    if (app.prazoMinimo > filtros.prazoMaximo || app.prazoMaximo < filtros.prazoMinimo) {
      return false;
    }
    
    // Verificar risco
    if (filtros.nivelRisco.length > 0 && !filtros.nivelRisco.includes(app.risco)) {
      return false;
    }
    
    // Verificar rentabilidade
    if (filtros.tipoRentabilidade.length > 0 && !filtros.tipoRentabilidade.includes(app.rentabilidade)) {
      return false;
    }
    
    // Verificar liquidez
    if (filtros.liquidez.length > 0 && !filtros.liquidez.includes(app.liquidez)) {
      return false;
    }
    
    return true;
  });
}
```

## Calculadoras Financeiras Personalizáveis

### Calculadora de Rentabilidade
- **Campos de Entrada**:
  - Valor inicial (R$)
  - Prazo (dias/meses/anos)
  - Taxa de juros (% a.a.)
  - Tipo de rentabilidade (prefixada, pós-fixada)
  - Indexador (CDI, IPCA, Selic)
  - Percentual do indexador (%)
  
- **Campos de Saída**:
  - Valor bruto final (R$)
  - Rentabilidade bruta (%)
  - Imposto de renda (R$)
  - IOF (se aplicável) (R$)
  - Rentabilidade líquida (%)
  - Valor líquido final (R$)

### Calculadora de Comparação de Investimentos
- **Campos de Entrada**:
  - Até 3 investimentos para comparação
  - Valor inicial igual para todos (R$)
  - Prazo igual para todos (dias/meses/anos)
  
- **Campos de Saída**:
  - Tabela comparativa com:
    - Rentabilidade bruta
    - Rentabilidade líquida
    - Valor final
    - Impostos
    - Risco
    - Liquidez

### Calculadora de Objetivos Financeiros
- **Campos de Entrada**:
  - Objetivo financeiro (valor desejado em R$)
  - Prazo para atingir o objetivo (meses/anos)
  - Valor inicial disponível (R$)
  - Perfil de risco (conservador, moderado, arrojado)
  
- **Campos de Saída**:
  - Valor mensal a ser investido (R$)
  - Sugestões de aplicações adequadas
  - Gráfico de evolução do patrimônio
  - Tempo para atingir o objetivo com diferentes aplicações

### Implementação Técnica
```javascript
// Função para calcular rentabilidade de investimento prefixado
function calcularRentabilidadePrefixada(valorInicial, taxaAnual, prazoEmDias) {
  const taxaDiaria = Math.pow(1 + taxaAnual, 1/365) - 1;
  const valorFinal = valorInicial * Math.pow(1 + taxaDiaria, prazoEmDias);
  return valorFinal;
}

// Função para calcular rentabilidade de investimento pós-fixado
function calcularRentabilidadePosfixada(valorInicial, percentualCDI, cdiAnual, prazoEmDias) {
  const cdiDiario = Math.pow(1 + cdiAnual, 1/365) - 1;
  const taxaDiaria = cdiDiario * (percentualCDI / 100);
  const valorFinal = valorInicial * Math.pow(1 + taxaDiaria, prazoEmDias);
  return valorFinal;
}

// Função para calcular imposto de renda
function calcularImpostoRenda(valorInicial, valorFinal, prazoEmDias) {
  const lucro = valorFinal - valorInicial;
  let aliquota;
  
  if (prazoEmDias <= 180) {
    aliquota = 0.225; // 22.5%
  } else if (prazoEmDias <= 360) {
    aliquota = 0.20; // 20%
  } else if (prazoEmDias <= 720) {
    aliquota = 0.175; // 17.5%
  } else {
    aliquota = 0.15; // 15%
  }
  
  return lucro * aliquota;
}
```

## Gráficos em Tempo Real com Alertas Visuais

### Tipos de Gráficos
- **Gráfico de Linha**: Evolução dos índices de mercado (IBOVESPA, CDI, SELIC)
- **Gráfico de Barras**: Comparativo de rentabilidade entre aplicações
- **Gráfico de Pizza**: Distribuição ideal de investimentos por perfil
- **Gráfico de Candlestick**: Para análise técnica de ações e fundos

### Sistema de Alertas Visuais
- **Alertas Verdes (Recomendados)**:
  - Botão pulsante verde para aplicações com boa relação risco/retorno
  - Indicador de tendência de alta
  - Notificação de oportunidades de curto prazo
  
- **Alertas Vermelhos (Não Recomendados)**:
  - Botão pulsante vermelho para aplicações com risco elevado
  - Indicador de tendência de queda
  - Notificação de aplicações com rentabilidade abaixo da inflação

### Implementação dos Alertas
```javascript
// Função para analisar e gerar alertas
function gerarAlertas(aplicacoes, dadosMercado) {
  const alertas = {
    recomendados: [],
    naoRecomendados: []
  };
  
  aplicacoes.forEach(app => {
    // Calcular score de recomendação baseado em múltiplos fatores
    let score = 0;
    
    // Fator 1: Rentabilidade vs. CDI
    const rentabilidadeRelativa = app.rentabilidadeAnual / dadosMercado.cdi;
    score += rentabilidadeRelativa * 3; // Peso 3
    
    // Fator 2: Risco (invertido - menor risco = maior pontuação)
    const riscoPontuacao = 5 - app.nivelRisco; // Escala 1-5
    score += riscoPontuacao * 2; // Peso 2
    
    // Fator 3: Tendência de mercado para este tipo de aplicação
    score += dadosMercado.tendencias[app.tipo] * 2; // Peso 2
    
    // Fator 4: Liquidez
    score += app.liquidezPontuacao; // Peso 1
    
    // Classificar com base no score
    if (score > 15) { // Threshold para recomendação
      alertas.recomendados.push({
        id: app.id,
        nome: app.nome,
        score: score,
        motivo: "Boa relação risco/retorno e tendência favorável"
      });
    } else if (score < 8) { // Threshold para não recomendação
      alertas.naoRecomendados.push({
        id: app.id,
        nome: app.nome,
        score: score,
        motivo: "Relação risco/retorno desfavorável ou tendência negativa"
      });
    }
  });
  
  return alertas;
}

// Função para atualizar alertas visuais na interface
function atualizarAlertasVisuais(alertas) {
  // Limpar alertas anteriores
  document.querySelectorAll('.alerta-verde, .alerta-vermelho').forEach(el => {
    el.classList.remove('pulsando');
  });
  
  // Adicionar novos alertas verdes
  alertas.recomendados.forEach(alerta => {
    const elemento = document.querySelector(`#aplicacao-${alerta.id} .alerta-verde`);
    if (elemento) {
      elemento.classList.add('pulsando');
      elemento.setAttribute('data-motivo', alerta.motivo);
    }
  });
  
  // Adicionar novos alertas vermelhos
  alertas.naoRecomendados.forEach(alerta => {
    const elemento = document.querySelector(`#aplicacao-${alerta.id} .alerta-vermelho`);
    if (elemento) {
      elemento.classList.add('pulsando');
      elemento.setAttribute('data-motivo', alerta.motivo);
    }
  });
}
```

### Atualização em Tempo Real
- Polling a cada 5 minutos para dados de mercado
- WebSockets para atualizações críticas de preços
- Animação suave para transições de dados
- Timestamp visível da última atualização
