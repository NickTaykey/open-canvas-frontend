import React, { Component } from 'react';
import { getDrawings } from './helpers';

class Drawings extends Component {
	async componentDidMount () {
		try {
			let data = await getDrawings();
			console.log(data);
		} catch (e) {
			console.log(e);
		}
	}

	render () {
		return (
			<div className="drawings">
				<h1>All the drawings will be displayed here</h1>
			</div>
		);
	}
}

export default Drawings;
