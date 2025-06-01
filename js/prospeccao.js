// Sistema de prospecção financeira e alertas em tempo real para finança.com

// Importação de APIs e configurações
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar sistema de prospecção
    inicializarProspeccao();
    
    // Buscar dados em tempo real
    buscarDadosTempoReal();
    
    // Configurar atualizações periódicas
    setInterval(buscarDadosTempoReal, 60000); // Atualiza a cada minuto
});

// Função para inicializar o sistema de prospecção
function inicializarProspeccao() {
    const aplicacaoSelect = document.getElementById('aplicacao-prospeccao');
    const horizonteSelect = document.getElementById('horizonte-prospeccao');
    const valorInicialInput = document.getElementById('valor-inicial');
    
    // Configurar eventos de mudança
    if (aplicacaoSelect && horizonteSelect && valorInicialInput) {
        const atualizarProspeccao = function() {
            const aplicacao = aplicacaoSelect.value;
            const horizonte = parseInt(horizonteSelect.value);
            const valorInicial = parseFloat(valorInicialInput.value);
            
            if (!isNaN(horizonte) && !isNaN(valorInicial)) {
                calcularProspeccao(aplicacao, horizonte, valorInicial);
            }
        };
        
        aplicacaoSelect.addEventListener('change', atualizarProspeccao);
        horizonteSelect.addEventListener('change', atualizarProspeccao);
        valorInicialInput.addEventListener('input', atualizarProspeccao);
        
        // Inicializar com valores padrão
        atualizarProspeccao();
    }
}

// Função para calcular prospecção futura
function calcularProspeccao(aplicacao, horizonte, valorInicial) {
    // Taxas de retorno estimadas por aplicação (dados simulados)
    const taxasRetorno = {
        'cdb': {
            otimista: 0.12, // 12% ao ano
            realista: 0.105, // 10.5% ao ano
            pessimista: 0.09 // 9% ao ano
        },
        'lca': {
            otimista: 0.11, // 11% ao ano
            realista: 0.095, // 9.5% ao ano
            pessimista: 0.08 // 8% ao ano
        },
        'tesouro': {
            otimista: 0.13, // 13% ao ano
            realista: 0.115, // 11.5% ao ano
            pessimista: 0.10 // 10% ao ano
        },
        'fundo-acoes': {
            otimista: 0.25, // 25% ao ano
            realista: 0.15, // 15% ao ano
            pessimista: 0.05 // 5% ao ano (ou até negativo)
        }
    };
    
    // Obter taxas para a aplicação selecionada
    const taxas = taxasRetorno[aplicacao] || taxasRetorno['cdb'];
    
    // Calcular valores para cada mês do horizonte
    const meses = horizonte;
    const labels = ['Hoje'];
    
    // Dados para os três cenários
    const dadosOtimista = [valorInicial];
    const dadosRealista = [valorInicial];
    const dadosPessimista = [valorInicial];
    
    // Calcular valores mensais
    for (let i = 1; i <= meses; i++) {
        labels.push(`${i} ${i === 1 ? 'mês' : 'meses'}`);
        
        // Cálculo composto mensal
        const fatorOtimista = Math.pow(1 + taxas.otimista / 12, i);
        const fatorRealista = Math.pow(1 + taxas.realista / 12, i);
        const fatorPessimista = Math.pow(1 + taxas.pessimista / 12, i);
        
        dadosOtimista.push(valorInicial * fatorOtimista);
        dadosRealista.push(valorInicial * fatorRealista);
        dadosPessimista.push(valorInicial * fatorPessimista);
    }
    
    // Atualizar gráfico de prospecção
    const graficoProspeccao = Chart.getChart('grafico-prospeccao-futura');
    
    if (graficoProspeccao) {
        graficoProspeccao.data.labels = labels;
        graficoProspeccao.data.datasets[0].data = dadosOtimista;
        graficoProspeccao.data.datasets[1].data = dadosRealista;
        graficoProspeccao.data.datasets[2].data = dadosPessimista;
        graficoProspeccao.update();
    }
    
    // Atualizar alertas baseados na prospecção
    atualizarAlertasProspeccao(aplicacao, dadosRealista[meses]);
}

// Função para atualizar alertas baseados na prospecção
function atualizarAlertasProspeccao(aplicacao, valorFinal) {
    // Lógica para determinar se a aplicação é recomendada
    const recomendacoes = {
        'cdb': {
            status: 'verde',
            mensagem: 'Rentabilidade acima do CDI'
        },
        'lca': {
            status: 'neutro',
            mensagem: 'Rentabilidade próxima ao CDI, mas com isenção fiscal'
        },
        'tesouro': {
            status: 'verde',
            mensagem: 'Proteção contra inflação com boa rentabilidade'
        },
        'fundo-acoes': {
            status: 'neutro',
            mensagem: 'Potencial de alta rentabilidade, mas com maior risco'
        }
    };
    
    // Obter recomendação para a aplicação selecionada
    const recomendacao = recomendacoes[aplicacao] || recomendacoes['cdb'];
    
    // Atualizar alertas existentes
    const alertaIds = {
        'cdb': 'alerta-cdb',
        'tesouro': 'alerta-tesouro',
        'poupanca': 'alerta-poupanca'
    };
    
    // Se a aplicação tem um alerta específico, atualizá-lo
    if (alertaIds[aplicacao]) {
        const alertaElement = document.getElementById(alertaIds[aplicacao]);
        if (alertaElement) {
            const descricaoElement = alertaElement.querySelector('.alerta-descricao');
            if (descricaoElement) {
                descricaoElement.textContent = recomendacao.mensagem;
            }
        }
    }
}

