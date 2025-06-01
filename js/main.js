// Script principal para finança.com

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes
    inicializarMenuMobile();
    inicializarFiltros();
    inicializarGraficos();
    inicializarModoIniciante();
    
    // Simular dados em tempo real
    atualizarIndicesTempoReal();
});

// Função para inicializar o menu mobile
function inicializarMenuMobile() {
    const menuHamburguer = document.querySelector('.menu-hamburguer');
    const menuItems = document.querySelector('.menu-items');
    
    if (menuHamburguer && menuItems) {
        menuHamburguer.addEventListener('click', function() {
            menuItems.classList.toggle('active');
        });
    }
}

// Função para inicializar os filtros
function inicializarFiltros() {
    const filtrosBtns = document.querySelectorAll('.filtro-btn');
    const aplicacaoCards = document.querySelectorAll('.aplicacao-card');
    
    filtrosBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover classe active de todos os botões
            filtrosBtns.forEach(b => b.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            // Filtrar cards
            const filtro = this.getAttribute('data-filtro');
            
            aplicacaoCards.forEach(card => {
                if (filtro === 'todos') {
                    card.style.display = 'block';
                } else {
                    if (card.getAttribute('data-tipo').includes(filtro)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Função para inicializar os gráficos
function inicializarGraficos() {
    // Gráficos de índices
    criarGraficoLinha('grafico-ibovespa', [115000, 118000, 120000, 119000, 122000, 125000], '#3498db');
    criarGraficoLinha('grafico-cdi', [10.2, 10.3, 10.5, 10.6, 10.7, 10.75], '#3498db');
    criarGraficoLinha('grafico-selic', [10.2, 10.3, 10.5, 10.6, 10.7, 10.75], '#3498db');
    criarGraficoLinha('grafico-dolar', [5.25, 5.20, 5.18, 5.15, 5.14, 5.12], '#e74c3c');
    
    // Gráficos de aplicações
    criarGraficoLinha('grafico-aplicacao-1', [100, 102, 104, 106, 108, 110], '#2ecc71');
    criarGraficoLinha('grafico-aplicacao-2', [100, 101, 102, 103, 104, 105], '#3498db');
    criarGraficoLinha('grafico-aplicacao-3', [100, 105, 95, 110, 105, 115], '#f1c40f');
    criarGraficoLinha('grafico-aplicacao-4', [100, 103, 106, 109, 112, 115], '#2ecc71');
    
    // Gráfico de prospecção
    criarGraficoProspeccao();
}

// Função para criar gráfico de linha simples
function criarGraficoLinha(id, dados, cor) {
    const ctx = document.getElementById(id);
    
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{
                    data: dados,
                    borderColor: cor,
                    backgroundColor: cor + '20',
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.4,
                    fill: true
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
    }
}

// Função para criar gráfico de prospecção
function criarGraficoProspeccao() {
    const ctx = document.getElementById('grafico-prospeccao-futura');
    
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Hoje', '1 mês', '2 meses', '3 meses', '6 meses', '9 meses', '12 meses'],
                datasets: [
                    {
                        label: 'Cenário Otimista',
                        data: [1000, 1050, 1100, 1150, 1300, 1450, 1600],
                        borderColor: '#2ecc71',
                        backgroundColor: 'rgba(46, 204, 113, 0.1)',
                        borderWidth: 2,
                        pointRadius: 3,
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Cenário Realista',
                        data: [1000, 1030, 1060, 1090, 1180, 1270, 1360],
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        borderWidth: 2,
                        pointRadius: 3,
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Cenário Pessimista',
                        data: [1000, 1010, 1020, 1030, 1060, 1090, 1120],
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        borderWidth: 2,
                        pointRadius: 3,
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': R$ ' + context.raw.toFixed(2);
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: function(value) {
                                return 'R$ ' + value;
                            }
                        }
                    }
                }
            }
        });
    }
}

// Função para inicializar o modo iniciante
function inicializarModoIniciante() {
    const toggleModoIniciante = document.getElementById('toggle-modo-iniciante');
    
    if (toggleModoIniciante) {
        toggleModoIniciante.addEventListener('change', function() {
            const ativado = this.checked;
            document.body.classList.toggle('modo-iniciante-ativo', ativado);
            
            // Salvar preferência do usuário
            localStorage.setItem('modo-iniciante', ativado ? 'ativo' : 'inativo');
        });
        
        // Verificar preferência salva
        const preferenciaSalva = localStorage.getItem('modo-iniciante');
        if (preferenciaSalva === 'ativo') {
            toggleModoIniciante.checked = true;
            document.body.classList.add('modo-iniciante-ativo');
        }
    }
}

// Função para simular atualização de índices em tempo real
function atualizarIndicesTempoReal() {
    // Simular variação aleatória
    function variacaoAleatoria(valor, percentual) {
        const variacao = valor * (Math.random() * percentual * 2 - percentual) / 100;
        return valor + variacao;
    }
    
    // Atualizar a cada 5 segundos
    setInterval(function() {
        // Ibovespa
        const ibovespaValor = document.getElementById('ibovespa-valor');
        const ibovespaVariacao = document.getElementById('ibovespa-variacao');
        
        if (ibovespaValor && ibovespaVariacao) {
            const valorAtual = parseFloat(ibovespaValor.textContent.replace(/\D/g, ''));
            const novoValor = Math.round(variacaoAleatoria(valorAtual, 0.2));
            const variacao = ((novoValor / valorAtual - 1) * 100).toFixed(2);
            
            ibovespaValor.textContent = novoValor.toLocaleString('pt-BR');
            ibovespaVariacao.textContent = (variacao > 0 ? '+' : '') + variacao + '%';
            ibovespaVariacao.className = 'indice-variacao ' + (variacao >= 0 ? 'positiva' : 'negativa');
        }
        
        // Dólar
        const dolarValor = document.getElementById('dolar-valor');
        const dolarVariacao = document.getElementById('dolar-variacao');
        
        if (dolarValor && dolarVariacao) {
            const valorAtual = parseFloat(dolarValor.textContent.replace('R$ ', ''));
            const novoValor = variacaoAleatoria(valorAtual, 0.1).toFixed(2);
            const variacao = ((novoValor / valorAtual - 1) * 100).toFixed(2);
            
            dolarValor.textContent = 'R$ ' + novoValor;
            dolarVariacao.textContent = (variacao > 0 ? '+' : '') + variacao + '%';
            dolarVariacao.className = 'indice-variacao ' + (variacao >= 0 ? 'positiva' : 'negativa');
        }
    }, 5000);
}
