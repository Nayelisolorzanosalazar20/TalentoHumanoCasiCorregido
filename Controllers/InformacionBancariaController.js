import { InformacionBancariaModel } from '../Models/InformacionBancariaModel.js';
import { createRequire } from 'node:module';
import { InstitucionFinancieraModel } from '../Models/InstitucionFinancieraModel.js';
import { FuncionariosModel } from '../Models/FuncionariosModel.js';
const req = createRequire(import.meta.url);
// En tu controlador


export class InformacionBancariaController{

  static async createInformacionBancaria(req, res){
    try {
      const data = await InformacionBancariaModel.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


static async getInformacionBancaria(req, res){
  try {
    const data = await InformacionBancariaModel.findAll({
              order: [['id', 'ASC']],

      include: [{
    model: InstitucionFinancieraModel,
    as: 'institucion_financiera', 
    attributes: ['nombre_institucion']
  },

  {
    model: FuncionariosModel,
    as: 'funcionario', 
    attributes: ['nombres', 'apellidos']
  }]
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


  static async getInformacionBancariaById(req, res){
    try {
      const data = await InformacionBancariaModel.findByPk(req.params.id);
      if (!data) return res.status(404).json({ error: 'No encontrado' });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  static async updateInformacionBancaria(req, res){
    try {
      const [updated] = await InformacionBancariaModel.update(req.body, { where: { id: req.params.id } });
      updated ? res.json({ message: 'Actualizado' }) : res.status(404).json({ error: 'No encontrado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async bulkCreateInformacionBancaria(req, res) {
  try {
    // Espera un array en req.body (o en req.body.informacion_bancaria si lo envías así)
    const infoArray = Array.isArray(req.body) ? req.body : req.body.informacion_bancaria;
    if (!Array.isArray(infoArray)) {
      return res.status(400).json({ error: 'Se esperaba un array de información bancaria' });
    }
    // Opcional: agrega validación de campos aquí
    const data = await InformacionBancariaModel.bulkCreate(infoArray);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

  static async deleteInformacionBancaria(req, res){
    try {
      const deleted = await InformacionBancariaModel.destroy({ where: { id: req.params.id } });
      deleted ? res.json({ message: 'Eliminado' }) : res.status(404).json({ error: 'No encontrado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}


