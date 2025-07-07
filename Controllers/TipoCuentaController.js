import { TipoCuentaModel } from '../Models/TipoCuentaModel.js';
import { createRequire } from 'node:module';

const req = createRequire(import.meta.url);

export class TipoCuentaController {

  static async createTipoCuenta(req, res) {
    try {
      const data = await TipoCuentaModel.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getTiposCuenta(req, res) {
    try {
      const data = await TipoCuentaModel.findAll({
        order: [['id', 'ASC']],
      });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getTipoCuentaById(req, res) {
    try {
      const data = await TipoCuentaModel.findByPk(req.params.id);
      if (!data) return res.status(404).json({ error: 'No encontrado' });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateTipoCuenta(req, res) {
    try {
      const [updated] = await TipoCuentaModel.update(req.body, { where: { id: req.params.id } });
      updated ? res.json({ message: 'Actualizado' }) : res.status(404).json({ error: 'No encontrado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteTipoCuenta(req, res) {
    try {
      const deleted = await TipoCuentaModel.destroy({ where: { id: req.params.id } });
      deleted ? res.json({ message: 'Eliminado' }) : res.status(404).json({ error: 'No encontrado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}