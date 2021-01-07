import React, { Component } from 'react';
import { getDrawings } from '../helpers';
import ShowCanvas from '../components/Drawing';
import ErrorHandler from '../components/ErrorHandler';

class Drawings extends Component {
	state = { drawings: [], error: null };

	async componentDidMount () {
		try {
			let data = await getDrawings();
			let drawings = data.map(({ _id, pixels }) => ({
				pixels : JSON.parse(pixels),
				_id
			}));
			this.setState({ drawings });
		} catch ({ status, message }) {
			this.setState({ error: { status, message } });
		}
	}

	render () {
		const { drawings, error } = this.state;
		const canvases = drawings.map(({ _id, pixels }) => (
			<ShowCanvas key={_id} pixels={pixels} />
		));
		return (
			<div>
				{error && <ErrorHandler {...error} />}
				{!error && (
					<section>
						<h1 className="mt-3 mb-5 text-center">
							All the drawings will be displayed here
						</h1>
						<div className="row">{canvases}</div>
					</section>
				)}
			</div>
		);
	}
}

export default Drawings;
