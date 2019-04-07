import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
	cliente: mongoose.Types.ObjectId,
	estado: String
});

const Pedidos = mongoose.model('pedidos', pedidosSchema);

const usuariosSchema = new mongoose.Schema({
	usuario: String,
	nombre: String,
	password: String,
	rol: String
});

usuariosSchema.pre('save', function(next) {
	if (!this.isModified('password')) {
		return next();
	}
	bcrypt.genSalt(10, (error, salt) => {
		if (error) return next(error);

		bcrypt.hash(this.password, salt, (err, hash) => {
			if (err) return next(err);
			this.password = hash;
			next();
		});
	});
});

const Usuarios = mongoose.model('usuarios', usuariosSchema);

export { Clientes, Productos, Pedidos, Usuarios };