// Função para buscar dados em tempo real do mercado financeiro
async function buscarDadosTempoReal() {
    try {
        // Simulação de busca de dados em tempo real (em produção, usaria APIs reais)
        const dadosSimulados = {
            ibovespa: {
                valor: gerarValorAleatorio(120000, 130000, 0),
                variacao: gerarValorAleatorio(-1.5, 1.5, 2)
            },
            cdi: {
                valor: gerarValorAleatorio(10.5, 11.0, 2),
                variacao: 'a.a.'
            },
            selic: {
                valor: gerarValorAleatorio(10.5, 11.0, 2),
                variacao: 'a.a.'
            },
            dolar: {
                valor: gerarValorAleatorio(5.0, 5.3, 2),
                variacao: gerarValorAleatorio(-0.8, 0.8, 2)
            }
        };
        
        // Atualizar elementos na interface
        atualizarIndicesInterface(dadosSimulados);
        
        // Analisar dados e gerar alertas
        analisarDadosEGerarAlertas(dadosSimulados);
        
        console.log('Dados do mercado atualizados com sucesso');
    } catch (erro) {
        console.error('Erro ao buscar dados do mercado:', erro);
    }
}

// Função para gerar valor aleatório (simulação)
function gerarValorAleatorio(min, max, casasDecimais) {
    const valor = Math.random() * (max - min) + min;
    return Number(valor.toFixed(casasDecimais));
}

// Função para atualizar índices na interface
function atualizarIndicesInterface(dados) {
    // Atualizar IBOVESPA
    const ibovespaValor = document.getElementById('ibovespa-valor');
    const ibovespaVariacao = document.getElementById('ibovespa-variacao');
    
    if (ibovespaValor && ibovespaVariacao) {
        ibovespaValor.textContent = Math.round(dados.ibovespa.valor).toLocaleString('pt-BR');
        ibovespaVariacao.textContent = (dados.ibovespa.variacao > 0 ? '+' : '') + dados.ibovespa.variacao + '%';
        ibovespaVariacao.className = 'indice-variacao ' + (dados.ibovespa.variacao >= 0 ? 'positiva' : 'negativa');
    }
    
    // Atualizar CDI
    const cdiValor = document.getElementById('cdi-valor');
    if (cdiValor) {
        cdiValor.textContent = dados.cdi.valor + '%';
    }
    
    // Atualizar SELIC
    const selicValor = document.getElementById('selic-valor');
    if (selicValor) {
        selicValor.textContent = dados.selic.valor + '%';
    }
    
    // Atualizar Dólar
    const dolarValor = document.getElementById('dolar-valor');
    const dolarVariacao = document.getElementById('dolar-variacao');
    
    if (dolarValor && dolarVariacao) {
        dolarValor.textContent = 'R$ ' + dados.dolar.valor.toFixed(2);
        dolarVariacao.textContent = (dados.dolar.variacao > 0 ? '+' : '') + dados.dolar.variacao + '%';
        dolarVariacao.className = 'indice-variacao ' + (dados.dolar.variacao >= 0 ? 'positiva' : 'negativa');
    }
    
    // Atualizar gráficos com novos dados
    atualizarGraficosIndices(dados);
}

// Função para atualizar gráficos de índices
function atualizarGraficosIndices(dados) {
    // Obter gráficos existentes
    const graficoIbovespa = Chart.getChart('grafico-ibovespa');
    const graficoCdi = Chart.getChart('grafico-cdi');
    const graficoSelic = Chart.getChart('grafico-selic');
    const graficoDolar = Chart.getChart('grafico-dolar');
    
    // Função para adicionar novo ponto a um gráfico
    function adicionarPontoAoGrafico(grafico, novoPonto) {
        if (grafico && grafico.data && grafico.data.datasets && grafico.data.datasets[0]) {
            const dataset = grafico.data.datasets[0];
            
            // Remover primeiro ponto se já tiver 6 pontos
            if (dataset.data.length >= 6) {
                dataset.data.shift();
            }
            
            // Adicionar novo ponto
            dataset.data.push(novoPonto);
            
            // Atualizar gráfico
            grafico.update();
        }
    }
    
    // Atualizar cada gráfico
    if (graficoIbovespa) adicionarPontoAoGrafico(graficoIbovespa, dados.ibovespa.valor);
    if (graficoCdi) adicionarPontoAoGrafico(graficoCdi, dados.cdi.valor);
    if (graficoSelic) adicionarPontoAoGrafico(graficoSelic, dados.selic.valor);
    if (graficoDolar) adicionarPontoAoGrafico(graficoDolar, dados.dolar.valor);
}

