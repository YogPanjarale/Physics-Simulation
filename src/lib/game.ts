/* eslint-disable prefer-const */
import { Vector } from './vector';
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

function drawCircle(x: number, y: number, r: number, color: string) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2, true);
	ctx.fill();
}

const [width, height] = [800, 800];
//delta time
const dt = 10;

const ball = {
    radius:50,
    position: new Vector(300,300),
    velocity: new Vector(0.1,0.3),
    color: 'rgb(255,100,52)',
}

let p1 = new Vector(400,450);
let p2 = new Vector(300,400);
function test() {
    p1.debugDraw(ctx)
    p2.debugDraw(ctx)
    let lineV = p2.minus(p1);
    lineV.debugDraw(ctx);
}

function draw(): void {
	clearCanvas();
    test()
	drawCircle(ball.position.x, ball.position.y, ball.radius, ball.color);
}
function clearCanvas() {
	ctx.clearRect(0, 0, width, height);
}
function moveCircle() {
	ball.position.add(ball.velocity.times(dt));
}
function checkEdgeBounce() {
	if (ball.position.y >= height - ball.radius) {
		ball.velocity.y = -ball.velocity.y;
	}
	if (ball.position.x >= width - ball.radius) {
		ball.velocity.x = -ball.velocity.x;
	}
	if (ball.position.y <= ball.radius) {
		ball.velocity.y = -ball.velocity.y;
	}
	if (ball.position.x <= ball.radius) {
		ball.velocity.x = -ball.velocity.x;
	}
}
function frame() {
	moveCircle();
	checkEdgeBounce();
	draw();
}

function animate(): void {
	setTimeout(animate, dt);
	frame();
}

function init(): void {
	canvas = <HTMLCanvasElement>document.querySelector('canvas#game');
	ctx = canvas.getContext('2d');
	canvas.width = width;
	canvas.height = height;
}

function start(): void {
	console.log('Game begins !');
	animate();
}
export { init, start };
