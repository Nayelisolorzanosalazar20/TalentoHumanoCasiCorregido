

import { PeriodoModel } from '../Models/PeriodoModel.js';

export class PeriodoController {
  static async createPeriodo(req, res) {
    try {
      const data = await PeriodoModel.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async savePeriodo(req, res) {
    try {
      const periodo = await PeriodoModel.create(req.body);
      res
        .status(201)
        .json({ message: "Guardado correctamente", periodo: periodo });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al guardar", periodo: error.message });
    }
  }
  static async getPeriodos(req, res) {
    try {
      const data = await PeriodoModel.findAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getPeriodoById(req, res) {
    try {
      const data = await PeriodoModel.findByPk(req.params.id);
      if (!data) return res.status(404).json({ error: 'No encontrado' });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updatePeriodo(req, res) {
    try {
      const [updated] = await PeriodoModel.update(req.body, { where: { id: req.params.id } });
      updated ? res.json({ message: 'Actualizado' }) : res.status(404).json({ error: 'No encontrado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deletePeriodo(req, res) {
    try {
      const deleted = await PeriodoModel.destroy({ where: { id: req.params.id } });
      deleted ? res.json({ message: 'Eliminado' }) : res.status(404).json({ error: 'No encontrado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}