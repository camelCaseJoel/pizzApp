import{ validaExistenciaMesa } from '../both/validationUtility.js'


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
		validaExistenciaMesa( numeroMesa );
		
		
	}
});
