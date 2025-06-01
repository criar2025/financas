# Prospecção Futura e Análise de Risco

## Visão Geral

A prospecção futura e análise de risco são componentes essenciais do site finança.com, permitindo que os usuários tomem decisões informadas sobre seus investimentos. Esta funcionalidade combina dados históricos, tendências de mercado e modelos preditivos para oferecer:

1. Projeções de rentabilidade futura para diferentes aplicações
2. Classificação de risco padronizada e intuitiva
3. Cenários econômicos alternativos e seus impactos
4. Recomendações personalizadas baseadas no perfil do investidor

## Modelos de Prospecção Futura

### Modelo de Projeção de Rentabilidade

```javascript
class ProjecaoRentabilidade {
  constructor(dadosHistoricos, parametrosMercado) {
    this.dadosHistoricos = dadosHistoricos;
    this.parametrosMercado = parametrosMercado;
    this.modelosTreinados = {};
  }
  
  // Treinar modelos para diferentes tipos de aplicação
  treinarModelos() {
    for (const tipo in this.dadosHistoricos) {
      if (this.dadosHistoricos.hasOwnProperty(tipo)) {
        this.modelosTreinados[tipo] = this.treinarModeloEspecifico(
          this.dadosHistoricos[tipo],
          tipo
        );
      }
    }
  }
  
  // Treinar modelo específico para um tipo de aplicação
  treinarModeloEspecifico(dados, tipo) {
    // Implementação simplificada - na prática usaria algoritmos mais complexos
    // como regressão linear, ARIMA, ou redes neurais dependendo do tipo de aplicação
    
    if (tipo === 'renda_fixa' || tipo === 'poupanca') {
      return this.treinarModeloRendaFixa(dados);
    } else if (tipo === 'renda_variavel' || tipo === 'acoes') {
      return this.treinarModeloRendaVariavel(dados);
    } else {
      return this.treinarModeloHibrido(dados);
    }
  }
  
  // Modelo para aplicações de renda fixa
  treinarModeloRendaFixa(dados) {
    // Para renda fixa, usamos principalmente correlação com taxa Selic e inflação
    const mediaRentabilidade = this.calcularMediaPonderada(dados.rentabilidades);
    const correlacaoSelic = this.calcularCorrelacao(dados.rentabilidades, dados.taxasSelic);
    const correlacaoInflacao = this.calcularCorrelacao(dados.rentabilidades, dados.taxasInflacao);
    
    return {
      mediaRentabilidade,
      correlacaoSelic,
      correlacaoInflacao,
      tipo: 'renda_fixa'
    };
  }
  
  // Modelo para aplicações de renda variável
  treinarModeloRendaVariavel(dados) {
    // Para renda variável, analisamos tendências, volatilidade e correlação com índices
    const tendencia = this.calcularTendencia(dados.rentabilidades);
    const volatilidade = this.calcularVolatilidade(dados.rentabilidades);
    const correlacaoIbovespa = this.calcularCorrelacao(dados.rentabilidades, dados.ibovespa);
    
    return {
      tendencia,
      volatilidade,
      correlacaoIbovespa,
      tipo: 'renda_variavel'
    };
  }
  
  // Modelo para aplicações híbridas (fundos multimercado, etc)
  treinarModeloHibrido(dados) {
    // Combinação dos modelos anteriores com pesos específicos
    const modeloFixo = this.treinarModeloRendaFixa(dados);
    const modeloVariavel = this.treinarModeloRendaVariavel(dados);
    
    return {
      modeloFixo,
      modeloVariavel,
      pesoFixo: 0.6,
      pesoVariavel: 0.4,
      tipo: 'hibrido'
    };
  }
  
  // Gerar projeção para uma aplicação específica
  gerarProjecao(aplicacao, horizonte) {
    const tipo = this.determinarTipoAplicacao(aplicacao);
    const modelo = this.modelosTreinados[tipo];
    
    if (!modelo) {
      throw new Error(`Modelo não treinado para o tipo: ${tipo}`);
    }
    
    // Gerar cenários: pessimista, realista, otimista
    return {
      pessimista: this.projetarCenario(aplicacao, modelo, horizonte, 'pessimista'),
      realista: this.projetarCenario(aplicacao, modelo, horizonte, 'realista'),
      otimista: this.projetarCenario(aplicacao, modelo, horizonte, 'otimista')
    };
  }
  
  // Projetar cenário específico
  projetarCenario(aplicacao, modelo, horizonte, tipoCenario) {
    // Implementação simplificada - ajustar conforme o tipo de modelo
    let projecao = [];
    let valorAtual = aplicacao.valorInicial;
    
    // Fatores de ajuste para diferentes cenários
    const fatores = {
      pessimista: 0.7,
      realista: 1.0,
      otimista: 1.3
    };
    
    const fator = fatores[tipoCenario];
    
    // Projetar para cada período no horizonte
    for (let i = 1; i <= horizonte; i++) {
      let rentabilidadePeriodo;
      
      if (modelo.tipo === 'renda_fixa') {
        rentabilidadePeriodo = this.projetarRendaFixa(modelo, i) * fator;
      } else if (modelo.tipo === 'renda_variavel') {
        rentabilidadePeriodo = this.projetarRendaVariavel(modelo, i) * fator;
      } else {
        rentabilidadePeriodo = this.projetarHibrido(modelo, i) * fator;
      }
      
      valorAtual *= (1 + rentabilidadePeriodo);
      
      projecao.push({
        periodo: i,
        valor: valorAtual,
        rentabilidade: rentabilidadePeriodo
      });
    }
    
    return projecao;
  }
  
  // Métodos auxiliares para cálculos estatísticos
  calcularMediaPonderada(valores) {
    // Implementação simplificada
    return valores.reduce((a, b) => a + b, 0) / valores.length;
  }
  
  calcularCorrelacao(serieA, serieB) {
    // Implementação simplificada da correlação de Pearson
    return 0.8; // Valor fictício para exemplo
  }
  
  calcularTendencia(valores) {
    // Implementação simplificada - inclinação da linha de tendência
    return (valores[valores.length - 1] - valores[0]) / valores.length;
  }
  
  calcularVolatilidade(valores) {
    // Desvio padrão dos retornos
    const media = this.calcularMediaPonderada(valores);
    const somaDiferencasQuadrado = valores.reduce((soma, valor) => {
      return soma + Math.pow(valor - media, 2);
    }, 0);
    
    return Math.sqrt(somaDiferencasQuadrado / valores.length);
  }
  
  // Métodos específicos para projeção
  projetarRendaFixa(modelo, periodo) {
    // Projeção baseada em correlações com Selic e inflação
    const selicProjetada = this.parametrosMercado.projecaoSelic[periodo - 1];
    const inflacaoProjetada = this.parametrosMercado.projecaoInflacao[periodo - 1];
    
    return modelo.mediaRentabilidade + 
           (selicProjetada - this.parametrosMercado.selicAtual) * modelo.correlacaoSelic +
           (inflacaoProjetada - this.parametrosMercado.inflacaoAtual) * modelo.correlacaoInflacao;
  }
  
  projetarRendaVariavel(modelo, periodo) {
    // Projeção baseada em tendência, volatilidade e correlação com Ibovespa
    const ibovespaProjetado = this.parametrosMercado.projecaoIbovespa[periodo - 1];
    const tendenciaAjustada = modelo.tendencia * periodo;
    
    // Adicionar componente aleatório baseado na volatilidade
    const componenteAleatorio = modelo.volatilidade * (Math.random() * 2 - 1) * 0.5;
    
    return tendenciaAjustada + 
           (ibovespaProjetado - this.parametrosMercado.ibovespaAtual) * modelo.correlacaoIbovespa +
           componenteAleatorio;
  }
  
  projetarHibrido(modelo, periodo) {
    // Combinação ponderada dos modelos de renda fixa e variável
    const projecaoFixa = this.projetarRendaFixa(modelo.modeloFixo, periodo);
    const projecaoVariavel = this.projetarRendaVariavel(modelo.modeloVariavel, periodo);
    
    return (projecaoFixa * modelo.pesoFixo) + (projecaoVariavel * modelo.pesoVariavel);
  }
  
  determinarTipoAplicacao(aplicacao) {
    // Mapear a aplicação para um dos tipos de modelo disponíveis
    if (['CDB', 'LCI', 'LCA', 'Tesouro Direto', 'Poupança'].includes(aplicacao.tipo)) {
      return 'renda_fixa';
    } else if (['Ações', 'FIAs', 'ETFs'].includes(aplicacao.tipo)) {
      return 'renda_variavel';
    } else {
      return 'hibrido';
    }
  }
}
```

