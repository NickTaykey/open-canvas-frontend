import React, { Component } from 'react';
import { getDrawings } from './helpers';
import ShowCanvas from './ShowCanvas';
import ErrorHandler from './ErrorHandler';

class Drawings extends Component {
	state = { drawings: [], error: null };

	async componentDidMount () {
		try {
			let data = await getDrawings();
			const drawings = data.map(({ _id, pixels }) => ({
				pixels : JSON.parse(pixels),
				_id
			}));
			this.setState({ drawings });
		} catch (e) {
			this.setState({
				error : { status: e.status, message: e.message }
			});
		}
	}

	render () {
		const canvases = this.state.drawings.map(({ _id, pixels }) => (
			<ShowCanvas key={_id} pixels={pixels} />
		));

		return (
			<div className="drawings">
				{this.state.error && <ErrorHandler {...this.state.error} />}
				{!this.state.error && (
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
