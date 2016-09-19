import { Productos, Ordenes, Mesas } from '../both/collections.js';

// =================== PUBLISH =================
Meteor.publish('todasMesas',function(){
	return Mesas.find();
});
Meteor.publish('products',()=>{
	return Productos.find();
});
 
console.log( Productos.find().fetch() );
console.log( Mesas.find().fetch() );