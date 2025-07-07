import { TipoDiscapacidadModel } from "../Models/TipoDiscapacidadModel.js";
import { createRequire } from "node:module";

const req = createRequire(import.meta.url);

export class TipoDiscapacidadController {

  static async getTipoDiscapacidad(req, res) {
    try {
      const tcapacidad = await TipoDiscapacidadModel.findAll({
                order: [['id', 'ASC']],

      });
      return res.status(200).json({ tcapacidad });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getTipoDiscapacidadById(req, res) {
    try {
      const tcapacidad = await TipoDiscapacidadModel.findByPk(req.params.id);
      if (!tcapacidad) return res.status(404).json({ error: "No encontrado" });
      res.json(tcapacidad);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Guardar nueva etnia
  static async saveTDiscapacidad(req, res) {
    try {
      const tcapacidad = await TipoDiscapacidadModel.create(req.body);
      res
        .status(201)
        .json({ message: "Guardada correctamente", tipo_discapacidad: tcapacidad });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al guardar", message: error.message });
    }
  }

  // Actualizar etnia
  static async updateTDiscapacidad(req, res) {
    try {
      const [updated] = await TipoDiscapacidadModel.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedtcapacidad = await TipoDiscapacidadModel.findByPk(req.params.id);
        res.json({ message: "Actualizada correctamente", tipo_discapacidad: updatedtcapacidad });
      } else {
        res.status(404).json({ error: "Mo encontrada" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al actualizar", message: error.message });
    }
  }

  static async deleteTipoDiscapacidad(req, res) {
    try {
      const deleted = await TipoDiscapacidadModel.destroy({
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
