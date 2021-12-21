/* eslint-disable @typescript-eslint/no-unused-vars */
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

interface Ball {
	radius: number;
	color: string;
	position: Vector;
	velocity: Vector;
}
const ball: Ball = {
	radius: 50,
	position: new Vector(100, 300),
	velocity: new Vector(0.3, 0.3),
	color: 'rgb(255,100,52)'
};

let p1 = new Vector(100, 450);
let p2 = new Vector(300, 400);
function test() {
	// p1.debugDraw(ctx, null, 1, false, 'red');
	// p2.debugDraw(ctx, null, 1, false, 'yellow');
	let lineV = p2.minus(p1);
	lineV.debugDraw(ctx, p1);
	let p1toBall = ball.position.minus(p1);
	p1toBall.debugDraw(ctx, p1, 1, false, 'gold');
	let proj = p1toBall.clampedProj(lineV);
	proj.debugDraw(ctx, p1, 1, false, 'aqua');
	let displacement = p1toBall.minus(proj);
	displacement.debugDraw(ctx, p1.plus(proj), 1, false, 'tomato');
}

function lineBounce(line: Vector[], ball: Ball) {
    let [p1,p2] = line;
	let lineV = p2.minus(p1);
	let p1toBall = ball.position.minus(p1);
	let proj = p1toBall.clampedProj(lineV);
	let displacement = p1toBall.minus(proj);
    let distance = displacement.norm();
    let overlap = ball.radius - distance;
    if (distance <=ball.radius){
        //bounce !
        ball.velocity.reflect(displacement);
        displacement.setNorm(overlap);
        ball.position.add(displacement);
    }

    //draw vectors
	lineV.debugDraw(ctx, p1);
	p1toBall.debugDraw(ctx, p1, 1, false, 'gold');
	proj.debugDraw(ctx, p1, 1, false, 'aqua');
	displacement.debugDraw(ctx, p1.plus(proj), 1, false, 'tomato');
}
function checkLineBounce() {
	let line = [p1, p2];
	lineBounce(line, ball);
}
function onMouseMove(ev: MouseEvent) {
	ball.position.x = ev.pageX;
	ball.position.y = ev.pageY;
}
function draw(): void {
	clearCanvas();
	drawCircle(ball.position.x, ball.position.y, ball.radius, ball.color);
	test();
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
	checkLineBounce();
	draw();
}

function animate(): void {
	setTimeout(animate, dt);
	frame();
}
// this function is needed cause this project is server-side rendered and the window is not available
function init(): void {
	canvas = <HTMLCanvasElement>document.querySelector('canvas#game');
	ctx = canvas.getContext('2d');
	canvas.width = width;
	canvas.height = height;
	window.addEventListener('mousemove', onMouseMove);
}

function start(): void {
	console.log('Game begins !');
	animate();
}
export { init, start };
