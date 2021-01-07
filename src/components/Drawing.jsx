import React, { Component } from 'react';

class ShowCanvas extends Component {
	static defaultProps = {
		canvasHeight : 120,
		canvasWidth  : 120,
		pixelsLen    : 20
	};

	constructor (props) {
		super(props);
		this.canvasRef = new React.createRef();
		this.ctx = null;
	}

	componentDidMount () {
		this.ctx = this.canvasRef.current.getContext('2d');
		this.drawGrid();
		this.fillPixels();
	}

	drawGrid () {
		const { canvasWidth, canvasHeight, pixelsLen } = this.props;
		const pixelsOffset = canvasWidth / pixelsLen;
		this.ctx.beginPath();
		for (let x = pixelsOffset; x < canvasWidth; x += pixelsOffset) {
			this.ctx.moveTo(x, 0);
			this.ctx.lineTo(x, canvasWidth);
		}
		for (let y = pixelsOffset; y < canvasHeight; y += pixelsOffset) {
			this.ctx.moveTo(0, y);
			this.ctx.lineTo(canvasHeight, y);
		}
		this.ctx.strokeStyle = 'light-grey';
		this.ctx.lineWidth = 0.75;
		this.ctx.stroke();
	}

	fillPixels () {
		for (let path of this.props.pixels) {
			this.ctx.fillStyle = path.color;
			for (let [ x, y ] of path.points) {
				this.fillPixel(x, y);
			}
		}
	}

	fillPixel (x, y) {
		const pixelsOffset = this.props.canvasWidth / this.props.pixelsLen;
		this.ctx.fillRect(x * 0.2, y * 0.2, pixelsOffset, pixelsOffset);
	}

	render () {
		return (
			<div className="col-lg-2">
				<canvas
					className="border border-2 border-dark"
					ref={this.canvasRef}
					width={this.props.canvasWidth}
					height={this.props.canvasHeight}
				/>
			</div>
		);
	}
}

export default ShowCanvas;
