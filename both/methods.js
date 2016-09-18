import {Productos} from './collections.js';

Meteor.methods({
	'addProduct'( product ){
		Productos.insert({
			name: product.productName,
			price: product.price	
		});
	}
});