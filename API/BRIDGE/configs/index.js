const api = {
	PROTOCOL: "https://",
	BASE: "api.bridgedataoutput.com/",
	PROPERTY_API: "api/",
	VERSION: "v2/",
};

export const config = {
	API_PRODUCTION_KEY: "75ef113eba8264d6503586a3666b5c46", // populate locally
	API_STAGE_KEY: "75ef113eba8264d6503586a3666b5c46"
};

export const obtainPropertyBaseApiUrl = () => {
	const { PROTOCOL, BASE, VERSION, PROPERTY_API } = api;
	return `${PROTOCOL}${BASE}${PROPERTY_API}${VERSION}`;
};