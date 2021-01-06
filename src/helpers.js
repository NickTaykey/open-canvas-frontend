import axios from 'axios';

const API_URL = 'http://localhost:8888/drawings';

function saveDrawing (JSONdata) {
	return new Promise(async (resolve, reject) => {
		let { error, ...res } = await axios.post(API_URL, { pixels: JSONdata });
		if (!error) {
			return resolve(res.data);
		}
		return reject(error);
	});
}

function getDrawings () {
	return new Promise(async (resolve, reject) => {
		let { error, ...res } = await axios.get(API_URL);
		if (!error) {
			return resolve(res.data);
		}
		return reject(error);
	});
}

export { saveDrawing, getDrawings };
