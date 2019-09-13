const api = {
	PROTOCOL: "https://",
	BASE: "api.gateway.attomdata.com/areaapi/",
	VERSION: "v2.0.0/",
};

export const config = {
	API_KEY: "", // populate locally
};

export const obtainBaseApiUrl = () => {
	const { PROTOCOL, BASE, VERSION } = api;
	return `${PROTOCOL}${BASE}${VERSION}`;
};