## Sistema de Análise de Risco

### Classificação de Risco Padronizada

```javascript
class AnalisadorRisco {
  constructor(dadosHistoricos, parametrosMercado) {
    this.dadosHistoricos = dadosHistoricos;
    this.parametrosMercado = parametrosMercado;
    this.pesos = {
      volatilidade: 0.4,
      drawdown: 0.3,
      correlacaoMercado: 0.15,
      liquidez: 0.15
    };
  }
  
  // Analisar risco de uma aplicação específica
  analisarRisco(aplicacao) {
    // Calcular componentes individuais de risco
    const riscoVolatilidade = this.calcularRiscoVolatilidade(aplicacao);
    const riscoDrawdown = this.calcularRiscoDrawdown(aplicacao);
    const riscoCorrelacao = this.calcularRiscoCorrelacao(aplicacao);
    const riscoLiquidez = this.calcularRiscoLiquidez(aplicacao);
    
    // Calcular score ponderado
    const scoreRisco = 
      riscoVolatilidade * this.pesos.volatilidade +
      riscoDrawdown * this.pesos.drawdown +
      riscoCorrelacao * this.pesos.correlacaoMercado +
      riscoLiquidez * this.pesos.liquidez;
    
    // Classificar em categorias
    const categoriaRisco = this.classificarRisco(scoreRisco);
    
    // Gerar explicação em linguagem natural
    const explicacao = this.gerarExplicacaoRisco({
      volatilidade: riscoVolatilidade,
      drawdown: riscoDrawdown,
      correlacao: riscoCorrelacao,
      liquidez: riscoLiquidez,
      score: scoreRisco,
      categoria: categoriaRisco
    });
    
    return {
      score: scoreRisco,
      categoria: categoriaRisco,
      componentes: {
        volatilidade: riscoVolatilidade,
        drawdown: riscoDrawdown,
        correlacao: riscoCorrelacao,
        liquidez: riscoLiquidez
      },
      explicacao
    };
  }
  
  // Calcular risco baseado na volatilidade histórica
  calcularRiscoVolatilidade(aplicacao) {
    const tipo = aplicacao.tipo;
    const dadosTipo = this.dadosHistoricos[tipo] || this.dadosHistoricos.default;
    
    // Calcular desvio padrão dos retornos
    const volatilidade = this.calcularDesvioPadrao(dadosTipo.rentabilidades);
    
    // Normalizar para escala 0-5
    return this.normalizarRisco(volatilidade, 0, 0.3);
  }
  
  // Calcular risco baseado no drawdown máximo histórico
  calcularRiscoDrawdown(aplicacao) {
    const tipo = aplicacao.tipo;
    const dadosTipo = this.dadosHistoricos[tipo] || this.dadosHistoricos.default;
    
    // Calcular drawdown máximo
    const drawdown = this.calcularMaxDrawdown(dadosTipo.valores);
    
    // Normalizar para escala 0-5
    return this.normalizarRisco(drawdown, 0, 0.5);
  }
  
  // Calcular risco baseado na correlação com o mercado
  calcularRiscoCorrelacao(aplicacao) {
    const tipo = aplicacao.tipo;
    const dadosTipo = this.dadosHistoricos[tipo] || this.dadosHistoricos.default;
    
    // Calcular correlação com índice de referência
    const correlacao = Math.abs(this.calcularCorrelacao(
      dadosTipo.rentabilidades,
      this.dadosHistoricos.mercado.rentabilidades
    ));
    
    // Para renda fixa, menor correlação é melhor (mais diversificação)
    // Para renda variável, depende do objetivo
    const fatorInversao = ['CDB', 'LCI', 'LCA', 'Tesouro Direto', 'Poupança'].includes(tipo) ? -1 : 1;
    
    // Normalizar para escala 0-5
    return this.normalizarRisco(correlacao * fatorInversao, -1, 1);
  }
  
  // Calcular risco baseado na liquidez
  calcularRiscoLiquidez(aplicacao) {
    // Mapear liquidez para escala de risco
    const mapaLiquidez = {
      'D+0': 0,
      'D+1': 1,
      'D+2': 1.5,
      'D+3': 2,
      'D+5': 2.5,
      'D+15': 3,
      'D+30': 3.5,
      'D+60': 4,
      'Vencimento': 5
    };
    
    return mapaLiquidez[aplicacao.liquidez] || 2.5;
  }
  
  // Classificar score de risco em categorias
  classificarRisco(score) {
    if (score < 1) return 'Muito Baixo';
    if (score < 2) return 'Baixo';
    if (score < 3) return 'Moderado';
    if (score < 4) return 'Alto';
    return 'Muito Alto';
  }
  
  // Gerar explicação em linguagem natural
  gerarExplicacaoRisco(analise) {
    let explicacao = `Esta aplicação possui risco ${analise.categoria.toLowerCase()}. `;
    
    // Adicionar detalhes sobre os componentes mais significativos
    const componentesOrdenados = Object.entries(analise.componentes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2);
    
    if (componentesOrdenados[0][1] > 3) {
      switch (componentesOrdenados[0][0]) {
        case 'volatilidade':
          explicacao += 'Apresenta oscilações significativas de valor no curto prazo. ';
          break;
        case 'drawdown':
          explicacao += 'Historicamente pode apresentar quedas temporárias consideráveis. ';
          break;
        case 'correlacao':
          explicacao += 'Tende a seguir fortemente os movimentos gerais do mercado. ';
          break;
        case 'liquidez':
          explicacao += 'Possui restrições de resgate que podem limitar o acesso ao dinheiro. ';
          break;
      }
    }
    
    // Adicionar recomendação baseada no perfil de risco
    if (analise.score < 2) {
      explicacao += 'Recomendada para investidores com perfil conservador.';
    } else if (analise.score < 3.5) {
      explicacao += 'Adequada para investidores com perfil moderado.';
    } else {
      explicacao += 'Mais indicada para investidores com perfil arrojado.';
    }
    
    return explicacao;
  }
  
  // Métodos auxiliares
  calcularDesvioPadrao(valores) {
    const media = valores.reduce((a, b) => a + b, 0) / valores.length;
    const somaDiferencasQuadrado = valores.reduce((soma, valor) => {
      return soma + Math.pow(valor - media, 2);
    }, 0);
    
    return Math.sqrt(somaDiferencasQuadrado / valores.length);
  }
  
  calcularMaxDrawdown(valores) {
    let maxDrawdown = 0;
    let peak = valores[0];
    
    for (let i = 1; i < valores.length; i++) {
      if (valores[i] > peak) {
        peak = valores[i];
      } else {
        const drawdown = (peak - valores[i]) / peak;
        maxDrawdown = Math.max(maxDrawdown, drawdown);
      }
    }
    
    return maxDrawdown;
  }
  
  calcularCorrelacao(serieA, serieB) {
    // Implementação simplificada da correlação de Pearson
    return 0.5; // Valor fictício para exemplo
  }
  
  normalizarRisco(valor, min, max) {
    // Normalizar para escala 0-5
    const normalizado = ((valor - min) / (max - min)) * 5;
    return Math.max(0, Math.min(5, normalizado));
  }
}
```

