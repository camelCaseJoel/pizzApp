
Template.hacerPedido.helpers({
  nothing() {
    return {};
  }
});

Template.hacerPedido.events({
	'click button#nuevo_pedido'(event) {

		//limpiar mensajes de error
		$('#mensaje_error').html('');

		const mesasExistentes = [1,2,3]; 
		let numeroMesa = Number( $('#mesa').val() );
		
		//debugging:
		//console.log( _.contains(mesasExistentes, numeroMesa) );

		if( !(_.contains(mesasExistentes, numeroMesa)) ){
			$('#mensaje_error').html('Esta mesa no existe');
		}
	}
});
