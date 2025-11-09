export class Game extends Phaser.Scene {
  constructor() {
    super('Game');

    this.maxOrbsPerTube = 4;
    this.tubeCount = 6;
    this.orbSize = 140;
    this.selectedTube = null;
    this.totalOrbCount = 0;
    this.isAnimating = false;
  }

  preload() {
    const confSvg = { width: 120, height: 120 }
    this.load.setPath('assets');
    this.load.svg('yellow_circle', 'ball_yellow.svg', confSvg)
    this.load.svg('purple_circle', 'ball_green.svg', confSvg)
    this.load.svg('blue', 'ball_blue.svg', confSvg)
    this.load.svg('red', 'ball_red.svg', confSvg)
    this.load.svg('tube', 'tubo.svg', { width: 168, height: 600 })
  }

  create() {
    // this.cameras.main.setBackgroundColor(0x2ecc71);

    // Create instructions text
    this.add.text(540, 1200, 'Sort the colors into separate tubes!', {
      fontFamily: 'Arial Black', fontSize: 28, color: '#ffffff',
      stroke: '#000000', strokeThickness: 8,
      align: 'center'
    }).setOrigin(0.5);

    // Create win text (hidden initially)
    this.winText = this.add.text(540, 100, 'YOU WIN!', {
      fontFamily: 'Arial Black', fontSize: 48, color: '#ffff00',
      stroke: '#000000', strokeThickness: 8,
      align: 'center'
    }).setOrigin(0.5).setVisible(false);

    this.tubes = [];
    this.createTubes();

    this.setupOrbs();
  }

  createTubes() {
    const centerX = this.cameras.main.width / 2;
    const tubeSpacing = 178;
    const startX = centerX - ((this.tubeCount - 1) * tubeSpacing / 2);
    const tubeY = 700;

    for (let i = 0; i < this.tubeCount; i++) {
      const tube = this.add.container(startX + i * tubeSpacing, tubeY);

      const tubeImage = this.add.image(0, -50, 'tube');
      // tubeImage.setScale(0.5);
      tube.add(tubeImage);

      tubeImage.setInteractive();
      tubeImage.on('pointerdown', () => this.onTubeClick(i));

      // Initialize tube contents array (bottom to top)
      tube.contents = [];

      this.tubes.push(tube);
    }
  }

  setupOrbs() {
    // First tube: 2 purple at bottom, 2 yellow on top
    this.addOrbToTube(0, 'purple_circle');
    this.addOrbToTube(0, 'purple_circle');
    this.addOrbToTube(0, 'yellow_circle');
    this.addOrbToTube(0, 'yellow_circle');

    // Second tube: 2 yellow at bottom, 2 purple on top
    this.addOrbToTube(1, 'yellow_circle');
    this.addOrbToTube(1, 'yellow_circle');
    this.addOrbToTube(1, 'purple_circle');
    this.addOrbToTube(1, 'purple_circle');

    this.addOrbToTube(2, 'red');
    this.addOrbToTube(2, 'red');
    this.addOrbToTube(2, 'blue');
    this.addOrbToTube(2, 'blue');

    this.addOrbToTube(3, 'blue');
    this.addOrbToTube(3, 'red');
    this.addOrbToTube(3, 'blue');
    this.addOrbToTube(3, 'red');
  }

  addOrbToTube(tubeIndex, orbType) {
    const tube = this.tubes[tubeIndex];

    // Check if tube is full
    if (tube.contents.length >= this.maxOrbsPerTube) {
      return false;
    }

    // Calculate orb position
    const orbY = -254 + (this.maxOrbsPerTube - tube.contents.length - 1) * this.orbSize;

    const orb = this.add.image(0, orbY, orbType);
    // orb.setScale(0.6);
    orb.orbType = orbType;

    tube.add(orb);
    tube.contents.unshift(orb); // Add to beginning so index 0 is top orb

    this.totalOrbCount++;

    return orb;
  }

  onTubeClick(tubeIndex) {
    // Prevent interaction during animations
    if (this.isAnimating) return;

    const tube = this.tubes[tubeIndex];

    // No tube selected yet, so select this one
    if (this.selectedTube === null) {
      if (tube.contents.length > 0) {
        this.selectedTube = tubeIndex;

        // Highlight selected tube
        tube.getAt(0).setScale(1.04);
        this.addGlowFx(tube.getAt(0));
      }
    }
    // Same tube clicked again, deselect it
    else if (this.selectedTube === tubeIndex) {
      this.tubes[this.selectedTube].getAt(0).setScale(1.0);
      this.tubes[this.selectedTube].getAt(0).preFX.clear();
      this.selectedTube = null;
    }
    // Different tube clicked, try to move orbs
    else {
      const sourceTube = this.tubes[this.selectedTube];

      // Reset highlight
      sourceTube.getAt(0).setScale(1.0);
      sourceTube.getAt(0).preFX.clear();

      // Try to move orbs if possible
      this.tryMoveOrbs(this.selectedTube, tubeIndex);

      // Reset selection
      this.selectedTube = null;
    }
  }

  tryMoveOrbs(sourceIndex, targetIndex) {
    const sourceTube = this.tubes[sourceIndex];
    const targetTube = this.tubes[targetIndex];

    // Can only move if target tube isn't full
    if (targetTube.contents.length >= this.maxOrbsPerTube) return;

    // Get the top orb color from source tube
    const sourceOrbType = sourceTube.contents[0].orbType;

    // Target tube must be empty or have same color on top
    if (targetTube.contents.length > 0 &&
      targetTube.contents[0].orbType !== sourceOrbType) {
      return;
    }

    // Count how many same color orbs are at the top of source tube
    let sameColorCount = 0;
    for (let i = 0; i < sourceTube.contents.length; i++) {
      if (sourceTube.contents[i].orbType === sourceOrbType) {
        sameColorCount++;
      } else {
        break;
      }
    }

    // Calculate how many orbs we can move
    const spaceInTargetTube = this.maxOrbsPerTube - targetTube.contents.length;
    const orbsToMove = Math.min(sameColorCount, spaceInTargetTube);

    // Move the orbs with animation
    this.animateMoveOrbs(sourceIndex, targetIndex, sourceOrbType, orbsToMove);
  }

  animateMoveOrbs(sourceIndex, targetIndex, orbType, orbCount) {
    this.isAnimating = true;

    const sourceTube = this.tubes[sourceIndex];
    const targetTube = this.tubes[targetIndex];
    const sourceX = sourceTube.x;
    const sourceY = sourceTube.y - 300;
    const targetX = targetTube.x;

    let completedOrbs = 0;

    for (let i = 0; i < orbCount; i++) {
      const orb = sourceTube.contents.shift();
      sourceTube.remove(orb);
      this.add.existing(orb);
      orb.setPosition(sourceX, sourceY - (i * 10));

      const newOrb = this.addOrbToTube(targetIndex, orbType);
      newOrb.setAlpha(0);
      this.totalOrbCount--;

      this.tweens.chain({
        targets: orb,
        tweens: [
          {
            y: sourceY - 140,
            duration: 250,
            ease: 'Cubic.easeOut',
            delay: i * 150 // Stagger each orb's start
          },
          {
            x: targetX,
            duration: 350,
            ease: 'Quad.easeInOut'
          },
          {
            y: targetTube.y + newOrb.y,
            duration: 300,
            ease: 'Sine.easeIn'
          },
          {
            alpha: 0,
            duration: 150,
            onStart: () => {
              this.tweens.add({
                targets: newOrb,
                alpha: 1,
                duration: 150
              });
            },
            onComplete: () => {
              orb.destroy();
              completedOrbs++;
              if (completedOrbs === orbCount) {
                this.isAnimating = false;
                this.checkWin();
              }
            }
          }
        ]
      });
    }
  }

  addGlowFx(gameItem) {
    const fx = gameItem.preFX.addGlow(0xeb9e34);

    this.tweens.add({
      targets: fx,
      outerStrength: 10,
      yoyo: true,
      loop: -1,
      duration: 500,
      ease: 'sine.inout'
    });
  }

  checkWin() {
    // For each color, track which tubes it appears in
    const colorTubes = new Map();

    for (let i = 0; i < this.tubes.length; i++) {
      const tube = this.tubes[i];

      // Skip empty tubes
      if (tube.contents.length === 0) continue;

      // Check if all orbs in this tube are the same color
      const tubeColor = tube.contents[0].orbType;
      for (const orb of tube.contents) {
        if (orb.orbType !== tubeColor) return false; // Mixed colors in tube
      }

      // Add this tube to the color's tube list
      if (!colorTubes.has(tubeColor)) {
        colorTubes.set(tubeColor, [i]);
      } else {
        colorTubes.get(tubeColor).push(i);
      }
    }

    // Check if any color is split across multiple tubes
    for (const tubes of colorTubes.values()) {
      if (tubes.length > 1) return false; // Color in multiple tubes
    }

    // If we got here, it's a win!
    this.winText.setVisible(true);
    this.input.once('pointerdown', () => this.scene.restart());

    return true;
  }
}
