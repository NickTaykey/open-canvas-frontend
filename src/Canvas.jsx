import React, { Component } from 'react';
import './Canvas.css';

class Canvas extends Component {
	constructor (props) {
		super(props);
		this.canvas = new React.createRef();
		this.state = { drawing: false };
		this.pixelsOffset = this.props.width / this.props.pixelsLen;
		this.ctx = null;
	}

	componentDidMount () {
		const ctx = this.canvas.current.getContext('2d');
		ctx.fillStyle = 'red';
		this.ctx = ctx;
		this.drawGrid();
	}

	draw = e => {
		const event = e.nativeEvent;
		if (this.state.drawing) {
			if (event.type === 'mousemove' && event.which === 1) {
				let xIndex = Math.floor(event.offsetX / this.pixelsOffset);
				let yIndex = Math.floor(event.offsetY / this.pixelsOffset);
				this.fillPixel(xIndex, yIndex);
			} else if (e.type === 'touchmove') {
				let offsetX = event.touches[0].pageX - this.canvas.current.offsetLeft;
				let offsetY = event.touches[0].pageY - this.canvas.current.offsetTop;
				let xIndex = Math.floor(offsetX / this.pixelsOffset);
				let yIndex = Math.floor(offsetY / this.pixelsOffset);
				this.fillPixel(xIndex, yIndex);
			}
		}
	};

	fillPixel (xIndex, yIndex) {
		this.ctx.fillRect(
			xIndex * this.pixelsOffset,
			yIndex * this.pixelsOffset,
			this.pixelsOffset,
			this.pixelsOffset
		);
		/* pixels.push({
			topLeftX : xIndex * this.props.pixelsLen,
			topLeftY : Y_INDEX * this.props.pixxIndex * this.props.pixelsLen
    }); */
	}

	drawGrid () {
		const { width, height } = this.props;
		this.ctx.beginPath();

		// vertical lines

		for (let x = this.pixelsOffset; x < width; x += this.pixelsOffset) {
			this.ctx.moveTo(x, 0);
			this.ctx.lineTo(x, width);
		}

		// horizontal lines

		for (let y = this.pixelsOffset; y < height; y += this.pixelsOffset) {
			this.ctx.moveTo(0, y);
			this.ctx.lineTo(height, y);
		}

		this.ctx.strokeStyle = 'light-grey';
		this.ctx.lineWidth = 0.75;
		this.ctx.stroke();
	}

	startDrawing = () => this.setState({ drawing: true });
	stopDrawing = () => this.setState({ drawing: false });

	render () {
		return (
			<canvas
				ref={this.canvas}
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
