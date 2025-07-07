import { GradoDiscapacidadModel } from "../Models/GradoDiscapacidadModel.js";
import { createRequire } from "node:module";

const req = createRequire(import.meta.url);

export class GradoDiscapacidadController {
  static async getGrado(req, res) {
    try {
      const grado = await GradoDiscapacidadModel.findAll({
        order: [['id', 'ASC']],
      });
      return res.status(200).json({ grado });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getGradoById(req, res) {
    try {
      const grado = await GradoDiscapacidadModel.findByPk(req.params.id);
      if (!grado) return res.status(404).json({ error: "No encontrado" });
      res.json(grado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Guardar nueva etnia
  static async saveGrado(req, res) {
    try {
      const grado = await GradoDiscapacidadModel.create(req.body);
      res
        .status(201)
        .json({ message: "Guardada correctamente", grado_discapacidad: grado });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al guardar", message: error.message });
    }
  }

  // Actualizar etnia
  static async updateGrado(req, res) {
    try {
      const [updated] = await GradoDiscapacidadModel.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedGrado = await GradoDiscapacidadModel.findByPk(req.params.id);
        res.json({ message: "Actualizada correctamente", grado_discapacidad: updatedGrado });
      } else {
        res.status(404).json({ error: "Mo encontrada" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al actualizar", message: error.message });
    }
  }

  static async deleteGrado(req, res) {
    try {
      const deleted = await GradoDiscapacidadModel.destroy({
        where: { id: req.params.id },
      });
      deleted
        ? res.json({ message: "Eliminado" })
        : res.status(404).json({ error: "No encontrado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
