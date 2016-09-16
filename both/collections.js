let Productos = new Mongo.Collection('productos');
let Ordenes = new Mongo.Collection('ordenes');
let Mesas = new Mongo.Collection('mesas');

if( Meteor.isServer ){
	Meteor.publish('todasMesas',function(){
		return Mesas.find();
	})
}
if( Meteor.isClient ){
	Meteor.subscribe('todasMesas');
}

export{ Productos, Ordenes, Mesas };