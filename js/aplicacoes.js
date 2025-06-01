// Sistema de aplicações financeiras para finança.com
// Desenvolvido por Harrison Costa

document.addEventListener('DOMContentLoaded', function() {
    // Dados de aplicações do Banco do Brasil e mercado
    const aplicacoes = [
        // Renda Fixa - Banco do Brasil
        {
            nome: "CDB Banco do Brasil",
            tipo: "renda-fixa",
            rentabilidade: "110% do CDI",
            rentabilidadeValor: 11.83,
            valorMinimo: 0.01,
            liquidez: "diaria",
            risco: "baixo",
            recomendacao: "recomendado",
            banco: "bb",
            prazo: "curto",
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
            recomendacao: "neutro",
            banco: "bb",
            prazo: "medio",
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
            recomendacao: "neutro",
            banco: "bb",
            prazo: "medio",
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
            recomendacao: "recomendado",
            banco: "bb",
            prazo: "longo",
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
            recomendacao: "neutro",
            banco: "bb",
            prazo: "curto",
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
            recomendacao: "neutro",
            banco: "bb",
            prazo: "medio",
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
            recomendacao: "nao-recomendado",
            banco: "bb",
            prazo: "curto",
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
            recomendacao: "neutro",
            banco: "bb",
            prazo: "curto",
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
            recomendacao: "recomendado",
            banco: "bb",
            prazo: "longo",
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
            recomendacao: "recomendado",
            banco: "bb",
            prazo: "medio",
            id: "bb-multi-macro"
        },
        {
            nome: "BB Ações ESG",
            tipo: "fundos",
            rentabilidade: "14,2% a.a.",
            rentabilidadeValor: 14.20,
            valorMinimo: 300.00,
            liquidez: "d+3",
            risco: "alto",
            recomendacao: "recomendado",
            banco: "bb",
            prazo: "longo",
            id: "bb-acoes-esg"
        },
        {
            nome: "BB Ações Dividendos",
            tipo: "fundos",
            rentabilidade: "13,5% a.a.",
            rentabilidadeValor: 13.50,
            valorMinimo: 200.00,
            liquidez: "d+3",
            risco: "alto",
            recomendacao: "neutro",
            banco: "bb",
            prazo: "longo",
            id: "bb-acoes-dividendos"
        },
        
        // Previdência - Banco do Brasil
        {
            nome: "BB Previdência Renda Fixa",
            tipo: "previdencia",
            rentabilidade: "9,8% a.a.",
            rentabilidadeValor: 9.80,
            valorMinimo: 100.00,
            liquidez: "d+3",
            risco: "baixo",
            recomendacao: "neutro",
            banco: "bb",
            prazo: "longo",
            id: "bb-prev-rf"
        },
        {
            nome: "BB Previdência Multimercado",
            tipo: "previdencia",
            rentabilidade: "11,2% a.a.",
            rentabilidadeValor: 11.20,
            valorMinimo: 200.00,
            liquidez: "d+3",
            risco: "medio",
            recomendacao: "recomendado",
            banco: "bb",
            prazo: "longo",
            id: "bb-prev-multi"
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
            recomendacao: "recomendado",
            banco: "bb",
            prazo: "medio",
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
            recomendacao: "recomendado",
            banco: "bb",
            prazo: "longo",
            id: "bbas3"
        },
        
        // Renda Fixa - Outras Instituições
        {
            nome: "CDB Nubank",
            tipo: "renda-fixa",
            rentabilidade: "118% do CDI",
            rentabilidadeValor: 12.71,
            valorMinimo: 100.00,
            liquidez: "diaria",
            risco: "baixo",
            recomendacao: "recomendado",
            banco: "outros",
            prazo: "curto",
            id: "cdb-nubank"
        },
        {
            nome: "LCI XP Investimentos",
            tipo: "renda-fixa",
            rentabilidade: "98% do CDI",
            rentabilidadeValor: 10.56,
            valorMinimo: 1000.00,
            liquidez: "vencimento",
            risco: "baixo",
            recomendacao: "neutro",
            banco: "outros",
            prazo: "medio",
            id: "lci-xp"
        },
        {
            nome: "Debênture TAEE11",
            tipo: "renda-fixa",
            rentabilidade: "IPCA + 6,2% a.a.",
            rentabilidadeValor: 11.20,
            valorMinimo: 1000.00,
            liquidez: "d+3",
            risco: "medio",
            recomendacao: "recomendado",
            banco: "outros",
            prazo: "longo",
            id: "debenture-taee"
        },
        
        // Fundos de Investimento - Outras Instituições
        {
            nome: "XP Investor FIA",
            tipo: "fundos",
            rentabilidade: "18,7% a.a.",
            rentabilidadeValor: 18.70,
            valorMinimo: 500.00,
            liquidez: "d+3",
            risco: "alto",
            recomendacao: "recomendado",
            banco: "outros",
            prazo: "longo",
            id: "xp-investor"
        },
        {
            nome: "Kinea Chronos",
            tipo: "fundos",
            rentabilidade: "14,5% a.a.",
            rentabilidadeValor: 14.50,
            valorMinimo: 5000.00,
            liquidez: "d+30",
            risco: "medio",
            recomendacao: "recomendado",
            banco: "outros",
            prazo: "longo",
            id: "kinea-chronos"
        },
        
        // Renda Variável - Outras Instituições
        {
            nome: "ETF BOVA11",
            tipo: "renda-variavel",
            rentabilidade: "16,8% a.a.",
            rentabilidadeValor: 16.80,
            valorMinimo: 100.00,
            liquidez: "d+3",
            risco: "alto",
            recomendacao: "neutro",
            banco: "outros",
            prazo: "longo",
            id: "bova11"
        },
        {
            nome: "FII KNRI11",
            tipo: "renda-variavel",
            rentabilidade: "12,4% a.a.",
            rentabilidadeValor: 12.40,
            valorMinimo: 90.00,
            liquidez: "d+3",
            risco: "medio",
            recomendacao: "recomendado",
            banco: "outros",
            prazo: "longo",
            id: "knri11"
        }
    ];

    // Função para renderizar a tabela de aplicações
    function renderizarTabela(aplicacoesParaExibir) {
        const tbody = document.getElementById('tabela-aplicacoes-body');
        tbody.innerHTML = '';
        
        if (aplicacoesParaExibir.length === 0) {
            const tr = document.createElement('tr');
            tr.innerHTML = '<td colspan="8" style="text-align: center;">Nenhuma aplicação encontrada com os filtros selecionados.</td>';
            tbody.appendChild(tr);
            return;
        }
        
        aplicacoesParaExibir.forEach(aplicacao => {
            const tr = document.createElement('tr');
            
            // Formatar tipo para exibição
            let tipoFormatado = '';
            switch(aplicacao.tipo) {
                case 'renda-fixa':
                    tipoFormatado = 'Renda Fixa';
                    break;
                case 'renda-variavel':
                    tipoFormatado = 'Renda Variável';
                    break;
                case 'fundos':
                    tipoFormatado = 'Fundos de Investimento';
                    break;
                case 'previdencia':
                    tipoFormatado = 'Previdência';
                    break;
                default:
                    tipoFormatado = aplicacao.tipo;
            }
            
            // Formatar liquidez para exibição
            let liquidezFormatada = '';
            switch(aplicacao.liquidez) {
                case 'diaria':
                    liquidezFormatada = 'Diária';
                    break;
                case 'd+1':
                    liquidezFormatada = 'D+1';
                    break;
                case 'd+3':
                    liquidezFormatada = 'D+3';
                    break;
                case 'd+30':
                    liquidezFormatada = 'D+30';
                    break;
                case 'vencimento':
                    liquidezFormatada = 'No vencimento';
                    break;
                default:
                    liquidezFormatada = aplicacao.liquidez;
            }
            
            // Formatar recomendação para exibição
            let recomendacaoHTML = '';
            switch(aplicacao.recomendacao) {
                case 'recomendado':
                    recomendacaoHTML = '<div class="recomendacao-indicador recomendacao-verde"><i class="fas fa-thumbs-up"></i> Recomendado</div>';
                    break;
                case 'neutro':
                    recomendacaoHTML = '<div class="recomendacao-indicador recomendacao-neutra"><i class="fas fa-minus"></i> Neutro</div>';
                    break;
                case 'nao-recomendado':
                    recomendacaoHTML = '<div class="recomendacao-indicador recomendacao-vermelha"><i class="fas fa-thumbs-down"></i> Não recomendado</div>';
                    break;
                default:
                    recomendacaoHTML = '<div class="recomendacao-indicador recomendacao-neutra"><i class="fas fa-minus"></i> Neutro</div>';
            }
            
            // Formatar risco para exibição
            let riscoHTML = '';
            switch(aplicacao.risco) {
                case 'baixo':
                    riscoHTML = '<span class="risco-indicador risco-baixo">Baixo</span>';
                    break;
                case 'medio':
                    riscoHTML = '<span class="risco-indicador risco-medio">Médio</span>';
                    break;
                case 'alto':
                    riscoHTML = '<span class="risco-indicador risco-alto">Alto</span>';
                    break;
                default:
                    riscoHTML = '<span class="risco-indicador">Não informado</span>';
            }
            
            tr.innerHTML = `
                <td>${aplicacao.nome}</td>
                <td>${tipoFormatado}</td>
                <td>${aplicacao.rentabilidade}</td>
                <td>R$ ${aplicacao.valorMinimo.toFixed(2)}</td>
                <td>${liquidezFormatada}</td>
                <td>${riscoHTML}</td>
                <td>${recomendacaoHTML}</td>
                <td>
                    <div class="acoes-botoes">
                        <button class="btn-acao btn-detalhes" data-id="${aplicacao.id}">Detalhes</button>
                        <button class="btn-acao btn-comparar" data-id="${aplicacao.id}">Comparar</button>
                    </div>
                </td>
            `;
            
            tbody.appendChild(tr);
        });
        
        // Adicionar event listeners para os botões de detalhes e comparar
        document.querySelectorAll('.btn-detalhes').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                mostrarDetalhes(id);
            });
        });
        
        document.querySelectorAll('.btn-comparar').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                adicionarComparacao(id);
            });
        });
    }
    
    // Função para aplicar filtros
    function aplicarFiltros() {
        const tipoFiltro = document.getElementById('filtro-tipo').value;
        const riscoFiltro = document.getElementById('filtro-risco').value;
        const valorFiltro = document.getElementById('filtro-valor').value;
        const liquidezFiltro = document.getElementById('filtro-liquidez').value;
        const rentabilidadeFiltro = parseFloat(document.getElementById('filtro-rentabilidade').value);
        const prazoFiltro = document.getElementById('filtro-prazo').value;
        const bancoFiltro = document.getElementById('filtro-banco').value;
        const recomendacaoFiltro = document.getElementById('filtro-recomendacao').value;
        
        let aplicacoesFiltradas = aplicacoes.filter(aplicacao => {
            // Filtro de tipo
            if (tipoFiltro !== 'todos' && aplicacao.tipo !== tipoFiltro) {
                return false;
            }
            
            // Filtro de risco
            if (riscoFiltro !== 'todos' && aplicacao.risco !== riscoFiltro) {
                return false;
            }
            
            // Filtro de valor mínimo
            if (valorFiltro !== 'todos') {
                switch(valorFiltro) {
                    case 'ate-100':
                        if (aplicacao.valorMinimo > 100) return false;
                        break;
                    case '100-500':
                        if (aplicacao.valorMinimo < 100 || aplicacao.valorMinimo > 500) return false;
                        break;
                    case '500-1000':
                        if (aplicacao.valorMinimo < 500 || aplicacao.valorMinimo > 1000) return false;
                        break;
                    case 'acima-1000':
                        if (aplicacao.valorMinimo < 1000) return false;
                        break;
                }
            }
            
            // Filtro de liquidez
            if (liquidezFiltro !== 'todos' && aplicacao.liquidez !== liquidezFiltro) {
                return false;
            }
            
            // Filtro de rentabilidade mínima
            if (rentabilidadeFiltro > 0 && aplicacao.rentabilidadeValor < rentabilidadeFiltro) {
                return false;
            }
            
            // Filtro de prazo
            if (prazoFiltro !== 'todos' && aplicacao.prazo !== prazoFiltro) {
                return false;
            }
            
            // Filtro de banco/instituição
            if (bancoFiltro !== 'todos' && aplicacao.banco !== bancoFiltro) {
                return false;
            }
            
            // Filtro de recomendação
            if (recomendacaoFiltro !== 'todos' && aplicacao.recomendacao !== recomendacaoFiltro) {
                return false;
            }
            
            return true;
        });
        
        renderizarTabela(aplicacoesFiltradas);
    }
    
    // Função para mostrar detalhes de uma aplicação
    function mostrarDetalhes(id) {
        const aplicacao = aplicacoes.find(app => app.id === id);
        if (!aplicacao) return;
        
        // Aqui você pode implementar um modal ou redirecionar para uma página de detalhes
        alert(`Detalhes da aplicação: ${aplicacao.nome}\n\nRentabilidade: ${aplicacao.rentabilidade}\nValor mínimo: R$ ${aplicacao.valorMinimo.toFixed(2)}\nLiquidez: ${aplicacao.liquidez}\nRisco: ${aplicacao.risco}`);
        
        // Alternativa: redirecionar para uma página de detalhes
        // window.location.href = `detalhes-aplicacao.html?id=${id}`;
    }
    
    // Função para adicionar aplicação à comparação
    function adicionarComparacao(id) {
        const aplicacao = aplicacoes.find(app => app.id === id);
        if (!aplicacao) return;
        
        // Aqui você pode implementar a lógica para adicionar à comparação
        alert(`Aplicação adicionada à comparação: ${aplicacao.nome}`);
        
        // Alternativa: redirecionar para uma página de comparação
        // window.location.href = `comparar-aplicacoes.html?adicionar=${id}`;
    }
    
    // Inicialização
    renderizarTabela(aplicacoes.filter(app => app.banco === 'bb')); // Inicialmente mostra apenas aplicações do BB
    
    // Event listeners
    document.getElementById('aplicar-filtros').addEventListener('click', aplicarFiltros);
    
    document.getElementById('limpar-filtros').addEventListener('click', function() {
        // Resetar todos os filtros
        document.getElementById('filtro-tipo').value = 'todos';
        document.getElementById('filtro-risco').value = 'todos';
        document.getElementById('filtro-valor').value = 'todos';
        document.getElementById('filtro-liquidez').value = 'todos';
        document.getElementById('filtro-rentabilidade').value = 0;
        document.getElementById('rentabilidade-valor').textContent = '0%';
        document.getElementById('filtro-prazo').value = 'todos';
        document.getElementById('filtro-banco').value = 'bb';
        document.getElementById('filtro-recomendacao').value = 'todos';
        
        // Aplicar filtros resetados
        aplicarFiltros();
    });
    
    // Atualizar o valor exibido do slider de rentabilidade
    document.getElementById('filtro-rentabilidade').addEventListener('input', function() {
        document.getElementById('rentabilidade-valor').textContent = this.value + '%';
    });
    
    // Adicionar event listeners para paginação
    document.querySelectorAll('.paginacao-item').forEach(item => {
        item.addEventListener('click', function() {
            // Remover classe active de todos os itens
            document.querySelectorAll('.paginacao-item').forEach(i => i.classList.remove('active'));
            // Adicionar classe active ao item clicado
            this.classList.add('active');
            
            // Aqui você pode implementar a lógica de paginação real
            // Por enquanto, apenas recarrega os mesmos dados
            aplicarFiltros();
        });
    });
    
    // Atualizar dados em tempo real (simulado)
    setInterval(function() {
        // Simular pequenas variações nas rentabilidades
        aplicacoes.forEach(aplicacao => {
            // Variação aleatória de até 0.2% para cima ou para baixo
            const variacao = (Math.random() * 0.4 - 0.2).toFixed(2);
            aplicacao.rentabilidadeValor = parseFloat((aplicacao.rentabilidadeValor + parseFloat(variacao)).toFixed(2));
            
            // Atualizar string de rentabilidade para refletir o novo valor
            if (aplicacao.rentabilidade.includes('CDI')) {
                const percentCDI = Math.round(aplicacao.rentabilidadeValor / 10.75 * 100);
                aplicacao.rentabilidade = `${percentCDI}% do CDI`;
            } else if (aplicacao.rentabilidade.includes('IPCA')) {
                const spreadIPCA = (aplicacao.rentabilidadeValor - 4.23).toFixed(1);
                aplicacao.rentabilidade = `IPCA + ${spreadIPCA}% a.a.`;
            } else if (aplicacao.rentabilidade.includes('Selic')) {
                const percentSelic = Math.round(aplicacao.rentabilidadeValor / 10.75 * 100);
                aplicacao.rentabilidade = `${percentSelic}% Selic`;
            } else {
                aplicacao.rentabilidade = `${aplicacao.rentabilidadeValor.toFixed(1)}% a.a.`;
            }
        });
        
        // Recarregar a tabela com os dados atualizados
        aplicarFiltros();
    }, 60000); // Atualiza a cada 60 segundos
});
