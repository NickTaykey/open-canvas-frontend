import axios from 'axios';

const API_URL = 'https://open-canvas-backend.herokuapp.com/drawings';

function saveDrawing (JSONdata) {
	return new Promise(async (resolve, reject) => {
		try {
			let res = await axios.post(API_URL, { pixels: JSONdata });
			return resolve(res.data);
		} catch (e) {
			return reject(e.response.data);
		}
	});
}

function getDrawings () {
	return new Promise(async (resolve, reject) => {
		try {
			let res = await axios.get(API_URL);
			return resolve(res.data);
		} catch (e) {
			return reject(e.response.data);
		}
	});
}

export { saveDrawing, getDrawings };
