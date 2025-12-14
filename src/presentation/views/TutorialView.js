/**
 * View: Tutorial Interativo
 * Exibe um tutorial passo a passo para novos usuários
 */
class TutorialView {
  constructor(tutorialService, onComplete) {
    this.tutorialService = tutorialService;
    this.onComplete = onComplete;
    this.currentStep = 0;
    this.steps = [
      {
        title: 'Bem-vindo ao Chef Finance! 👋',
        content: `
          <p>Este é um sistema de gestão financeira para eventos culinários.</p>
          <p>Vamos te guiar pelos principais recursos em poucos passos.</p>
        `,
        highlight: null
      },
      {
        title: '📊 Dashboard - Visão Geral',
        content: `
          <p>Aqui você vê um resumo financeiro geral e a lista de seus eventos.</p>
          <p><strong>Dica:</strong> Os eventos são organizados por data, com os mais recentes primeiro.</p>
        `,
        highlight: '#dashboard-content'
      },
      {
        title: '➕ Criar Novo Evento',
        content: `
          <p>Use o botão <strong>➕</strong> no centro da barra inferior para criar um novo evento.</p>
          <p>Cada evento representa uma prestação de serviço e terá suas próprias despesas e receitas.</p>
        `,
        highlight: '#fab-new-event'
      },
      {
        title: '⚙️ Configurações',
        content: `
          <p>Na aba <strong>Ajustes</strong>, configure:</p>
          <ul style="text-align: left; margin: var(--spacing-md) 0;">
            <li>Valores de KM e diárias</li>
            <li>Dados da sua empresa (CNPJ, endereço, etc.)</li>
            <li>Chave PIX para recebimentos</li>
          </ul>
          <p><strong>Importante:</strong> Configure seus dados antes de criar eventos!</p>
        `,
        highlight: '.bottom-nav-item[data-view="settings"]'
      },
      {
        title: '💰 Despesas e Receitas',
        content: `
          <p>Ao criar um evento, você pode adicionar:</p>
          <ul style="text-align: left; margin: var(--spacing-md) 0;">
            <li><strong>Despesas:</strong> KM rodado, hospedagem, insumos, etc.</li>
            <li><strong>Receitas:</strong> Diárias técnicas, taxas extras</li>
          </ul>
          <p>O sistema calcula automaticamente os valores com base nas suas configurações.</p>
        `,
        highlight: null
      },
      {
        title: '📄 Relatórios',
        content: `
          <p>Gere relatórios completos de prestação de contas para cada evento.</p>
          <p>Os relatórios incluem todas as despesas, receitas e cálculos automáticos.</p>
          <p>Perfeito para enviar ao contratante junto com as notas fiscais!</p>
        `,
        highlight: null
      },
      {
        title: '✅ Pronto para Começar!',
        content: `
          <p>Agora você já conhece o básico do sistema!</p>
          <p><strong>Próximos passos:</strong></p>
          <ol style="text-align: left; margin: var(--spacing-md) 0;">
            <li>Configure seus dados em <strong>Ajustes</strong></li>
            <li>Crie seu primeiro evento</li>
            <li>Adicione despesas e receitas</li>
            <li>Gere relatórios quando necessário</li>
          </ol>
          <p>Boa sorte! 🍰</p>
        `,
        highlight: null
      }
    ];
  }

  /**
   * Renderiza o tutorial
   */
  render() {
    // Cria overlay do tutorial
    const overlay = document.createElement('div');
    overlay.id = 'tutorial-overlay';
    overlay.className = 'tutorial-overlay';
    overlay.innerHTML = this._renderStep();
    
    document.body.appendChild(overlay);
    document.body.classList.add('tutorial-open');

    // Adiciona event listeners
    this._setupEventListeners();

    // Destaca elemento se necessário
    this._highlightElement();
  }

