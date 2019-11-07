const api = {
	PROTOCOL: "https://",
	BASE: "api.bridgedataoutput.com/",
	PROPERTY_API: "api/",
	VERSION: "v2/",
};

export const config = {
	API_PRODUCTION_KEY: "", // populate locally
	API_STAGE_KEY: ""
};

export const obtainPropertyBaseApiUrl = () => {
	const { PROTOCOL, BASE, VERSION, PROPERTY_API } = api;
	return `${PROTOCOL}${BASE}${PROPERTY_API}${VERSION}`;
};