// 10.000 requests / mo
// https://ipstack.com/

export const config = {
	API_ACCESS_KEY: "" // populate locally
};

const api = {
	PROTOCOL: "http://",
	BASE: "api.ipstack.com/",
};

export const obtainLocationApiUrl = () => {
	const { PROTOCOL, BASE } = api;
	return `${PROTOCOL}${BASE}`;
};