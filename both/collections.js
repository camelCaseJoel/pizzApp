let Productos = new Mongo.Collection('productos');
let Ordenes = new Mongo.Collection('ordenes');
let Mesas = new Mongo.Collection('mesas');

if(Meteor.isServer){
	// ==================== PUBLISH ===================
	Meteor.publish('todasMesas',function(){
		return Mesas.find();
	});
	Meteor.publish('products',()=>{
		return Productos.find();
	});
	Meteor.publish('orders',()=>{
		return Ordenes.find();
	});
}
if(Meteor.isClient){
	//================== SUBSCRIPTIONS==================
	Meteor.subscribe('todasMesas');
	Meteor.subscribe('products');
	Meteor.subscribe('orders');
}


export{ Productos, Ordenes, Mesas };