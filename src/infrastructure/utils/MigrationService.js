/**
 * Serviço de Migração de Dados
 * Migra dados do localStorage de nomes antigos para novos
 */

class MigrationService {
  constructor() {
    this.migrations = [
      {
        oldKey: 'gi_financas_settings',
        newKey: 'chef_finance_settings'
      },
      {
        oldKey: 'gi_financas_events',
        newKey: 'chef_finance_events'
      },
      {
        oldKey: 'gi_financas_transactions',
        newKey: 'chef_finance_transactions'
      }
    ];
  }

  /**
   * Executa todas as migrações necessárias
   * @returns {Promise<Object>} - Resultado com quantidade de migrações realizadas
   */
  async migrate() {
    let migratedCount = 0;
    const migratedKeys = [];

    for (const migration of this.migrations) {
      try {
        const oldData = window.localStorage.getItem(migration.oldKey);
        const newData = window.localStorage.getItem(migration.newKey);

        // Se existe dado antigo e não existe novo, migra
        if (oldData && !newData) {
          window.localStorage.setItem(migration.newKey, oldData);
          migratedKeys.push(migration.oldKey);
          migratedCount++;
          console.log(`✅ Migrado: ${migration.oldKey} → ${migration.newKey}`);
        }
        // Se ambos existem e são diferentes, mantém o novo mas remove o antigo
        else if (oldData && newData && oldData !== newData) {
          // Mantém o novo, remove o antigo para evitar duplicação
          window.localStorage.removeItem(migration.oldKey);
          console.log(`🗑️ Removido antigo (novo já existe): ${migration.oldKey}`);
        }
        // Se só existe o antigo e não existe novo, migra
        else if (oldData && !newData) {
          window.localStorage.setItem(migration.newKey, oldData);
          migratedKeys.push(migration.oldKey);
          migratedCount++;
          console.log(`✅ Migrado: ${migration.oldKey} → ${migration.newKey}`);
        }
      } catch (error) {
        console.error(`❌ Erro ao migrar ${migration.oldKey}:`, error);
      }
    }

    return {
      success: true,
      migratedCount,
      migratedKeys
    };
  }

  /**
   * Verifica se há dados antigos que precisam ser migrados
   * @returns {boolean} - True se há dados para migrar
   */
  hasOldData() {
    return this.migrations.some(migration => {
      return window.localStorage.getItem(migration.oldKey) !== null;
    });
  }
}

// Export para uso em módulos ES6
export { MigrationService };

