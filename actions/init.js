const TIMEOUT = 20000;

export const loadPropertyListings = (context, param, done) => {
    param = param || {};
    // TODO: params has hardcoded zipcode, need to change
    const { location } = param;
    console.log('location from loadPropertyListings: ', location);
    context.service.read('listings',
        { postalCode: '90034' },
        (err, data) => {
            if (err) {
                return done(err);
            }
            context.dispatch('LOAD_LISTINGS_SUCCESS', { listings: data });

            done();
        }
    )
};

export const getCoordinates = async (context, param, done) => {
	await context.service.read('geolocation', {}, (err, data) => {
        if (err) {
            return done(err);
        }

        context.dispatch('LOAD_LOCATION_SUCCESS', { location: data });
        console.log('done...')
        done();
    });
    console.log('finished?');
};
