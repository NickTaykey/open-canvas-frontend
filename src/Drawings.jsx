import React, { Component } from 'react';
import { getDrawings } from './helpers';
import ShowCanvas from './ShowCanvas';

class Drawings extends Component {
	state = { drawings: [] };

	async componentDidMount () {
		try {
			let data = await getDrawings();
			const drawings = data.map(({ _id, pixels }) => ({
				pixels : JSON.parse(pixels),
				_id
			}));
			this.setState({ drawings });
		} catch (e) {
			console.log(e);
		}
	}

	render () {
		const canvases = this.state.drawings.map(({ _id, pixels }) => (
			<ShowCanvas key={_id} pixels={pixels} />
		));

		return (
			<div className="drawings">
				<h1>All the drawings will be displayed here</h1>
				{canvases}
			</div>
		);
	}
}

export default Drawings;