## Visualização de Prospecção e Risco

### Interface de Prospecção Futura

```html
<div class="prospeccao-container">
  <div class="prospeccao-header">
    <h2>Prospecção Futura</h2>
    <div class="controles">
      <div class="campo-controle">
        <label for="horizonte-prospeccao">Horizonte:</label>
        <select id="horizonte-prospeccao">
          <option value="6">6 meses</option>
          <option value="12" selected>1 ano</option>
          <option value="24">2 anos</option>
          <option value="36">3 anos</option>
          <option value="60">5 anos</option>
        </select>
      </div>
      
      <div class="campo-controle">
        <label for="valor-inicial">Valor inicial:</label>
        <input type="number" id="valor-inicial" value="1000" min="1" step="100">
      </div>
    </div>
  </div>
  
  <div class="grafico-prospeccao">
    <canvas id="grafico-prospeccao-futura"></canvas>
  </div>
  
  <div class="legenda-cenarios">
    <div class="cenario cenario-otimista">
      <span class="indicador"></span>
      <span class="label">Cenário Otimista</span>
    </div>
    <div class="cenario cenario-realista">
      <span class="indicador"></span>
      <span class="label">Cenário Realista</span>
    </div>
    <div class="cenario cenario-pessimista">
      <span class="indicador"></span>
      <span class="label">Cenário Pessimista</span>
    </div>
  </div>
  
  <div class="tabela-prospeccao">
    <h3>Projeção de Valores</h3>
    <table>
      <thead>
        <tr>
          <th>Período</th>
          <th>Cenário Pessimista</th>
          <th>Cenário Realista</th>
          <th>Cenário Otimista</th>
        </tr>
      </thead>
      <tbody id="tabela-valores-prospeccao">
        <!-- Será preenchido via JavaScript -->
      </tbody>
    </table>
  </div>
</div>
```

