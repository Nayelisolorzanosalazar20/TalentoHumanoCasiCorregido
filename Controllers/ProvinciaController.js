import { ProvinciaModel } from "../Models/ProvinciaModel.js";
import { createRequire } from "node:module";

const req = createRequire(import.meta.url);

export class ProvinciaController {
  static async getProvincias(req, res) {
    try {
      const provincia = await ProvinciaModel.findAll({
        order: [["id", "ASC"]],
      });
      return res.status(200).json({ provincia });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getProvinciaById(req, res) {
    try {
      const provincia = await ProvinciaModel.findByPk(req.params.id);
      if (!provincia) return res.status(404).json({ error: "No encontrado" });
      res.json(provincia);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // Guardar nueva
  static async saveProvincia(req, res) {
    console.log("👉 POST /provincia body:", req.body);
    try {
      const provincia = await ProvinciaModel.create(req.body);
      res.status(201).json({ message: "Guardada correctamente", provincia: provincia });
    } catch (error) {
      res.status(500).json({ error: "Error al guardar", message: error.message });
    }
  }

  // Actualizar
  static async updatedProvincia(req, res) {
    try {
      const [updated] = await ProvinciaModel.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedProvincia = await ProvinciaModel.findByPk(req.params.id);
        res.json({
          message: "Actualizada correctamente",
          provincia: updatedProvincia,
        });
      } else {
        res.status(404).json({ error: "No encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar", message: error.message });
    }
  }

  static async deleteProvincia(req, res) {
    try {
      const provincia = await ProvinciaModel.findByPk(req.params.id);
      if (!provincia) return res.status(404).json({ message: "No encontrado" });
      await provincia.destroy();
      res.json({ message: "Eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
