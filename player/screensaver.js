/* --- Lógica Compartilhada e Controle do Descanso de Tela --- */
const screensaver = document.getElementById('screensaver');
const screensaverImg = document.getElementById('screensaver-img');
const screensaverBar = document.getElementById('screensaver-bar');
const screensaverBgBlur = document.getElementById('screensaver-bg-blur');
const cdContainer = document.getElementById('cd-container');
const cdDisc = document.getElementById('cd-disc');

// Modos: 'cd' (Padrão) ou 'kenburns'
let modoScreensaverAtual = 'cd';

function atualizarImagemDescansoTela() {
    const item = itensMídia[indiceItemAtual];
    let focoAtual = 'centro';

    // Determina o foco baseado no tipo de mídia atual
    if (item) {
        if (item.tipo === 'musica') {
            focoAtual = item.dados.foco || 'centro';
        } else if (item.musicas && item.musicas[indiceSubMusica]) {
            // Em coleções, prioriza o foco da música específica; se não houver, usa o da coleção
            focoAtual = item.musicas[indiceSubMusica].foco || item.foco || 'centro';
        }
    }

    // Limpa classes anteriores de posicionamento do CD
    cdDisc.classList.remove('foco-esquerda', 'foco-direita');
    if (focoAtual === 'esquerda') {
        cdDisc.classList.add('foco-esquerda');
    } else if (focoAtual === 'direita') {
        cdDisc.classList.add('foco-direita');
    }

    const imagemCapa = player.poster;
    const svgFallback = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><rect width="100%" height="100%" fill="%23222"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23444" font-family="Arial" font-size="24">Sem Capa</text></svg>';

    const srcFinal = imagemCapa ? imagemCapa : svgFallback;

    screensaverImg.src = srcFinal;
    screensaverBgBlur.src = srcFinal;

    if (imagemCapa) {
        const urlSegura = imagemCapa.replace(/'/g, "\\'");
        cdDisc.style.backgroundImage = `url("${urlSegura}")`;
    } else {
        cdDisc.style.backgroundImage = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500"><rect width="100%" height="100%" fill="%23333"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23555" font-family="Arial" font-size="30">CD Player</text></svg>')`;
    }

    aplicarVisibilidadeModo();
}

function aplicarVisibilidadeModo() {
    if (modoScreensaverAtual === 'cd') {
        screensaverImg.style.display = 'none';
        screensaverBgBlur.style.display = 'block';
        cdContainer.style.display = 'flex';
    } else {
        screensaverImg.style.display = 'block';
        screensaverBgBlur.style.display = 'none';
        cdContainer.style.display = 'none';
    }
}

function alternarModoScreensaver() {
    const btnAlternar = document.querySelector(".btn-left");

    if (modoScreensaverAtual === 'cd') {
        modoScreensaverAtual = 'kenburns';
        if (btnAlternar) btnAlternar.innerText = 'Efeito: Zoom';
    } else {
        modoScreensaverAtual = 'cd';
        if (btnAlternar) btnAlternar.innerText = 'Efeito: CD';
    }

    aplicarVisibilidadeModo();
}

function iniciarDescansoTela() {
    atualizarImagemDescansoTela();
    screensaver.style.display = 'block';
}

function fecharDescansoTela() {
    screensaver.style.display = 'none';
}

// Sincroniza o progresso do player com a barra inferior do screensaver
player.addEventListener('timeupdate', () => {
    if (player.duration) {
        const porcentagem = (player.currentTime / player.duration) * 100;
        screensaverBar.style.width = porcentagem + '%';
    } else {
        screensaverBar.style.width = '0%';
    }
});

// --- Atalhos de Controle Remoto exclusivos para o Descanso de Tela ---
document.addEventListener('keydown', (event) => {
    // Só executa se o descanso de tela estiver aberto/visível
    if (screensaver.style.display === 'block') {

        // Enter -> Play / Pause
        if (event.key === 'Enter') {
            alternarPlayPause();
            event.preventDefault();
        }
        // Seta para a Direita -> Próxima Música
        else if (event.key === 'ArrowRight') {
            proximaMusica();
            atualizarImagemDescansoTela(); // Atualiza a capa do screensaver para a nova música
            event.preventDefault();
        }
        // Seta para a Esquerda -> Música Anterior
        else if (event.key === 'ArrowLeft') {
            musicaAnterior();
            atualizarImagemDescansoTela(); // Atualiza a capa do screensaver para a música anterior
            event.preventDefault();
        }
        // Seta para Baixo ou Backspace/Escape -> Sair do Descanso de Tela
        else if (event.key === 'ArrowDown' || event.key === 'Escape' || event.key === 'Backspace') {
            fecharDescansoTela();
            event.preventDefault();
        }
        else if (event.key === 'ArrowUp') {
            alternarModoScreensaver();
        }
    } else {
        if (event.key === 'Escape' || event.key === 'Backspace') {
            iniciarDescansoTela();
            event.preventDefault();
        }
    }
});

const pausedIndicator = document.getElementById('screensaver-paused-indicator');

// Atualiza a visibilidade do indicador de pausa
function atualizarEstadoPausaVisual() {
    if (screensaver.style.display === 'block') {
        if (player.paused) {
            pausedIndicator.style.display = 'flex';
            // Opcional: para o CD parar de girar quando pausado
            cdDisc.style.animationPlayState = 'paused';
        } else {
            pausedIndicator.style.display = 'none';
            // Retorna o CD para girando normalmente
            cdDisc.style.animationPlayState = 'running';
        }
    }
}

// Chame essa função dentro do iniciarDescansoTela()
function iniciarDescansoTela() {
    atualizarImagemDescansoTela();
    atualizarEstadoPausaVisual(); // Garante que abre com o estado correto
    screensaver.style.display = 'block';
}

// Escuta os eventos de play e pause do player global para atualizar em tempo real
player.addEventListener('play', atualizarEstadoPausaVisual);
player.addEventListener('pause', atualizarEstadoPausaVisual);