### Interface de Análise de Risco

```html
<div class="risco-container">
  <div class="risco-header">
    <h2>Análise de Risco</h2>
  </div>
  
  <div class="indicador-risco-principal">
    <div class="medidor-risco">
      <div class="barra-risco">
        <div class="nivel nivel-1" data-nivel="Muito Baixo"></div>
        <div class="nivel nivel-2" data-nivel="Baixo"></div>
        <div class="nivel nivel-3" data-nivel="Moderado"></div>
        <div class="nivel nivel-4" data-nivel="Alto"></div>
        <div class="nivel nivel-5" data-nivel="Muito Alto"></div>
      </div>
      <div class="marcador-risco" id="marcador-risco-atual"></div>
    </div>
    <div class="categoria-risco" id="categoria-risco">Moderado</div>
  </div>
  
  <div class="componentes-risco">
    <h3>Componentes do Risco</h3>
    
    <div class="componente">
      <div class="componente-header">
        <span class="componente-nome">Volatilidade</span>
        <span class="componente-valor" id="valor-volatilidade">3.2</span>
      </div>
      <div class="componente-barra">
        <div class="componente-preenchimento" id="barra-volatilidade" style="width: 64%"></div>
      </div>
    </div>
    
    <div class="componente">
      <div class="componente-header">
        <span class="componente-nome">Drawdown Máximo</span>
        <span class="componente-valor" id="valor-drawdown">2.8</span>
      </div>
      <div class="componente-barra">
        <div class="componente-preenchimento" id="barra-drawdown" style="width: 56%"></div>
      </div>
    </div>
    
    <div class="componente">
      <div class="componente-header">
        <span class="componente-nome">Correlação com Mercado</span>
        <span class="componente-valor" id="valor-correlacao">1.5</span>
      </div>
      <div class="componente-barra">
        <div class="componente-preenchimento" id="barra-correlacao" style="width: 30%"></div>
      </div>
    </div>
    
    <div class="componente">
      <div class="componente-header">
        <span class="componente-nome">Liquidez</span>
        <span class="componente-valor" id="valor-liquidez">2.0</span>
      </div>
      <div class="componente-barra">
        <div class="componente-preenchimento" id="barra-liquidez" style="width: 40%"></div>
      </div>
    </div>
  </div>
  
  <div class="explicacao-risco" id="explicacao-risco">
    Esta aplicação possui risco moderado. Apresenta oscilações moderadas de valor no curto prazo. Adequada para investidores com perfil moderado.
  </div>
  
  <div class="comparativo-risco">
    <h3>Comparativo de Risco</h3>
    <div class="grafico-comparativo">
      <canvas id="grafico-comparativo-risco"></canvas>
    </div>
  </div>
</div>
```

