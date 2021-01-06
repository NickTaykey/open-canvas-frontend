import React, { Component } from 'react';

class ShowCanvas extends Component {
	static defaultProps = {
		height    : 120,
		width     : 120,
		pixelsLen : 20
	};

	constructor (props) {
		super(props);
		this.canvasRef = new React.createRef();
		this.canvas = null;
		this.ctx = null;
	}

	drawGrid () {
		const { width, height, pixelsLen } = this.props;
		const pixelsOffset = width / pixelsLen;
		const { ctx } = this;
		ctx.beginPath();
		for (let x = pixelsOffset; x < width; x += pixelsOffset) {
			ctx.moveTo(x, 0);
			ctx.lineTo(x, width);
		}
		for (let y = pixelsOffset; y < height; y += pixelsOffset) {
			ctx.moveTo(0, y);
			ctx.lineTo(height, y);
		}
		ctx.strokeStyle = 'light-grey';
		ctx.lineWidth = 0.75;
		ctx.stroke();
	}

	componentDidMount () {
		this.canvas = this.canvasRef.current;
		this.ctx = this.canvas.getContext('2d');
		this.drawGrid();
		this.fillPixels();
	}

	fillPixels () {
		for (let path of this.props.pixels) {
			const { color, points } = path;
			this.ctx.fillStyle = color;
			for (let pt of points) {
				this.fillPixel(pt[0], pt[1]);
			}
		}
	}

	fillPixel (x, y) {
		const pixelsOffset = this.props.width / this.props.pixelsLen;
		const { ctx } = this;
		ctx.fillRect(x * 0.2, y * 0.2, pixelsOffset, pixelsOffset);
	}

	render () {
		return (
			<canvas
				ref={this.canvasRef}
				width={this.props.width}
				height={this.props.height}
			/>
		);
	}
}

export default ShowCanvas;
