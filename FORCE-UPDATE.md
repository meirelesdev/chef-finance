# 🔄 Forçar Atualização do Tutorial

Se as mudanças do tutorial não aparecerem, siga estes passos:

## Método 1: Limpar Cache do Navegador

1. **Chrome/Edge:**
   - Pressione `Ctrl + Shift + Delete` (Windows) ou `Cmd + Shift + Delete` (Mac)
   - Selecione "Imagens e arquivos em cache"
   - Clique em "Limpar dados"

2. **Firefox:**
   - Pressione `Ctrl + Shift + Delete`
   - Selecione "Cache"
   - Clique em "Limpar agora"

3. **Safari:**
   - Menu Desenvolvedor > Limpar Caches
   - Ou `Cmd + Option + E`

## Método 2: Hard Refresh

- **Windows:** `Ctrl + F5` ou `Ctrl + Shift + R`
- **Mac:** `Cmd + Shift + R`

## Método 3: Desabilitar Cache (DevTools)

1. Abra DevTools (`F12`)
2. Vá em Network/Redes
3. Marque "Disable cache"
4. Recarregue a página (`F5`)

## Método 4: Limpar Service Worker

1. Abra DevTools (`F12`)
2. Vá em Application > Service Workers
3. Clique em "Unregister" para cada service worker
4. Vá em Application > Storage > Clear site data
5. Recarregue a página

## Método 5: Modo Anônimo

Abra o site em uma janela anônima/privada para testar sem cache.

---

**Nota:** O cache foi atualizado para `v4` no service worker. Se ainda não funcionar, desregistre o service worker manualmente.

