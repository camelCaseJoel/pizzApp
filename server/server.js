import { Meteor } from 'meteor/meteor';
import { Productos, Ordenes, Mesas } from '../both/collections.js';


// =================== USER CREATION ===================
//------------------------------------------------------
Accounts.onCreateUser(function (options, user) {
	//my custom user fields :D
	user.role = options.role;

	if(options.profile){
		user.profile = options.profile;
	}
	
	return user;
});


//====================== STARTUP =======================
//------------------------------------------------------
Meteor.startup(() => {
	if( Mesas.find().count() === 0 ){
		Mesas.insert({
			numero: 1,
			capacidad: 5
		});
		Mesas.insert({
			numero: 2,
			capacidad: 10
		});
		Mesas.insert({
			numero: 3,
			capacidad: 15
		});
	}	
});
