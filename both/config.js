if(Meteor.isClient){
	Accounts.ui.config({
		passwordSignupFields: 'USERNAME_ONLY'
	});
}

if(Meteor.isServer){
	Accounts.onCreateUser(function (options, user) {
		user.profile = options.profile;
		console.log(options)
		return user;

	});
}