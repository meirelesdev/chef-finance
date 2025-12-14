/**
 * Serviço de Domínio: TutorialService
 * Gerencia o estado do tutorial interativo
 * PURE JavaScript - sem dependências externas
 */

class TutorialService {
  constructor() {
    this.storageKey = 'chef_finance_tutorial_completed';
  }

  /**
   * Verifica se o tutorial já foi concluído
   * @returns {boolean} - True se foi concluído, false caso contrário
   */
  isCompleted() {
    try {
      const completed = window.localStorage.getItem(this.storageKey);
      return completed === 'true';
    } catch (error) {
      // Se houver erro ao acessar localStorage, assume que não foi concluído
      return false;
    }
  }

  /**
   * Marca o tutorial como concluído
   */
  markAsCompleted() {
    try {
      window.localStorage.setItem(this.storageKey, 'true');
    } catch (error) {
      console.error('Erro ao salvar estado do tutorial:', error);
    }
  }

  /**
   * Reseta o tutorial (útil para testes ou reexibição)
   */
  reset() {
    try {
      window.localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error('Erro ao resetar tutorial:', error);
    }
  }

  /**
   * Verifica se é o primeiro acesso (sem configurações salvas e tutorial não concluído)
   * @param {boolean} hasSettings - Se existem configurações salvas
   * @returns {boolean} - True se é primeiro acesso
   */
  isFirstAccess(hasSettings) {
    return !hasSettings && !this.isCompleted();
  }
}

// Export para uso em módulos ES6
export { TutorialService };

