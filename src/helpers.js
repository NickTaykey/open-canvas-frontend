import axios from 'axios';

function saveDrawing (JSONdata) {
	return new Promise(async (resolve, reject) => {
		let { error, ...res } = await axios.post(`/`, { pixels: JSONdata });
		if (!error) {
			return resolve(res.data);
		}
		return reject(error);
	});
}

export { saveDrawing };
