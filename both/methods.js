import {Productos, Ordenes} from './collections.js';

Meteor.methods({
	'addProduct'( product ){
		Productos.insert({
			name: product.productName,
			price: product.price	
		});
	},
	'createOrder'( orderInfo ){
		Ordenes.insert({
			numeroMesa: orderInfo.numeroMesa,
			orderItems: orderInfo.dataArray,
			estado: 'pendiente'
		});
	},
	'orderIsReady'( orderInfo ){
		
		Ordenes.update(
			{ _id: orderInfo.id },
			{$set:{ estado: 'listo' }} 
		);
	}
});