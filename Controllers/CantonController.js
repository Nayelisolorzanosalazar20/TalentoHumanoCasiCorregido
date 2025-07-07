import { CantonModel } from "../Models/CantonModel.js";
import { ProvinciaModel } from "../Models/ProvinciaModel.js"; // depende de tu estructura y sintaxis

import { createRequire } from "node:module";

const req = createRequire(import.meta.url);

export class CantonController {
  static async getCantones(req, res) {
    try {
      const canton = await CantonModel.findAll({
        order: [["id", "ASC"]],
        include: {
          model: ProvinciaModel,
          as: "Provincia",
          attributes: ["nombre_provincia"],
        },
      });
      return res.status(200).json({ canton });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getCantonById(req, res) {
    try {
      const data = await CantonModel.findByPk(req.params.id);
      if (!data) return res.status(404).json({ error: "No encontrado" });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async saveCanton(req, res) {
    try {
      const canton = await CantonModel.create(req.body);
      res
        .status(201)
        .json({ message: "Guardada correctamente", canton: canton });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Error al guardar", message: error.message });
    }
  }

  // Actualizar
  static async updatedCanton(req, res) {
    try {
      const [updated] = await CantonModel.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedCanton = await ProvinciaModel.findByPk(req.params.id);
        res.json({
          message: "Actualizada correctamente",
          canton: updatedCanton,
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

  static async deleteCanton(req, res) {
    try {
      const deleted = await CantonModel.destroy({
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