### CSS para Visualização

```css
/* Estilos para Prospecção Futura */
.prospeccao-container {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-bottom: 30px;
}

.prospeccao-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.controles {
  display: flex;
  gap: 15px;
}

.campo-controle {
  display: flex;
  align-items: center;
}

.campo-controle label {
  margin-right: 8px;
  font-size: 14px;
  color: #555;
}

.campo-controle select,
.campo-controle input {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  background-color: #f8f9fa;
  font-size: 14px;
}

.grafico-prospeccao {
  height: 350px;
  margin-bottom: 20px;
}

.legenda-cenarios {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;
}

.cenario {
  display: flex;
  align-items: center;
}

.cenario .indicador {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
}

.cenario-otimista .indicador {
  background-color: #2ecc71;
}

.cenario-realista .indicador {
  background-color: #3498db;
}

.cenario-pessimista .indicador {
  background-color: #e74c3c;
}

.tabela-prospeccao {
  overflow-x: auto;
}

.tabela-prospeccao table {
  width: 100%;
  border-collapse: collapse;
}

.tabela-prospeccao th,
.tabela-prospeccao td {
  padding: 10px;
  text-align: right;
  border-bottom: 1px solid #eee;
}

.tabela-prospeccao th {
  background-color: #f8f9fa;
  font-weight: 600;
  text-align: center;
}

.tabela-prospeccao tr:last-child td {
  font-weight: 600;
  border-top: 2px solid #ddd;
}

/* Estilos para Análise de Risco */
.risco-container {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-bottom: 30px;
}

.indicador-risco-principal {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;
}

.medidor-risco {
  width: 80%;
  max-width: 500px;
  position: relative;
  margin-bottom: 15px;
}

.barra-risco {
  display: flex;
  height: 10px;
  border-radius: 5px;
  overflow: hidden;
}

.nivel {
  flex: 1;
  position: relative;
}

.nivel::after {
  content: attr(data-nivel);
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  white-space: nowrap;
  color: #666;
}

.nivel-1 {
  background-color: #2ecc71;
}

.nivel-2 {
  background-color: #27ae60;
}

.nivel-3 {
  background-color: #f1c40f;
}

.nivel-4 {
  background-color: #e67e22;
}

.nivel-5 {
  background-color: #e74c3c;
}

.marcador-risco {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #2c3e50;
  border-radius: 50%;
  top: -5px;
  transform: translateX(-50%);
  border: 3px solid #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.categoria-risco {
  font-size: 24px;
  font-weight: 600;
  color: #2c3e50;
}

.componentes-risco {
  margin: 30px 0;
}

.componente {
  margin-bottom: 15px;
}

.componente-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.componente-nome {
  font-size: 14px;
  color: #555;
}

.componente-valor {
  font-weight: 600;
  font-size: 14px;
}

.componente-barra {
  height: 8px;
  background-color: #f1f1f1;
  border-radius: 4px;
  overflow: hidden;
}

.componente-preenchimento {
  height: 100%;
  background: linear-gradient(to right, #2ecc71, #e74c3c);
  border-radius: 4px;
}

.explicacao-risco {
  background-color: #f8f9fa;
  border-left: 4px solid #3498db;
  padding: 15px;
  margin: 20px 0;
  border-radius: 0 4px 4px 0;
  font-size: 15px;
  line-height: 1.5;
}

.comparativo-risco {
  margin-top: 30px;
}

.grafico-comparativo {
  height: 300px;
}

/* Responsividade */
@media (max-width: 768px) {
  .prospeccao-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .controles {
    margin-top: 15px;
    width: 100%;
    flex-direction: column;
  }
  
  .medidor-risco {
    width: 100%;
  }
  
  .nivel::after {
    font-size: 10px;
  }
}
```

### JavaScript para Visualização