  /**
   * Renderiza o passo atual
   * @private
   */
  _renderStep() {
    const step = this.steps[this.currentStep];
    const isFirst = this.currentStep === 0;
    const isLast = this.currentStep === this.steps.length - 1;
    const progress = ((this.currentStep + 1) / this.steps.length) * 100;

    return `
      <div class="tutorial-modal">
        <div class="tutorial-progress">
          <div class="tutorial-progress-bar" style="width: ${progress}%"></div>
        </div>
        
        <div class="tutorial-content">
          <h2 class="tutorial-title">${step.title}</h2>
          <div class="tutorial-body">
            ${step.content}
          </div>
        </div>

        <div class="tutorial-footer">
          <div class="tutorial-steps-indicator">
            ${this.steps.map((_, index) => `
              <span class="tutorial-step-dot ${index === this.currentStep ? 'active' : ''}"></span>
            `).join('')}
          </div>

          <div class="tutorial-actions">
            ${!isFirst ? `
              <button class="btn btn-secondary tutorial-btn-prev" id="tutorial-btn-prev">
                ← Anterior
              </button>
            ` : ''}
            
            <button class="btn btn-secondary tutorial-btn-skip" id="tutorial-btn-skip">
              Pular Tutorial
            </button>

            ${!isLast ? `
              <button class="btn btn-primary tutorial-btn-next" id="tutorial-btn-next">
                Próximo →
              </button>
            ` : `
              <button class="btn btn-primary tutorial-btn-complete" id="tutorial-btn-complete">
                Começar a Usar!
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Configura os event listeners
   * @private
   */
  _setupEventListeners() {
    // Botão Próximo
    const btnNext = document.getElementById('tutorial-btn-next');
    if (btnNext) {
      btnNext.addEventListener('click', () => this.nextStep());
    }

    // Botão Anterior
    const btnPrev = document.getElementById('tutorial-btn-prev');
    if (btnPrev) {
      btnPrev.addEventListener('click', () => this.prevStep());
    }

    // Botão Pular
    const btnSkip = document.getElementById('tutorial-btn-skip');
    if (btnSkip) {
      btnSkip.addEventListener('click', () => this.skip());
    }

    // Botão Concluir
    const btnComplete = document.getElementById('tutorial-btn-complete');
    if (btnComplete) {
      btnComplete.addEventListener('click', () => this.complete());
    }

    // Fecha ao clicar no overlay (fora do modal)
    const overlay = document.getElementById('tutorial-overlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.skip();
        }
      });
    }
  }

  /**
   * Avança para o próximo passo
   */
  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this._updateStep();
    }
  }

  /**
   * Volta para o passo anterior
   */
  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this._updateStep();
    }
  }

  /**
   * Atualiza o passo atual
   * @private
   */
  _updateStep() {
    const overlay = document.getElementById('tutorial-overlay');
    if (overlay) {
      overlay.innerHTML = this._renderStep();
      this._setupEventListeners();
      this._highlightElement();
    }
  }

  /**
   * Destaca o elemento relacionado ao passo atual
   * @private
   */
  _highlightElement() {
    // Remove destaque anterior
    document.querySelectorAll('.tutorial-highlight').forEach(el => {
      el.classList.remove('tutorial-highlight');
    });

    const step = this.steps[this.currentStep];
    if (step.highlight) {
      const element = document.querySelector(step.highlight);
      if (element) {
        element.classList.add('tutorial-highlight');
        
        // Scroll suave para o elemento
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  /**
   * Pula o tutorial
   */
  skip() {
    this.tutorialService.markAsCompleted();
    this._close();
  }

  /**
   * Completa o tutorial
   */
  complete() {
    this.tutorialService.markAsCompleted();
    this._close();
    if (this.onComplete) {
      this.onComplete();
    }
  }

  /**
   * Fecha o tutorial
   * @private
   */
  _close() {
    const overlay = document.getElementById('tutorial-overlay');
    if (overlay) {
      overlay.classList.add('tutorial-closing');
      setTimeout(() => {
        overlay.remove();
        document.body.classList.remove('tutorial-open');
        
        // Remove destaque
        document.querySelectorAll('.tutorial-highlight').forEach(el => {
          el.classList.remove('tutorial-highlight');
        });
      }, 300);
    }
  }
}

// Export para uso em módulos ES6
export { TutorialView };

