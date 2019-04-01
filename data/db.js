import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/clientes', { useNewUrlParser: true });
mongoose.set('setFindAndModify', false);

// Definir el esquema de clientes
const clientesSchema = new mongoose.Schema({
	nombre: String,
	apellido: String,
	empresa: String,
	emails: Array,
	edad: Number,
	tipo: String,
	pedidos: Array
});

const Clientes = mongoose.model('clientes', clientesSchema);

//Productos
const productosSchema = new mongoose.Schema({
	nombre: String,
	precio: Number,
	stock: Number
});

const Productos = mongoose.model('productos', productosSchema);

const pedidosSchema = new mongoose.Schema({
	pedidos: Array,
	total: Number,
	fecha: Date,
	cliente: String,
	estado: String
});

const Pedidos = mongoose.model('pedidos', pedidosSchema);

export { Clientes, Productos, Pedidos };
