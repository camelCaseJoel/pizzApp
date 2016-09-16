import { Mesas } from '../both/collections.js'



function validaExistenciaMesa( numeroMesa ){
	let todasMesas = (Mesas.find().fetch());
	let arrayNumeroMesas = _.pluck(todasMesas, 'numero');
	//console.log(arrayNumeroMesas);

	if( !(_.contains(arrayNumeroMesas, numeroMesa)) ){
		$('#mensaje_error').append('<li>Esta mesa no existe</li>');
		return false;
	}

	return true;
}



export { validaExistenciaMesa };