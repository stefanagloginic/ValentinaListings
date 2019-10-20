const TIMEOUT = 20000;

export const loadPropertyListings = (context, param = {}, done) => {
	// TODO: params has hardcoded zipcode, need to change
	context.service.read('listings',
		{ postalCode: '90034' },
		{ timeout: TIMEOUT },
		(err, data) => {
			if (err) {
				return done(err);
			}

			context.dispatch('LOAD_LISTINGS_SUCCESS', { listings: data });

			done();
		}
	)
};