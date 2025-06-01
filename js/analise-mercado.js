// Sistema de análise de mercado para finança.com
// Desenvolvido por Harrison Costa

document.addEventListener('DOMContentLoaded', function() {
    // Dados de mercado em tempo real (simulados)
    const dadosMercado = {
        ibovespa: {
            atual: 125670,
            variacao: -1.24,
            historico: gerarHistoricoSimulado(125670, 2000, 30)
        },
        dolar: {
            atual: 5.16,
            variacao: 0.14,
            historico: gerarHistoricoSimulado(5.16, 0.15, 30)
        },
        selic: {
            atual: 10.85,
            variacao: 0,
            historico: [10.75, 10.75, 10.75, 10.75, 10.85, 10.85, 10.85]
        },
        bbas3: {
            atual: 58.24,
            variacao: 0.87,
            historico: gerarHistoricoSimulado(58.24, 2.5, 30)
        },
        bbouro: {
            atual: 342.75,
            variacao: 1.32,
            historico: gerarHistoricoSimulado(342.75, 8, 30)
        },
        tesouroSelic: {
            atual: 12045.78,
            variacao: 0.05,
            historico: gerarHistoricoSimulado(12045.78, 20, 30)
        },
        tesouroIPCA: {
            atual: 3245.67,
            variacao: -0.12,
            historico: gerarHistoricoSimulado(3245.67, 15, 30)
        },
        tesouroPre: {
            atual: 945.32,
            variacao: -0.23,
            historico: gerarHistoricoSimulado(945.32, 10, 30)
        }
    };
    
    // Dados de notícias do mercado (simulados)
    const noticias = [
        {
            titulo: "Banco Central mantém taxa Selic em 10,85% ao ano",
            resumo: "Comitê de Política Monetária (Copom) decide por unanimidade manter a taxa básica de juros, citando preocupações com a inflação.",
            fonte: "Agência Brasil",
            data: "Hoje, 14:30"
        },
        {
            titulo: "BBAS3 sobe após anúncio de dividendos extraordinários",
            resumo: "Ações do Banco do Brasil sobem mais de 2% após anúncio de distribuição de dividendos acima do esperado pelo mercado.",
            fonte: "InfoMoney",
            data: "Hoje, 11:45"
        },
        {
            titulo: "Dólar opera em alta com tensões geopolíticas",
            resumo: "Moeda americana se valoriza frente ao real em meio a incertezas no cenário internacional e dados econômicos dos EUA.",
            fonte: "Valor Econômico",
            data: "Hoje, 10:20"
        },
        {
            titulo: "Ibovespa recua pressionado por commodities",
            resumo: "Principal índice da bolsa brasileira opera em queda, com destaque para o setor de mineração e petróleo.",
            fonte: "Exame",
            data: "Hoje, 09:15"
        },
        {
            titulo: "Tesouro Direto: títulos indexados à inflação têm alta procura",
            resumo: "Investidores buscam proteção contra a inflação, aumentando a demanda por títulos IPCA+.",
            fonte: "Investing.com",
            data: "Ontem, 18:40"
        },
        {
            titulo: "Ouro atinge nova máxima histórica em dólares",
            resumo: "Metal precioso continua trajetória de valorização em meio a incertezas econômicas globais.",
            fonte: "Reuters",
            data: "Ontem, 16:25"
        }
    ];
    
    // Dados de calendário econômico (simulados)
    const calendarioEconomico = [
        {
            data: "Hoje, 14:30",
            evento: "Decisão de Taxa de Juros",
            detalhe: "Banco Central do Brasil",
            impacto: "alto"
        },
        {
            data: "Amanhã, 09:00",
            evento: "Índice de Preços ao Consumidor (IPCA)",
            detalhe: "IBGE",
            impacto: "alto"
        },
        {
            data: "Amanhã, 10:30",
            evento: "Balança Comercial",
            detalhe: "Ministério da Economia",
            impacto: "medio"
        },
        {
            data: "23/06, 09:30",
            evento: "Taxa de Desemprego",
            detalhe: "IBGE",
            impacto: "alto"
        },
        {
            data: "24/06, 08:00",
            evento: "Índice de Confiança do Consumidor",
            detalhe: "FGV",
            impacto: "medio"
        },
        {
            data: "25/06, 14:30",
            evento: "Ata do Copom",
            detalhe: "Banco Central do Brasil",
            impacto: "alto"
        },
        {
            data: "28/06, 09:00",
            evento: "Relatório Trimestral de Inflação",
            detalhe: "Banco Central do Brasil",
            impacto: "medio"
        },
        {
            data: "30/06, 10:00",
            evento: "Produção Industrial",
            detalhe: "IBGE",
            impacto: "baixo"
        }
    ];
    
    // Dados de análise técnica (simulados)
    const analiseTecnica = {
        ibovespa: [
            { nome: "Média Móvel 20", valor: "124.850", sinal: "venda" },
            { nome: "Média Móvel 50", valor: "123.200", sinal: "venda" },
            { nome: "RSI (14)", valor: "42.5", sinal: "neutro" },
            { nome: "MACD", valor: "-320", sinal: "venda" },
            { nome: "Bandas de Bollinger", valor: "Inferior", sinal: "compra" },
            { nome: "Estocástico", valor: "28.4", sinal: "compra" }
        ],
        dolar: [
            { nome: "Média Móvel 20", valor: "5.12", sinal: "compra" },
            { nome: "Média Móvel 50", valor: "5.08", sinal: "compra" },
            { nome: "RSI (14)", valor: "58.2", sinal: "neutro" },
            { nome: "MACD", valor: "0.04", sinal: "compra" },
            { nome: "Bandas de Bollinger", valor: "Média", sinal: "neutro" },
            { nome: "Estocástico", valor: "65.7", sinal: "neutro" }
        ],
        bbas3: [
            { nome: "Média Móvel 20", valor: "57.80", sinal: "compra" },
            { nome: "Média Móvel 50", valor: "56.40", sinal: "compra" },
            { nome: "RSI (14)", valor: "62.8", sinal: "neutro" },
            { nome: "MACD", valor: "0.75", sinal: "compra" },
            { nome: "Bandas de Bollinger", valor: "Superior", sinal: "venda" },
            { nome: "Estocástico", valor: "78.3", sinal: "venda" }
        ]
    };
    
    // Dados de projeções de mercado (simulados)
    const projecoesMercado = {
        labels: ["IPCA", "PIB", "Selic", "Dólar", "Ibovespa"],
        atual: [4.23, 2.1, 10.85, 5.16, 125670],
        projecao3m: [4.1, 2.2, 10.85, 5.2, 130000],
        projecao6m: [3.9, 2.4, 10.5, 5.1, 135000],
        projecao12m: [3.7, 2.6, 10.0, 5.0, 142000]
    };
    
    // Função para gerar histórico simulado
    function gerarHistoricoSimulado(valorAtual, volatilidade, dias) {
        const historico = [];
        let valor = valorAtual;
        
        // Gerar valores para dias anteriores (do mais antigo para o mais recente)
        for (let i = dias; i > 0; i--) {
            // Variação aleatória com tendência baseada na variação atual
            const variacao = (Math.random() - 0.5) * volatilidade * 0.1;
            valor = valor - variacao;
            historico.push(valor);
        }
        
        // Adicionar valor atual
        historico.push(valorAtual);
        
        return historico;
    }
    
    // Função para formatar variação com sinal e cor
    function formatarVariacao(variacao) {
        const sinal = variacao >= 0 ? '+' : '';
        const classe = variacao >= 0 ? 'positiva' : 'negativa';
        const icone = variacao >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';
        
        return {
            texto: `${sinal}${variacao.toFixed(2)}%`,
            classe: classe,
            icone: icone
        };
    }
    
    // Inicializar gráfico principal
    function inicializarGraficoPrincipal() {
        const ctx = document.getElementById('grafico-ibovespa-principal').getContext('2d');
        const periodoSelect = document.getElementById('periodo-grafico');
        const tipoSelect = document.getElementById('tipo-grafico');
        
        // Dados iniciais (1 mês)
        const dadosIniciais = dadosMercado.ibovespa.historico;
        const labels = Array.from({length: dadosIniciais.length}, (_, i) => i + 1);
        
        // Criar gráfico
        const graficoPrincipal = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'IBOVESPA',
                    data: dadosIniciais,
                    borderColor: '#2e86de',
                    backgroundColor: 'rgba(46, 134, 222, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
        
        // Event listeners para controles
        periodoSelect.addEventListener('change', function() {
            atualizarGraficoPrincipal(graficoPrincipal, this.value, tipoSelect.value);
        });
        
        tipoSelect.addEventListener('change', function() {
            atualizarGraficoPrincipal(graficoPrincipal, periodoSelect.value, this.value);
        });
        
        return graficoPrincipal;
    }
    
    // Função para atualizar gráfico principal
    function atualizarGraficoPrincipal(grafico, periodo, tipo) {
        // Determinar quantidade de dados baseado no período
        let quantidadeDados;
        switch(periodo) {
            case '1d': quantidadeDados = 1; break;
            case '5d': quantidadeDados = 5; break;
            case '1m': quantidadeDados = 30; break;
            case '3m': quantidadeDados = 90; break;
            case '6m': quantidadeDados = 180; break;
            case '1y': quantidadeDados = 365; break;
            case '5y': quantidadeDados = 365 * 5; break;
            default: quantidadeDados = 30;
        }
        
        // Limitar à quantidade disponível
        quantidadeDados = Math.min(quantidadeDados, dadosMercado.ibovespa.historico.length);
        
        // Obter dados para o período
        const dados = dadosMercado.ibovespa.historico.slice(-quantidadeDados);
        const labels = Array.from({length: dados.length}, (_, i) => i + 1);
        
        // Atualizar tipo de gráfico
        grafico.config.type = tipo === 'candle' ? 'bar' : (tipo === 'area' ? 'line' : tipo);
        
        // Atualizar configuração de fill para tipo área
        grafico.data.datasets[0].fill = tipo === 'area';
        
        // Atualizar dados
        grafico.data.labels = labels;
        grafico.data.datasets[0].data = dados;
        
        grafico.update();
    }
    
    // Inicializar mini gráficos
    function inicializarMiniGraficos() {
        // Mini gráfico IBOVESPA
        const ctxIbovespa = document.getElementById('mini-grafico-ibovespa').getContext('2d');
        const miniGraficoIbovespa = new Chart(ctxIbovespa, {
            type: 'line',
            data: {
                labels: Array(10).fill(''),
                datasets: [{
                    data: dadosMercado.ibovespa.historico.slice(-10),
                    borderColor: dadosMercado.ibovespa.variacao >= 0 ? '#2ecc71' : '#e74c3c',
                    backgroundColor: 'transparent',
                    pointRadius: 0,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false
                    }
                }
            }
        });
        
        // Mini gráfico Dólar
        const ctxDolar = document.getElementById('mini-grafico-dolar').getContext('2d');
        const miniGraficoDolar = new Chart(ctxDolar, {
            type: 'line',
            data: {
                labels: Array(10).fill(''),
                datasets: [{
                    data: dadosMercado.dolar.historico.slice(-10),
                    borderColor: dadosMercado.dolar.variacao >= 0 ? '#2ecc71' : '#e74c3c',
                    backgroundColor: 'transparent',
                    pointRadius: 0,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false
                    }
                }
            }
        });
        
        // Mini gráfico Selic
        const ctxSelic = document.getElementById('mini-grafico-selic').getContext('2d');
        const miniGraficoSelic = new Chart(ctxSelic, {
            type: 'line',
            data: {
                labels: Array(7).fill(''),
                datasets: [{
                    data: dadosMercado.selic.historico,
                    borderColor: '#3498db',
                    backgroundColor: 'transparent',
                    pointRadius: 0,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false
                    }
                }
            }
        });
        
        return {
            ibovespa: miniGraficoIbovespa,
            dolar: miniGraficoDolar,
            selic: miniGraficoSelic
        };
    }
    
    // Inicializar gráfico de projeções
    function inicializarGraficoProjecoes() {
        const ctx = document.getElementById('grafico-projecoes').getContext('2d');
        
        // Normalizar dados para exibição no gráfico
        const normalizarDados = (dados, labels) => {
            const normalizado = {};
            
            labels.forEach((label, index) => {
                // Normalizar para percentual do valor atual
                if (label === 'Ibovespa') {
                    normalizado[label] = {
                        atual: 100,
                        projecao3m: (dados.projecao3m[index] / dados.atual[index]) * 100,
                        projecao6m: (dados.projecao6m[index] / dados.atual[index]) * 100,
                        projecao12m: (dados.projecao12m[index] / dados.atual[index]) * 100
                    };
                } else {
                    normalizado[label] = {
                        atual: 100,
                        projecao3m: (dados.projecao3m[index] / dados.atual[index]) * 100,
                        projecao6m: (dados.projecao6m[index] / dados.atual[index]) * 100,
                        projecao12m: (dados.projecao12m[index] / dados.atual[index]) * 100
                    };
                }
            });
            
            return normalizado;
        };
        
        const dadosNormalizados = normalizarDados(projecoesMercado, projecoesMercado.labels);
        
        // Preparar dados para o gráfico
        const dadosGrafico = {
            labels: projecoesMercado.labels,
            datasets: [
                {
                    label: 'Atual',
                    data: projecoesMercado.labels.map(label => 100),
                    backgroundColor: 'rgba(52, 152, 219, 0.5)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1
                },
                {
                    label: '3 meses',
                    data: projecoesMercado.labels.map(label => dadosNormalizados[label].projecao3m),
                    backgroundColor: 'rgba(46, 204, 113, 0.5)',
                    borderColor: 'rgba(46, 204, 113, 1)',
                    borderWidth: 1
                },
                {
                    label: '6 meses',
                    data: projecoesMercado.labels.map(label => dadosNormalizados[label].projecao6m),
                    backgroundColor: 'rgba(155, 89, 182, 0.5)',
                    borderColor: 'rgba(155, 89, 182, 1)',
                    borderWidth: 1
                },
                {
                    label: '12 meses',
                    data: projecoesMercado.labels.map(label => dadosNormalizados[label].projecao12m),
                    backgroundColor: 'rgba(230, 126, 34, 0.5)',
                    borderColor: 'rgba(230, 126, 34, 1)',
                    borderWidth: 1
                }
            ]
        };
        
        const graficoProjecoes = new Chart(ctx, {
            type: 'radar',
            data: dadosGrafico,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: false,
                        min: 90,
                        max: 120,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.raw.toFixed(1) + '%';
                                return label + ': ' + value;
                            }
                        }
                    }
                }
            }
        });
        
        return graficoProjecoes;
    }
    
    // Preencher notícias
    function preencherNoticias() {
        const noticiasLista = document.getElementById('noticias-lista');
        
        noticias.forEach(noticia => {
            const li = document.createElement('li');
            li.className = 'noticia-item';
            
            li.innerHTML = `
                <div class="noticia-titulo">${noticia.titulo}</div>
                <div class="noticia-resumo">${noticia.resumo}</div>
                <div class="noticia-meta">
                    <span>${noticia.fonte}</span>
                    <span>${noticia.data}</span>
                </div>
            `;
            
            noticiasLista.appendChild(li);
        });
    }
    
    // Preencher calendário econômico
    function preencherCalendario() {
        const calendarioContainer = document.getElementById('calendario-economico');
        
        calendarioEconomico.forEach(evento => {
            const div = document.createElement('div');
            div.className = 'evento-economico';
            
            div.innerHTML = `
                <div class="evento-data">${evento.data}</div>
                <div class="evento-info">
                    <div class="evento-titulo">${evento.evento}</div>
                    <div class="evento-detalhe">${evento.detalhe}</div>
                </div>
                <div class="evento-impacto impacto-${evento.impacto}">
                    ${'●'.repeat(evento.impacto === 'alto' ? 3 : (evento.impacto === 'medio' ? 2 : 1))}
                </div>
            `;
            
            calendarioContainer.appendChild(div);
        });
    }
    
    // Preencher análise técnica
    function preencherAnaliseTecnica() {
        // IBOVESPA
        const indicadoresIbovespa = document.getElementById('indicadores-ibovespa');
        analiseTecnica.ibovespa.forEach(indicador => {
            const div = document.createElement('div');
            div.className = 'indicador-tecnico';
            
            div.innerHTML = `
                <div class="indicador-tecnico-nome">${indicador.nome}</div>
                <div class="indicador-tecnico-valor">${indicador.valor}</div>
                <div class="indicador-tecnico-sinal sinal-${indicador.sinal}">${indicador.sinal.charAt(0).toUpperCase() + indicador.sinal.slice(1)}</div>
            `;
            
            indicadoresIbovespa.appendChild(div);
        });
        
        // Dólar
        const indicadoresDolar = document.getElementById('indicadores-dolar');
        analiseTecnica.dolar.forEach(indicador => {
            const div = document.createElement('div');
            div.className = 'indicador-tecnico';
            
            div.innerHTML = `
                <div class="indicador-tecnico-nome">${indicador.nome}</div>
                <div class="indicador-tecnico-valor">${indicador.valor}</div>
                <div class="indicador-tecnico-sinal sinal-${indicador.sinal}">${indicador.sinal.charAt(0).toUpperCase() + indicador.sinal.slice(1)}</div>
            `;
            
            indicadoresDolar.appendChild(div);
        });
        
        // BBAS3
        const indicadoresBBAS3 = document.getElementById('indicadores-bbas3');
        analiseTecnica.bbas3.forEach(indicador => {
            const div = document.createElement('div');
            div.className = 'indicador-tecnico';
            
            div.innerHTML = `
                <div class="indicador-tecnico-nome">${indicador.nome}</div>
                <div class="indicador-tecnico-valor">${indicador.valor}</div>
                <div class="indicador-tecnico-sinal sinal-${indicador.sinal}">${indicador.sinal.charAt(0).toUpperCase() + indicador.sinal.slice(1)}</div>
            `;
            
            indicadoresBBAS3.appendChild(div);
        });
        
        // Configurar tabs
        const tabs = document.querySelectorAll('.analise-tecnica-tab');
        const conteudos = document.querySelectorAll('.analise-tecnica-item');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remover classe active de todas as tabs e conteúdos
                tabs.forEach(t => t.classList.remove('active'));
                conteudos.forEach(c => c.classList.remove('active'));
                
                // Adicionar classe active à tab clicada e conteúdo correspondente
                this.classList.add('active');
                document.getElementById('analise-' + tabId).classList.add('active');
            });
        });
    }
    
    // Atualizar indicadores
    function atualizarIndicadores() {
        // IBOVESPA
        document.getElementById('ibovespa-valor-grande').textContent = dadosMercado.ibovespa.atual.toLocaleString('pt-BR');
        
        const variacaoIbovespa = formatarVariacao(dadosMercado.ibovespa.variacao);
        document.getElementById('ibovespa-variacao-grande').innerHTML = `
            <i class="fas ${variacaoIbovespa.icone}"></i>
            <span class="${variacaoIbovespa.classe}">${variacaoIbovespa.texto}</span>
        `;
        
        // Dólar
        document.getElementById('dolar-valor-grande').textContent = 'R$ ' + dadosMercado.dolar.atual.toFixed(2);
        
        const variacaoDolar = formatarVariacao(dadosMercado.dolar.variacao);
        document.getElementById('dolar-variacao-grande').innerHTML = `
            <i class="fas ${variacaoDolar.icone}"></i>
            <span class="${variacaoDolar.classe}">${variacaoDolar.texto}</span>
        `;
        
        // Selic
        document.getElementById('selic-valor-grande').textContent = dadosMercado.selic.atual.toFixed(2) + '%';
    }
    
    // Inicializar todos os componentes
    const graficoPrincipal = inicializarGraficoPrincipal();
    const miniGraficos = inicializarMiniGraficos();
    const graficoProjecoes = inicializarGraficoProjecoes();
    
    preencherNoticias();
    preencherCalendario();
    preencherAnaliseTecnica();
    atualizarIndicadores();
    
    // Atualizar dados em tempo real (simulado)
    setInterval(function() {
        // Simular pequenas variações nos dados de mercado
        Object.keys(dadosMercado).forEach(key => {
            if (key === 'selic') return; // Selic não varia constantemente
            
            const item = dadosMercado[key];
            const variacao = (Math.random() - 0.5) * 0.2; // Variação percentual
            const valorAnterior = item.atual;
            
            // Calcular novo valor
            item.atual = valorAnterior * (1 + variacao / 100);
            
            // Atualizar variação diária
            item.variacao = item.variacao + variacao;
            
            // Adicionar ao histórico
            item.historico.push(item.atual);
            
            // Manter histórico com tamanho limitado
            if (item.historico.length > 365) {
                item.historico.shift();
            }
        });
        
        // Atualizar indicadores na interface
        atualizarIndicadores();
        
        // Atualizar gráficos
        const periodoAtual = document.getElementById('periodo-grafico').value;
        const tipoAtual = document.getElementById('tipo-grafico').value;
        atualizarGraficoPrincipal(graficoPrincipal, periodoAtual, tipoAtual);
        
        // Atualizar mini gráficos
        miniGraficos.ibovespa.data.datasets[0].data = dadosMercado.ibovespa.historico.slice(-10);
        miniGraficos.ibovespa.data.datasets[0].borderColor = dadosMercado.ibovespa.variacao >= 0 ? '#2ecc71' : '#e74c3c';
        miniGraficos.ibovespa.update();
        
        miniGraficos.dolar.data.datasets[0].data = dadosMercado.dolar.historico.slice(-10);
        miniGraficos.dolar.data.datasets[0].borderColor = dadosMercado.dolar.variacao >= 0 ? '#2ecc71' : '#e74c3c';
        miniGraficos.dolar.update();
    }, 5000); // Atualiza a cada 5 segundos
});
