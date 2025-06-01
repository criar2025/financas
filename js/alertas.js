// Sistema de alertas para finança.com

// Este arquivo gerencia os alertas de investimento do site
// Complementa o arquivo main.js com funcionalidades específicas de alertas

// Configuração dos tipos de alertas
const tiposAlertas = {
  verde: {
    classe: 'alerta-verde',
    indicador: 'indicador-verde',
    mensagem: 'Recomendado'
  },
  amarelo: {
    classe: 'alerta-amarelo',
    indicador: 'indicador-amarelo',
    mensagem: 'Atenção'
  },
  vermelho: {
    classe: 'alerta-vermelho',
    indicador: 'indicador-vermelho',
    mensagem: 'Não Recomendado'
  },
  neutro: {
    classe: 'alerta-neutro',
    indicador: 'indicador-neutro',
    mensagem: 'Neutro'
  }
};

// Função para criar um novo alerta
function criarAlerta(id, titulo, descricao, tipo, container) {
  const alertaConfig = tiposAlertas[tipo] || tiposAlertas.neutro;
  
  const alertaHTML = `
    <div class="alerta-item ${alertaConfig.classe} pulsando" id="${id}">
      <span class="indicador-alerta ${alertaConfig.indicador}"></span>
      <div class="alerta-conteudo">
        <div class="alerta-titulo">${titulo}</div>
        <div class="alerta-descricao">${descricao}</div>
      </div>
    </div>
  `;
  
  const containerElement = document.getElementById(container);
  if (containerElement) {
    containerElement.innerHTML += alertaHTML;
  }
  
  return document.getElementById(id);
}

// Função para atualizar um alerta existente
function atualizarAlerta(id, novoTipo, novaDescricao = null) {
  const alerta = document.getElementById(id);
  if (!alerta) return false;
  
  const alertaConfig = tiposAlertas[novoTipo] || tiposAlertas.neutro;
  
  // Remover classes antigas
  Object.values(tiposAlertas).forEach(config => {
    alerta.classList.remove(config.classe);
  });
  
  // Adicionar nova classe
  alerta.classList.add(alertaConfig.classe);
  
  // Atualizar indicador
  const indicador = alerta.querySelector('.indicador-alerta');
  if (indicador) {
    // Remover classes antigas
    Object.values(tiposAlertas).forEach(config => {
      indicador.classList.remove(config.indicador);
    });
    
    // Adicionar nova classe
    indicador.classList.add(alertaConfig.indicador);
  }
  
  // Atualizar descrição se fornecida
  if (novaDescricao) {
    const descricaoElement = alerta.querySelector('.alerta-descricao');
    if (descricaoElement) {
      descricaoElement.textContent = novaDescricao;
    }
  }
  
  return true;
}

// Função para remover um alerta
function removerAlerta(id) {
  const alerta = document.getElementById(id);
  if (alerta) {
    alerta.remove();
    return true;
  }
  return false;
}

// Função para adicionar animação de pulso a um alerta
function adicionarPulso(id) {
  const alerta = document.getElementById(id);
  if (alerta) {
    alerta.classList.add('pulsando');
    return true;
  }
  return false;
}

// Função para remover animação de pulso de um alerta
function removerPulso(id) {
  const alerta = document.getElementById(id);
  if (alerta) {
    alerta.classList.remove('pulsando');
    return true;
  }
  return false;
}

// Exportar funções para uso global
window.financeAlertas = {
  tipos: tiposAlertas,
  criar: criarAlerta,
  atualizar: atualizarAlerta,
  remover: removerAlerta,
  adicionarPulso,
  removerPulso
};
