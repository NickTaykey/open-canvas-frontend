import React, { Component } from 'react';
import { saveDrawing } from '../helpers';
import ErrorHandler from '../components/ErrorHandler';
import Canvas from '../components/Canvas';
import Picker from '../components/Picker';
import '../styles/NewDrawing.css';

class NewDrawing extends Component {
	static defaultProps = {
		color        : '#000',
		canvasWidth  : 600,
		canvasHeight : 600,
		canvasPxLen  : 30
	};

	state = {
		currentColor : this.props.color,
		pixels       : [],
		error        : null
	};

	addPixel = p => {
		this.setState(s => {
			if (s.pixels.length > 0) {
				let idx = s.pixels.length - 1;
				let lastPixels = s.pixels[idx];
				if (lastPixels.color === s.currentColor) {
					let newPixels = [
						...s.pixels.slice(0, idx),
						{
							...lastPixels,
							points : [ ...lastPixels.points, p ]
						}
					];
					return { ...s, pixels: newPixels };
				} else {
					return {
						pixels : [
							...s.pixels,
							{
								color  : s.currentColor,
								points : []
							}
						]
					};
				}
			} else {
				return {
					...s,
					pixels : [
						{
							color  : s.currentColor,
							points : [ p ]
						}
					]
				};
			}
		});
	};

	changeColor = ({ hex }) => {
		this.setState({ currentColor: hex });
	};

	handlePostClick = async () => {
		try {
			let JSONdata = JSON.stringify(this.state.pixels);
			await saveDrawing(JSONdata);
			this.props.history.push('/drawings');
		} catch ({ status, message }) {
			this.setState({ error: { status, message } });
		}
	};

	render () {
		const { canvasWidth, canvasHeight, canvasPxLen } = this.props;
		const { currentColor, error } = this.state;
		return (
			<div className="NewDrawing">
				{error && <ErrorHandler {...error} />}
				{!error && (
					<div className="row">
						<section className="col-lg-3">
							<div className="Picker-container">
								<h2 className="text-center">New Drawing!</h2>
								<Picker
									onChangeColor={this.changeColor}
									currentColor={currentColor}
								/>
								<button
									className="btn btn-primary btn-block"
									onClick={this.handlePostClick}
									id="post-btn"
									type="button">
									POST
								</button>
							</div>
						</section>
						<section className="col-lg-9">
							<div className="Canvas-container">
								<Canvas
									width={canvasWidth}
									height={canvasHeight}
									pixelsLen={canvasPxLen}
									fillStyle={currentColor}
									addPixel={this.addPixel}
								/>
							</div>
						</section>
					</div>
				)}
			</div>
		);
	}
}

export default NewDrawing;
