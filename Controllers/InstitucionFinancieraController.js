import { InstitucionFinancieraModel } from '../Models/InstitucionFinancieraModel.js';
import { createRequire } from 'node:module';

const req = createRequire(import.meta.url);


export class InstitucionFinancieraController{

  static async createInstitucionFinanciera(req, res){
    try {
      const data = await InstitucionFinancieraModel.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  static async getInstitucionesFinancieras(req, res){
    try {
      const data = await InstitucionFinancieraModel.findAll({
        order: [['id', 'ASC']],
      });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  static async getInstitucionFinancieraById(req, res){
    try {
      const data = await InstitucionFinancieraModel.findByPk(req.params.id);
      if (!data) return res.status(404).json({ error: 'No encontrado' });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  static async updateInstitucionFinanciera(req, res){
    try {
      const [updated] = await InstitucionFinancieraModel.update(req.body, { where: { id: req.params.id } });
      updated ? res.json({ message: 'Actualizado' }) : res.status(404).json({ error: 'No encontrado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  static async deleteInstitucionFinanciera(req, res){
    try {
      const deleted = await InstitucionFinancieraModel.destroy({ where: { id: req.params.id } });
      deleted ? res.json({ message: 'Eliminado' }) : res.status(404).json({ error: 'No encontrado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


}
