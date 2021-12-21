///////////////////////////////////////////
// Edited Edited version of MinuteLabs.io Vector Library (https://labs.minutelabs.io/toolkit/js/vector.js)
// author: Jasper Palfree (info@minutelabs.io)
// Edited by: Yog Panjarale (yog.panjarale@gmail.com
// For educational use.
// Copyright 2021 Yog Panjarale
// License: GPLv3
///////////////////////////////////////////

function _drawArrow(ctx: CanvasRenderingContext2D, x: number, y: number, length: number, angle: number, color: string): void {
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
	ctx.lineWidth = 2;
	ctx.translate(x, y);
	ctx.rotate(angle);
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(length, 0);
	ctx.stroke();
	ctx.lineTo(length - 6, 6);
	ctx.lineTo(length - 6, -6);
	ctx.lineTo(length, 0);
	ctx.fill();
	ctx.rotate(-angle);
	ctx.translate(-x, -y);
}

export class Vector {
    x: number;
    y:number;
	constructor(x = 0, y = 0) {
		this.set(x, y);
	}

	clone():Vector {
		return new Vector(this.x, this.y);
	}

	// set this vector to have the values of another vector
	copy(v?: Vector):Vector  {
		return this.set(v.x, v.y);
	}

	set(x: number, y: number):Vector {
		this.x = x;
		this.y = y;
		return this;
	}

	add(other: Vector): Vector {
		this.x += other.x;
		this.y += other.y;
		return this;
	}

	plus(other: Vector):Vector {
		return this.clone().add(other);
	}

	subtract(other: Vector):Vector {
		this.x -= other.x;
		this.y -= other.y;
		return this;
	}

	minus(other: Vector):Vector {
		return this.clone().subtract(other);
	}

	multiply(number: number):Vector {
		this.x *= number;
		this.y *= number;
		return this;
	}

	times(number: number):Vector {
		return this.clone().multiply(number);
	}

	divide(number: number):Vector {
		this.x /= number;
		this.y /= number;
		return this;
	}

	dividedBy(number: number):Vector  {
		return this.clone().divide(number);
	}

	normSq(): number {
		return this.x * this.x + this.y * this.y;
	}

	norm(): number {
		return Math.sqrt(this.normSq());
	}

	setNorm(n: number): Vector {
		let norm = this.norm();
		if (norm === 0) {
			norm = 1;
			this.x = 1;
			this.y = 0;
		}
		n /= norm;
		this.x *= n;
		this.y *= n;
		return this;
	}

	normalize(): Vector {
		return this.setNorm(1);
	}

	angle(): number {
		return Math.atan2(this.y, this.x);
	}

	setAngle(angle: number): Vector {
		let n = this.norm();
		if (n === 0) {
			n = 1;
			this.x = 1;
			this.y = 0;
		}
		this.x = n * Math.cos(angle);
		this.y = n * Math.sin(angle);
		return this;
	}

	rotateBy(angle: number): Vector {
		return this.setAngle(this.angle() + angle);
	}

	dot(vector: Vector): number {
		return this.x * vector.x + this.y * vector.y;
	}

	proj(vector: Vector): Vector {
		const other = vector.clone().normalize();
		return other.multiply(this.dot(other));
	}

	projScalar(vector: Vector): number {
		return this.dot(vector) / vector.norm();
	}

	clampedProj(vector: Vector): Vector {
		const n = vector.norm();
		const other = vector.clone().normalize();
		return other.multiply(Math.min(n, Math.max(0, this.dot(other))));
	}

	clamp(min: Vector, max: Vector) :Vector{
		this.x = Math.max(min.x, Math.min(max.x, this.x));
		this.y = Math.max(min.y, Math.min(max.y, this.y));
		return this;
	}

	// perform a reflection with specified normal vector to the mirror
	reflect(normal:Vector):Vector {
		const n = normal.normSq();
		return this.subtract(normal.times((2 * this.dot(normal)) / n));
	}

	// return a new vector that is the reflection along normal
	reflection(normal: Vector): Vector {
		return this.copy().reflect(normal);
	}

	randomize(n = 1):Vector {
		return this.setNorm(n).setAngle(2 * Math.PI * Math.random());
	}

	// Draws this vector to a canvas context
	debugDraw(ctx: CanvasRenderingContext2D, offset?:Vector, scale = 1, withComponents = false, color = 'white'):void {
		const angle = this.angle();
		const n = scale * this.norm();
		const ox = offset ? offset.x : 0;
		const oy = offset ? offset.y : 0;
		if (withComponents) {
			// _drawArrow(ctx, ox, oy + this.y * scale, scale * this.x, 0, 'red')
			// _drawArrow(ctx, ox, oy, scale * this.y, Math.PI / 2, 'yellow')
			ctx.strokeStyle = 'tomato';
			ctx.translate(ox, oy);
			ctx.beginPath();
			const y = scale * this.y;
			ctx.moveTo(0, y);
			ctx.lineTo(scale * this.x, y);
			ctx.stroke();
			ctx.strokeStyle = 'gold';
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(0, y);
			ctx.stroke();
			ctx.translate(-ox, -oy);
		}
		_drawArrow(ctx, ox, oy, n, angle, color);
	}
}

export function V(x: number, y: number): Vector {
	return new Vector(x, y);
}
