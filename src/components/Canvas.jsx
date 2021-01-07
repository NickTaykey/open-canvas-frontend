import React, { Component } from 'react';
import '../styles/Canvas.css';

class Canvas extends Component {
	constructor (props) {
		super(props);
		this.pixelsOffset = props.width / props.pixelsLen;
		this.canvasRef = new React.createRef();
		this.state = { drawing: false, pixels: [] };
		this.ctx = null;
	}

	componentDidMount () {
		this.ctx = this.canvasRef.current.getContext('2d');
		this.ctx.fillStyle = this.props.fillStyle;
		this.drawGrid();
	}

	componentDidUpdate () {
		this.ctx.fillStyle = this.props.fillStyle;
	}

	draw = ({ nativeEvent: e }) => {
		if (this.state.drawing) {
			let offsetX, offsetY;
			if (e.which === 1) {
				offsetX = e.offsetX;
				offsetY = e.offsetY;
			}
			let xIndex = Math.floor(offsetX / this.pixelsOffset);
			let yIndex = Math.floor(offsetY / this.pixelsOffset);
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
		ctx.lineWidth = 0.3;
		ctx.stroke();
	}

	startDrawing = () => this.setState({ drawing: true });
	stopDrawing = () => this.setState({ drawing: false });

	render () {
		return (
			<canvas
				className="border border-2 border-dark"
				ref={this.canvasRef}
				width={this.props.width}
				height={this.props.height}
				onMouseDown={this.startDrawing}
				onMouseUp={this.stopDrawing}
				onMouseMove={this.draw}
			/>
		);
	}
}

export default Canvas;
