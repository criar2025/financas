// Arquivo de configuração de gráficos para finança.com

// Este arquivo contém configurações específicas para os gráficos do site
// Complementa o arquivo main.js com funcionalidades adicionais

// Configurações de cores para gráficos
const chartColors = {
  positivo: '#2ecc71',
  neutro: '#3498db',
  negativo: '#e74c3c',
  background: {
    positivo: 'rgba(46, 204, 113, 0.1)',
    neutro: 'rgba(52, 152, 219, 0.1)',
    negativo: 'rgba(231, 76, 60, 0.1)'
  }
};

// Configurações padrão para todos os gráficos
const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: true,
      mode: 'index',
      intersect: false
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
};

// Função para criar gráficos de comparação
function criarGraficoComparativo(id, dados, labels, cores) {
  const ctx = document.getElementById(id);
  
  if (ctx) {
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: dados.map((dataset, index) => ({
          label: dataset.label,
          data: dataset.valores,
          backgroundColor: cores[index % cores.length],
          borderColor: cores[index % cores.length],
          borderWidth: 1
        }))
      },
      options: {
        ...defaultChartOptions,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          x: {
            display: true
          },
          y: {
            display: true,
            beginAtZero: true
          }
        }
      }
    });
  }
  
  return null;
}

// Função para atualizar dados de gráficos existentes
function atualizarDadosGrafico(chart, novosDados, novosLabels = null) {
  if (chart && chart.data) {
    chart.data.datasets.forEach((dataset, i) => {
      if (novosDados[i]) {
        dataset.data = novosDados[i];
      }
    });
    
    if (novosLabels) {
      chart.data.labels = novosLabels;
    }
    
    chart.update();
  }
}

// Exportar funções para uso global
window.financeCharts = {
  colors: chartColors,
  options: defaultChartOptions,
  criarGraficoComparativo,
  atualizarDadosGrafico
};
