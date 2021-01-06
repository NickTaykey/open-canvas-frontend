import React, { Component } from 'react';
import './Canvas.css';

class Canvas extends Component {
	constructor (props) {
		super(props);
		this.pixelsOffset = props.width / props.pixelsLen;
		this.canvasRef = new React.createRef();
		this.state = { drawing: false, pixels: [] };
		this.canvas = null;
		this.ctx = null;
	}

	componentDidMount () {
		this.canvas = this.canvasRef.current;
		this.ctx = this.canvas.getContext('2d');
		this.ctx.fillStyle = this.props.fillStyle;
		this.drawGrid();
	}

	componentDidUpdate () {
		this.ctx.fillStyle = this.props.fillStyle;
	}

	draw = ({ nativeEvent: e }) => {
		if (this.state.drawing) {
			const { canvas, pixelsOffset } = this;
			let offsetX, offsetY;
			if (e.type === 'mousemove' && e.which === 1) {
				offsetX = e.offsetX;
				offsetY = e.offsetY;
			} else if (e.type === 'touchmove') {
				offsetX = e.touches[0].pageX - canvas.offsetLeft;
				offsetY = e.touches[0].pageY - canvas.offsetTop;
			}
			let xIndex = Math.floor(offsetX / pixelsOffset);
			let yIndex = Math.floor(offsetY / pixelsOffset);
			this.fillPixel(xIndex, yIndex);
		}
	};

	fillPixel (xIndex, yIndex) {
		const { ctx, pixelsOffset } = this;
		let x = xIndex * pixelsOffset;
		let y = yIndex * pixelsOffset;
		ctx.fillRect(x, y, pixelsOffset, pixelsOffset);
		this.props.addPixel([ x, y ]);
	}

	drawGrid () {
		const { width, height } = this.props;
		const { ctx, pixelsOffset } = this;
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

	startDrawing = () => this.setState({ drawing: true });
	stopDrawing = () => this.setState({ drawing: false });

	render () {
		return (
			<canvas
				ref={this.canvasRef}
				width={this.props.width}
				height={this.props.height}
				onMouseDown={this.startDrawing}
				onMouseUp={this.stopDrawing}
				onTouchStart={this.startDrawing}
				onTouchEnd={this.stopDrawing}
				onMouseMove={this.draw}
				onTouchMove={this.draw}
			/>
		);
	}
}

export default Canvas;