```javascript
// Inicializar gráfico de prospecção futura
function inicializarGraficoProspeccao() {
  const ctx = document.getElementById('grafico-prospeccao-futura').getContext('2d');
  
  const config = {
    type: 'line',
    data: {
      labels: [], // Serão preenchidos com períodos
      datasets: [
        {
          label: 'Cenário Otimista',
          data: [],
          borderColor: '#2ecc71',
          backgroundColor: 'rgba(46, 204, 113, 0.1)',
          borderWidth: 2,
          tension: 0.1
        },
        {
          label: 'Cenário Realista',
          data: [],
          borderColor: '#3498db',
          backgroundColor: 'rgba(52, 152, 219, 0.1)',
          borderWidth: 2,
          tension: 0.1
        },
        {
          label: 'Cenário Pessimista',
          data: [],
          borderColor: '#e74c3c',
          backgroundColor: 'rgba(231, 76, 60, 0.1)',
          borderWidth: 2,
          tension: 0.1
        }
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
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': R$ ';
              }
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
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
          },
          title: {
            display: true,
            text: 'Período'
          }
        },
        y: {
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          title: {
            display: true,
            text: 'Valor (R$)'
          },
          ticks: {
            callback: function(value) {
              return 'R$ ' + new Intl.NumberFormat('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }).format(value);
            }
          }
        }
      }
    }
  };
  
  const grafico = new Chart(ctx, config);
  
  return grafico;
}

// Inicializar gráfico comparativo de risco
function inicializarGraficoComparativoRisco() {
  const ctx = document.getElementById('grafico-comparativo-risco').getContext('2d');
  
  const config = {
    type: 'radar',
    data: {
      labels: ['Volatilidade', 'Drawdown', 'Correlação', 'Liquidez', 'Risco Total'],
      datasets: [
        {
          label: 'Aplicação Atual',
          data: [3.2, 2.8, 1.5, 2.0, 2.5],
          backgroundColor: 'rgba(52, 152, 219, 0.2)',
          borderColor: 'rgba(52, 152, 219, 1)',
          pointBackgroundColor: 'rgba(52, 152, 219, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(52, 152, 219, 1)'
        },
        {
          label: 'Média do Mercado',
          data: [2.5, 2.2, 2.8, 1.8, 2.3],
          backgroundColor: 'rgba(46, 204, 113, 0.2)',
          borderColor: 'rgba(46, 204, 113, 1)',
          pointBackgroundColor: 'rgba(46, 204, 113, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(46, 204, 113, 1)'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: {
            display: true
          },
          suggestedMin: 0,
          suggestedMax: 5
        }
      }
    }
  };
  
  const grafico = new Chart(ctx, config);
  
  return grafico;
}

// Atualizar visualização de prospecção
function atualizarProspeccao(aplicacao) {
  // Obter parâmetros da interface
  const horizonte = parseInt(document.getElementById('horizonte-prospeccao').value);
  const valorInicial = parseFloat(document.getElementById('valor-inicial').value);
  
  // Criar instância do projetor
  const projetor = new ProjecaoRentabilidade(dadosHistoricos, parametrosMercado);
  projetor.treinarModelos();
  
  // Gerar projeção
  const aplicacaoComValor = { ...aplicacao, valorInicial };
  const projecao = projetor.gerarProjecao(aplicacaoComValor, horizonte);
  
  // Atualizar gráfico
  atualizarGraficoProspeccao(graficoProspeccao, projecao, horizonte);
  
  // Atualizar tabela
  atualizarTabelaProspeccao(projecao, horizonte);
}

// Atualizar visualização de risco
function atualizarAnaliseRisco(aplicacao) {
  // Criar instância do analisador
  const analisador = new AnalisadorRisco(dadosHistoricos, parametrosMercado);
  
  // Analisar risco
  const analise = analisador.analisarRisco(aplicacao);
  
  // Atualizar interface
  document.getElementById('categoria-risco').textContent = analise.categoria;
  document.getElementById('explicacao-risco').textContent = analise.explicacao;
  
  // Posicionar marcador de risco
  const posicao = (analise.score / 5) * 100;
  document.getElementById('marcador-risco-atual').style.left = `${posicao}%`;
  
  // Atualizar componentes
  document.getElementById('valor-volatilidade').textContent = analise.componentes.volatilidade.toFixed(1);
  document.getElementById('barra-volatilidade').style.width = `${analise.componentes.volatilidade * 20}%`;
  
  document.getElementById('valor-drawdown').textContent = analise.componentes.drawdown.toFixed(1);
  document.getElementById('barra-drawdown').style.width = `${analise.componentes.drawdown * 20}%`;
  
  document.getElementById('valor-correlacao').textContent = analise.componentes.correlacao.toFixed(1);
  document.getElementById('barra-correlacao').style.width = `${analise.componentes.correlacao * 20}%`;
  
  document.getElementById('valor-liquidez').textContent = analise.componentes.liquidez.toFixed(1);
  document.getElementById('barra-liquidez').style.width = `${analise.componentes.liquidez * 20}%`;
  
  // Atualizar gráfico comparativo
  atualizarGraficoComparativoRisco(graficoComparativoRisco, analise);
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar gráficos
  const graficoProspeccao = inicializarGraficoProspeccao();
  const graficoComparativoRisco = inicializarGraficoComparativoRisco();
  
  // Carregar aplicação inicial
  const aplicacaoInicial = obterAplicacaoSelecionada();
  
  // Atualizar visualizações
  atualizarProspeccao(aplicacaoInicial);
  atualizarAnaliseRisco(aplicacaoInicial);
  
  // Configurar listeners para mudanças
  document.getElementById('horizonte-prospeccao').addEventListener('change', function() {
    atualizarProspeccao(obterAplicacaoSelecionada());
  });
  
  document.getElementById('valor-inicial').addEventListener('change', function() {
    atualizarProspeccao(obterAplicacaoSelecionada());
  });
  
  // Expor para debugging
  window.financeApp = {
    ...window.financeApp,
    graficoProspeccao,
    graficoComparativoRisco
  };
});
```

