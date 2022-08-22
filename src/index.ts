import Amongus from './Amongus';

const canvas = document.getElementById('canvas');

if (!(canvas instanceof HTMLCanvasElement)) throw new Error('Canvas must be a <canvas> element');
canvas.focus();

const game = new Amongus(canvas);

game.start();

// @ts-ignore
window.game = game;
