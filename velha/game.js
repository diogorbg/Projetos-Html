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
    // Atualiza cabeçalhos dos jogadores
    [1, 2].forEach(p => {
        const h3 = document.getElementById(`h3-${p}`);
        let text = `Jogador ${p}`;
        if (state.turn === p && !state.winner) text = `▶︎ ${text}`;
        if (state.winner === p) text = `${text} 🎉 venceu!`;
        h3.textContent = text;
    });

    // Renderiza o Tabuleiro (mesma lógica)
    const boardEl = document.getElementById('board');
    boardEl.innerHTML = '';
    state.board.forEach((stack, i) => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        if (stack.length > 0) {
            const top = stack[stack.length - 1];
            const img = document.createElement('img');
            img.src = getPieceFileName(top.size, top.player);
            img.className = 'piece-cell';
            cell.appendChild(img);
        }
        cell.onclick = () => play(i);
        boardEl.appendChild(cell);
    });

    // Renderiza Bancos Agrupados por contagem
    [1, 2].forEach(p => {
        const bankEl = document.getElementById(`bank-${p}`);
        bankEl.className = `player-bank ${state.turn === p ? 'active' : ''}`;
        const container = bankEl.querySelector('.pieces-container');
        container.innerHTML = '';

        // Agrupando: {1: count, 2: count, 3: count}
        const counts = { 1: 0, 2: 0, 3: 0 };
        state.banks[p].forEach(size => counts[size]++);

        [1, 2, 3].forEach(size => {
            if (counts[size] === 0) return;
            const wrapper = document.createElement('div');
            wrapper.style.display = "flex";
            wrapper.style.alignItems = "center";
            wrapper.style.margin = "0 8px";

            const img = document.createElement('img');
            img.src = getPieceFileName(size, p);
            img.className = 'piece-icon' + (state.selected?.size === size && state.turn === p ? ' selected' : '');
            img.onclick = () => {
                if (state.winner || state.turn !== p) return;
                // Seleciona a primeira peça disponível desse tamanho
                const idx = state.banks[p].indexOf(size);
                state.selected = (state.selected?.size === size) ? null : { idx, size };
                render();
            };

            const countText = document.createElement('span');
            countText.textContent = `${counts[size]}`;
            // countText.style.marginRight = "2px";

            wrapper.appendChild(countText);
            wrapper.appendChild(img);
            container.appendChild(wrapper);
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
            showSnackbar(`Jogador ${state.winner} 🎉 venceu!`);
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