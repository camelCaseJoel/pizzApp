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
//             CREAR-PRODUCTO TEMPLATE 
//==================================================
Template.create_product.events({
	'click button#create_product'(){
		//clear printed errors
		$('#error_message_create_product').html('');

		let productName = $('#product_name').val();
		let price = $('#price').val();
		
		//some validations( I need to refactor this later )
		if(productName.length === 0 || price.length === 0){
			$('#error_message_create_product').append('<li>' + "Los campos están vacíos" + '</li>');

			//this will cancel the rest of the function
			return;
		}

		//from a string to a Number.
		price = Number( price );

		let product = {
			productName,
			price
		}

		Meteor.call( 'addProduct', product, (error)=>{
			if(error){
				console.log(error);
				$('#error_message_create_product').append('<li>' + error.reason + '</li>');
			}
			
		});

		$('input').val('');
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
		//limpiar mensajes de error
		$('#mensaje_error_create_users').html('');

		let userName = $('div.create_user_box #name').val();
		let password = $('div.create_user_box #password').val();

		let options = {
			username: userName,
			password: password,
			role: $('#role').val()

		}
		console.log( options );

		Accounts.createUser( options, (error)=>{
			if(error){
				console.log( error.reason );
				$('#mensaje_error_create_users').append('<li>' + error.reason + '</li>');
			}
			
		});

		$('input').val('');
	}
});

