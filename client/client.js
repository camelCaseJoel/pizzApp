import{ validaExistenciaMesa } from '../both/validationUtility.js'

//==================================================
//             HACER-PEDIDO TEMPLATE 
//==================================================
Template.hacerPedido.helpers({
  nothing() {
    return {};
  }
});

Template.hacerPedido.events({
	'click button#nuevo_pedido'( event ) {
		
		//limpiar mensajes de error
		$('#mensaje_error').html('');
 
		//Validación
		let numeroMesa = Number( $('#mesa').val() );
		let passedTest = validaExistenciaMesa( numeroMesa );
		console.log( passedTest );
		
	}
});

//==================================================
//                LOGIN-BOX TEMPLATE 
//==================================================
Template.login_box.events({
	'click button#login' (event){
		let user = $('#name').val();
		let pass = $('#password').val();
		Meteor.loginWithPassword( user, pass , (error)=>{
			if(error){
				console.log( error.reason );
				$('#mensaje_error_login').append('<li>' + error.reason + '</li>');
			}
		});
	}
});


//==================================================
//                USER-BOX TEMPLATE 
//==================================================
Template.user_box.events({
	'click button#logout' ( event ){
		Accounts.logout();
	}
});


//==================================================
//                CREATE-USER TEMPLATE 
//==================================================
Template.createUser.events({
	'click button#create_user'( event ){
		let userName = $('div.create_user_box #name').val();
		let password = $('div.create_user_box #password').val();

		let options = {
			username: userName,
			password: password,
			role: $('#role').val()

		}
		console.log( options )

		Accounts.createUser( options, (error)=>{
			if(error){
				console.log( error.reason );
				$('#mensaje_error_create_user').append('<li>' + error.reason + '</li>');
			}
			
		} );
	}
});

