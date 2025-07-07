import { DiscapacidadModel } from "../Models/DiscapacidadModel.js";
import { createRequire } from "node:module";

const req = createRequire(import.meta.url);

export class DiscapacidadController {

static async getDiscapacidades(req, res) {
  try {
    const discapacidades = await DiscapacidadModel.findAll({
      order: [['id', 'ASC']],
    });
    res.json(discapacidades); // <-- SOLO el array, no un objeto
  } catch (error) {
    res.status(500).json([]);
  }
}

  static async getDiscapacidadById(req, res) {
    try {
      const discapacidad = await DiscapacidadModel.findByPk(req.params.id);
      if (!discapacidad) return res.status(404).json({ error: "No encontrada" });
      res.json(discapacidad);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getDiscapacidadesByFuncionario(req, res) {
    try {
      const discapacidades = await DiscapacidadModel.findAll({
        where: { funcionario_id: req.params.funcionario_id },
        order: [['id', 'ASC']],
      });
      res.json(discapacidades);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async saveDiscapacidad(req, res) {
    try {
      const discapacidad = await DiscapacidadModel.create(req.body);
      res.status(201).json({ message: "Guardada correctamente", discapacidad });
    } catch (error) {
      res.status(500).json({ error: "Error al guardar", message: error.message });
    }
  }

  static async updateDiscapacidad(req, res) {
    try {
      const [updated] = await DiscapacidadModel.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedDiscapacidad = await DiscapacidadModel.findByPk(req.params.id);
        res.json({ message: "Actualizada correctamente", discapacidad: updatedDiscapacidad });
      } else {
        res.status(404).json({ error: "No encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar", message: error.message });
    }
  }

  static async deleteDiscapacidad(req, res) {
    try {
      const deleted = await DiscapacidadModel.destroy({
        where: { id: req.params.id },
      });
      deleted
        ? res.json({ message: "Eliminada" })
        : res.status(404).json({ error: "No encontrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}