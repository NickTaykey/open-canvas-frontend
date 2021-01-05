import React, { Component } from 'react';
import Canvas from './Canvas';

class NewDrawing extends Component {
	state = { pixels: [] };

	addPixel = p => {
		this.setState(s => ({
			...s,
			pixels : [ ...s.pixels, p ]
		}));
	};

	handlePostClick = () => {
		const JSONdata = JSON.stringify(this.state.pixels);
		console.log(JSONdata);
	};

	render () {
		return (
			<div>
				<h1>Open canvas</h1>
				<Canvas
					width={600}
					height={600}
					pixelsLen={30}
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
