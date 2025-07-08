import { UnidadCargoModel } from '../Models/UnidadCargoModel.js';

export class UnidadCargoController {
  static async createUnidadCargo(req, res) {
    try {
      const data = await UnidadCargoModel.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUnidadCargo(req, res) {
    try {
      const unidad = await UnidadCargoModel.findAll();
      res.json(unidad);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUnidadCargoById(req, res) {
    try {
      const unidad = await UnidadCargoModel.findByPk(req.params.id);
      if (!unidad) return res.status(404).json({ error: 'Unidad no encontrada' });
      res.json(unidad);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateUnidadCargo(req, res) {
    try {
      const [updated] = await UnidadCargoModel.update(req.body, { where: { id: req.params.id } });
      if (!updated) return res.status(404).json({ error: 'Unidad no encontrada' });
      res.json({ message: 'Unidad actualizada' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteUnidadCargo(req, res) {
    try {
      const deleted = await UnidadCargoModel.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: 'Unidad no encontrada' });
      res.json({ message: 'Unidad eliminada' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}