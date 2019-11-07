export const getListingKey = (property = {}) => {
    return property.ListingKey;
};

export const getListingId = (property = {}) => {
    return property.ListingId;
};

export const getListPrice = (property = {}) => {
    return property.ListPrice;
};

export const getBedroomsTotal = (property = {}) => {
    return property.BedroomsTotal;
};

export const getBathroomsTotal = (property = {}) => {
    return property.BathroomsTotalInteger;
};

export const getBathroomsFull = (property = {}) => {
    return property.BathroomsFull;
};

export const getBuildingAreaTotal = (property = {}) => {
    return property.BuildingAreaTotal;
};

export const getBuildingAreaUnits = (property = {}) => {
    return property.BuildingAreaUnits;
};

export const getDaysOnMarket = (property = {}) => {
    return property.DaysOnMarket;
};

export const getAppliances = (property = {}) => {
    return property.Appliances || [];
};

export const getView = (property = {}) => {
    return property.View || [];
};

export const getCooling = (property = {}) => {
    return property.Cooling || [];
};

export const getHeating = (property = {}) => {
    return property.Heating || [];
};

export const getParkingTotal = (property = {}) => {
    return property.ParkingTotal;
};

export const getPhotosCount = (property = {}) => {
    return property.PhotosCount;
};

export const getPropertyLatitude = (property = {}) => {
    return property.Latitude;
};

export const getPropertyLongitude = (property = {}) => {
    return property.Longitude;
};

export const getCity = (property = {}) => {
    return property.City;
};

export const getCountry = (property = {}) => {
    return property.Country;
};

export const getPostalCode = (property = {}) => {
    return property.PostalCode;
};

export const getStateOrProvince = (property = {}) => {
    return property.StateOrProvince;
};

export const getStreetNumber = (property = {}) => {
    return property.StreetNumber;
};

export const getStreetName = (property = {}) => {
    return property.StreetName;
};

export const getUnitNumber = (property = {}) => {
    return property.UnitNumber;
};

// media
export const getPhotos = (property = {}) => {
    return property.Media || [];
};

export const getPhotoUrl = (photo = {}) => {
    return property.MediaURL;
};

export const getPhotoDescription = (photo = {}) => {
    return property.ShortDescription;
};
