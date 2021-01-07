import { ChromePicker } from 'react-color';

const Picker = ({ currentColor, onChangeColor }) => (
	<ChromePicker color={currentColor} onChange={onChangeColor} disableAlpha />
);

export default Picker;
