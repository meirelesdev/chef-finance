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
        title: '⚙️ Configuração Obrigatória',
        content: `
          <p><strong style="color: var(--color-primary); font-size: 1.1em;">⚠️ ATENÇÃO!</strong></p>
          <p>Antes de usar o sistema, você <strong>DEVE</strong> configurar seus dados em <strong>Ajustes</strong>:</p>
          <ul style="text-align: left; margin: var(--spacing-md) 0;">
            <li>📋 <strong>Dados da sua empresa:</strong> Razão Social, CNPJ, Endereço</li>
            <li>👤 <strong>Dados do representante:</strong> Nome e CPF</li>
            <li>💰 <strong>Chave PIX</strong> para recebimentos</li>
            <li>📧 <strong>E-mails</strong> para envio de notas fiscais</li>
            <li>💵 <strong>Valores:</strong> Taxa por KM, diárias, etc.</li>
          </ul>
          <p style="background: var(--color-warning-light); padding: var(--spacing-md); border-radius: var(--radius-md); margin-top: var(--spacing-md);">
            <strong>O sistema não funcionará até que você complete a configuração!</strong>
          </p>
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
        title: '🚀 Próximo Passo: Configurar!',
        content: `
          <p>Agora você conhece o sistema!</p>
          <p style="background: var(--color-primary-light); padding: var(--spacing-lg); border-radius: var(--radius-md); margin: var(--spacing-md) 0;">
            <strong style="font-size: 1.1em;">Vamos configurar seus dados agora?</strong>
          </p>
          <p>Após concluir o tutorial, você será direcionado para a tela de <strong>Ajustes</strong>.</p>
          <p>Preencha todos os campos obrigatórios para começar a usar o sistema!</p>
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
      <div class="tutorial-modal" style="max-width: 320px; width: calc(100% - 32px); padding: 16px; margin-top: 20px;">
        <div class="tutorial-progress">
          <div class="tutorial-progress-bar" style="width: ${progress}%"></div>
        </div>
        
        <div class="tutorial-content">
          <h2 class="tutorial-title" style="font-size: 18px; margin-bottom: 12px;">${step.title}</h2>
          <div class="tutorial-body" style="font-size: 14px;">
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
    // Remove destaque anterior e cutout
    document.querySelectorAll('.tutorial-highlight').forEach(el => {
      el.classList.remove('tutorial-highlight');
      el.style.zIndex = '';
      el.style.position = '';
      el.style.filter = '';
      el.style.transform = '';
      el.style.background = '';
      el.style.borderRadius = '';
      el.style.padding = '';
    });
    
    // Restaura bottom-nav ao estado normal
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
      bottomNav.style.zIndex = '';
      bottomNav.style.position = '';
    }
    
    // Remove cutout anterior do overlay
    const overlay = document.getElementById('tutorial-overlay');
    if (overlay) {
      const existingCutout = overlay.querySelector('.tutorial-cutout');
      if (existingCutout) {
        existingCutout.remove();
      }
    }

    const step = this.steps[this.currentStep];
    if (step.highlight) {
      this._findAndHighlightElement(step.highlight, overlay);
    }
  }

  /**
   * Encontra e destaca o elemento
   * @private
   */
  _findAndHighlightElement(selector, overlay) {
    // Determina seletores de fallback baseado no seletor original
    let selectors = [selector]; // Tenta o seletor original primeiro
    
    if (selector === '#fab-new-event' || selector.includes('fab')) {
      // Para FAB, tenta variações
      selectors = [
        '#fab-new-event',
        '.fab',
        'button#fab-new-event',
        'button.fab'
      ];
    } else if (selector.includes('settings')) {
      // Para botão de ajustes, tenta variações
      selectors = [
        selector,
        'button[data-view="settings"]',
        '.bottom-nav-item[data-view="settings"]',
        '.bottom-nav-item[aria-label="Ajustes"]',
        '.bottom-nav button:last-child',
        'nav.bottom-nav button:last-child',
        '.bottom-nav .bottom-nav-item:last-child',
        'button.bottom-nav-item:last-of-type'
      ];
    }
    
    // Tenta encontrar o elemento
    let element = null;
    for (const sel of selectors) {
      element = document.querySelector(sel);
      if (element) {
        console.log('✅ Elemento encontrado com seletor:', sel);
        break;
      }
    }
    
    // Se encontrou, aplica o destaque
    if (element) {
      this._applyHighlight(element, overlay);
      return;
    }
    
    // Se não encontrou, usa MutationObserver para detectar quando aparecer
    console.warn('⚠️ Elemento não encontrado, aguardando aparecer no DOM...', selector);
    const observer = new MutationObserver((mutations, obs) => {
      for (const sel of selectors) {
        const found = document.querySelector(sel);
        if (found) {
          console.log('✅ Elemento encontrado após observer:', sel);
          obs.disconnect();
          this._applyHighlight(found, overlay);
          return;
        }
      }
    });
    
    // Observa mudanças no body e na bottom-nav
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Timeout de segurança (para não ficar observando para sempre)
    setTimeout(() => {
      observer.disconnect();
      let finalElement = null;
      for (const sel of selectors) {
        finalElement = document.querySelector(sel);
        if (finalElement) break;
      }
      
      if (finalElement) {
        console.log('✅ Elemento encontrado no timeout final');
        this._applyHighlight(finalElement, overlay);
      } else {
        console.error('❌ Elemento não encontrado após observer:', selector);
      }
    }, 1000);
  }

  /**
   * Aplica o destaque ao elemento
   * @private
   */
  _applyHighlight(element, overlay) {
    if (!element) return;
    
    // Garante que o elemento está visível
    element.style.display = '';
    element.style.visibility = 'visible';
    element.style.opacity = '1';
    
    element.classList.add('tutorial-highlight');
    
    // Identifica o tipo de elemento
    const isFAB = element.id === 'fab-new-event' || element.classList.contains('fab');
    const isBottomNavItem = element.closest('.bottom-nav') && !isFAB;
    const computedStyle = window.getComputedStyle(element);
    const isFixed = computedStyle.position === 'fixed' || isFAB;
    
    // Aguarda um frame para garantir que o elemento está renderizado
    requestAnimationFrame(() => {
      // Calcula posição do elemento para criar cutout
      const rect = element.getBoundingClientRect();
      const padding = isFAB ? 16 : 12; // Mais padding para FAB
      
      // Verifica se o elemento tem dimensões válidas
      if (rect.width === 0 || rect.height === 0) {
        console.warn('⚠️ Elemento tem dimensões zero, tentando novamente:', element);
        setTimeout(() => this._applyHighlight(element, overlay), 100);
        return;
      }
    
      // Cria um cutout no overlay para deixar o elemento visível
      if (overlay) {
        const cutout = document.createElement('div');
        cutout.className = 'tutorial-cutout';
        cutout.style.cssText = `
          position: fixed;
          top: ${rect.top - padding}px;
          left: ${rect.left - padding}px;
          width: ${rect.width + (padding * 2)}px;
          height: ${rect.height + (padding * 2)}px;
          border-radius: ${isFAB ? '50%' : '12px'};
          box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
          pointer-events: none;
          z-index: 9999;
        `;
        overlay.appendChild(cutout);
      }
      
      // Aplica estilos para garantir que apareça acima do overlay
      if (isFAB) {
        // FAB é fixo e precisa aparecer acima de tudo, mantendo centralização
        element.style.zIndex = '10002';
        element.style.position = 'fixed';
        element.style.left = '50%';
        element.style.bottom = '35px';
        element.style.transform = 'translateX(-50%) scale(1.1)';
        element.style.filter = 'brightness(1.4) drop-shadow(0 0 30px rgba(233, 30, 99, 1))';
        element.style.border = '4px solid rgba(233, 30, 99, 0.8)';
        element.style.boxShadow = '0 0 0 4px rgba(233, 30, 99, 0.5), 0 0 0 8px rgba(233, 30, 99, 0.3), 0 8px 32px rgba(233, 30, 99, 0.6)';
      } else if (isBottomNavItem) {
        // Para elementos na bottom-nav, garante que a nav inteira apareça
        const bottomNav = element.closest('.bottom-nav');
        if (bottomNav) {
          bottomNav.style.zIndex = '10001';
          bottomNav.style.position = 'fixed';
        }
        element.style.zIndex = '10002';
        element.style.position = 'relative';
        element.style.filter = 'brightness(1.3) drop-shadow(0 0 20px rgba(233, 30, 99, 0.9))';
      } else {
        // Elementos normais
        element.style.zIndex = '10001';
        element.style.position = isFixed ? 'fixed' : 'relative';
        element.style.filter = 'brightness(1.2)';
      }
      
      // Scroll suave para o elemento (mas não para elementos fixos)
      if (!isFixed && !isBottomNavItem) {
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest',
            inline: 'nearest'
          });
        }, 100);
      }
      
      // Atualiza cutout após um delay para garantir que o elemento está renderizado
      setTimeout(() => {
        const newRect = element.getBoundingClientRect();
        const cutout = overlay?.querySelector('.tutorial-cutout');
        if (cutout && newRect.width > 0 && newRect.height > 0) {
          cutout.style.top = `${newRect.top - padding}px`;
          cutout.style.left = `${newRect.left - padding}px`;
          cutout.style.width = `${newRect.width + (padding * 2)}px`;
          cutout.style.height = `${newRect.height + (padding * 2)}px`;
        }
        
        // Garante z-index correto após atualização
        if (isFAB) {
          element.style.zIndex = '10002';
        } else if (isBottomNavItem) {
          const bottomNav = element.closest('.bottom-nav');
          if (bottomNav) {
            bottomNav.style.zIndex = '10001';
          }
          element.style.zIndex = '10002';
        }
      }, 300);
    });
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
    // Redireciona para configurações após tutorial
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('navigate', {
        detail: { view: 'settings' }
      }));
    }, 300);
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
        
        // Remove destaque e estilos inline
        document.querySelectorAll('.tutorial-highlight').forEach(el => {
          el.classList.remove('tutorial-highlight');
          el.style.zIndex = '';
          el.style.position = '';
          el.style.filter = '';
          el.style.transform = '';
          el.style.background = '';
          el.style.borderRadius = '';
          el.style.padding = '';
          el.style.display = '';
          el.style.visibility = '';
          el.style.opacity = '';
        });
        
        // Restaura bottom-nav
        const bottomNav = document.querySelector('.bottom-nav');
        if (bottomNav) {
          bottomNav.style.zIndex = '';
          bottomNav.style.position = '';
        }
        
        // Remove cutout
        const cutout = document.querySelector('.tutorial-cutout');
        if (cutout) {
          cutout.remove();
        }
      }, 300);
    }
  }
}

// Export para uso em módulos ES6
export { TutorialView };

