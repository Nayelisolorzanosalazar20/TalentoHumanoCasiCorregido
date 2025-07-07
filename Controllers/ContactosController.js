import { ContactosModel } from '../Models/ContactosModel.js';
import { createRequire } from 'node:module';
import { FuncionariosModel } from '../Models/FuncionariosModel.js'; // Asegúrate de importar el modelo de Funcionarios
const req = createRequire(import.meta.url);

export class ContactosController{

  static async getContactos(req, res){
    try {
      const data = await ContactosModel.findAll({
        order: [['id', 'ASC']],
        include: [{ model: FuncionariosModel, as: 'funcionarios' }]
      });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getContactoById(req, res){
    try {
      const data = await ContactosModel.findByPk(req.params.id);
      if (!data) return res.status(404).json({ error: 'No encontrado' });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async createContacto(req,res){
    try {
      const data = await ContactosModel.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async updateContacto(req, res){
    try {
      const [updated] = await ContactosModel.update(req.body, { where: { id: req.params.id } });
      updated ? res.json({ message: 'Actualizado' }) : res.status(404).json({ error: 'No encontrado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }    
  }

  static async deleteContacto(req, res){
    try {
      const deleted = await ContactosModel.destroy({ where: { id: req.params.id } });
      deleted ? res.json({ message: 'Eliminado' }) : res.status(404).json({ error: 'No encontrado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }   
  }

}

