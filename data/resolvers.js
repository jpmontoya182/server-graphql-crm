import { Clientes, Productos } from './db';
import { rejects } from 'assert';

export const resolvers = {
	Query: {
		obtenerClientes: (_, { limite, offset }) => {
			return Clientes.find({}).limit(limite).skip(offset);
		},
		obtenerCliente: (_, { id }) => {
			return new Promise((resolve, object) => {
				Clientes.findById(id, (error, cliente) => {
					if (error) rejects(error);
					else resolve(cliente);
				});
			});
		},
		totalClientes: (_) => {
			return new Promise((resolve, object) => {
				Clientes.countDocuments({}, (error, count) => {
					if (error) rejects(error);
					else resolve(count);
				});
			});
		},
		obtenerProductos: (_, { limite, offset }) => {
			return Productos.find({}).limit(limite).skip(offset);
		},
		obtenerProducto: (root, { id }) => {
			return new Promise((resolve, object) => {
				Productos.findById(id, (error, producto) => {
					if (error) rejects(error);
					else resolve(producto);
				});
			});
		},
		totalProductos: (_) => {
			return new Promise((resolve, object) => {
				Productos.countDocuments({}, (error, count) => {
					if (error) rejects(error);
					else resolve(count);
				});
			});
		}
	},
	Mutation: {
		crearCliente: (root, { input }) => {
			const nuevoCliente = new Clientes({
				nombre: input.nombre,
				apellido: input.apellido,
				empresa: input.empresa,
				emails: input.emails,
				edad: input.edad,
				tipo: input.tipo,
				pedidos: input.pedidos
			});
			nuevoCliente.id = nuevoCliente._id;

			return new Promise((resolve, object) => {
				nuevoCliente.save((error) => {
					if (error) rejects(error);
					else resolve(nuevoCliente);
				});
			});
		},
		actualizarCliente: (_, { input }) => {
			return new Promise((resolve, object) => {
				Clientes.findOneAndUpdate({ _id: input.id }, input, { new: true }, (error, cliente) => {
					if (error) rejects(error);
					else resolve(cliente);
				});
			});
		},
		eliminarCliente: (_, { id }) => {
			return new Promise((resolve, object) => {
				Clientes.findOneAndDelete({ _id: id }, (error) => {
					if (error) rejects(error);
					else resolve('Se elimino correctamente');
				});
			});
		},
		crearProducto: (_, { input }) => {
			const nuevoProducto = new Productos({
				nombre: input.nombre,
				precio: input.precio,
				stock: input.stock
			});
			nuevoProducto.id = nuevoProducto._id;

			return new Promise((resolve, object) => {
				nuevoProducto.save((error) => {
					if (error) rejects(error);
					else resolve(nuevoProducto);
				});
			});
		},
		actualizarProducto: (root, { input }) => {
			return new Promise((resolve, producto) => {
				Productos.findOneAndUpdate({ _id: input.id }, input, { new: true }, (error, producto) => {
					if (error) rejects(error);
					else resolve(producto);
				});
			});
		},
		eliminarProducto: (root, { id }) => {
			return new Promise((resolve, producto) => {
				Productos.findOneAndDelete({ _id: id }, (error) => {
					if (error) rejects(error);
					else resolve(`"Se elimino el producto : ${id}"`);
				});
			});
		}
	}
};
