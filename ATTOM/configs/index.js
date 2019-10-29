const api = {
	PROTOCOL: "https://",
	BASE: "api.gateway.attomdata.com/",
	PROPERTY_API: "propertyapi/",
	VERSION: "v1.0.0/",
};

export const config = {
	API_PRODUCTION_KEY: "3ef33fb87b1fcff8cb9720f39a375637", // populate locally
	API_STAGE_KEY: "2aaa173d977744b624cea8f5351651b4"
};

export const obtainPropertyBaseApiUrl = () => {
	const { PROTOCOL, BASE, VERSION, PROPERTY_API } = api;
	return `${PROTOCOL}${BASE}${PROPERTY_API}${VERSION}`;
};