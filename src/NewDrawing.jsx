import React, { Component } from 'react';
import Canvas from './Canvas';
import { saveDrawing } from './helpers';
import Picker from './Picker';
import './NewDrawing.css';

class NewDrawing extends Component {
	static defaultProps = {
		color : '#f7981b'
	};

	state = {
		currentColor : this.props.color,
		pixels       : []
	};

	addPixel = p => {
		this.setState(s => {
			if (s.pixels.length > 0) {
				const idx = s.pixels.length - 1;
				const lastPixels = s.pixels[idx];
				if (lastPixels.color === s.currentColor) {
					const newPixels = [
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
		const JSONdata = JSON.stringify(this.state.pixels);
		try {
			await saveDrawing(JSONdata);
			this.props.history.push('/drawings');
		} catch (e) {
			console.log(e);
		}
	};

	render () {
		return (
			<div className="NewDrawing">
				<div className="row">
					<section className="col-lg-3 col-12">
						<div className="Picker-container">
							<h2>Open canvas</h2>
							<Picker
								currentColor={this.state.currentColor}
								onChangeColor={this.changeColor}
							/>
							<button
								className="btn btn-primary"
								id="post-btn"
								type="button"
								onClick={this.handlePostClick}>
								POST
							</button>
						</div>
					</section>
					<section className="col-lg-9 col-12">
						<Canvas
							width={600}
							height={600}
							pixelsLen={30}
							fillStyle={this.state.currentColor}
							addPixel={this.addPixel}
						/>
					</section>
				</div>
			</div>
		);
	}
}

export default NewDrawing;
