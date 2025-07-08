import { UnidadModel } from '../Models/UnidadModel.js';

export class UnidadController {
  static async createUnidad(req, res) {
    try {
      const data = await UnidadModel.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUnidad(req, res) {
    try {
      const unidad = await UnidadModel.findAll();
      res.json(unidad);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUnidadById(req, res) {
    try {
      const unidad = await UnidadModel.findByPk(req.params.id);
      if (!unidad) return res.status(404).json({ error: 'Unidad no encontrada' });
      res.json(unidad);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateUnidad(req, res) {
    try {
      const [updated] = await UnidadModel.update(req.body, { where: { id: req.params.id } });
      if (!updated) return res.status(404).json({ error: 'Unidad no encontrada' });
      res.json({ message: 'Unidad actualizada' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteUnidad(req, res) {
    try {
      const deleted = await UnidadModel.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: 'Unidad no encontrada' });
      res.json({ message: 'Unidad eliminada' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}