import { CapacitacionesModel } from '../Models/CapacitacionesModel.js';
import { createRequire } from 'node:module';
import { FuncionariosModel } from '../Models/FuncionariosModel.js'; // <-- AGREGA ESTA LÍNEA

const req = createRequire(import.meta.url);

export class CapacitacionesController{

  static async getCapacitaciones(req,res){
    try {
     
      const data = await CapacitacionesModel.findAll({
        order: [['id', 'ASC']],
         include: [{ model: FuncionariosModel, as: 'funcionarios' }]
      });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createCapacitacion(req,res){
    try {
      const data = await CapacitacionesModel.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

static async getCapacitacionById(req, res) {
  try {
    const funcionarioId = req.params.id;
    const capacitaciones = await CapacitacionesModel.findAll({
      where: { funcionario_id: funcionarioId }
    });
    res.json(capacitaciones);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener capacitaciones' });
  }
}

static async updateCapacitacion(req,res){
  try {
    const [updated] = await CapacitacionesModel.update(req.body, { where: { id: req.params.id } });
    updated ? res.json({ message: 'Actualizado' }) : res.status(404).json({ error: 'No encontrado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

static async deleteCapacitacion(Req,res){
  try {
    const deleted = await CapacitacionesModel.destroy({ where: { id: req.params.id } });
    deleted ? res.json({ message: 'Eliminado' }) : res.status(404).json({ error: 'No encontrado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

}

