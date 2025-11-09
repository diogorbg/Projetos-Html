export class Game extends Phaser.Scene {
  constructor() {
    super('BallSortGame');
    this.tubes = []; // Array para armazenar os objetos dos tubos
    this.selectedTube = null; // Tubo atualmente selecionado para mover uma bola
    this.movingBall = null; // Bola atualmente em movimento
    this.ballTween = null; // Tween para a animação da bola
  }

  preload() {
    const svgConfig = { width: 120, height: 120 }
    this.load.svg('ball_red', 'assets/ball_red.svg', svgConfig)
    this.load.svg('ball_blue', 'assets/ball_blue.svg', svgConfig)
    this.load.svg('ball_green', 'assets/ball_green.svg', svgConfig)
    this.load.svg('ball_yellow', 'assets/ball_yellow.svg', svgConfig)
    this.load.svg('tube', 'assets/tubo.svg', { width: 168, height: 600 })
    this.load.svg('tubeSel', 'assets/tubo_sel.svg', { width: 168, height: 600 })
  }

  create() {
    // Crie o ambiente do jogo
    this.cameras.main.setBackgroundColor('#333')

    this.add.text(this.game.config.width / 2, 100, 'Ball Sort Puzzle', { fontSize: '60px', fill: '#fff' }).setOrigin(0.5)

    // --- Configuração dos Tubos e Bolas ---
    const tubeCapacity = 4; // Quantas bolas cabem em cada tubo
    const numColors = 4; // Quantas cores diferentes de bolas
    const numTubes = numColors + 2; // Número de tubos (cores + 2 tubos vazios)
    const tubeSpacing = 180; // Espaçamento horizontal entre os tubos
    const tubeStartX = (this.game.config.width - (numTubes - 1) * tubeSpacing) / 2;
    const tubeBaseY = this.game.config.height - 300; // Posição Y da base do tubo

    const colors = ['red', 'blue', 'green', 'yellow']; // Cores disponíveis

    // Gerar e embaralhar as bolas
    let allBalls = [];
    for (let i = 0; i < numColors; i++) {
      for (let j = 0; j < tubeCapacity; j++) {
        allBalls.push(colors[i]);
      }
    }
    Phaser.Utils.Array.Shuffle(allBalls);

    // Criar os tubos e preenchê-los
    for (let i = 0; i < numTubes; i++) {
      const tubeX = tubeStartX + i * tubeSpacing;

      // Desenhar o tubo
      const tubeSprite = this.add.sprite(tubeX, tubeBaseY, 'tube').setOrigin(0.5, 1)
      const tubeSpriteSel = this.add.sprite(tubeX, tubeBaseY, 'tubeSel').setOrigin(0.5, 1)
      tubeSpriteSel.visible = false

      const tube = {
        x: tubeX,
        y: tubeBaseY,
        balls: [], // Bolas neste tubo
        container: tubeSprite, // Referência ao sprite do tubo
        containerSel: tubeSpriteSel,
        capacity: tubeCapacity
      };
      this.tubes.push(tube);

      // Preencher os primeiros 'numColors' tubos com bolas embaralhadas
      if (i < numColors) {
        for (let j = 0; j < tubeCapacity; j++) {
          const color = allBalls.pop();
          const ball = this.add.sprite(tube.x, tube.y - (j * 136 + 76), `ball_${color}`)
          ball.color = color;
          // ball.tubeIndex = i;
          // ball.setInteractive(); // Torna a bola clicável
          ball.depth = 100 + j; // Garante que bolas de cima fiquem sobre as de baixo
          tube.balls.push(ball);
        }
      }

      // Adicionar interatividade ao sprite do tubo (para cliques)
      tube.container.setInteractive();
      tube.container.tubeIndex = i; // Armazena o índice do tubo
      tube.container.on('pointerdown', () => this.handleTubeClick(i));
    }

    // --- Debug: Exibir o estado inicial
    this.logTubeStates();

    // --- Eventos de Input ---
    // this.input.on('pointerdown', (pointer, gameObjects) => {
    //   if (gameObjects.length > 0 && gameObjects[0].tubeIndex !== undefined) {
    //     this.handleTubeClick(gameObjects[0].tubeIndex);
    //   }
    // });
  }

  // Função auxiliar para obter a bola do topo de um tubo
  getTopBall(tubeIndex) {
    const tube = this.tubes[tubeIndex];
    if (tube && tube.balls.length > 0) {
      return tube.balls[tube.balls.length - 1];
    }
    return null;
  }

  // Função auxiliar para obter a próxima posição Y para uma bola em um tubo
  getNextBallY(tubeIndex) {
    const tube = this.tubes[tubeIndex];
    const numBalls = tube.balls.length;
    // Altura de uma bola ~ 40 * scale (0.5) = 20. Adicionar um offset de base.
    return tube.y - (numBalls * 136 + 76); // Ajuste a posição Y para a próxima bola
  }

  // Lógica para lidar com o clique em um tubo
  handleTubeClick(tubeIndex) {
    console.log(tubeIndex)
    const clickedTube = this.tubes[tubeIndex]

    if (this.movingBall) {
      // Não faça nada se uma bola já estiver se movendo
      // return;
    }

    if (this.selectedTube === null) {
      // 1. NENHUM TUBO SELECIONADO: Selecionar um tubo para pegar uma bola
      const topBall = this.getTopBall(tubeIndex)
      if (topBall) {
        this.selectedTube = tubeIndex
        clickedTube.containerSel.visible = true
        topBall.y -= 20 // Leve a bola um pouco para cima para indicar seleção
        this.movingBall = topBall // Marcar a bola como "em seleção"
        console.log(`Tubo ${tubeIndex} selecionado. Bola ${topBall.color} em foco.`)
      } else {
        console.log(`Tubo ${tubeIndex} vazio.`)
      }
    } else if (this.selectedTube === tubeIndex) {
      // 2. MESMO TUBO SELECIONADO NOVAMENTE: Deselecionar
      const topBall = this.getTopBall(this.selectedTube)
      if (topBall) {
        topBall.y += 20 // Volta a bola para a posição original
      }
      clickedTube.containerSel.visible = false
      this.selectedTube = null
      this.movingBall = null
      console.log(`Tubo ${tubeIndex} deselecionado.`)
    } else {
      // 3. OUTRO TUBO SELECIONADO: Tentar mover a bola
      this.tubes[this.selectedTube].containerSel.visible = false
      const sourceTube = this.tubes[this.selectedTube]
      const targetTube = this.tubes[tubeIndex]
      const movingBall = this.getTopBall(this.selectedTube)

      // Verificar se o movimento é válido
      if (this.isValidMove(sourceTube, targetTube, movingBall)) {
        this.moveBall(sourceTube, targetTube, movingBall)
      } else {
        console.log("Movimento inválido. Deselecionando.")
        // Retornar a bola para a posição original no tubo de origem
        if (movingBall) {
          movingBall.y += 20
        }
        this.selectedTube = null
        this.movingBall = null
      }
    }
  }

  isValidMove(sourceTube, targetTube, movingBall) {
    // Regras:
    // 1. O tubo de origem não pode estar vazio (já verificamos que movingBall existe)
    // 2. O tubo de destino não pode estar cheio
    if (targetTube.balls.length >= targetTube.capacity) {
      return false;
    }
    // 3. Se o tubo de destino não estiver vazio, a bola que está sendo movida
    //    deve ter a mesma cor que a bola do topo do tubo de destino.
    if (targetTube.balls.length > 0) {
      const topTargetBall = this.getTopBall(this.tubes.indexOf(targetTube));
      if (movingBall.color !== topTargetBall.color) {
        return false;
      }
    }
    return true;
  }

  moveBall(sourceTube, targetTube, ballToMove) {
    // Remover a bola do tubo de origem
    sourceTube.balls.pop();

    // Animar a bola
    const targetX = targetTube.x;
    const targetY = this.getNextBallY(this.tubes.indexOf(targetTube));

    // Impedir cliques durante a animação
    this.input.enabled = false;

    // --- CÓDIGO CORRIGIDO: ENCADENAMENTO DE TWEENS ---

    // 1. Tween UP (Mover para cima)
    const tweenUp = this.tweens.add({
      targets: ballToMove,
      y: ballToMove.y - 80, // Subir até o ponto alto
      duration: 120,
      ease: 'Power1',
      onComplete: () => {
        // 2. Tween ACROSS (Mover horizontalmente)
        const tweenAcross = this.tweens.add({
          targets: ballToMove,
          x: targetX, // Posição X do tubo de destino
          duration: 250,
          ease: 'Power1',
          onComplete: () => {
            // 3. Tween DOWN (Descer para a posição final)
            this.tweens.add({
              targets: ballToMove,
              y: targetY, // Posição Y final
              duration: 120,
              ease: 'Power1',
              onComplete: () => {
                // *** Lógica de Conclusão do Movimento (pop/push/cleanup) ***

                // Remover a bola do tubo de origem SÓ APÓS A ANIMAÇÃO BEM SUCEDIDA
                sourceTube.balls.pop();

                // Adicionar a bola ao tubo de destino
                targetTube.balls.push(ballToMove);
                ballToMove.tubeIndex = this.tubes.indexOf(targetTube);
                ballToMove.depth = 100 + targetTube.balls.length - 1;

                this.selectedTube = null;
                this.movingBall = null;
                this.ballTween = null;
                this.input.enabled = true; // Habilita cliques novamente

                this.logTubeStates();

                // Verificar condição de vitória
                if (this.checkWinCondition()) {
                  this.add.text(this.game.config.width / 2, this.game.config.height / 2, 'VOCÊ VENCEU!', { fontSize: '60px', fill: '#0f0' }).setOrigin(0.5);
                }
              }
            });
          }
        });
      }
    });
    this.ballTween = tweenUp; // Armazene a referência do primeiro Tween.
    // --- FIM DO CÓDIGO CORRIGIDO ---
  }

  checkWinCondition() {
    // O jogo é ganho quando todos os tubos não-vazios estão "sortidos"
    return this.tubes.every(tube => {
      if (tube.balls.length === 0) {
        return true; // Tubos vazios são considerados "sortidos" para a vitória
      }
      // Verifica se o tubo está cheio e se todas as bolas têm a mesma cor
      return tube.balls.length === tube.capacity && tube.balls.every(ball => ball.color === tube.balls[0].color);
    });
  }

  // Função para debug: mostra o estado atual dos tubos
  logTubeStates() {
    console.log("--- Estado Atual dos Tubos ---");
    this.tubes.forEach((tube, index) => {
      const colorsInTube = tube.balls.map(ball => ball.color);
      console.log(`Tubo ${index}: [${colorsInTube.join(', ')}] (Capacidade: ${tube.balls.length}/${tube.capacity})`);
    });
    console.log("-----------------------------");
  }
}
