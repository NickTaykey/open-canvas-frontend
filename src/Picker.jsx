import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import './Picker.css';

class Picker extends Component {
	render () {
		return (
			<div className="Picker">
				<ChromePicker
					color={this.props.currentColor}
					onChange={this.props.onChangeColor}
					disableAlpha
				/>
			</div>
		);
	}
}

export default Picker;
