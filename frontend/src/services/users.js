export const API_URL = 'http://127.0.0.1:64022';

export async function singIn() {
	try {
		const response = await fetch(`${API_URL}/singin`);
		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		console.error(error);
	}
}
