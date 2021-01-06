import React, { Component } from 'react';
import Canvas from './Canvas';
import { saveDrawing } from './helpers';
import Picker from './Picker';

class NewDrawing extends Component {
	state = {
		pixels       : [ { color: 'green', points: [] } ],
		currentColor : 'green'
	};

	addPixel = p => {
		this.setState(s => {
			if (s.pixels.length > 0) {
				const idx = s.pixels.length - 1;
				const newPixels = [
					...s.pixels.slice(0, idx),
					{
						...s.pixels[idx],
						points : [ ...s.pixels[idx].points, p ]
					}
				];
				return { ...s, pixels: newPixels };
			} else {
				return { ...s, pixels: [ { points: [ p ] } ] };
			}
		});
	};

	changeColor = ({ hex }) => {
		this.setState(s => {
			if (hex !== s.currentColor) {
				const newPixels = [ ...s.pixels, { color: hex, points: [] } ];
				return { currentColor: hex, pixels: newPixels };
			}
		});
	};

	handlePostClick = async () => {
		const JSONdata = JSON.stringify(this.state.pixels);
		try {
			let drawing = await saveDrawing(JSONdata);
			console.log(drawing);
		} catch (e) {
			console.log(e);
		}
	};

	render () {
		return (
			<div>
				<h1>Open canvas</h1>
				<Picker
					currentColor={this.state.currentColor}
					onChangeColor={this.changeColor}
				/>
				<Canvas
					width={600}
					height={600}
					pixelsLen={30}
					fillStyle={this.state.currentColor}
					addPixel={this.addPixel}
				/>
				<br />
				<button type="button" onClick={this.handlePostClick}>
					POST
				</button>
			</div>
		);
	}
}

export default NewDrawing;
