import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NewDrawing from './NewDrawing';
import Drawings from './Drawings';

class OpenCanvas extends Component {
	render () {
		return (
			<div>
				<Switch>
					<Route exact path="/drawings/new" component={NewDrawing} />
					<Route exact path="/drawings" component={Drawings} />
				</Switch>
			</div>
		);
	}
}

export default OpenCanvas;
