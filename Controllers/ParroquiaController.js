import { CantonModel } from "../Models/CantonModel.js";
import { ParroquiaModel } from "../Models/ParroquiaModel.js";
import { createRequire } from "node:module";

const req = createRequire(import.meta.url);

export class ParroquiaController {
  static async getParroquia(req, res) {
    try {
      const parroquia = await ParroquiaModel.findAll({
                order: [['id', 'ASC']],

        include: {
          model: CantonModel,
          as: "Canton",
          attributes: ["descripcion"],
        },
      });
      return res.status(200).json({ parroquia });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getParroquiaById(req, res) {
    try {
      const data = await ParroquiaModel.findByPk(req.params.id);
      if (!data) return res.status(404).json({ error: "No encontrado" });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Guardar nueva
  static async saveParroquia(req, res) {
    try {
      const parroquia = await ParroquiaModel.create(req.body);
      res
        .status(201)
        .json({ message: "Guardado correctamente", parroquia: parroquia });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al guardar", parroquia: error.message });
    }
  }

  // Actualizar
  static async updatedParroquia(req, res) {
    try {
      const [updated] = await ParroquiaModel.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedParroquia = await ParroquiaModel.findByPk(req.params.id);
        res.json({
          message: "Actualizada correctamente",
          parroquia: updatedParroquia,
        });
      } else {
        res.status(404).json({ error: "No encontrada" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al actualizar", message: error.message });
    }
  }

  static async deleteParroquia(req, res) {
    try {
      const parroquia = await ParroquiaModel.findByPk(req.params.id);
      if (!parroquia) return res.status(404).json({ message: "No encontrado" });
      await parroquia.destroy();
      res.json({ message: "Eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