## Integração com o Restante do Site

### Conexão com Filtros e Alertas

```javascript
// Integrar prospecção e risco com sistema de filtros
function integrarComFiltros() {
  // Obter elementos do DOM
  const filtros = document.querySelectorAll('.filtro-aplicacao');
  
  // Adicionar listeners para mudanças nos filtros
  filtros.forEach(filtro => {
    filtro.addEventListener('change', function() {
      // Obter aplicações filtradas
      const aplicacoesFiltradas = aplicarFiltros(aplicacoesDisponiveis, obterFiltrosAtivos());
      
      // Atualizar visualizações para a primeira aplicação filtrada
      if (aplicacoesFiltradas.length > 0) {
        atualizarProspeccao(aplicacoesFiltradas[0]);
        atualizarAnaliseRisco(aplicacoesFiltradas[0]);
      }
    });
  });
}

// Integrar prospecção e risco com sistema de alertas
function integrarComAlertas(alertaManager) {
  // Adicionar listener para eventos de alertas
  document.addEventListener('alertas-atualizados', function(evento) {
    const alertas = evento.detail;
    
    // Atualizar prospecção e risco para aplicações recomendadas
    if (alertas.recomendados.length > 0) {
      const aplicacaoRecomendada = obterAplicacaoPorId(alertas.recomendados[0].id);
      if (aplicacaoRecomendada) {
        atualizarProspeccao(aplicacaoRecomendada);
        atualizarAnaliseRisco(aplicacaoRecomendada);
      }
    }
  });
  
  // Adicionar listeners para cliques nos alertas
  document.addEventListener('click', function(evento) {
    const elementoAlerta = evento.target.closest('.alerta-item');
    if (elementoAlerta) {
      const idAplicacao = elementoAlerta.id.replace('alerta-', '');
      const aplicacao = obterAplicacaoPorId(idAplicacao);
      
      if (aplicacao) {
        atualizarProspeccao(aplicacao);
        atualizarAnaliseRisco(aplicacao);
      }
    }
  });
}
```

### Integração com Calculadoras

```javascript
// Integrar prospecção com calculadoras
function integrarComCalculadoras() {
  // Obter elementos do DOM
  const calculadoraRentabilidade = document.getElementById('calculadora-rentabilidade');
  const calculadoraObjetivos = document.getElementById('calculadora-objetivos');
  
  // Adicionar listener para calculadora de rentabilidade
  if (calculadoraRentabilidade) {
    calculadoraRentabilidade.addEventListener('submit', function(evento) {
      evento.preventDefault();
      
      // Obter valores da calculadora
      const valorInicial = parseFloat(document.getElementById('calc-valor-inicial').value);
      const prazo = parseInt(document.getElementById('calc-prazo').value);
      const tipoAplicacao = document.getElementById('calc-tipo-aplicacao').value;
      
      // Encontrar aplicação correspondente
      const aplicacao = aplicacoesDisponiveis.find(app => app.tipo === tipoAplicacao);
      
      if (aplicacao) {
        // Atualizar valor inicial na interface de prospecção
        document.getElementById('valor-inicial').value = valorInicial;
        
        // Atualizar horizonte na interface de prospecção
        const horizonteSelect = document.getElementById('horizonte-prospeccao');
        for (let i = 0; i < horizonteSelect.options.length; i++) {
          if (parseInt(horizonteSelect.options[i].value) >= prazo) {
            horizonteSelect.selectedIndex = i;
            break;
          }
        }
        
        // Atualizar visualizações
        atualizarProspeccao(aplicacao);
        atualizarAnaliseRisco(aplicacao);
      }
    });
  }
  
  // Adicionar listener para calculadora de objetivos
  if (calculadoraObjetivos) {
    calculadoraObjetivos.addEventListener('submit', function(evento) {
      evento.preventDefault();
      
      // Obter valores da calculadora
      const valorObjetivo = parseFloat(document.getElementById('calc-valor-objetivo').value);
      const prazoObjetivo = parseInt(document.getElementById('calc-prazo-objetivo').value);
      const perfilRisco = document.getElementById('calc-perfil-risco').value;
      
      // Encontrar aplicações adequadas ao perfil
      const aplicacoesAdequadas = aplicacoesDisponiveis.filter(app => {
        const categoriaRisco = new AnalisadorRisco(dadosHistoricos, parametrosMercado)
          .analisarRisco(app).categoria;
        
        if (perfilRisco === 'conservador' && ['Muito Baixo', 'Baixo'].includes(categoriaRisco)) {
          return true;
        } else if (perfilRisco === 'moderado' && ['Baixo', 'Moderado'].includes(categoriaRisco)) {
          return true;
        } else if (perfilRisco === 'arrojado') {
          return true;
        }
        
        return false;
      });
      
      if (aplicacoesAdequadas.length > 0) {
        // Ordenar por rentabilidade esperada
        aplicacoesAdequadas.sort((a, b) => b.rentabilidadeAnual - a.rentabilidadeAnual);
        
        // Atualizar visualizações para a melhor aplicação
        atualizarProspeccao(aplicacoesAdequadas[0]);
        atualizarAnaliseRisco(aplicacoesAdequadas[0]);
      }
    });
  }
}
```

