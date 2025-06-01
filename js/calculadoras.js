// Sistema de calculadoras financeiras para finança.com
// Desenvolvido por Harrison Costa

document.addEventListener('DOMContentLoaded', function() {
    // Dados de mercado em tempo real (simulados)
    const dadosMercado = {
        cdi: 10.75,
        selic: 10.85,
        ipca: 4.23,
        igpm: 5.12,
        poupanca: 6.17,
        dolar: 5.18,
        ibovespa: 128500,
        euro: 5.62
    };
    
    // Dados de investimentos
    const investimentos = [
        // Renda Fixa - Banco do Brasil
        {
            nome: "CDB Banco do Brasil",
            tipo: "renda-fixa",
            rentabilidade: "110% do CDI",
            rentabilidadeValor: 11.83,
            valorMinimo: 0.01,
            liquidez: "diaria",
            risco: "baixo",
            impostoRenda: true,
            prazoMinimo: 1,
            prazoMaximo: 36,
            banco: "bb",
            id: "cdb-bb"
        },
        {
            nome: "LCA Banco do Brasil",
            tipo: "renda-fixa",
            rentabilidade: "95% do CDI",
            rentabilidadeValor: 10.24,
            valorMinimo: 100.00,
            liquidez: "vencimento",
            risco: "baixo",
            impostoRenda: false,
            prazoMinimo: 3,
            prazoMaximo: 60,
            banco: "bb",
            id: "lca-bb"
        },
        {
            nome: "LCI Banco do Brasil",
            tipo: "renda-fixa",
            rentabilidade: "93% do CDI",
            rentabilidadeValor: 10.02,
            valorMinimo: 100.00,
            liquidez: "vencimento",
            risco: "baixo",
            impostoRenda: false,
            prazoMinimo: 3,
            prazoMaximo: 60,
            banco: "bb",
            id: "lci-bb"
        },
        {
            nome: "Tesouro IPCA+ (BB)",
            tipo: "renda-fixa",
            rentabilidade: "IPCA + 5,5% a.a.",
            rentabilidadeValor: 10.50,
            valorMinimo: 30.00,
            liquidez: "diaria",
            risco: "baixo",
            impostoRenda: true,
            prazoMinimo: 12,
            prazoMaximo: 240,
            banco: "bb",
            id: "tesouro-ipca-bb"
        },
        {
            nome: "Tesouro Selic (BB)",
            tipo: "renda-fixa",
            rentabilidade: "100% Selic",
            rentabilidadeValor: 10.75,
            valorMinimo: 30.00,
            liquidez: "diaria",
            risco: "baixo",
            impostoRenda: true,
            prazoMinimo: 1,
            prazoMaximo: 60,
            banco: "bb",
            id: "tesouro-selic-bb"
        },
        {
            nome: "Tesouro Prefixado (BB)",
            tipo: "renda-fixa",
            rentabilidade: "11,25% a.a.",
            rentabilidadeValor: 11.25,
            valorMinimo: 30.00,
            liquidez: "diaria",
            risco: "medio",
            impostoRenda: true,
            prazoMinimo: 12,
            prazoMaximo: 120,
            banco: "bb",
            id: "tesouro-pre-bb"
        },
        {
            nome: "Poupança Banco do Brasil",
            tipo: "renda-fixa",
            rentabilidade: "6,17% a.a.",
            rentabilidadeValor: 6.17,
            valorMinimo: 0.01,
            liquidez: "diaria",
            risco: "baixo",
            impostoRenda: false,
            prazoMinimo: 1,
            prazoMaximo: 999,
            banco: "bb",
            id: "poupanca-bb"
        },
        
        // Fundos de Investimento - Banco do Brasil
        {
            nome: "BB Renda Fixa Referenciado DI",
            tipo: "fundos",
            rentabilidade: "98% do CDI",
            rentabilidadeValor: 10.56,
            valorMinimo: 50.00,
            liquidez: "d+1",
            risco: "baixo",
            impostoRenda: true,
            prazoMinimo: 1,
            prazoMaximo: 999,
            banco: "bb",
            id: "bb-rf-di"
        },
        {
            nome: "BB Ações Setor Financeiro",
            tipo: "fundos",
            rentabilidade: "15,8% a.a.",
            rentabilidadeValor: 15.80,
            valorMinimo: 200.00,
            liquidez: "d+3",
            risco: "alto",
            impostoRenda: true,
            prazoMinimo: 24,
            prazoMaximo: 999,
            banco: "bb",
            id: "bb-acoes-financeiro"
        },
        {
            nome: "BB Multimercado Macro",
            tipo: "fundos",
            rentabilidade: "12,5% a.a.",
            rentabilidadeValor: 12.50,
            valorMinimo: 500.00,
            liquidez: "d+3",
            risco: "medio",
            impostoRenda: true,
            prazoMinimo: 12,
            prazoMaximo: 999,
            banco: "bb",
            id: "bb-multi-macro"
        },
        
        // Renda Variável - Banco do Brasil
        {
            nome: "BB Ouro",
            tipo: "renda-variavel",
            rentabilidade: "18,5% a.a.",
            rentabilidadeValor: 18.50,
            valorMinimo: 100.00,
            liquidez: "d+1",
            risco: "alto",
            impostoRenda: true,
            prazoMinimo: 6,
            prazoMaximo: 999,
            banco: "bb",
            id: "bb-ouro"
        },
        {
            nome: "BBAS3 - Ações Banco do Brasil",
            tipo: "renda-variavel",
            rentabilidade: "22,3% a.a.",
            rentabilidadeValor: 22.30,
            valorMinimo: 30.00,
            liquidez: "d+3",
            risco: "alto",
            impostoRenda: true,
            prazoMinimo: 24,
            prazoMaximo: 999,
            banco: "bb",
            id: "bbas3"
        }
    ];
    
    // Função para calcular juros compostos
    function calcularJurosCompostos(valorInicial, aporteMensal, taxaAnual, periodoAnos) {
        const taxaMensal = Math.pow(1 + taxaAnual/100, 1/12) - 1;
        const periodoMeses = periodoAnos * 12;
        
        let valorTotal = valorInicial;
        let valorInvestido = valorInicial;
        let historico = [{mes: 0, valor: valorTotal, investido: valorInvestido}];
        
        for (let i = 1; i <= periodoMeses; i++) {
            valorTotal = valorTotal * (1 + taxaMensal) + aporteMensal;
            valorInvestido += aporteMensal;
            
            // Registrar apenas alguns pontos para o gráfico não ficar muito denso
            if (i % Math.ceil(periodoMeses / 20) === 0 || i === periodoMeses) {
                historico.push({
                    mes: i,
                    valor: valorTotal,
                    investido: valorInvestido
                });
            }
        }
        
        return {
            valorTotal: valorTotal,
            valorInvestido: valorInvestido,
            rendimento: valorTotal - valorInvestido,
            historico: historico
        };
    }
    
    // Função para calcular imposto de renda sobre investimentos
    function calcularImpostoRenda(rendimento, periodoMeses) {
        // Tabela regressiva de IR para investimentos
        let aliquota;
        
        if (periodoMeses <= 6) {
            aliquota = 0.225; // 22.5%
        } else if (periodoMeses <= 12) {
            aliquota = 0.20; // 20%
        } else if (periodoMeses <= 24) {
            aliquota = 0.175; // 17.5%
        } else {
            aliquota = 0.15; // 15%
        }
        
        return rendimento * aliquota;
    }
    
    // Inicializar simulador de investimentos
    function inicializarSimulador() {
        const valorInicialInput = document.getElementById('valor-inicial');
        const aporteMensalInput = document.getElementById('aporte-mensal');
        const taxaJurosInput = document.getElementById('taxa-juros');
        const periodoInput = document.getElementById('periodo');
        const periodoValor = document.getElementById('periodo-valor');
        const calcularBtn = document.getElementById('calcular-simulador');
        const limparBtn = document.getElementById('limpar-simulador');
        
        let graficoSimulador = null;
        
        // Atualizar texto do período ao mover o slider
        periodoInput.addEventListener('input', function() {
            const valor = this.value;
            periodoValor.textContent = valor + (valor == 1 ? ' ano' : ' anos');
        });
        
        // Preencher taxa de juros com valor do CDI atual
        taxaJurosInput.value = dadosMercado.cdi.toFixed(2);
        taxaJurosInput.disabled = true; // Desabilitar edição conforme solicitado
        
        // Calcular simulação
        calcularBtn.addEventListener('click', function() {
            const valorInicial = parseFloat(valorInicialInput.value) || 0;
            const aporteMensal = parseFloat(aporteMensalInput.value) || 0;
            const taxaJuros = parseFloat(taxaJurosInput.value) || 0;
            const periodo = parseInt(periodoInput.value) || 1;
            
            const resultado = calcularJurosCompostos(valorInicial, aporteMensal, taxaJuros, periodo);
            
            // Atualizar resultados
            document.getElementById('valor-total').textContent = 'R$ ' + resultado.valorTotal.toFixed(2);
            document.getElementById('valor-investido').textContent = 'R$ ' + resultado.valorInvestido.toFixed(2);
            document.getElementById('valor-rendimento').textContent = 'R$ ' + resultado.rendimento.toFixed(2);
            
            // Atualizar gráfico
            const ctx = document.getElementById('grafico-simulador').getContext('2d');
            
            // Destruir gráfico anterior se existir
            if (graficoSimulador) {
                graficoSimulador.destroy();
            }
            
            // Preparar dados para o gráfico
            const labels = resultado.historico.map(item => item.mes === 0 ? 'Início' : item.mes + 'm');
            const valoresTotal = resultado.historico.map(item => item.valor);
            const valoresInvestido = resultado.historico.map(item => item.investido);
            
            // Criar novo gráfico
            graficoSimulador = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Valor Total',
                            data: valoresTotal,
                            borderColor: '#2e86de',
                            backgroundColor: 'rgba(46, 134, 222, 0.1)',
                            fill: true
                        },
                        {
                            label: 'Valor Investido',
                            data: valoresInvestido,
                            borderColor: '#8395a7',
                            backgroundColor: 'rgba(131, 149, 167, 0.1)',
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return 'R$ ' + value.toLocaleString('pt-BR');
                                }
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': R$ ' + context.raw.toFixed(2);
                                }
                            }
                        }
                    }
                }
            });
            
            // Mostrar resultado
            document.getElementById('resultado-simulador').style.display = 'block';
        });
        
        // Limpar simulação
        limparBtn.addEventListener('click', function() {
            valorInicialInput.value = '1000';
            aporteMensalInput.value = '200';
            taxaJurosInput.value = dadosMercado.cdi.toFixed(2);
            periodoInput.value = '10';
            periodoValor.textContent = '10 anos';
            
            // Esconder resultado
            document.getElementById('resultado-simulador').style.display = 'none';
            
            // Destruir gráfico se existir
            if (graficoSimulador) {
                graficoSimulador.destroy();
                graficoSimulador = null;
            }
        });
    }
    
    // Inicializar comparador de investimentos
    function inicializarComparador() {
        const tabs = document.querySelectorAll('.calculadora-tab');
        const conteudos = document.querySelectorAll('.calculadora-conteudo');
        
        // Configurar tabs
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remover classe active de todas as tabs e conteúdos
                tabs.forEach(t => t.classList.remove('active'));
                conteudos.forEach(c => c.classList.remove('active'));
                
                // Adicionar classe active à tab clicada e conteúdo correspondente
                this.classList.add('active');
                document.getElementById('tab-' + tabId).classList.add('active');
            });
        });
        
        // Configurar comparador de renda fixa
        const valorComparacaoInput = document.getElementById('valor-comparacao');
        const periodoComparacaoSelect = document.getElementById('periodo-comparacao');
        const calcularComparacaoBtn = document.getElementById('calcular-comparacao');
        const limparComparacaoBtn = document.getElementById('limpar-comparacao');
        
        // Preencher tabela de comparação com dados atualizados
        calcularComparacaoBtn.addEventListener('click', function() {
            const valor = parseFloat(valorComparacaoInput.value) || 5000;
            const periodoMeses = parseInt(periodoComparacaoSelect.value) || 12;
            
            // Filtrar apenas investimentos de renda fixa
            const investimentosRendaFixa = investimentos.filter(inv => inv.tipo === 'renda-fixa');
            
            // Calcular rendimento para cada investimento
            const resultados = investimentosRendaFixa.map(inv => {
                const taxaAnual = inv.rentabilidadeValor;
                const taxaMensal = Math.pow(1 + taxaAnual/100, 1/12) - 1;
                const valorFinal = valor * Math.pow(1 + taxaMensal, periodoMeses);
                const rendimento = valorFinal - valor;
                const imposto = inv.impostoRenda ? calcularImpostoRenda(rendimento, periodoMeses) : 0;
                const valorLiquido = valorFinal - imposto;
                
                return {
                    nome: inv.nome,
                    rentabilidade: inv.rentabilidade,
                    rentabilidadeValor: taxaAnual,
                    valorFinal: valorFinal,
                    rendimento: rendimento,
                    imposto: imposto,
                    valorLiquido: valorLiquido,
                    risco: inv.risco
                };
            });
            
            // Ordenar por valor líquido (melhor rendimento)
            resultados.sort((a, b) => b.valorLiquido - a.valorLiquido);
            
            // Atualizar tabela
            const tbody = document.querySelector('#tabela-comparacao tbody');
            tbody.innerHTML = '';
            
            resultados.forEach((resultado, index) => {
                const tr = document.createElement('tr');
                if (index === 0) tr.classList.add('melhor-opcao');
                
                tr.innerHTML = `
                    <td>${resultado.nome}</td>
                    <td>${resultado.rentabilidadeValor.toFixed(2)}% a.a.</td>
                    <td>R$ ${resultado.valorFinal.toFixed(2)}</td>
                    <td>R$ ${resultado.imposto.toFixed(2)}</td>
                    <td>R$ ${resultado.valorLiquido.toFixed(2)}</td>
                `;
                
                tbody.appendChild(tr);
            });
        });
        
        // Limpar comparação
        limparComparacaoBtn.addEventListener('click', function() {
            valorComparacaoInput.value = '5000';
            periodoComparacaoSelect.value = '12';
        });
        
        // Configurar comparador de renda variável
        const valorComparacaoRVInput = document.getElementById('valor-comparacao-rv');
        const periodoComparacaoRVSelect = document.getElementById('periodo-comparacao-rv');
        const calcularComparacaoRVBtn = document.getElementById('calcular-comparacao-rv');
        const limparComparacaoRVBtn = document.getElementById('limpar-comparacao-rv');
        
        // Preencher tabela de comparação com dados atualizados
        calcularComparacaoRVBtn.addEventListener('click', function() {
            const valor = parseFloat(valorComparacaoRVInput.value) || 5000;
            const periodoMeses = parseInt(periodoComparacaoRVSelect.value) || 12;
            
            // Filtrar apenas investimentos de renda variável
            const investimentosRendaVariavel = investimentos.filter(inv => 
                inv.tipo === 'renda-variavel' || inv.tipo === 'fundos');
            
            // Calcular rendimento para cada investimento
            const resultados = investimentosRendaVariavel.map(inv => {
                const taxaAnual = inv.rentabilidadeValor;
                const taxaMensal = Math.pow(1 + taxaAnual/100, 1/12) - 1;
                const valorFinal = valor * Math.pow(1 + taxaMensal, periodoMeses);
                const rendimento = valorFinal - valor;
                const imposto = inv.impostoRenda ? calcularImpostoRenda(rendimento, periodoMeses) : 0;
                const valorLiquido = valorFinal - imposto;
                
                return {
                    nome: inv.nome,
                    rentabilidade: inv.rentabilidade,
                    rentabilidadeValor: taxaAnual,
                    valorFinal: valorFinal,
                    rendimento: rendimento,
                    imposto: imposto,
                    valorLiquido: valorLiquido,
                    risco: inv.risco
                };
            });
            
            // Ordenar por valor líquido (melhor rendimento)
            resultados.sort((a, b) => b.valorLiquido - a.valorLiquido);
            
            // Atualizar tabela
            const tbody = document.querySelector('#tabela-comparacao-rv tbody');
            tbody.innerHTML = '';
            
            resultados.forEach((resultado, index) => {
                const tr = document.createElement('tr');
                if (index === 0) tr.classList.add('melhor-opcao');
                
                // Adicionar indicador de risco
                let riscoHTML = '';
                switch(resultado.risco) {
                    case 'baixo':
                        riscoHTML = '<span class="risco-indicador risco-baixo">Baixo</span>';
                        break;
                    case 'medio':
                        riscoHTML = '<span class="risco-indicador risco-medio">Médio</span>';
                        break;
                    case 'alto':
                        riscoHTML = '<span class="risco-indicador risco-alto">Alto</span>';
                        break;
                }
                
                tr.innerHTML = `
                    <td>${resultado.nome}</td>
                    <td>${resultado.rentabilidadeValor.toFixed(2)}% a.a.</td>
                    <td>R$ ${resultado.valorFinal.toFixed(2)}</td>
                    <td>${riscoHTML}</td>
                    <td>R$ ${resultado.valorLiquido.toFixed(2)}</td>
                `;
                
                tbody.appendChild(tr);
            });
        });
        
        // Limpar comparação de renda variável
        limparComparacaoRVBtn.addEventListener('click', function() {
            valorComparacaoRVInput.value = '5000';
            periodoComparacaoRVSelect.value = '12';
        });
    }
    
    // Inicializar calculadora de juros compostos
    function inicializarCalculadoraJurosCompostos() {
        const valorPrincipalInput = document.getElementById('valor-principal');
        const aporteMensalJCInput = document.getElementById('aporte-mensal-jc');
        const taxaJurosJCInput = document.getElementById('taxa-juros-jc');
        const periodoJCInput = document.getElementById('periodo-jc');
        const calcularJCBtn = document.getElementById('calcular-jc');
        const limparJCBtn = document.getElementById('limpar-jc');
        
        let graficoJC = null;
        
        // Preencher taxa de juros com valor do CDI atual
        taxaJurosJCInput.value = dadosMercado.cdi.toFixed(2);
        taxaJurosJCInput.disabled = true; // Desabilitar edição conforme solicitado
        
        // Calcular juros compostos
        calcularJCBtn.addEventListener('click', function() {
            const valorPrincipal = parseFloat(valorPrincipalInput.value) || 0;
            const aporteMensal = parseFloat(aporteMensalJCInput.value) || 0;
            const taxaJuros = parseFloat(taxaJurosJCInput.value) || 0;
            const periodoAnos = parseInt(periodoJCInput.value) || 1;
            
            const resultado = calcularJurosCompostos(valorPrincipal, aporteMensal, taxaJuros, periodoAnos);
            
            // Atualizar resultados
            document.getElementById('montante-final').textContent = 'R$ ' + resultado.valorTotal.toFixed(2);
            document.getElementById('total-investido-jc').textContent = 'R$ ' + resultado.valorInvestido.toFixed(2);
            document.getElementById('juros-acumulados').textContent = 'R$ ' + resultado.rendimento.toFixed(2);
            
            // Calcular percentual de juros sobre o valor investido
            const percentualJuros = (resultado.rendimento / resultado.valorInvestido) * 100;
            document.getElementById('percentual-juros').textContent = percentualJuros.toFixed(2) + '%';
            
            // Atualizar gráfico
            const ctx = document.getElementById('grafico-jc').getContext('2d');
            
            // Destruir gráfico anterior se existir
            if (graficoJC) {
                graficoJC.destroy();
            }
            
            // Preparar dados para o gráfico
            const labels = resultado.historico.map(item => {
                if (item.mes === 0) return 'Início';
                const anos = Math.floor(item.mes / 12);
                const meses = item.mes % 12;
                if (anos === 0) return meses + 'm';
                if (meses === 0) return anos + 'a';
                return anos + 'a ' + meses + 'm';
            });
            
            const valoresTotal = resultado.historico.map(item => item.valor);
            const valoresInvestido = resultado.historico.map(item => item.investido);
            const valoresJuros = resultado.historico.map(item => item.valor - item.investido);
            
            // Criar novo gráfico
            graficoJC = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Valor Investido',
                            data: valoresInvestido,
                            backgroundColor: 'rgba(131, 149, 167, 0.7)',
                        },
                        {
                            label: 'Juros',
                            data: valoresJuros,
                            backgroundColor: 'rgba(46, 134, 222, 0.7)',
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            stacked: true
                        },
                        y: {
                            stacked: true,
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return 'R$ ' + value.toLocaleString('pt-BR');
                                }
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': R$ ' + context.raw.toFixed(2);
                                }
                            }
                        }
                    }
                }
            });
            
            // Mostrar resultado
            document.getElementById('resultado-jc').style.display = 'block';
        });
        
        // Limpar calculadora
        limparJCBtn.addEventListener('click', function() {
            valorPrincipalInput.value = '1000';
            aporteMensalJCInput.value = '100';
            taxaJurosJCInput.value = dadosMercado.cdi.toFixed(2);
            periodoJCInput.value = '10';
            
            // Esconder resultado
            document.getElementById('resultado-jc').style.display = 'none';
            
            // Destruir gráfico se existir
            if (graficoJC) {
                graficoJC.destroy();
                graficoJC = null;
            }
        });
    }
    
    // Inicializar calculadora de aposentadoria
    function inicializarCalculadoraAposentadoria() {
        const idadeAtualInput = document.getElementById('idade-atual');
        const idadeAposentadoriaInput = document.getElementById('idade-aposentadoria');
        const valorMensalInput = document.getElementById('valor-mensal-aposentadoria');
        const expectativaVidaInput = document.getElementById('expectativa-vida');
        const valorInicialApoInput = document.getElementById('valor-inicial-apo');
        const aporteMensalApoInput = document.getElementById('aporte-mensal-apo');
        const taxaJurosApoInput = document.getElementById('taxa-juros-apo');
        const calcularApoBtn = document.getElementById('calcular-apo');
        const limparApoBtn = document.getElementById('limpar-apo');
        
        let graficoApo = null;
        
        // Preencher taxa de juros com valor do CDI atual
        taxaJurosApoInput.value = dadosMercado.cdi.toFixed(2);
        taxaJurosApoInput.disabled = true; // Desabilitar edição conforme solicitado
        
        // Calcular aposentadoria
        calcularApoBtn.addEventListener('click', function() {
            const idadeAtual = parseInt(idadeAtualInput.value) || 30;
            const idadeAposentadoria = parseInt(idadeAposentadoriaInput.value) || 65;
            const valorMensal = parseFloat(valorMensalInput.value) || 5000;
            const expectativaVida = parseInt(expectativaVidaInput.value) || 85;
            const valorInicial = parseFloat(valorInicialApoInput.value) || 0;
            const aporteMensal = parseFloat(aporteMensalApoInput.value) || 1000;
            const taxaJuros = parseFloat(taxaJurosApoInput.value) || 0;
            
            // Calcular período de acumulação (até aposentadoria)
            const periodoAcumulacaoAnos = idadeAposentadoria - idadeAtual;
            
            // Calcular período de uso do patrimônio (aposentadoria até expectativa de vida)
            const periodoUsoAnos = expectativaVida - idadeAposentadoria;
            
            // Calcular acumulação até aposentadoria
            const resultadoAcumulacao = calcularJurosCompostos(valorInicial, aporteMensal, taxaJuros, periodoAcumulacaoAnos);
            
            // Calcular patrimônio necessário para aposentadoria
            // Fórmula: PMT = VF * [i / ((1+i)^n - 1)]
            // Onde PMT é o valor mensal, VF é o valor futuro (patrimônio necessário),
            // i é a taxa mensal, n é o número de meses
            const taxaMensal = Math.pow(1 + taxaJuros/100, 1/12) - 1;
            const periodoUsoMeses = periodoUsoAnos * 12;
            
            // Calcular patrimônio necessário
            // VF = PMT * [((1+i)^n - 1) / i]
            const patrimonioNecessario = valorMensal * ((Math.pow(1 + taxaMensal, periodoUsoMeses) - 1) / taxaMensal);
            
            // Verificar se o patrimônio acumulado será suficiente
            const patrimonioAcumulado = resultadoAcumulacao.valorTotal;
            const diferenca = patrimonioAcumulado - patrimonioNecessario;
            const suficiente = diferenca >= 0;
            
            // Calcular valor mensal possível com o patrimônio acumulado
            const valorMensalPossivel = patrimonioAcumulado * (taxaMensal / (1 - Math.pow(1 + taxaMensal, -periodoUsoMeses)));
            
            // Atualizar resultados
            document.getElementById('patrimonio-necessario').textContent = 'R$ ' + patrimonioNecessario.toFixed(2);
            document.getElementById('patrimonio-acumulado').textContent = 'R$ ' + patrimonioAcumulado.toFixed(2);
            document.getElementById('status-aposentadoria').textContent = suficiente ? 'Suficiente' : 'Insuficiente';
            document.getElementById('status-aposentadoria').className = suficiente ? 'resultado-valor verde' : 'resultado-valor vermelho';
            document.getElementById('valor-mensal-possivel').textContent = 'R$ ' + valorMensalPossivel.toFixed(2);
            
            // Calcular aporte mensal necessário para atingir o patrimônio necessário
            // Se o patrimônio for insuficiente
            if (!suficiente) {
                // Fórmula: PMT = (VF - VI * (1+i)^n) / (((1+i)^n - 1) / i)
                const periodoAcumulacaoMeses = periodoAcumulacaoAnos * 12;
                const fatorJuros = Math.pow(1 + taxaMensal, periodoAcumulacaoMeses);
                const valorFuturoInicial = valorInicial * fatorJuros;
                const fatorAcumulacao = (fatorJuros - 1) / taxaMensal;
                
                const aporteMensalNecessario = (patrimonioNecessario - valorFuturoInicial) / fatorAcumulacao;
                
                document.getElementById('aporte-necessario').textContent = 'R$ ' + aporteMensalNecessario.toFixed(2);
                document.getElementById('aporte-adicional').textContent = 'R$ ' + (aporteMensalNecessario - aporteMensal).toFixed(2);
                
                document.getElementById('ajuste-necessario').style.display = 'block';
            } else {
                document.getElementById('ajuste-necessario').style.display = 'none';
            }
            
            // Atualizar gráfico
            const ctx = document.getElementById('grafico-aposentadoria').getContext('2d');
            
            // Destruir gráfico anterior se existir
            if (graficoApo) {
                graficoApo.destroy();
            }
            
            // Preparar dados para o gráfico
            const labels = ['Patrimônio Necessário', 'Patrimônio Acumulado'];
            const valores = [patrimonioNecessario, patrimonioAcumulado];
            const cores = [
                patrimonioNecessario > patrimonioAcumulado ? '#e74c3c' : '#2ecc71',
                patrimonioAcumulado >= patrimonioNecessario ? '#2ecc71' : '#3498db'
            ];
            
            // Criar novo gráfico
            graficoApo = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            data: valores,
                            backgroundColor: cores,
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return 'R$ ' + context.raw.toFixed(2);
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return 'R$ ' + value.toLocaleString('pt-BR');
                                }
                            }
                        }
                    }
                }
            });
            
            // Mostrar resultado
            document.getElementById('resultado-aposentadoria').style.display = 'block';
        });
        
        // Limpar calculadora
        limparApoBtn.addEventListener('click', function() {
            idadeAtualInput.value = '30';
            idadeAposentadoriaInput.value = '65';
            valorMensalInput.value = '5000';
            expectativaVidaInput.value = '85';
            valorInicialApoInput.value = '0';
            aporteMensalApoInput.value = '1000';
            taxaJurosApoInput.value = dadosMercado.cdi.toFixed(2);
            
            // Esconder resultado
            document.getElementById('resultado-aposentadoria').style.display = 'none';
            
            // Destruir gráfico se existir
            if (graficoApo) {
                graficoApo.destroy();
                graficoApo = null;
            }
        });
    }
    
    // Inicializar todas as calculadoras
    inicializarSimulador();
    inicializarComparador();
    inicializarCalculadoraJurosCompostos();
    inicializarCalculadoraAposentadoria();
    
    // Atualizar dados de mercado periodicamente (simulado)
    setInterval(function() {
        // Simular pequenas variações nos dados de mercado
        dadosMercado.cdi = parseFloat((dadosMercado.cdi + (Math.random() * 0.02 - 0.01)).toFixed(2));
        dadosMercado.selic = parseFloat((dadosMercado.selic + (Math.random() * 0.02 - 0.01)).toFixed(2));
        dadosMercado.ipca = parseFloat((dadosMercado.ipca + (Math.random() * 0.01 - 0.005)).toFixed(2));
        dadosMercado.igpm = parseFloat((dadosMercado.igpm + (Math.random() * 0.01 - 0.005)).toFixed(2));
        dadosMercado.poupanca = parseFloat((dadosMercado.poupanca + (Math.random() * 0.01 - 0.005)).toFixed(2));
        dadosMercado.dolar = parseFloat((dadosMercado.dolar + (Math.random() * 0.04 - 0.02)).toFixed(2));
        dadosMercado.euro = parseFloat((dadosMercado.euro + (Math.random() * 0.04 - 0.02)).toFixed(2));
        dadosMercado.ibovespa = Math.round(dadosMercado.ibovespa + (Math.random() * 200 - 100));
        
        // Atualizar taxas de juros nas calculadoras
        document.getElementById('taxa-juros').value = dadosMercado.cdi.toFixed(2);
        document.getElementById('taxa-juros-jc').value = dadosMercado.cdi.toFixed(2);
        document.getElementById('taxa-juros-apo').value = dadosMercado.cdi.toFixed(2);
        
        // Atualizar indicadores de mercado
        document.getElementById('indicador-cdi').textContent = dadosMercado.cdi.toFixed(2) + '%';
        document.getElementById('indicador-selic').textContent = dadosMercado.selic.toFixed(2) + '%';
        document.getElementById('indicador-ipca').textContent = dadosMercado.ipca.toFixed(2) + '%';
        document.getElementById('indicador-poupanca').textContent = dadosMercado.poupanca.toFixed(2) + '%';
        document.getElementById('indicador-dolar').textContent = 'R$ ' + dadosMercado.dolar.toFixed(2);
        document.getElementById('indicador-ibovespa').textContent = dadosMercado.ibovespa.toLocaleString('pt-BR');
    }, 60000); // Atualiza a cada 60 segundos
});
