import { CargosModel } from "../Models/CargosModel.js";
import { PeriodoModel } from "../Models/PeriodoModel.js";
import { createRequire } from "node:module";

const req = createRequire(import.meta.url);

export class CargosController {
  static async getCargos(req, res) {
    try {
      const cargos = await CargosModel.findAll({
                order: [['id', 'ASC']],

        // Correcto:
        include: [{ model: PeriodoModel, as: 'periodo' }] 
      });
      return res.status(200).json({ cargos });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getCargosById(req, res) {
    try {
      const data = await CargosModel.findByPk(req.params.id);
      if (!data) return res.status(404).json({ error: "No encontrado" });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Guardar nueva
  static async saveCargos(req, res) {
    try {
      const cargos = await CargosModel.create(req.body);
      res
        .status(201)
        .json({ message: "Guardado correctamente", cargos: cargos });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al guardar", cargos: error.message });
    }
  }

  // Actualizar
  static async updateCargos(req, res) {
    try {
      const [updated] = await CargosModel.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedCargos= await CargosModel.findByPk(req.params.id);
        res.json({
          message: "Actualizada correctamente",
          cargos: updatedCargos,
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

  static async deleteCargos(req, res) {
    try {
      const cargos = await CargosModel.findByPk(req.params.id);
      if (!cargos) return res.status(404).json({ message: "No encontrado" });
      await cargos.destroy();
      res.json({ message: "Eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}