## Explicações para Iniciantes

### Tooltips Explicativos

```javascript
// Adicionar tooltips explicativos para termos técnicos
function adicionarTooltipsExplicativos() {
  const termosTecnicos = {
    'volatilidade': 'Medida de quanto o valor de um investimento oscila ao longo do tempo. Maior volatilidade significa maiores oscilações.',
    'drawdown': 'A maior queda percentual que um investimento sofreu do seu ponto mais alto ao mais baixo em um período.',
    'correlação': 'Indica o quanto o investimento tende a se mover na mesma direção que o mercado geral.',
    'liquidez': 'Facilidade de transformar o investimento em dinheiro sem perda significativa de valor.',
    'cenário-pessimista': 'Projeção considerando condições de mercado desfavoráveis.',
    'cenário-realista': 'Projeção considerando condições de mercado normais ou esperadas.',
    'cenário-otimista': 'Projeção considerando condições de mercado favoráveis.'
  };
  
  // Adicionar tooltips aos elementos
  for (const termo in termosTecnicos) {
    const elementos = document.querySelectorAll(`.${termo}, [data-termo="${termo}"]`);
    
    elementos.forEach(elemento => {
      // Adicionar ícone de informação
      const icone = document.createElement('span');
      icone.className = 'icone-info';
      icone.innerHTML = '?';
      icone.title = termosTecnicos[termo];
      
      // Adicionar ao elemento
      elemento.appendChild(icone);
      
      // Configurar tooltip (usando biblioteca como Tippy.js ou Bootstrap)
      tippy(icone, {
        content: termosTecnicos[termo],
        placement: 'top',
        arrow: true,
        theme: 'light-border'
      });
    });
  }
}
```

### Guia Visual para Iniciantes

```html
<div class="guia-iniciantes">
  <h3>Entendendo Prospecção e Risco</h3>
  
  <div class="guia-item">
    <div class="guia-icone">
      <i class="fas fa-chart-line"></i>
    </div>
    <div class="guia-conteudo">
      <h4>O que é Prospecção Futura?</h4>
      <p>A prospecção futura mostra como seu investimento pode evoluir ao longo do tempo. Apresentamos três cenários:</p>
      <ul>
        <li><strong>Otimista:</strong> Considera condições favoráveis de mercado</li>
        <li><strong>Realista:</strong> Baseado nas condições atuais e tendências</li>
        <li><strong>Pessimista:</strong> Considera condições desfavoráveis</li>
      </ul>
      <p>Lembre-se: Projeções são estimativas baseadas em dados históricos e não garantem resultados futuros.</p>
    </div>
  </div>
  
  <div class="guia-item">
    <div class="guia-icone">
      <i class="fas fa-shield-alt"></i>
    </div>
    <div class="guia-conteudo">
      <h4>O que é Análise de Risco?</h4>
      <p>A análise de risco avalia o potencial de perda ou oscilação do seu investimento. Consideramos:</p>
      <ul>
        <li><strong>Volatilidade:</strong> Quanto o valor oscila no curto prazo</li>
        <li><strong>Drawdown:</strong> Maior queda histórica do investimento</li>
        <li><strong>Correlação:</strong> Como se comporta em relação ao mercado geral</li>
        <li><strong>Liquidez:</strong> Facilidade de resgatar seu dinheiro</li>
      </ul>
      <p>Categorias de risco vão de "Muito Baixo" a "Muito Alto". Escolha de acordo com seu perfil de investidor.</p>
    </div>
  </div>
  
  <div class="guia-item">
    <div class="guia-icone">
      <i class="fas fa-user-check"></i>
    </div>
    <div class="guia-conteudo">
      <h4>Como Usar Essas Informações?</h4>
      <p>Siga estes passos para tomar decisões mais informadas:</p>
      <ol>
        <li>Defina seu objetivo financeiro e horizonte de investimento</li>
        <li>Identifique seu perfil de risco (conservador, moderado ou arrojado)</li>
        <li>Compare diferentes aplicações usando os gráficos de prospecção</li>
        <li>Verifique se o nível de risco é adequado ao seu perfil</li>
        <li>Observe os alertas verdes (recomendados) e vermelhos (não recomendados)</li>
        <li>Diversifique seus investimentos para reduzir riscos</li>
      </ol>
    </div>
  </div>
</div>
```

## Testes e Validação

### Testes de Precisão

- Comparar projeções com dados históricos reais
- Validar modelos com diferentes cenários econômicos
- Verificar consistência das classificações de risco

### Testes de Usabilidade

- Verificar compreensão por usuários iniciantes
- Validar clareza das explicações e tooltips
- Confirmar que as visualizações são intuitivas

### Testes de Responsividade

- Garantir que gráficos e tabelas se adaptam a dispositivos móveis
- Verificar legibilidade em telas pequenas
- Testar interações touch para ajustes de parâmetros
