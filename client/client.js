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
	'click button#nuevo_pedido'(event) {
		
		//limpiar mensajes de error
		$('#mensaje_error').html('');
 
		//Validación
		let numeroMesa = Number( $('#mesa').val() );
		let passedTest = validaExistenciaMesa( numeroMesa );
		console.log( passedTest );
		
	}
});

//==================================================
//             LISTA DE PEDIDOS TEMPLATE 
//==================================================
