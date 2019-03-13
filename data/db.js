import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/clientes', { useNewUrlParser: true });

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

export { Clientes };
