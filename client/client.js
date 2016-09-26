import{ utils } from '../both/utils.js'
import{ Productos, Mesas, Ordenes } from '../both/collections.js';



// checking data -- DEBUG
// Deps.autorun(function() {
// 	console.log( Productos.find().fetch() );
// 	console.log( Mesas.find().fetch() );
// });

//==================================================
//             ORDERS TEMPLATE 
//==================================================
Template.orders.helpers({
	orders(){
		return Ordenes.find();
	}
});
Template.orders.events({
	'click button.order_is_ready'(event){
		let orderInfo = { id: this._id };

		Meteor.call('orderIsReady', orderInfo, function(error){
			if(error){
				console.log(error.reason);
			}
		} );
	}
});

//==================================================
//             HACER-PEDIDO TEMPLATE 
//==================================================
//-------------------
//      helpers
//-------------------
Template.hacerPedido.helpers({
  products() {
    return Productos.find();
  }
});
//-------------------
//      events
//-------------------
Template.hacerPedido.events({
	'click button#nuevo_pedido'( event ) {
		//limpiar mensajes de error
		$('#mensaje_error').html('');

		//Validación de 'mesa'
		let numeroMesa = Number( $('#mesa').val() );
		let passedTest = utils.validaExistenciaMesa( numeroMesa );
		console.log( passedTest );

		//getting data from UI (products)
		let products_list = $('ul#product_list').children( 'li' );
		
		//loop 'em
		let product_data = [];
		products_list.each((i, e)=>{
			let item = {};
			item.id = $(e).attr('data-id');
			item.name = $(e).text();
			product_data.push( item );
		});

		let finalObjectToSave = {
			dataArray: product_data,
			numeroMesa: numeroMesa
		}

		if(passedTest){
			Meteor.call('createOrder', finalObjectToSave,(error)=>{
				if(error){
					console.log( 'some shit happend: '+ error.reason )
				}
			})
		}

		//Limpiar  +++++
		$('ul#product_list').html('');
		$('input').val('');
	},

	'click button#add_product'(event){
		let id = $('select#pedido').val();
		let productName = Productos.find( {_id: id} ).fetch()[0].name;

		$('ul#product_list').append('<li data-id="' + id + '">'+ productName +'</li>');
		//console.log( id, productName );
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

