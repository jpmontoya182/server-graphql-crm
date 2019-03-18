import { Clientes } from './db';
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
			return new Promise((resolve, reject) => {
				Clientes.countDocuments({}, (error, count) => {
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
				Clientes.findOneAndRemove({ _id: id }, (error) => {
					if (error) rejects(error);
					else resolve('Se elimino correctamente');
				});
			});
		}
	}
};
