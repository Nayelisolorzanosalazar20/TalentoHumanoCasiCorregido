import { createRequire } from "node:module";
import { EtniaModel } from "../Models/EtniaModel.js";

const req = createRequire(import.meta.url);

export class EtniaController {
  static async getEtnias(req, res) {
    try {
      const etnias = await EtniaModel.findAll({
      order: [['id', 'ASC']],
      });
      
      return res.status(200).json({ etnias });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getEtniaById(req, res) {
    try {
      const etnia = await EtniaModel.findByPk(req.params.id);
      if (!etnia) return res.status(404).json({ error: "Etnia no encontrada" });
      res.json(etnia);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Guardar nueva etnia
  static async saveEtnia(req, res) {
    try {
      console.log('Body recibido en etnia:', req.body);
      const nuevaEtnia = await EtniaModel.create(req.body);
      res
        .status(201)
        .json({ message: "Guardada correctamente", etnia: nuevaEtnia });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al guardar", message: error.message });
    }
  }

  // Actualizar etnia
  static async updateEtnia(req, res) {
    try {
      const [updated] = await EtniaModel.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedEtnia = await EtniaModel.findByPk(req.params.id);
        res.json({ message: "Actualizada correctamente", etnia: updatedEtnia });
      } else {
        res.status(404).json({ error: "Mo encontrada" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al actualizar", message: error.message });
    }
  }

  static async deleteEtnia(req, res) {
    try {
      const etnia = await EtniaModel.findByPk(req.params.id);
      if (!etnia) return res.status(404).json({ message: "No encontrado" });
      await etnia.destroy();
      res.json({ message: "Eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
