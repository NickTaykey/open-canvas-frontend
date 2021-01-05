import React, { Component } from 'react';
import Canvas from './Canvas';

class NewDrawing extends Component {
	render () {
		return (
			<div>
				<h1>Open canvas</h1>
				<Canvas width={600} height={600} pixelsLen={30} />
			</div>
		);
	}
}

export default NewDrawing;
