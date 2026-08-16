const state = {
    board: Array(9).fill(null).map(() => []),
    // 3 Pequenas (1), 3 Médias (2), 2 Grandes (3)
    banks: {
        1: [1, 1, 1, 2, 2, 2, 3, 3],
        2: [1, 1, 1, 2, 2, 2, 3, 3]
    },
    turn: 1,
    selected: null,
    winner: null
};

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6]            // Diagonais
];

function init() {
    document.getElementById('reset-btn').onclick = reset;
    render();
}

// Nova função helper para o Snackbar
function showSnackbar(text) {
    const snackbar = document.getElementById("snackbar");
    snackbar.textContent = text;
    snackbar.className = "show";
    setTimeout(() => { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}

function render() {
    // Atualiza o texto de status
    const statusEl = document.getElementById('status');
    if (state.winner) {
        statusEl.textContent = `🎉 Jogador ${state.winner} venceu!`;
    } else {
        statusEl.textContent = `Vez do Jogador ${state.turn}`;
    }

    // Renderiza o Tabuleiro
    const boardEl = document.getElementById('board');
    boardEl.innerHTML = '';
    state.board.forEach((stack, i) => {
        const cell = document.createElement('div');
        cell.className = 'cell';

        if (stack.length > 0) {
            const topPiece = stack[stack.length - 1];
            const img = document.createElement('img');
            img.src = getPieceFileName(topPiece.size, topPiece.player);
            img.className = 'piece-cell';
            cell.appendChild(img);

            // Badge para mostrar se há peças embaixo
            if (stack.length > 1) {
                const badge = document.createElement('div');
                badge.style.cssText = "position:absolute; bottom:2px; right:6px; font-size:0.7rem; background:rgba(0,0,0,0.6); padding:1px 4px; border-radius:4px;";
                badge.textContent = `+${stack.length - 1}`;
                cell.appendChild(badge);
            }
        }

        cell.onclick = () => play(i);
        boardEl.appendChild(cell);
    });

    // Renderiza Bancos e aplica classe 'active'
    [1, 2].forEach(p => {
        const bankEl = document.getElementById(`bank-${p}`);
        bankEl.className = `player-bank ${state.turn === p ? 'active' : ''}`;

        const container = bankEl.querySelector('.pieces-container');
        container.innerHTML = '';

        state.banks[p].forEach((size, idx) => {
            const img = document.createElement('img');
            img.src = getPieceFileName(size, p);
            img.className = 'piece-icon' + (state.selected?.idx === idx && state.turn === p ? ' selected' : '');
            img.onclick = (e) => {
                e.stopPropagation();
                if (state.winner || state.turn !== p) return;
                state.selected = (state.selected?.idx === idx) ? null : { idx, size };
                render();
            };
            container.appendChild(img);
        });
    });
}

// Mapeia tamanho (1=p, 2=m, 3=g) e jogador (1 ou 2) para o arquivo correto
function getPieceFileName(size, player) {
    const typeMap = { 1: 'p', 2: 'm', 3: 'g' };
    return `imgs/${typeMap[size]}${player}.svg`;
}

function play(cellIndex) {
    if (state.winner || !state.selected) return;

    const stack = state.board[cellIndex];
    const topPiece = stack.length > 0 ? stack[stack.length - 1] : { size: 0, player: 0 };

    if (topPiece.player === state.turn) {
        showSnackbar("Você não pode cobrir uma peça sua!");
        return;
    }

    if (state.selected.size > topPiece.size) {
        stack.push({ size: state.selected.size, player: state.turn });
        state.banks[state.turn].splice(state.selected.idx, 1);
        state.selected = null;

        if (checkWin(state.turn)) {
            state.winner = state.turn;
            showSnackbar(`Jogador ${state.winner} venceu!`);
        }

        state.turn = state.turn === 1 ? 2 : 1;
        render();
    } else {
        showSnackbar("Peça muito pequena para esta posição!");
    }
}

function checkWin(player) {
    return winningCombinations.some(comb => {
        return comb.every(idx => {
            const stack = state.board[idx];
            if (stack.length === 0) return false;
            return stack[stack.length - 1].player === player;
        });
    });
}

function reset() {
    state.board = Array(9).fill(null).map(() => []);
    state.banks = {
        1: [1, 1, 1, 2, 2, 2, 3, 3],
        2: [1, 1, 1, 2, 2, 2, 3, 3]
    };
    state.turn = 1;
    state.selected = null;
    state.winner = null;
    render();
}

init();