// Função para analisar dados e gerar alertas
function analisarDadosEGerarAlertas(dados) {
    // Lógica de análise para determinar recomendações
    const recomendacoes = [];
    
    // Exemplo de lógica de análise (simplificada)
    // Em um sistema real, usaria algoritmos mais complexos e dados históricos
    
    // Análise do IBOVESPA
    if (dados.ibovespa.variacao > 1.0) {
        recomendacoes.push({
            tipo: 'verde',
            titulo: 'Fundo de Ações BB',
            descricao: 'Momento favorável para investir em ações',
            id: 'alerta-acoes'
        });
    } else if (dados.ibovespa.variacao < -1.0) {
        recomendacoes.push({
            tipo: 'vermelho',
            titulo: 'Fundo de Ações BB',
            descricao: 'Momento desfavorável para investir em ações',
            id: 'alerta-acoes'
        });
    }
    
    // Análise do CDI vs SELIC
    const spreadCdiSelic = dados.cdi.valor - dados.selic.valor;
    
    if (spreadCdiSelic > 0.1) {
        recomendacoes.push({
            tipo: 'verde',
            titulo: 'CDB Banco do Brasil',
            descricao: 'CDI acima da SELIC, favorável para CDBs',
            id: 'alerta-cdb'
        });
    }
    
    // Análise do Dólar
    if (dados.dolar.variacao < -0.5) {
        recomendacoes.push({
            tipo: 'verde',
            titulo: 'Tesouro IPCA+',
            descricao: 'Dólar em queda, favorável para títulos indexados à inflação',
            id: 'alerta-tesouro'
        });
    }
    
    // Sempre manter alerta sobre poupança
    recomendacoes.push({
        tipo: 'vermelho',
        titulo: 'Poupança',
        descricao: 'Rentabilidade abaixo da inflação',
        id: 'alerta-poupanca'
    });
    
    // Atualizar alertas na interface
    atualizarAlertasInterface(recomendacoes);
}

// Função para atualizar alertas na interface
function atualizarAlertasInterface(recomendacoes) {
    // Atualizar alertas existentes
    recomendacoes.forEach(recomendacao => {
        const alertaElement = document.getElementById(recomendacao.id);
        
        if (alertaElement) {
            // Atualizar alerta existente
            const descricaoElement = alertaElement.querySelector('.alerta-descricao');
            if (descricaoElement) {
                descricaoElement.textContent = recomendacao.descricao;
            }
            
            // Atualizar classe do alerta
            alertaElement.className = `alerta-item alerta-${recomendacao.tipo} pulsando`;
            
            // Atualizar indicador
            const indicadorElement = alertaElement.querySelector('.indicador-alerta');
            if (indicadorElement) {
                indicadorElement.className = `indicador-alerta indicador-${recomendacao.tipo}`;
            }
        } else {
            // Criar novo alerta se não existir
            const containerId = recomendacao.tipo === 'verde' ? 'lista-recomendados' : 'lista-nao-recomendados';
            const container = document.getElementById(containerId);
            
            if (container) {
                const novoAlerta = document.createElement('div');
                novoAlerta.id = recomendacao.id;
                novoAlerta.className = `alerta-item alerta-${recomendacao.tipo} pulsando`;
                novoAlerta.innerHTML = `
                    <span class="indicador-alerta indicador-${recomendacao.tipo}"></span>
                    <div class="alerta-conteudo">
                        <div class="alerta-titulo">${recomendacao.titulo}</div>
                        <div class="alerta-descricao">${recomendacao.descricao}</div>
                    </div>
                `;
                
                container.appendChild(novoAlerta);
            }
        }
    });
}

// Função para integrar com APIs financeiras reais (implementação futura)
async function buscarDadosAPI() {
    // Em um ambiente de produção, esta função faria chamadas para APIs financeiras reais
    // Exemplo de implementação com Yahoo Finance API:
    
    /*
    try {
        // Importar cliente de API
        const ApiClient = window.ApiClient;
        const client = new ApiClient();
        
        // Buscar dados de ações
        const dadosIbovespa = await client.call_api('YahooFinance/get_stock_insights', {
            symbol: '^BVSP'
        });
        
        // Buscar análises de mercado
        const analisesMercado = await client.call_api('YahooFinance/get_stock_what_analyst_are_saying', {
            symbol: 'BBAS3.SA,PETR4.SA,VALE3.SA',
            region: 'BR',
            lang: 'pt-BR'
        });
        
        // Processar dados e atualizar interface
        processarDadosAPI(dadosIbovespa, analisesMercado);
    } catch (erro) {
        console.error('Erro ao buscar dados da API:', erro);
        // Fallback para dados simulados
        buscarDadosTempoReal();
    }
    */
}

// Exportar funções para uso global
window.financeProspeccao = {
    inicializar: inicializarProspeccao,
    calcular: calcularProspeccao,
    atualizarDados: buscarDadosTempoReal,
    analisarMercado: analisarDadosEGerarAlertas
};
